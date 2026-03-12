import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { runAgentScan } from "@/lib/agent";

// Allow Vercel to run this in the background for up to 60 seconds
export const maxDuration = 60; 

export async function GET(req: Request) {
  try {
    // 🔐 1. SECURITY: Only allow QStash (or you) to trigger this
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("👷 QUEUE WORKER: Looking for pending URLs...");

    // 1. Grab ONE pending URL from the queue
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

    // 2. Mark it as "scanning" so it doesn't get processed twice
    await supabase.from("crawl_queue").update({ status: "scanning" }).eq("id", id);

    // 3. Run your AI Agent! (Using your existing 6-Pillar logic)
    const result = await runAgentScan(url);

    // 4. Save the results to your main 'scans' table
    await supabase.from("scans").insert({
      url: url,
      domain: domain,
      score: result.score,
      model: "PulsePlus Deep Scan",
      result: result
    });

    // 5. Mark the queue item as "completed"
    await supabase.from("crawl_queue").update({ status: "completed" }).eq("id", id);

    console.log(`✅ QUEUE WORKER: Successfully processed ${url} with a score of ${result.score}`);
    return NextResponse.json({ success: true, url, score: result.score });

  } catch (error) {
    console.error("🔥 QUEUE WORKER FAILED:", error);
    return NextResponse.json({ error: "Worker process failed" }, { status: 500 });
  }
}