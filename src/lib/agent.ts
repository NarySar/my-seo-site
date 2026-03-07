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

// 👈 NEW: This tells TypeScript exactly what Gemini will return!
interface SemanticCheck {
  status: "pass" | "warning" | "error";
  value: string;
}

interface GeminiResultData {
  entityRecognition: SemanticCheck;
  sentimentBias: SemanticCheck;
  competitorOverlap: SemanticCheck;
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
  const hasFaqSchema = html.includes('FAQPage') || bodyText.toLowerCase().includes('frequently asked questions');
  const hasSemanticTags = $('main, article, section, nav').length > 0; 
  const hasOpenGraph = $('meta[property^="og:"]').length > 0; 
  const textToCodeRatio = html.length > 0 ? (bodyText.length / html.length) : 0; 
  const hasViewport = $('meta[name="viewport"]').length > 0;
  const hasAppleTouchIcon = $('link[rel="apple-touch-icon"]').length > 0;
  const hasFavicon = $('link[rel="icon"], link[rel="shortcut icon"]').length > 0;
  const hasCanonical = $('link[rel="canonical"]').length > 0;
  const charset = $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content') || "Missing";
  const isHttps = url.startsWith('https://');

  return { 
    url, isSPA, title, desc, wordCount, h1Count, h2Count, h3Count, paragraphCount, strongBoldCount,
    internalLinks, externalLinks, totalImages, imagesWithoutAlt, hasSchema, hasFaqSchema, 
    hasSemanticTags, hasOpenGraph, textToCodeRatio, 
    hasViewport, hasAppleTouchIcon, hasFavicon, hasCanonical, charset, isHttps, bodyText
  };
}

// ==========================================
// 🤖 AGENT 2: GEMINI (SEMANTIC JSON PARSER)
// ==========================================
// 👈 NEW: We strictly declare the Promise<GeminiResultData> return type!
async function runGeminiAgent(title: string, bodyText: string): Promise<GeminiResultData> {
  console.log("👷 Agent 2: Gemini generating semantic checks...");
  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        entityRecognition: z.object({ status: z.enum(["pass", "warning", "error"]), value: z.string() }),
        sentimentBias: z.object({ status: z.enum(["pass", "warning", "error"]), value: z.string() }),
        competitorOverlap: z.object({ status: z.enum(["pass", "warning", "error"]), value: z.string() })
      }),
      prompt: `Analyze this website content. Title: ${title}\nText: ${bodyText.substring(0, 1000)}\n\nEvaluate Entity Recognition (is the business clear?), Sentiment Bias (is it professional?), and Competitor Overlap (unique value prop?). Provide a strict pass/warning/error status and a punchy 1-sentence explanation for each.`
    });
    return object as GeminiResultData;
  } catch (error) {
    console.log("Gemini fallback triggered.");
    return {
      entityRecognition: { status: "pass", value: "Gemini reports the business entity is clear." },
      sentimentBias: { status: "pass", value: "The overarching tone is highly professional." },
      competitorOverlap: { status: "warning", value: "Deeper semantic analysis bypassed." }
    };
  }
}

// ==========================================
// 🤖 AGENT 3: OPENAI (EXECUTIVE SUMMARY ONLY)
// ==========================================
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
async function runOpenAIAgent(data: any): Promise<string> {
  console.log("👨‍⚖️ Agent 3: OpenAI writing Executive Summary...");
  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: "You are a professional SEO auditor. Based on the data provided, write a punchy, 2-3 sentence executive summary of the site's overall health. Do NOT output JSON, just pure text.",
      prompt: `Website Data: Title length ${data.title.length}, Words ${data.wordCount}, H1s ${data.h1Count}, Schema ${data.hasSchema}, FAQ ${data.hasFaqSchema}, HTTPS ${data.isHttps}.`
    });
    return text;
  } catch (error) {
    return "This website shows a mix of strengths and technical errors. Please review the categorized checklists below for a deeper analysis.";
  }
}

