import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

// SETUP GOOGLE AI
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
const google = createGoogleGenerativeAI({ apiKey });

// SCHEMA: Includes all 5 factors and strict instructions
const seoSchema = z.object({
  score: z.number().int().min(0).max(100),
  breakdown: z.object({
    dataDensity: z.number().describe("Score 0-100. Reward specific numbers, dates, prices."),
    structure: z.number().describe("Score 0-100. Reward semantic HTML5 usage."),
    trust: z.number().describe("Score 0-100. Reward reviews, real addresses, privacy policy."),
    clarity: z.number().describe("Score 0-100. Reward simple, short sentences."),
    completeness: z.number().describe("Score 0-100. Reward page depth and breadth."),
  }),
  summary: z.string(),
  keywords: z.array(z.string()),
  improvements: z.array(z.string()),
  mainHeadline: z.string(),
});

export async function POST(req: Request) {
  try {
    if (!apiKey) throw new Error("API Key Missing");

    const { url } = await req.json();
    console.log(`\n🌊 SCANNING (STRICT MODE): ${url}`);

    // 1. FETCH HTML (Googlebot Disguise)
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" },
      redirect: 'follow',
    });
    
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract Metadata & Cleanup
    let h1 = $('h1').first().text().trim();
    const title = $('title').text().trim() || "No Title";
    $('script, style, nav, footer, svg, noscript').remove();
    
    // Get Clean Text
    let textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000); 

    // Fail-Safe for JS-Only Sites
    if (textContent.length < 100) {
        textContent = `METADATA: ${title}. (Site is JavaScript heavy, limited content visible).`;
    }
    if (!h1) h1 = title;

    // 2. CALCULATE CONTENT VOLUME (Fair Logic)
    // High > 6000 chars, Medium > 2500 chars. Both are "Good".
    let volumeLabel = "Low";
    if (textContent.length > 6000) volumeLabel = "High";
    else if (textContent.length > 2500) volumeLabel = "Medium";
    
    // 3. AI ANALYSIS (RUTHLESS & DETERMINISTIC)
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: seoSchema,
      temperature: 0, // 🔒 LOCKS THE SCORE (No Randomness)
      prompt: `You are a ruthless Technical SEO Auditor. Analyze this content.
      
      URL: ${url}
      HEADLINE: "${h1}"
      CONTENT LENGTH: ${textContent.length} chars
      CONTENT SAMPLE:
      ${textContent.substring(0, 15000)}

      SCORING RUBRIC (BE STRICT):
      1. DATA DENSITY (0-100):
         - 0-30: Generic marketing fluff ("We are the best").
         - 71-100: Heavy on Hard Data (Prices like "$29", Dates, Statistics, Addresses).
      
      2. COMPLETENESS (0-100):
         - 0-40: Short landing page.
         - 81-100: Deep, comprehensive resource.

      3. TRUST (0-100):
         - Deduct points if no physical address or specific contact info found.
         - Reward "Reviews" sections.

      4. CLARITY (0-100):
         - Reward short sentences and easy reading level.

      5. STRUCTURE (0-100):
         - Reward proper H1/H2 hierarchy.

      Calculate the "Score" as a weighted average favoring Data Density.
      `,
    });

    // 4. PREPARE RESULT
    const finalScore = Math.round(object.score);

    const scanResult = { 
        ...object, 
        score: finalScore,
        mainHeadline: object.mainHeadline || h1,
        contentVolume: volumeLabel,
        contentLength: textContent.length // Sending exact count to UI
    };

    // 5. SAVE TO DB
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
        const { userId } = await auth();
        if (userId) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            await supabase.from("scans").insert({
              url, domain: new URL(url).hostname, score: finalScore, result: scanResult, user_id: userId
            });
        }
    }

    return NextResponse.json(scanResult);

  } catch (error: any) {
    console.error("❌ ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}