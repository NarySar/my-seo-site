import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { runAgentScan } from "@/lib/agent";

export const maxDuration = 60; 

// 1️⃣ CHANGED TO POST: So we don't have to fight the Upstash dropdown!
export async function POST(req: Request) {
  try {
    // 2️⃣ URL TOKEN BYPASS: We check the URL for the password instead of a header
    const requestUrl = new URL(req.url);
    const secretToken = requestUrl.searchParams.get("token");
    const authHeader = req.headers.get("authorization");

    // Allow entry if they provide the correct URL token OR the header
    if (secretToken !== process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.error("🚨 Unauthorized access attempt to queue worker!");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("👷 QUEUE WORKER: Looking for pending URLs...");

    const { data: queueItem, error: fetchError } = await supabase
      .from("crawl_queue")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (fetchError || !queueItem) {
      return NextResponse.json({ message: "Queue is empty. Nothing to do!" });
    }

    const { id, url, domain } = queueItem;
    console.log(`🚀 QUEUE WORKER: Processing ${url}...`);

    await supabase.from("crawl_queue").update({ status: "scanning" }).eq("id", id);
    const result = await runAgentScan(url);

    await supabase.from("scans").insert({
      url: url,
      domain: domain,
      score: result.score,
      model: "PulsePlus Deep Scan",
      result: result
    });

    await supabase.from("crawl_queue").update({ status: "completed" }).eq("id", id);

    console.log(`✅ QUEUE WORKER: Successfully processed ${url} with a score of ${result.score}`);
    return NextResponse.json({ success: true, url, score: result.score });

  } catch (error) {
    console.error("🔥 QUEUE WORKER FAILED:", error);
    return NextResponse.json({ error: "Worker process failed" }, { status: 500 });
  }
}