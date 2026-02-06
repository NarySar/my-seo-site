import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google"; // Manual client creation
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

// SETUP GOOGLE AI
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
const google = createGoogleGenerativeAI({ apiKey });

// 1. STRICT RUBRIC SCHEMA
const seoSchema = z.object({
  score: z.number().int().describe("Total score 0-100"),
  summary: z.string().describe("A 2-sentence summary of the page"),
  keywords: z.array(z.string()).describe("Top 5 keywords found"),
  improvements: z.array(z.string()).describe("3 specific actionable tips"),
  reasoning: z.string().describe("Why did you give this score?"), // Added reasoning field
  modelUsed: z.string().optional()
});

export async function POST(req: Request) {
  try {
    if (!apiKey) throw new Error("API Key Missing");

    const { url } = await req.json();
    console.log(`Visiting: ${url}`);

    // ---------------------------------------------------------
    // 2. STEALTH FETCH (The Fix for "20" Score)
    // ---------------------------------------------------------
    const response = await fetch(url, {
      headers: { 
        // Pretend to be a real Chrome browser on a Mac
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch site: ${response.statusText}`);
    
    const html = await response.text();
    const $ = cheerio.load(html);

    // Clean noise
    $('script, style, nav, footer, svg, iframe, noscript').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000); 

    console.log(`Extracted Text Length: ${textContent.length}`);

    // FAIL-SAFE: If blocked, return a specific error
    if (textContent.length < 200) {
        return NextResponse.json({ 
            score: 0, 
            summary: "Access Denied. This website has strong anti-bot protection (Cloudflare/WAF) that blocked our scanner.",
            keywords: [],
            improvements: ["The site is blocking AI agents.", "Check robots.txt settings."],
            reasoning: "Could not read content.",
            modelUsed: "Error-Handler"
        });
    }

    // ---------------------------------------------------------
    // 3. STRICT AI ANALYSIS (Matches your Test Script)
    // ---------------------------------------------------------
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: seoSchema,
      prompt: `You are a Technical SEO Auditor. Grade this website structure for AI Agents.
      
      URL: ${url}
      Content: "${textContent}"

      SCORING RUBRIC (Max 20 pts each):
      1. DATA DENSITY: Does it have hard facts, prices, docs, or addresses?
      2. STRUCTURE: Are headers clear?
      3. TRUST SIGNALS: Real testimonials, case studies, company info?
      4. CLARITY: Simple, clean text?
      5. COMPLETENESS: Is it a full product or just a landing page?

      Total Score = Sum of categories.
      Return an integer score (0-100).
      `,
    });

    // 4. MATH CHECK (Just in case)
    let finalScore = object.score;
    if (finalScore < 1 && finalScore > 0) finalScore = Math.round(finalScore * 100); 
    else if (finalScore <= 10 && finalScore >= 1) finalScore = Math.round(finalScore * 10);

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