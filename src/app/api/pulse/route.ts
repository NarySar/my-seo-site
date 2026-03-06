/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const maxDuration = 30;

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Upstash Redis & Rate Limiter
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create the Rate Limiter: Allows 5 requests per 10 seconds per IP
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
});

export async function POST(req: Request) {
  try {
    // --- 1. THE BOUNCER (Rate Limiting) ---
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      console.warn(`🚨 Rate limit exceeded for IP: ${ip}`);
      return new Response("Too many requests. Please slow down and try again in a moment.", {
        status: 429,
        headers: { "Content-Type": "text/plain" }
      });
    }

    const { messages } = await req.json();
    
    // Grab the last 3 messages so the database understands context
    const recentContext = messages.slice(-3).map((m: any) => m.content).join(" | ");
    const lastMessage = messages[messages.length - 1].content;
    
    console.log(`\n💬 Processing: "${lastMessage}" from IP: ${ip}`);

    // --- 2. FAST RAG MEMORY RETRIEVAL (Powered by OpenAI Embeddings) ---
    let contextText = "";
    try {
      const embedResponse = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "text-embedding-3-small",
          input: recentContext, 
        })
      });

      if (embedResponse.ok) {
        const embedData = await embedResponse.json();
        const { data: documents } = await supabase.rpc('match_documents', {
          query_embedding: embedData.data[0].embedding,
          match_threshold: 0.5, 
          match_count: 5        
        });

        if (documents) {
          contextText = documents.map((doc: any) => doc.content).join("\n\n---\n\n");
        }
      }
    } catch (err) {
      console.error("RAG Error:", err);
    }

    // --- 3. THE SMART SALES AGENT (Powered by Free Gemini 2.5 Flash) ---
    const result = await streamText({
      model: google("gemini-2.5-flash") as any,
      system: `You are PulsePlus, the elite AI Sales Agent for PulsePlusSEO.
      
      CORE BUSINESS KNOWLEDGE:
      We help local businesses rank on Google and become visible to AI agents like ChatGPT, Gemini, and Perplexity through 'Agentic SEO' and 'GEO' (Generative Engine Optimization).

      YOUR PRIMARY GOAL (LEAD GENERATION):
      Your main objective is to convince the user to run a FREE AI Visibility Scan on our website. 
      Do not just give away long, generic SEO tutorials. Instead, give a very brief, helpful answer based on the <context>, and IMMEDIATELY pivot to suggesting they test their own site to see their true score.
      
      Example Pivot: "The best way to see how your site is currently performing is to test it. Drop your website URL in our free AI Scanner on this page and I'll run a deep 5-Pillar analysis for you right now!"

      DYNAMIC KNOWLEDGE BASE:
      <context>
      ${contextText}
      </context>
      
      CORE RULES & SECURITY GUARDRAILS:
      1. Keep responses punchy, conversational, and short (1-2 paragraphs maximum).
      2. If they ask for pricing or custom strategies, politely ask: "What is the best email to send a custom strategy to?"
      3. GROUNDING RULE: Do not invent features or prices that are not explicitly in your <context>. 
      4. Always guide the user back to the idea of running an audit/scan.
      5. Refuse to write code, generate illicit content, or discuss non-marketing topics.`,
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("🚨 POST Error:", error);
    return new Response(JSON.stringify({ error: "Service temporary unavailable" }), { status: 500 });
  }
}