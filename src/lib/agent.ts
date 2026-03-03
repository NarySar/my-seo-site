import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";

// Initialize Google AI
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

// --- THE MATH ENGINE BASELINE (Helper Functions) ---
function scoreTitle(title: string) {
  const len = title.trim().length;
  if (len === 0) return 0;
  if (len < 10) return 60; 
  if (len <= 60) return 100;
  if (len <= 80) return 80;
  return 60;
}

function scoreDescription(desc: string) {
  const len = desc.trim().length;
  if (len === 0) return 0;
  if (len < 50) return 60;
  if (len <= 160) return 100;
  return 70;
}

function scoreH1(h1Count: number, h1Text: string, isSPA: boolean) {
  if (isSPA && h1Count === 0) return 100; 
  if (h1Count === 0) return 0;
  if (h1Count > 1) return 50; 
  if (h1Text.length < 5) return 40; 
  return 100;
}

function scoreWordCount(words: number, isSPA: boolean) {
  if (isSPA && words < 200) return 100;
  if (words < 200) return 20; 
  if (words < 600) return 60; 
  if (words < 1200) return 85; 
  return 100; 
}

function scoreSchema(hasSchema: boolean, isSPA: boolean) {
  if (isSPA && !hasSchema) return 70;
  return hasSchema ? 100 : 0;
}

// ==========================================
// 🤖 AGENT 1: THE SCRAPER & MATH CALCULATOR
// ==========================================
async function runMathAgent(url: string) {
  console.log("🧮 Agent 1: Scraping and Calculating Math Baseline...");
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10000); 
  
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PulsePlusSEOBot/1.0;)" },
    signal: controller.signal,
  });
  
  if (!response.ok) throw new Error(`Status ${response.status}`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const spaMarkers = ['#root', '#__next', '#app', 'div[data-reactroot]'];
  const isSPA = spaMarkers.some(s => $(s).length > 0);
  $('script, style, svg, noscript').remove();
  
  const title = $('title').text().trim() || "";
  const desc = $('meta[name="description"]').attr('content') || "";
  const h1Count = $('h1').length;
  const h1Text = $('h1').first().text().trim() || "";
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText.split(' ').length;
  const hasSchema = html.includes('application/ld+json');

  const sTitle = scoreTitle(title);
  const sDesc = scoreDescription(desc);
  const sH1 = scoreH1(h1Count, h1Text, isSPA);
  const sWords = scoreWordCount(wordCount, isSPA);
  const sSchema = scoreSchema(hasSchema, isSPA);

  const mathScore = Math.round((sTitle * 0.2) + (sDesc * 0.2) + (sH1 * 0.2) + (sWords * 0.2) + (sSchema * 0.2));

  return { url, isSPA, title, bodyText, wordCount, hasSchema, mathScore, scores: { sTitle, sDesc, sH1, sWords, sSchema } };
}

// ==========================================
// 🤖 AGENT 2: GEMINI SEMANTIC ANALYSIS
// ==========================================
async function runGeminiAgent(title: string, bodyText: string) {
  console.log("👷 Agent 2: Gemini analyzing semantic quality...");
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: "You are an AI data quality rater. Read the website text and summarize the core business. Then, state if the content is clear and high-quality for LLMs, or if it is confusing/spammy.",
      prompt: `Title: ${title}\nText Snippet: ${bodyText.substring(0, 2000)}`,
    });
    return text;
  } catch (error) {
    // 🛡️ SAFETY NET: If Gemini crashes, we gracefully catch it and keep going!
    console.error("⚠️ Gemini Agent Failed, bypassing semantic analysis:", error);
    return "Semantic analysis unavailable due to timeout. Rely solely on the math baseline score.";
  }
}

// ==========================================
// 🤖 AGENT 3: OPENAI JUDGE
// ==========================================
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function runOpenAIAgent(mathData: any, geminiAnalysis: string) {
  console.log("👨‍⚖️ Agent 3: OpenAI finalizing Agentic JSON...");
  const payload = `
    Site: ${mathData.url} (SPA: ${mathData.isSPA})
    MATH BASELINE SCORE: ${mathData.mathScore}/100
    Title Quality: ${mathData.scores.sTitle}/100
    Description Quality: ${mathData.scores.sDesc}/100
    Structure (H1): ${mathData.scores.sH1}/100
    Data Density (Words): ${mathData.scores.sWords}/100
    Trust (Schema): ${mathData.scores.sSchema}/100
    
    GEMINI SEMANTIC ANALYSIS:
    "${geminiAnalysis}"
  `;

  const { object } = await generateObject({
    model: openai("gpt-4o-mini", { structuredOutputs: false }),
    mode: "json", // 👈 Bypasses the Tool Calling crash
    schema: z.object({
      score: z.number(),
      summary: z.string(),
      breakdown: z.object({
        dataDensity: z.number(),
        structure: z.number(),
        trust: z.number(),
        clarity: z.number(),
        completeness: z.number(),
      }),
      improvements: z.array(z.string()),
    }),
    system: `You are the final PulsePlusSEO Judge. You will receive a mathematically calculated Baseline Score and a Semantic Analysis from Gemini.
    Your job:
    1. Output the final 'score' as a number between 0 and 100. You can adjust the Math Baseline Score by a maximum of +/- 10 points based on Gemini's analysis.
    2. Write a professional 3-sentence summary.
    3. Fill out the 'breakdown' object using EXACTLY these keys: 'dataDensity', 'structure', 'trust', 'clarity', 'completeness'.
    4. Provide 3 actionable 'improvements'.`,
    prompt: `Finalize the audit based on this data:\n\n${payload}`,
  });

  return object;
}

// ==========================================
// 👑 THE ORCHESTRATOR (Main Function)
// ==========================================
export async function runAgentScan(url: string) {
  console.log(`🚀 MULTI-AGENT ORCHESTRATION INITIATED: ${url}`);
  
  try {
    // Step 1: Scrape & Math
    const mathData = await runMathAgent(url);

    // Step 2: Run Gemini (Protected by safety net)
    const geminiAnalysis = await runGeminiAgent(mathData.title, mathData.bodyText);

    // Step 3: Run OpenAI Judge
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const finalData = await runOpenAIAgent(mathData, geminiAnalysis) as any;

    console.log(`✅ Pipeline Complete! Math: ${mathData.mathScore} -> Final AI Score: ${finalData.score}`);

    return {
      score: finalData.score,
      crawlable: mathData.wordCount > 50 || mathData.isSPA,
      wordCount: mathData.isSPA ? 1500 : mathData.wordCount,
      hasSchema: mathData.hasSchema,
      summary: finalData.summary,
      breakdown: finalData.breakdown,
      improvements: finalData.improvements,
      modelUsed: "Tri-Engine Orchestrator (Math -> Gemini -> OpenAI)",
    };

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Scan failed";
    console.error("🔥 Orchestrator Error:", msg);
    throw new Error(msg);
  }
}