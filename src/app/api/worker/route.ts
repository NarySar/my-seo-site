import { NextResponse } from "next/server";
import { runAgentScan } from "@/lib/agent"; 
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    // 1. Define 'url' here (OUTSIDE the try block)
    let url = "Unknown URL"; 

    try {
        const body = await req.json();
        
        // 2. Set the url if it exists
        if (body.url) {
            url = body.url; 
        }

        if (!url || url === "Unknown URL") {
            return NextResponse.json({ error: "No URL provided" }, { status: 400 });
        }

        console.log(`👷 Worker starting scan for: ${url}`);

        // 3. Run the AI Scan
        const result = await runAgentScan(url);

        // 4. Send the Email
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

        return NextResponse.json({ status: "Success", score: result.score });

    } catch (error: any) {
        // 5. Now this error log works because 'url' is defined at the top
        console.error(`❌ Worker Failed for ${url}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}