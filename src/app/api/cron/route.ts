import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

// 1. Force this route to be dynamic (avoids static caching issues)
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        // 2. Check for Keys explicitly
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
        const APP_URL = "https://www.pulseseo.ai"; // Force Production URL

        const results = [];
        for (const url of CLIENT_SITES) {
            const result = await qstash.publishJSON({
                url: `${APP_URL}/api/worker`,
                body: { url: url },
            });
            results.push(result);
        }

        return NextResponse.json({ status: "Jobs Queued", count: results.length, details: results });

    } catch (error: any) {
        // 5. If it crashes, tell us WHY
        console.error("CRON API ERROR:", error);
        return NextResponse.json({ 
            error: "Internal Server Error", 
            message: error.message 
        }, { status: 500 });
    }
}