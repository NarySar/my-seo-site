import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";
import { createClient } from "@supabase/supabase-js";

// Force dynamic prevents Vercel from caching this route
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { 
            QSTASH_TOKEN, 
            CRON_SECRET, 
            NEXT_PUBLIC_SUPABASE_URL, 
            SUPABASE_SERVICE_ROLE_KEY 
        } = process.env;

        // 1. SECURITY: Verify the Vercel Cron Secret
        const authHeader = req.headers.get("authorization");
        if (authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. DATABASE: Fetch all active monitors
        const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        
        // You can filter by .eq("tier", "agency") if you only want paying clients later
        const { data: monitors, error } = await supabase
            .from("monitors")
            .select("*")
            .eq("active", true);

        if (error) throw new Error(error.message);
        if (!monitors || monitors.length === 0) {
            return NextResponse.json({ message: "No active sites to scan." });
        }

        // 3. QUEUE JOBS: Send them to the Worker
        const qstash = new Client({ token: QSTASH_TOKEN! });
        
        // ⚠️ IMPORTANT: Use your LIVE domain here (e.g., https://pulseseo.ai)
        // If testing locally, use your ngrok or local URL, but for production use real domain.
        const APP_URL = "https://www.pulseseo.ai"; 

        // 3. QUEUE JOBS: Create a list of promises (requests)
        const jobs = monitors.map(monitor => 
        qstash.publishJSON({
            url: `${APP_URL}/api/worker`,
            body: { 
                url: monitor.url,
                userId: monitor.user_id,
                monitorId: monitor.id
            },
        })
        );

        // 4. FIRE: Send them all to QStash at the exact same time
        // This takes ~200ms total, whether you have 5 clients or 500.
        const results = await Promise.all(jobs);

        return NextResponse.json({ 
            status: "Success", 
            queued_count: results.length, 
            sites: monitors.map(m => m.url) 
        });

    } catch (error) {
        console.error("CRON ERROR:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}