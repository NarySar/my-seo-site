import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";

// Initialize AI
const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY });

// The Schema (Same as before)
const seoSchema = z.object({
  score: z.number().int().min(0).max(100),
  breakdown: z.object({
    dataDensity: z.number(),
    structure: z.number(),
    trust: z.number(),
    clarity: z.number(),
    completeness: z.number(),
  }),
  summary: z.string(),
  keywords: z.array(z.string()),
  improvements: z.array(z.string()),
  mainHeadline: z.string(),
});

// THE REUSABLE FUNCTION
export async function runAgentScan(url: string) {
  console.log(`🤖 AGENT RUNNING: ${url}`);

  // 1. Fetch & Clean HTML
  const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
      redirect: 'follow',
  });
  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
  
  const html = await response.text();
  const $ = cheerio.load(html);
  $('script, style, nav, footer, svg, noscript').remove();
  
  let h1 = $('h1').first().text().trim();
  const title = $('title').text().trim() || "No Title";
  const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000);

  // 2. AI Analysis
  const { object } = await generateObject({
    model: google("gemini-2.0-flash"),
    schema: seoSchema,
    temperature: 0,
    prompt: `Analyze this SEO content strictly.
    URL: ${url}
    Title: ${title}
    Content: ${textContent.substring(0, 15000)}
    
    RUBRIC:
    - Data Density: Reward specific numbers/facts.
    - Structure: Reward H1/H2 usage.
    - Trust: Reward contact info/reviews.
    - Clarity: Reward simple language.
    `,
  });

  return { ...object, score: Math.round(object.score) };
}