import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

// Initialize Google AI & Supabase
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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
// 🤖 AGENT 1: THE ADVANCED SCRAPER & MATH
// ==========================================
async function runMathAgent(url: string) {
  console.log("🧮 Agent 1: Scraping and Calculating Technical Baseline...");
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
  
  // 1. Core Text & Meta
  const title = $('title').text().trim() || "";
  const desc = $('meta[name="description"]').attr('content') || "";
  const h1Count = $('h1').length;
  const h1Text = $('h1').first().text().trim() || "";
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText.split(' ').length;
  
  // 2. Technical Signals
  const hasSchema = html.includes('application/ld+json');
  const hasViewport = $('meta[name="viewport"]').length > 0;
  
  const totalImages = $('img').length;
  const imagesWithoutAlt = $('img:not([alt]), img[alt=""]').length;
  
  let internalLinks = 0;
  let externalLinks = 0;
  $('a').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href.startsWith('http') || href.startsWith('//')) {
      externalLinks++;
    } else if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) {
      internalLinks++;
    }
  });
  const totalLinks = internalLinks + externalLinks;

  // 3. Scoring Math
  const sTitle = scoreTitle(title);
  const sDesc = scoreDescription(desc);
  const sH1 = scoreH1(h1Count, h1Text, isSPA);
  const sWords = scoreWordCount(wordCount, isSPA);
  const sSchema = scoreSchema(hasSchema, isSPA);
  
  const sViewport = hasViewport ? 100 : 0;
  const sImages = totalImages === 0 ? 100 : Math.round(((totalImages - imagesWithoutAlt) / totalImages) * 100);
  const sLinks = totalLinks === 0 ? 30 : (internalLinks > 0 ? 100 : 50);

  // Rebalanced Math Score
  const mathScore = Math.round(
    (sTitle * 0.10) + 
    (sDesc * 0.10) + 
    (sH1 * 0.10) + 
    (sWords * 0.15) + 
    (sSchema * 0.15) + 
    (sViewport * 0.15) + 
    (sImages * 0.15) + 
    (sLinks * 0.10)
  );

  return { 
    url, isSPA, title, bodyText, wordCount, hasSchema, hasViewport, 
    totalImages, imagesWithoutAlt, totalLinks, internalLinks, externalLinks,
    mathScore, scores: { sTitle, sDesc, sH1, sWords, sSchema, sViewport, sImages, sLinks } 
  };
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
    console.error("⚠️ Gemini Agent Failed, bypassing semantic analysis:", error);
    return "Semantic analysis unavailable due to timeout. Rely solely on the math baseline score.";
  }
}

// ==========================================
// 🤖 AGENT 3: OPENAI JUDGE (WITH RAG)
// ==========================================
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function runOpenAIAgent(mathData: any, geminiAnalysis: string, rubricText: string) {
  console.log("👨‍⚖️ Agent 3: OpenAI finalizing Agentic JSON using RAG Rubric...");
  const payload = `
    Site: ${mathData.url} (SPA: ${mathData.isSPA})
    MATH BASELINE SCORE: ${mathData.mathScore}/100
    
    CONTENT METRICS:
    Title Quality: ${mathData.scores.sTitle}/100
    Description Quality: ${mathData.scores.sDesc}/100
    Structure (H1): ${mathData.scores.sH1}/100
    Data Density (Words): ${mathData.wordCount} words (${mathData.scores.sWords}/100)
    
    TECHNICAL METRICS:
    Mobile Viewport Tag: ${mathData.hasViewport ? "Present" : "Missing"} (${mathData.scores.sViewport}/100)
    Image Alt Text: ${mathData.totalImages} total images, ${mathData.imagesWithoutAlt} missing alt text (${mathData.scores.sImages}/100)
    Links: ${mathData.totalLinks} total (${mathData.internalLinks} internal, ${mathData.externalLinks} external) (${mathData.scores.sLinks}/100)
    Trust (Schema): ${mathData.hasSchema ? "Present" : "Missing"} (${mathData.scores.sSchema}/100)
    
    GEMINI SEMANTIC ANALYSIS:
    "${geminiAnalysis}"
  `;

  const { object } = await generateObject({
    model: openai("gpt-4o-mini", { structuredOutputs: false }),
    mode: "json",
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
    
    CRITICAL GRADING RUBRIC (FOLLOW EXACTLY):
    ${rubricText}
    
    Your job:
    1. Output the final 'score' as a number between 0 and 100 based on the Math Score and the Rubric.
    2. Write a professional 3-sentence summary adhering to the Rubric's tone guidelines. Factor in the new technical metrics (Mobile, Images, Links).
    3. Fill out the 'breakdown' object using EXACTLY these keys: 'dataDensity', 'structure', 'trust', 'clarity', 'completeness'.
    CRITICAL: The breakdown values MUST be pure integers (e.g., 85). DO NOT use strings or fractions like "85/100".
    4. Provide 3 actionable 'improvements' based on the Rubric rules and technical errors (like missing alt text or mobile viewports).`,
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
    // 🚀 STEP 1: PARALLEL EXECUTION (Scrape the site AND fetch the rubric at the same time)
    console.log("📚 Fetching data...");
    const [rubricResponse, mathData] = await Promise.all([
      supabase.from('rubric').select('content').eq('id', 1).single(),
      runMathAgent(url)
    ]);
    
    const rubricText = rubricResponse.data?.content || "Grade strictly based on standard SEO best practices.";

    // Step 2: Run Gemini 
    const geminiAnalysis = await runGeminiAgent(mathData.title, mathData.bodyText);

    // Step 3: Run OpenAI Judge (Injecting the RAG Rubric & Technical Data)
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const finalData = await runOpenAIAgent(mathData, geminiAnalysis, rubricText) as any;

    console.log(`✅ Pipeline Complete! Math: ${mathData.mathScore} -> Final AI Score: ${finalData.score}`);

    return {
      score: finalData.score,
      crawlable: mathData.wordCount > 50 || mathData.isSPA,
      wordCount: mathData.isSPA ? 1500 : mathData.wordCount,
      hasSchema: mathData.hasSchema,
      summary: finalData.summary,
      breakdown: finalData.breakdown,
      improvements: finalData.improvements,
      modelUsed: "Tri-Engine Orchestrator (Math -> Gemini -> OpenAI + RAG Rubric)",
    };

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Scan failed";
    console.error("🔥 Orchestrator Error:", msg);
    throw new Error(msg);
  }
}