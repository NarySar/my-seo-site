import { NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google"; // CHANGED: specific import
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

// 1. SETUP GOOGLE AI MANUALLY
// This checks BOTH names so it works no matter what you named it in Vercel
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

const google = createGoogleGenerativeAI({
  apiKey: apiKey,
});

const seoSchema = z.object({
  score: z.number().describe("A generic SEO score from 0 to 100 based on content quality"),
  summary: z.string().describe("A 2-sentence summary of what the page is about"),
  keywords: z.array(z.string()).describe("Top 5 keywords found on the page"),
  improvements: z.array(z.string()).describe("3 specific actionable tips to improve SEO"),
  modelUsed: z.string().optional()
});

export async function POST(req: Request) {
  try {
    // Debug: Check if key exists (Don't log the actual key for security!)
    if (!apiKey) {
      console.error("❌ FATAL ERROR: No API Key found in Environment Variables!");
      throw new Error("Server Misconfiguration: API Key Missing");
    } else {
      console.log("✅ API Key found. Length:", apiKey.length);
    }

    const { url } = await req.json();
    console.log(`Visiting: ${url}`);

    // 2. Fetch Website Content
    const response = await fetch(url, {
      headers: { "User-Agent": "PulseSeo-Bot/1.0" },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch site: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    $('script, style, nav, footer, svg').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 15000); 

    console.log("Sending to Gemini...");

    // 3. AI Analysis
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"), // Use the manually created provider
      schema: seoSchema,
      prompt: `Analyze this website content for Agentic SEO.
      URL: ${url}
      Content: ${textContent}
      `,
    });

    const scanResult = { ...object, modelUsed: "gemini-2.0-flash" };
    const aiScore = scanResult.score || 0;

    // 4. Save to Database
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
        const { userId } = await auth();
        if (userId) {
            const supabase = createClient(supabaseUrl, supabaseKey);
            await supabase.from("scans").insert({
              url, 
              domain: new URL(url).hostname, 
              score: aiScore, 
              result: scanResult, 
              user_id: userId
            });
            console.log("✅ Saved to DB");
        }
    }

    return NextResponse.json(scanResult);

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    // Send the REAL error to the frontend so we can see it
    return NextResponse.json({ error: error.message || "Scan failed" }, { status: 500 });
  }
}