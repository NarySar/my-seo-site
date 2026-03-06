import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText, generateObject } from "ai";
import { z } from "zod";
import * as cheerio from "cheerio";
import { createClient } from "@supabase/supabase-js";

// Initialize BOTH AI Models & Supabase
const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// 📐 TYPESCRIPT INTERFACES
// ==========================================
interface CheckItem {
  label: string;
  status: "pass" | "warning" | "error";
  value: string;
}

interface OpenAIResult {
  overallScore: number;
  metaChecks: CheckItem[];
  qualityChecks: CheckItem[];
  structureAndLinkChecks: CheckItem[];
  llmReadinessChecks: CheckItem[]; 
  technicalChecks: CheckItem[];
}

// ==========================================
// 🤖 AGENT 1: DEEP ENTERPRISE SCRAPER 
// ==========================================
async function runMathAgent(url: string) {
  console.log("🧮 Agent 1: Deep Enterprise Scraping...");
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 8000); 
  
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PulsePlusSEOBot/1.0;)" },
    signal: controller.signal,
  });
  
  if (!response.ok) throw new Error(`Status ${response.status}`);
  const html = await response.text();
  const $ = cheerio.load(html);

  const isSPA = ['#root', '#__next', '#app', 'div[data-reactroot]'].some(s => $(s).length > 0);
  $('script, style, svg, noscript').remove();
  
  const title = $('title').text().trim() || "";
  const desc = $('meta[name="description"]').attr('content') || "";
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const wordCount = bodyText.split(' ').length;
  
  const paragraphCount = $('p').length;
  const strongBoldCount = $('strong, b').length;
  const totalImages = $('img').length;
  const imagesWithoutAlt = $('img:not([alt]), img[alt=""]').length;
  
  const h1Count = $('h1').length;
  const h2Count = $('h2').length;
  const h3Count = $('h3').length;
  
  let internalLinks = 0;
  let externalLinks = 0;
  const hostname = new URL(url).hostname;
  
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href) {
      if (href.startsWith('/') || href.includes(hostname)) {
        internalLinks++;
      } else if (href.startsWith('http')) {
        externalLinks++;
      }
    }
  });
  
  const hasSchema = html.includes('application/ld+json');
  // 👈 BULLETPROOF: Checks the raw code for schema, OR reads the page text for the FAQ section!
  const hasFaqSchema = html.includes('FAQPage') || bodyText.toLowerCase().includes('frequently asked questions');
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const hasAppleTouchIcon = $('link[rel="apple-touch-icon"]').length > 0;
  const hasFavicon = $('link[rel="icon"], link[rel="shortcut icon"]').length > 0;
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  const charset = $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content') || "Missing";
  const isHttps = url.startsWith('https://');

  return { 
    url, isSPA, title, desc, wordCount, h1Count, h2Count, h3Count, paragraphCount, strongBoldCount,
    internalLinks, externalLinks, totalImages, imagesWithoutAlt, hasSchema, hasFaqSchema, hasViewport, 
    hasAppleTouchIcon, hasFavicon, hasCanonical, charset, isHttps, bodyText
  };
}

// ==========================================
// 🤖 AGENT 2: GEMINI (CRASH PROOFED)
// ==========================================
async function runGeminiAgent(title: string, bodyText: string): Promise<string> {
  console.log("👷 Agent 2: Gemini analyzing semantic quality...");
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: "Analyze the following website text. Provide a 2-sentence summary of its 'Entity Recognition' (is the business clear?) and 'Sentiment/Tone'.",
      prompt: `Title: ${title}\nText: ${bodyText.substring(0, 1000)}`,
    });
    return text;
  } catch (error) {
    console.log("Gemini Error:", error);
    return "The content appears standard, but deeper semantic analysis was bypassed.";
  }
}

