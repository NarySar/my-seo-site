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

    // 1. RUN THE V6 ENGINE
    const result = await runAgentScan(url);

    // 2. SAVE TO DATABASE
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const { userId } = await auth();
      
      if (userId) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        await supabase
          .from("scans")
          .insert({
            url: url,
            domain: new URL(url).hostname,
            score: result.score,
            model: "Gemini 2.0 (V6)",
            result: result,
            user_id: userId
          });
      }
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("Scan Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}