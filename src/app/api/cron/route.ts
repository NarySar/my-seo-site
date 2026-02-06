import { NextResponse } from "next/server";
import { runAgentScan } from "@/lib/agent"; 
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
    // 1. Security Check (Prevent strangers from triggering your bot)
    if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const TARGET_URL = "https://www.pulseseo.ai"; 
    
    try {
        // 2. Run the Agent
        const result = await runAgentScan(TARGET_URL);

        // 3. Logic: Only alert if there is a problem (or always alert if you prefer)
        // Currently set to: ALWAYS send an email for testing purposes. 
        // Change "if (true)" to "if (result.score < 70)" later to reduce noise.
        if (true) { 
            console.log("⚠️ Sending alert email...");
            
            await resend.emails.send({
                from: 'SEO Agent <alert@pulseseo.ai>',  // ✅ Your verified Pro Domain
                to: 'Sarnary168@gmail.com',            // ✅ Your Personal Gmail
                subject: `🚨 SEO Daily Report: Score is ${result.score}`,
                html: `
                    <h1>Daily SEO Report</h1>
                    <p>Your website <strong>${TARGET_URL}</strong> just scanned at <strong>${result.score}/100</strong>.</p>
                    <hr />
                    <h3>🔹 Top 3 Improvements Needed:</h3>
                    <ul>
                        ${result.improvements.slice(0, 3).map((i: string) => `<li>${i}</li>`).join('')}
                    </ul>
                    <br />
                    <a href="https://www.pulseseo.ai/dashboard" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Full Dashboard</a>
                `
            });
            
            return NextResponse.json({ status: "Alert Sent", score: result.score });
        }

        return NextResponse.json({ status: "All Good", score: result.score });

    } catch (error: any) {
        console.error("Cron Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}