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

const seoSchema = z.object({
  score: z.number().int(),
  summary: z.string(),
  keywords: z.array(z.string()),
  improvements: z.array(z.string()),
  reasoning: z.string(),
  modelUsed: z.string().optional()
});

export async function POST(req: Request) {
  try {
    if (!apiKey) throw new Error("API Key Missing");

    const { url } = await req.json();
    console.log(`Visiting: ${url}`);

    let textContent = "";
    
    // ---------------------------------------------------------
    // 1. FETCH WITH "REAL BROWSER" HEADERS
    // ---------------------------------------------------------
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 
            // Pretend we came from Google
            "Referer": "https://www.google.com/",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "cross-site",
            "Upgrade-Insecure-Requests": "1"
          },
          redirect: 'follow', // Explicitly follow redirects
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);
        
        const html = await response.text();
        const $ = cheerio.load(html);

        $('script, style, nav, footer, svg, iframe, noscript').remove();
        textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000); 

    } catch (fetchError: any) {
        console.error("⚠️ FETCH ERROR:", fetchError.message);
        
        // ---------------------------------------------------------
        // 2. GRACEFUL FAILURE (Don't Crash the App!)
        // ---------------------------------------------------------
        return NextResponse.json({ 
            score: 0, 
            summary: "Protected Site Detected. We could not scan this URL because it has advanced bot protection (like Cloudflare) that blocks data center traffic.",
            keywords: ["Security", "Firewall", "Bot Protection"],
            improvements: ["This site blocks AI scanners.", "Try scanning a different site."],
            reasoning: `Technical Error: ${fetchError.message || "Connection blocked"}`,
            modelUsed: "Error-Handler"
        });
    }

    if (textContent.length < 200) {
        return NextResponse.json({ 
            score: 10, 
            summary: "Content Hidden. The site loaded, but the content was hidden by JavaScript or a security challenge.",
            keywords: [],
            improvements: ["Site requires JavaScript rendering.", "Check robots.txt"],
            reasoning: "Extracted less than 200 characters of text.",
            modelUsed: "Error-Handler"
        });
    }

    // ---------------------------------------------------------
    // 3. AI ANALYSIS
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

    let finalScore = object.score;
    if (finalScore < 1 && finalScore > 0) finalScore = Math.round(finalScore * 100); 
    else if (finalScore <= 10 && finalScore >= 1) finalScore = Math.round(finalScore * 10);

    const scanResult = { ...object, score: finalScore, modelUsed: "gemini-2.0-flash" };

    // 4. SAVE TO DB
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