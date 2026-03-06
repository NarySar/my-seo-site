import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { runAgentScan } from "@/lib/agent";

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export const maxDuration = 60; // Allow up to 60 seconds for the scan

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, userId, monitorId } = body;

    // 1. Validation
    if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

    console.log(`👷 AGENCY WORKER: Starting scan for ${url}...`);

    // 2. Run the AI Agent Scan (Now returns UI Checklists!)
    const result = await runAgentScan(url);

    // 3. Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: savedScan, error: saveError } = await supabase
        .from("scans")
        .insert({
            url: url,
            domain: new URL(url).hostname,
            score: result.score,
            model: "Auto-Monitor",
            result: result,
            user_id: userId 
        })
        .select()
        .single();

    if (saveError) {
        console.error("DB Save Failed:", saveError);
    }

    // 4. Update 'last_run' in monitors table
    if (monitorId) {
        await supabase
            .from("monitors")
            .update({ last_run: new Date().toISOString() })
            .eq("id", monitorId);
    }

    // 5. CALCULATE ERRORS FOR THE EMAIL
    // Combine all the checks the AI just ran
    const allChecks = [
      ...(result.metaChecks || []), 
      ...(result.qualityChecks || []), 
      ...(result.technicalChecks || [])
    ];
    
    // Count how many warnings and errors were found
    const errorsCount = allChecks.filter(c => c.status === "error").length;
    const warningsCount = allChecks.filter(c => c.status === "warning").length;

    // 6. Send Report to AGENCY ADMIN
    const adminEmail = process.env.MY_EMAIL;

    if (adminEmail) {
        await resend.emails.send({
          from: "PulsePlusSEO Agency <onboarding@resend.dev>",
          to: adminEmail,
          subject: `🔔 Client Report: ${result.score}/100 for ${new URL(url).hostname}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="margin-bottom: 10px;">Daily Agency Scan Completed</h2>
                <p><strong>Client Site:</strong> <a href="${url}">${url}</a></p>
                
                <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 5px solid ${result.score >= 80 ? '#16a34a' : '#dc2626'};">
                    <p style="font-size: 20px; font-weight: bold; margin: 0;">
                        AI Visibility Score: ${result.score}/100
                    </p>
                </div>

                <h3>Quick Summary:</h3>
                <p>
                  Our automated scan found <strong style="color: #dc2626;">${errorsCount} critical errors</strong> and 
                  <strong style="color: #d97706;">${warningsCount} warnings</strong> that are currently hurting this site's visibility.
                </p>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                
                <p style="font-size: 12px; color: #666;">
                    View the full technical breakdown in your admin dashboard.
                    <br />
                    <a href="https://pulseplusseo.ai/report/${savedScan?.id || ''}">Open Full Report</a>
                </p>
            </div>
          `
        });
        console.log(`📧 Email sent to ${adminEmail}`);
    }

    return NextResponse.json({ success: true, score: result.score });

  } catch (error) {
    console.error("WORKER FAILED:", error);
    return NextResponse.json({ error: "Worker process failed" }, { status: 500 });
  }
}