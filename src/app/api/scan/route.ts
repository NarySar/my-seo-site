import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { runAgentScan } from "@/lib/agent";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    console.log(`🚀 Starting Agentic Scan for: ${url}`);

    // 1. RUN THE V6 ENGINE
    const result = await runAgentScan(url);

    // 2. SAVE TO DATABASE
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // 👇 CRITICAL FIX: Using the Service Role Key so it never gets blocked by security rules
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

    if (supabaseUrl && supabaseKey) {
      // Get the logged-in user's Clerk ID
      const { userId } = await auth();
      
      if (userId) {
        console.log(`👤 User logged in (${userId}), attempting to save scan...`);
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Insert the scan and capture any potential errors
        const { error: dbError } = await supabase
          .from("scans")
          .insert({
            url: url,
            domain: new URL(url).hostname,
            score: result.score,
            model: "Gemini 2.0 (V6)",
            result: result,
            user_id: userId
          });
          
        if (dbError) {
           console.error("❌ SUPABASE INSERT FAILED:", dbError);
        } else {
           console.log("✅ Scan successfully saved to database!");
        }
      } else {
        console.log("⚠️ No user logged in, skipping database save.");
      }
    } else {
       console.error("❌ Missing Supabase Environment Variables!");
    }

    // 3. RETURN RESULTS TO THE FRONTEND
    return NextResponse.json(result);

  } catch (error) {
    console.error("🔥 Scan Route Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}