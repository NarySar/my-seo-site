import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

// 1. Force dynamic mode
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        // 2. Check for Keys
        const { QSTASH_TOKEN, CRON_SECRET } = process.env;

        if (!QSTASH_TOKEN) {
            throw new Error("CRITICAL: QSTASH_TOKEN is missing in Vercel Settings.");
        }
        if (!CRON_SECRET) {
            throw new Error("CRITICAL: CRON_SECRET is missing in Vercel Settings.");
        }

        // 3. Security Check
        const authHeader = req.headers.get("x-cron-secret");
        if (authHeader !== CRON_SECRET) {
            return NextResponse.json({ error: "Unauthorized: Wrong Secret Password" }, { status: 401 });
        }

        // 4. Run the Job
        const qstash = new Client({ token: QSTASH_TOKEN });
        const CLIENT_SITES = ["https://www.pulseseo.ai", "https://www.google.com"];
        const APP_URL = "https://www.pulseseo.ai"; 

        const results = [];
        for (const url of CLIENT_SITES) {
            const result = await qstash.publishJSON({
                url: `${APP_URL}/api/worker`,
                body: { url: url },
            });
            results.push(result);
        }

        return NextResponse.json({ status: "Jobs Queued", count: results.length, details: results });

    } catch (error) {
        // 5. THE FIX: Handle 'unknown' errors safely
        console.error("CRON API ERROR:", error);
        
        // This line checks: "Is this a real Error object?"
        const errorMessage = error instanceof Error ? error.message : String(error);

        return NextResponse.json({ 
            error: "Internal Server Error", 
            message: errorMessage 
        }, { status: 500 });
    }
}