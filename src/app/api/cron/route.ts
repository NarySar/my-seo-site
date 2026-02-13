import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { 
            QSTASH_TOKEN, 
            CRON_SECRET, 
            NEXT_PUBLIC_SUPABASE_URL, 
            SUPABASE_SERVICE_ROLE_KEY 
        } = process.env;

        // 1. Security Check (Fixed for Vercel Cron)
        const authHeader = req.headers.get("authorization");
        if (authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Fetch Active Sites from Database
        const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        
        // We select sites that are 'active' (you can add logic for 'due date' later)
        const { data: monitors, error } = await supabase
            .from("monitors")
            .select("*")
            .eq("active", true);

        if (error) throw new Error(error.message);
        
        if (!monitors || monitors.length === 0) {
            return NextResponse.json({ message: "No active monitors found to scan." });
        }

        // 3. Queue Jobs via QStash
        const qstash = new Client({ token: QSTASH_TOKEN! });
        
        // ⚠️ CRITICAL: QStash needs your LIVE URL, not localhost.
        // If you are testing, use your .vercel.app URL temporarily.
        const APP_URL = "https://www.pulseseo.ai"; 

        const results = [];
        for (const monitor of monitors) {
            const result = await qstash.publishJSON({
                url: `${APP_URL}/api/worker`,
                body: { 
                    url: monitor.url,      // The site to scan
                    email: monitor.email,  // Who to email (from DB)
                    userId: monitor.user_id 
                },
            });
            results.push(result);
        }

        return NextResponse.json({ 
            status: "Success", 
            queued: results.length, 
            sites: monitors.map(m => m.url) 
        });

    } catch (error) {
        console.error("CRON ERROR:", error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}