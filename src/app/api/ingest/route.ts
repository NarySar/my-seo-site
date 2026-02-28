import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    console.log(`🕵️‍♂️ Scraping website: ${url}`);

    // --- STEP 1: SCRAPE & CLEAN THE WEBSITE ---
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Remove junk elements so we only get the clean, readable article/page text
    $('script, style, nav, footer, header, noscript, svg').remove();
    const rawText = $('body').text().replace(/\s+/g, ' ').trim();

    if (!rawText) throw new Error("Could not extract any text from the page.");

    // --- STEP 2: CHUNK THE TEXT ---
    // AI models digest information best in small blocks. We split the text into 1000-character chunks.
    const chunkSize = 1000;
    const chunks = [];
    for (let i = 0; i < rawText.length; i += chunkSize) {
      chunks.push(rawText.slice(i, i + chunkSize));
    }

    console.log(`🔪 Chopped text into ${chunks.length} chunks. Generating embeddings...`);

    // --- STEP 3: GENERATE EMBEDDINGS (Native Fetch for absolute stability) ---
    const openAiResponse = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "text-embedding-3-small", // The industry standard 1536-dimension model
        input: chunks,
      })
    });
    
    if (!openAiResponse.ok) {
      throw new Error("Failed to generate embeddings from OpenAI");
    }

    const embeddingData = await openAiResponse.json();

    // --- STEP 4: SAVE TO SUPABASE VECTOR DB ---
    const rows = chunks.map((chunk, index) => ({
      content: chunk,
      url: url,
      embedding: embeddingData.data[index].embedding,
    }));

    const { error } = await supabase.from('documents').insert(rows);
    if (error) throw error;

    console.log(`✅ Successfully saved ${chunks.length} vectors to Supabase!`);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully ingested ${chunks.length} chunks from ${url}` 
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("❌ Ingestion Error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}