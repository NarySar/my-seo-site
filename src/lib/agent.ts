import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";

// 1. Initialize Google AI
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// 2. Define the Schema (What the AI must return)
const seoSchema = z.object({
  score: z.number().min(0).max(100),
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

// 3. THE REUSABLE FUNCTION
export async function runAgentScan(url: string) {
  console.log(`🤖 AGENT RUNNING: ${url}`);

  // A. Fetch & Clean HTML
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1)" },
    redirect: "follow",
  });

  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

  const html = await response.text();
  const $ = cheerio.load(html);
  
  // Remove scripts/styles to clean up the text
  $('script, style, nav, footer, svg, noscript').remove();

  // B. Extract Data
  // ✅ FIX: We create 'h1', and now we USE it in the prompt below.
  const h1 = $('h1').first().text().trim() || "No H1 Found";
  const title = $('title').text().trim() || "No Title";
  
  // Grab the first 20,000 characters of text
  const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000);

  // C. AI Analysis
  const { object } = await generateObject({
    model: google("gemini-2.0-flash"),
    schema: seoSchema,
    temperature: 0,
    prompt: `Analyze this SEO content strictly for Agentic Visibility (how well AI understands it).

    URL: ${url}
    Title: ${title}
    H1 Tag: ${h1}  <-- ✅ FIX: Added this line so 'h1' is used!
    
    Content Preview: 
    ${textContent.substring(0, 15000)}

    RUBRIC:
    - Data Density: Reward specific numbers, facts, and tables.
    - Structure: Reward proper H1/H2 usage.
    - Clarity: Penalize fluff.
    `,
  });

  return object;
}