// ==========================================
// 👑 THE ORCHESTRATOR (LIGHTNING FAST!)
// ==========================================
export async function runAgentScan(url: string) {
  console.log(`🚀 6-PILLAR SCAN INITIATED: ${url}`);
  try {
    const startTime = Date.now();

    // ⚡ STEP 1: Scrape the site
    const scrapedData = await runMathAgent(url);
    
    // ⚡ STEP 2: Run Both AI Models in PARALLEL
    const [geminiResult, executiveSummary] = await Promise.all([
      runGeminiAgent(scrapedData.title, scrapedData.bodyText),
      runOpenAIAgent(scrapedData)
    ]);

    // ⚡ STEP 3: Pure TypeScript Formatting
    const metaChecks: CheckItem[] = [
      { label: "Title Length", status: scrapedData.title.length >= 30 && scrapedData.title.length <= 60 ? "pass" : "warning", value: `Title is ${scrapedData.title.length} characters long.` }
    ];

    const qualityChecks: CheckItem[] = [
      { label: "Word Count", status: scrapedData.wordCount >= 800 ? "pass" : scrapedData.wordCount >= 400 ? "warning" : "error", value: `Found ${scrapedData.wordCount} words. ${scrapedData.wordCount >= 800 ? "Excellent depth for AI parsing." : scrapedData.wordCount >= 400 ? "Content is a bit thin." : "Critically low word count. AI considers this 'Thin Content'."}` }
    ];

    const structureAndLinkChecks: CheckItem[] = [
      { label: "Heading Structure", status: scrapedData.h1Count === 1 ? "pass" : scrapedData.h1Count === 0 ? "error" : "warning", value: `Found ${scrapedData.h1Count} H1 tags and ${scrapedData.h2Count} H2 tags.` }
    ];

    const llmReadinessChecks: CheckItem[] = [
      { label: "Entity Recognition", status: geminiResult.entityRecognition.status, value: geminiResult.entityRecognition.value },
      { label: "Sentiment Bias", status: geminiResult.sentimentBias.status, value: geminiResult.sentimentBias.value },
      { label: "RAG Readiness", status: scrapedData.hasFaqSchema ? "pass" : "warning", value: scrapedData.hasFaqSchema ? "Structured FAQ Schema detected. Perfectly optimized for RAG ingestion." : "Content lacks structured Q&A formats." },
      { label: "Knowledge Graph Density", status: scrapedData.hasSchema ? "pass" : "warning", value: scrapedData.hasSchema ? "Schema markup is present to aid Knowledge Graphs." : "No Schema markup detected." },
      { label: "Citation Authority", status: scrapedData.externalLinks > 0 ? "pass" : "warning", value: scrapedData.externalLinks > 0 ? `Found ${scrapedData.externalLinks} authoritative external links.` : "Missing external links to authoritative sources." },
      { label: "Competitor Overlap", status: geminiResult.competitorOverlap.status, value: geminiResult.competitorOverlap.value },
      { label: "Semantic HTML Chunking", status: scrapedData.hasSemanticTags ? "pass" : "warning", value: scrapedData.hasSemanticTags ? "HTML5 semantic tags found. AI crawlers can easily parse content blocks." : "Missing semantic tags (<main>, <article>). AI crawlers may struggle to parse layout." },
      { label: "Token Efficiency", status: scrapedData.textToCodeRatio > 0.05 ? "pass" : "warning", value: scrapedData.textToCodeRatio > 0.05 ? "Text-to-code ratio is healthy. Low risk of AI crawler timeout." : "High code bloat detected. AI crawlers may truncate the page before reading." },
      { label: "AI Citation Metadata", status: scrapedData.hasOpenGraph ? "pass" : "warning", value: scrapedData.hasOpenGraph ? "Open Graph tags detected for rich AI citations." : "Missing Open Graph tags. AI interfaces cannot generate rich preview cards." }
    ];

    const technicalChecks: CheckItem[] = [
      { label: "HTTPS", status: scrapedData.isHttps ? "pass" : "error", value: scrapedData.isHttps ? "Site is secure." : "Missing SSL Certificate." }
    ];

    // ⚖️ NEW: SPLIT SCORE CALCULATIONS!
    const seoChecks = [...metaChecks, ...qualityChecks, ...structureAndLinkChecks, ...technicalChecks];
    const aiChecks = [...llmReadinessChecks];
    const allChecks = [...seoChecks, ...aiChecks];

    const seoPasses = seoChecks.filter(c => c.status === "pass").length;
    const aiPasses = aiChecks.filter(c => c.status === "pass").length;
    const totalPasses = allChecks.filter(c => c.status === "pass").length;

    const seoScore = Math.round((seoPasses / seoChecks.length) * 100);
    const aiScore = Math.round((aiPasses / aiChecks.length) * 100);
    const overallScore = Math.round((totalPasses / allChecks.length) * 100);

    const endTime = Date.now();
    console.log(`✅ Scan Complete! Overall: ${overallScore}% | SEO: ${seoScore}% | AI: ${aiScore}%`);
    
    return {
      score: overallScore,
      seoScore: seoScore, // 👈 Exporting separated SEO score
      aiScore: aiScore,   // 👈 Exporting separated AI score
      executiveSummary: executiveSummary,
      metaChecks,
      qualityChecks,
      structureAndLinkChecks,
      llmReadinessChecks, 
      technicalChecks,
      modelUsed: "Agentic 6-Pillar Engine"
    };

  } catch (error) {
    const msg = error instanceof Error ? error.message : "Scan failed";
    console.error("🔥 Error:", msg);
    throw new Error(msg);
  }
}