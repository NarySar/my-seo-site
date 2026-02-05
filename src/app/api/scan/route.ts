import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js"; // Import createClient directly

// Define the Schema (Structure of the output)
const seoSchema = z.object({
  score: z.number().describe("A generic SEO score from 0 to 100 based on content quality"),
  summary: z.string().describe("A 2-sentence summary of what the page is about"),
  keywords: z.array(z.string()).describe("Top 5 keywords found on the page"),
  improvements: z.array(z.string()).describe("3 specific actionable tips to improve SEO"),
  modelUsed: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    console.log(`Visiting: ${url}`);

    // 1. Fetch Website Content
    const response = await fetch(url, {
      headers: { "User-Agent": "PulseSeo-Bot/1.0" },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch site: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Clean up content
    $('script, style, nav, footer, svg').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 15000); 

    console.log("Sending to Gemini...");

    // 2. AI Analysis
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: seoSchema,
      prompt: `Analyze this website content for Agentic SEO (readability for AI agents).
      
      URL: ${url}
      Content:
      ${textContent}
      
      Return a JSON object with:
      - score (0-100)
      - summary
      - keywords
      - improvements
      `,
    });

    // Add model name manually for tracking
    const scanResult = { ...object, modelUsed: "gemini-2.0-flash" };
    
    // Calculate Score for Database
    const aiScore = scanResult.score || 0;

    // 3. SAVE TO DATABASE (Lazy Connection) 💾
    // We create the client HERE, so it only runs when a user requests a scan
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Only try to save if we have the keys (prevents build crashes)
    if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { userId } = await auth();
        
        if (userId) {
            console.log(`👤 User ID found: ${userId} - Attempting save...`);
            
            const { error: dbError } = await supabase.from("scans").insert({
              url, 
              domain: new URL(url).hostname, 
              score: aiScore, 
              result: scanResult, 
              user_id: userId
            });

            if (dbError) {
                console.error("🔴 SUPABASE SAVE FAILED:", dbError.message);
            } else {
                console.log("✅ Saved to Supabase successfully!");
            }
        } else {
            console.log("🟠 No User Logged In - Skipping Database Save");
        }
    }

    return NextResponse.json(scanResult);

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}