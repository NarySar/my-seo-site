import { NextResponse } from "next/server";
import { Client } from "@upstash/qstash";

// Initialize the Queue Client
const qstash = new Client({ token: process.env.QSTASH_TOKEN! });

// 📋 YOUR CLIENT LIST
const CLIENT_SITES = [
    "https://www.pulseseo.ai",
    "https://www.google.com",
    "https://www.example.com",
    "https://citylocksmith247.com",
    "https://www.nutritionrx.com",
    // You can add 100+ sites here now!
];

export async function GET(req: Request) {
    // 1. Security Check
    if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. The Loop: Just dispatch tasks (Takes milliseconds)
    const results = [];
    
    // This is your live website URL where the worker lives
    // ⚠️ IMPORTANT: Change this to your real domain when deploying!
    const APP_URL = "https://www.pulseseo.ai"; 

    for (const url of CLIENT_SITES) {
        // Send the job to QStash
        const result = await qstash.publishJSON({
            url: `${APP_URL}/api/worker`, // QStash will POST to this URL
            body: { url: url },           // Sending the data
        });
        results.push({ url, msgId: result.messageId });
    }

    console.log(`🚀 Dispatched ${results.length} jobs to the queue.`);
    
    return NextResponse.json({ 
        status: "Jobs Queued", 
        count: results.length, 
        jobs: results 
    });
}