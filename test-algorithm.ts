import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testScan(url: string) {
  console.log(`\n🔍 Testing URL: ${url}`);
  
  try {
    const response = await fetch(url, { headers: { "User-Agent": "PulseSeo-Bot/1.0" } });
    const html = await response.text();
    const $ = cheerio.load(html);
    $('script, style, nav, footer, svg, iframe, noscript').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 20000);
    
    console.log(`📄 Extracted Text: ${textContent.length} chars`);

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    const google = createGoogleGenerativeAI({ apiKey });

    // 1. STRICT RUBRIC PROMPT
    const { object } = await generateObject({
      model: google("gemini-2.0-flash"),
      schema: z.object({
        score: z.number().int(),
        breakdown: z.object({
            data_density: z.number().describe("0-20 pts"),
            structure: z.number().describe("0-20 pts"),
            trust_signals: z.number().describe("0-20 pts"),
            clarity: z.number().describe("0-20 pts"),
            completeness: z.number().describe("0-20 pts"),
        }),
        reasoning: z.string(),
      }),
      prompt: `You are a Technical Auditor. Grade this website structure for AI Agents.
      
      URL: ${url}
      Content: "${textContent}"

      SCORING RUBRIC (Max 20 pts each):
      1. DATA DENSITY: Does it have hard facts, prices, docs, or addresses? (CrewAI has docs/pricing = High. PulseSEO has marketing text = Low).
      2. STRUCTURE: Are headers clear?
      3. TRUST: Real testimonials, case studies, company info?
      4. CLARITY: Simple, clean text?
      5. COMPLETENESS: Is it a full product or just a landing page?

      Total Score = Sum of categories.
      `,
    });

    console.log("\n✅ AI Result:");
    console.log(JSON.stringify(object, null, 2));

  } catch (error) {
    console.error("❌ Error:", error);
  }
}

// TEST BOTH
// Run one, then comment it out and run the other to compare
// testScan("https://www.crewai.com/");
testScan("https://citylocksmith247.com/");