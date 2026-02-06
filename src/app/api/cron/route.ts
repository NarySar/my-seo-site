import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

const qstash = new Client({ token: process.env.QSTASH_TOKEN! });

// 📋 YOUR CLIENT LIST
const CLIENT_SITES = [
    "https://www.pulseseo.ai",
    "https://www.google.com"
];

export async function GET(req: Request) {
    // 🛑 NEW SECURITY CHECK
    // We check 'x-cron-secret' instead of 'Authorization' to bypass Clerk
    if (req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const APP_URL = process.env.NODE_ENV === "development" 
        ? "http://localhost:3000" 
        : "https://www.pulseseo.ai"; 

    const results = [];

    // Dispatch jobs to QStash
    for (const url of CLIENT_SITES) {
        const result = await qstash.publishJSON({
            url: `${APP_URL}/api/worker`,
            body: { url: url },
        });
        results.push({ url, msgId: result.messageId });
    }

    return NextResponse.json({ 
        status: "Jobs Queued", 
        count: results.length, 
        jobs: results 
    });
}