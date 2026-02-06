import { NextResponse } from "next/server";
import { runAgentScan } from "@/lib/agent"; // Import our new helper
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
    // 1. Security Check (Prevent strangers from triggering your bot)
    // Vercel automatically adds this header to cron jobs
    if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const TARGET_URL = "https://www.pulseseo.ai"; // Replace with your site
    
    try {
        // 2. Run the Agent
        const result = await runAgentScan(TARGET_URL);

        // 3. Logic: Only alert if there is a problem
        if (result.score < 70) {
            console.log("⚠️ Score dropped! Sending alert...");
            
            await resend.emails.send({
                from: 'Agent <onboarding@resend.dev>',
                to: process.env.MY_EMAIL!,
                subject: `🚨 SEO Alert: Score dropped to ${result.score}`,
                html: `
                    <h1>Agent Alert</h1>
                    <p>Your website <strong>${TARGET_URL}</strong> just scanned at <strong>${result.score}/100</strong>.</p>
                    <p><strong>Main Issues:</strong></p>
                    <ul>
                        ${result.improvements.slice(0, 3).map(i => `<li>${i}</li>`).join('')}
                    </ul>
                    <a href="https://pulseseo.ai/dashboard">View Full Report</a>
                `
            });
            
            return NextResponse.json({ status: "Alert Sent", score: result.score });
        }

        return NextResponse.json({ status: "All Good", score: result.score });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}