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

        const results = [];
        for (const monitor of monitors) {
            const result = await qstash.publishJSON({
                url: `${APP_URL}/api/worker`,
                body: { 
                    url: monitor.url,       // The site to scan
                    userId: monitor.user_id, // The client's ID
                    monitorId: monitor.id    // To update 'last_run' later
                },
            });
            results.push(result);
        }

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