import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowLeft, CheckCircle2, AlertCircle, Zap, HelpCircle, 
  Globe, Calendar, Sparkles
} from "lucide-react";
import { redirect } from "next/navigation";

// 👇 FIX 1: Update the type to expect a Promise
export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  
  // 👇 FIX 2: "await" the params before we try to use the ID
  const resolvedParams = await params;
  const reportId = resolvedParams.id;

  // 1. Securely check who is logged in
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  // 2. Connect to Supabase with the Service Role Key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 3. Fetch the specific scan using the awaited ID
  const { data: scan, error } = await supabase
    .from("scans")
    .select("*")
    .eq("id", reportId) // 👈 Use the awaited ID here
    .eq("user_id", userId)
    .single();

  // If no scan is found, show an error state
  if (error || !scan) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
          <AlertCircle className="w-16 h-16 text-zinc-400 mb-4" />
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Report Not Found</h1>
          <p className="text-zinc-500 mb-8 max-w-md">
            We couldn&apos;t find this scan. It may have been deleted, or you might not have permission to view it.
          </p>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold transition-all">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  // Extract the JSON result object
  const result = scan.result;
  const score = scan.score;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full relative z-10">
        
        {/* TOP NAVIGATION */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" /> Historical Scan
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight flex items-center gap-3">
              <Globe className="text-blue-500" /> {scan.domain || scan.url}
            </h1>
            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(scan.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span className="uppercase tracking-widest text-xs font-bold">{scan.model}</span>
            </div>
        </div>

        <div className="space-y-8">
            
            {/* SCORE & BREAKDOWN ROW */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Score Box */}
              <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <h3 className="text-zinc-500 dark:text-zinc-400 font-bold mb-6 uppercase tracking-widest text-xs">Overall Agent Score</h3>
                
                <div className="relative w-48 h-48 shrink-0 rounded-full border-[12px] border-zinc-50 dark:border-zinc-950 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 shadow-inner mb-6">
                  <div className={`absolute inset-0 rounded-full border-[12px] border-r-transparent border-t-transparent -rotate-45 ${getRingColor(score)}`}></div>
                  <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getTextGradient(score)}`}>
                    {score}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                  {score >= 80 ? <CheckCircle2 className="text-green-500 w-5 h-5" /> : <AlertCircle className="text-yellow-500 w-5 h-5" />}
                  <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm uppercase tracking-wider">
                    {score >= 80 ? "Highly Visible" : score >= 50 ? "Needs Optimization" : "Invisible to AI"}
                  </span>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
                <h3 className="text-zinc-500 dark:text-zinc-400 font-bold mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                  <Zap className="h-4 w-4 text-blue-500" /> Score Breakdown
                </h3>
                <div className="space-y-6">
                   <ProgressBar label="Data Density" score={result.breakdown?.dataDensity || 0} />
                   <ProgressBar label="Structure & Hierarchy" score={result.breakdown?.structure || 0} />
                   <ProgressBar label="Trust Signals" score={result.breakdown?.trust || 0} />
                   <ProgressBar label="Content Clarity" score={result.breakdown?.clarity || 0} />
                   <ProgressBar label="Completeness" score={result.breakdown?.completeness || 0} />
                </div>
              </div>
            </div>

            {/* AI EXECUTIVE SUMMARY */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
              <h3 className="text-zinc-500 dark:text-zinc-400 font-bold mb-4 uppercase tracking-widest text-xs">AI Executive Summary</h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
                {result.summary || "No summary was generated for this scan."}
              </p>
            </div>

            {/* ACTION PLAN */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" /> Action Plan
              </h3>
              <div className="space-y-3">
                {result.improvements && result.improvements.length > 0 ? (
                    result.improvements.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/50">
                        <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                        {i + 1}
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{item}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-zinc-500">No specific improvements suggested for this scan.</p>
                )}
              </div>
            </div>

        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---

function ProgressBar({ label, score }: { label: string, score: number }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2 items-center">
        <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{score}/100</span>
      </div>
      
      <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// Helpers for the Score Circle
function getRingColor(score: number) {
  if (score >= 80) return "border-blue-500";
  if (score >= 50) return "border-yellow-500";
  return "border-red-500";
}

function getTextGradient(score: number) {
  if (score >= 80) return "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400";
  if (score >= 50) return "from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400";
  return "from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400";
}