import { NextResponse } from "next/server";
import { runAgentScan } from "@/lib/agent"; 
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// This function receives ONE url, scans it, and sends ONE email
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, { status: 400 });
        }

        console.log(`👷 Worker starting scan for: ${url}`);

        // 1. Run the AI Scan
        const result = await runAgentScan(url);

        // 2. Send the Email (To YOU)
        await resend.emails.send({
            from: 'SEO Agent <alert@pulseseo.ai>',
            to: 'Sarnary168@gmail.com', 
            subject: `📊 Agency Report: ${url} (Score: ${result.score})`,
            html: `
                <h2>Client: <a href="${url}">${url}</a></h2>
                <p><strong>Score:</strong> ${result.score}/100</p>
                <hr />
                <h3>Improvements:</h3>
                <ul>
                    ${result.improvements.slice(0, 3).map((i: string) => `<li>${i}</li>`).join('')}
                </ul>
            `
        });

        console.log(`✅ Worker finished: ${url}`);
        return NextResponse.json({ status: "Success", score: result.score });

    } catch (error: any) {
        console.error(`❌ Worker Failed for ${url}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}