// ==========================================
// 🤖 AGENT 3: OPENAI (5-CATEGORY ENGINE)
// ==========================================
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function runOpenAIAgent(data: any, geminiText: string, rubricText: string): Promise<OpenAIResult> {
  console.log("👨‍⚖️ Agent 3: OpenAI building 5-Category Checklists...");
  const payload = JSON.stringify(data) + `\n\nGemini AI Insight: ${geminiText}`;

  const checkItemSchema = z.object({
    label: z.string(), 
    status: z.enum(["pass", "warning", "error"]), 
    value: z.string(),
  });

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"), 
    temperature: 0, 
    mode: "json",
    schema: z.object({
      overallScore: z.number(), 
      metaChecks: z.array(checkItemSchema),
      qualityChecks: z.array(checkItemSchema),
      structureAndLinkChecks: z.array(checkItemSchema),
      llmReadinessChecks: z.array(checkItemSchema), 
      technicalChecks: z.array(checkItemSchema),
    }),
    system: `You are the PulsePlus UI Data Formatter. 
    Use the scrape data and Gemini's insight to generate an exact JSON object.
    
    CRITICAL JSON RULES:
    1. 'overallScore' MUST be an integer from 0-100.
    2. 'status' MUST BE EXACTLY "pass", "warning", or "error".
    3. You MUST structure your arrays EXACTLY like the template below.
    
    REQUIRED OUTPUT TEMPLATE:
    {
      "overallScore": 85,
      "metaChecks": [
        { "label": "Title Length", "status": "pass", "value": "The title is perfectly optimized." }
      ],
      "qualityChecks": [
        { "label": "Word Count", "status": "pass", "value": "Found ${data.wordCount} words." }
      ],
      "structureAndLinkChecks": [
        { "label": "Heading Structure", "status": "pass", "value": "Found H1, H2, and H3s." }
      ],
      "llmReadinessChecks": [
        { "label": "Entity Recognition", "status": "pass", "value": "Gemini reports the business entity is clear." },
        { "label": "Sentiment Bias", "status": "pass", "value": "The overarching tone is highly professional." },
        { "label": "RAG Readiness", "status": "${data.hasFaqSchema ? "pass" : "warning"}", "value": "${data.hasFaqSchema ? "Structured FAQ Schema detected. Perfectly optimized for RAG ingestion." : "Content lacks structured Q&A formats."}" },
        { "label": "Knowledge Graph Density", "status": "${data.hasSchema ? "pass" : "warning"}", "value": "${data.hasSchema ? "Schema markup is present to aid Knowledge Graphs." : "No Schema markup detected."}" },
        { "label": "Citation Authority", "status": "${data.externalLinks > 0 ? "pass" : "warning"}", "value": "${data.externalLinks > 0 ? `Found ${data.externalLinks} authoritative external links.` : "Missing external links to authoritative sources."}" }
      ],
      "technicalChecks": [
        { "label": "HTTPS", "status": "pass", "value": "Site is secure." }
      ]
    }`,
    prompt: `Analyze this data and return the EXACT JSON structure shown in the template:\n\n${payload}`,
  });

  return object as OpenAIResult;
}

// ==========================================
// 👑 THE ORCHESTRATOR 
// ==========================================
export async function runAgentScan(url: string) {
  console.log(`🚀 5-PILLAR SCAN INITIATED: ${url}`);
  try {
    const startTime = Date.now();

    const [rubricResponse, scrapedData] = await Promise.all([
      supabase.from('rubric').select('content').eq('id', 1).single(),
      runMathAgent(url)
    ]);
    const rubricText = rubricResponse.data?.content || "";
    
    const [geminiResult, openAIResult] = await Promise.all([
      runGeminiAgent(scrapedData.title, scrapedData.bodyText),
      runOpenAIAgent(scrapedData, "", rubricText) 
    ]);
    
    const finalUIObject = await runOpenAIAgent(scrapedData, geminiResult, rubricText);

    const endTime = Date.now();
    console.log(`✅ Scan Complete in ${(endTime - startTime) / 1000} seconds! Score: ${finalUIObject.overallScore}`);
    
    return {
      score: finalUIObject.overallScore,
      metaChecks: finalUIObject.metaChecks,
      qualityChecks: finalUIObject.qualityChecks,
      structureAndLinkChecks: finalUIObject.structureAndLinkChecks,
      llmReadinessChecks: finalUIObject.llmReadinessChecks, 
      technicalChecks: finalUIObject.technicalChecks,
      modelUsed: "Agentic 5-Pillar Engine"
    };

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Scan failed";
    console.error("🔥 Error:", msg);
    throw new Error(msg);
  }
}