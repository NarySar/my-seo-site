import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as cheerio from "cheerio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    // 1. SETUP GEMINI
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const body = await req.json();
    const { url } = body;

    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    // 2. SCRAPE
    console.log("Visiting: " + url);
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (PulseSeoBot)" } });
    if (!response.ok) throw new Error("Failed to visit site");

    const html = await response.text();
    const $ = cheerio.load(html);

    // 3. EXTRACT DATA
    const title = $("title").text().trim().substring(0, 100) || "No title";
    const metaDescription = $('meta[name="description"]').attr("content") || "No description found";
    const h1Text = $("h1").first().text().trim().substring(0, 100) || "No H1 tag";
    
    // 🔥 CRITICAL FIXES FOR FRONTEND MATCHING
    const totalImages = $("img").length;
    const totalLinks = $("a").length;
    const missingAlt = $("img:not([alt])").length; // Count images without alt text
    const jsonLdCount = $('script[type="application/ld+json"]').length; // Count Schema
    const robotsTag = $('meta[name="robots"]').attr("content") || "index, follow";

    // Clean text
    $("script").remove(); 
    $("style").remove();
    const bodyText = $("body").text().replace(/\s+/g, " ").trim().substring(0, 5000);
    const wordCount = bodyText.split(" ").length;

    // 4. ASK GEMINI
    let aiScore = 0; 
    let aiAdvice = "Pending";
    
    try {
      console.log("Sending to Gemini...");
      const prompt = `Analyze SEO. Title: "${title}". H1: "${h1Text}". Content: "${bodyText.substring(0, 2000)}". 
      Return JSON: { "contentScore": number, "advice": string }`;
      
      const result = await model.generateContent(prompt);
      const data = JSON.parse(result.response.text().replace(/```json|```/g, "").trim());
      
      aiScore = data.contentScore;
      aiAdvice = data.advice;
    } catch (e) { 
        console.error("AI Error"); 
    }

    // 5. CONSTRUCT RESPONSE (Exact match for page.tsx)
    const scanResult = {
      url, 
      title, 
      metaDescription,
      h1Text, 
      wordCount, 
      aiScore, 
      aiAdvice,
      
      // 🔥 EXACT NAMES YOUR FRONTEND EXPECTS
      totalImages: totalImages,
      missingAlt: missingAlt,
      totalLinks: totalLinks,
      jsonLdCount: jsonLdCount, // This fixes "Business Info"
      robotsTag: robotsTag,
      
      modelUsed: "gemini-2.0-flash"
    };

    // 6. SAVE TO DATABASE (with Debugging) 💾
    const { userId } = await auth();
    
    if (userId) {
        console.log(`👤 User ID found: ${userId} - Attempting save...`);
        
        const { data, error: dbError } = await supabase.from("scans").insert({
          url, 
          domain: new URL(url).hostname, 
          score: aiScore, 
          result: scanResult, 
          user_id: userId
        });

        if (dbError) {
            console.error("🔴 SUPABASE SAVE FAILED:", dbError.message);
            console.error("Details:", dbError.details);
            console.error("Hint:", dbError.hint);
        } else {
            console.log("✅ Saved to Supabase successfully!");
        }
    } else {
        console.log("🟠 No User Logged In - Skipping Database Save");
    }

    return NextResponse.json(scanResult);

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}