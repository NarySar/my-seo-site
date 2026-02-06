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

// 1. STRICTER SCHEMA: Force the score to be an Integer
const seoSchema = z.object({
  score: z.number().int().min(0).max(100).describe("A strict integer score from 0 to 100. Example: 75, 92, 40."),
  summary: z.string().describe("A 2-sentence summary of what the page is about"),
  keywords: z.array(z.string()).describe("Top 5 keywords found on the page"),
  improvements: z.array(z.string()).describe("3 specific actionable tips to improve SEO"),
  modelUsed: z.string().optional()
});

export async function POST(req: Request) {
  try {
    if (!apiKey) throw new Error("API Key Missing");

    const { url } = await req.json();
    console.log(`Visiting: ${url}`);

    // 2. FETCH CONTENT
    const response = await fetch(url, {
      headers: { "User-Agent": "PulseSeo-Bot/1.0" },
    });

    if (!response.ok) throw new Error(`Failed to fetch site: ${response.statusText}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);

    $('script, style, nav, footer, svg, iframe, noscript').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000); 

    // Handle empty sites (e.g., purely Javascript sites)
    if (textContent.length < 100) {
        return NextResponse.json({ 
            score: 0, 
            summary: "Could not read content. Site might be blocking bots or using client-side only rendering.",
            keywords: [],
            improvements: ["Enable Server-Side Rendering (SSR)", "Check robots.txt blocks"],
            modelUsed: "Error-Handler"
        });
    }

    console.log("Sending to Gemini...");

    // 3. AI ANALYSIS (The "Strict Auditor" Prompt)
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: seoSchema,
      prompt: `You are a strict Technical SEO Auditor for AI Agents. 
      Do not grade based on how "persuasive" the marketing copy is.
      Grade purely on how EASY it is for an AI (like you) to extract facts.
      
      Website Content:
      "${textContent}"

      URL: ${url}

      CRITICAL SCORING RUBRIC (Deduct points heavily for missing items):
      1. DATA DENSITY (Is there hard data, prices, addresses, or just fluff?): Max 20 pts.
      2. STRUCTURE (Are headers clear? Can I find the main entity immediately?): Max 20 pts.
      3. TRUST SIGNALS (Reviews, phone numbers, real policies): Max 20 pts.
      4. CLARITY (Is the text broken, or clean sentences?): Max 20 pts.
      5. COMPLETENESS (Does it look like a finished site?): Max 20 pts.
      
      TOTAL SCORE = Sum of above.
      
      IMPORTANT: 
      - A "Coming Soon" or empty page MUST score below 30.
      - A page discussing "SEO" does NOT get bonus points just for using SEO keywords.
      - A local business with real address/phone/reviews (like a locksmith) SHOULD score high (70-90).
      
      Return an integer score (0-100).
      `,
    });

    // 4. MATH FAIL-SAFE (Fixes the 0.75 bug)
    // If AI still gives a decimal (e.g. 0.85), multiply it by 100
    let finalScore = object.score;
    if (finalScore < 1 && finalScore > 0) { 
        finalScore = Math.round(finalScore * 100); 
    } else if (finalScore <= 10 && finalScore >= 1) {
        // If it returns a 1-10 score (like 7.5), multiply by 10
        finalScore = Math.round(finalScore * 10); 
    }

    const scanResult = { ...object, score: finalScore, modelUsed: "gemini-2.0-flash" };

    // 5. SAVE TO DB
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
        const { userId } = await auth();
        if (userId) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            await supabase.from("scans").insert({
              url, 
              domain: new URL(url).hostname, 
              score: finalScore, 
              result: scanResult, 
              user_id: userId
            });
        }
    }

    return NextResponse.json(scanResult);

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}