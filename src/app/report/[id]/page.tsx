import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowLeft, CheckCircle2, AlertCircle, AlertTriangle, 
  XCircle, Globe, Calendar
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const reportId = resolvedParams.id;

  const { userId } = await auth();
  if (!userId) redirect("/login");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: scan, error } = await supabase
    .from("scans")
    .select("*")
    .eq("id", reportId)
    .eq("user_id", userId)
    .single();

  if (error || !scan) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
          <AlertCircle className="w-16 h-16 text-slate-400 mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Report Not Found</h1>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const result = scan.result;
  const score = scan.score;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const calculateCategoryScore = (checks: any[]) => {
    if (!checks || checks.length === 0) return 0;
    const passes = checks.filter(c => c.status === "pass").length;
    return Math.round((passes / checks.length) * 100);
  };

  const metaScore = calculateCategoryScore(result.metaChecks);
  const qualityScore = calculateCategoryScore(result.qualityChecks);
  const structureScore = calculateCategoryScore(result.structureAndLinkChecks);
  const llmScore = calculateCategoryScore(result.llmReadinessChecks); // 👈 Calculating new LLM Pillar score
  const techScore = calculateCategoryScore(result.technicalChecks);

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-100 overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full relative z-10">
        
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
              <Globe className="text-blue-600" /> {scan.domain || scan.url}
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(scan.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span className="uppercase tracking-widest text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-md">{scan.model}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
                <h3 className="text-slate-800 font-bold mb-6 text-lg">On-page score</h3>
                <div 
                  className="relative w-48 h-48 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `conic-gradient(${score >= 80 ? '#22c55e' : score >= 50 ? '#eab308' : '#ef4444'} ${score}%, #f1f5f9 ${score}%)` }}
                >
                  <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                     <span className="text-5xl font-black text-slate-800">{score}%</span>
                  </div>
                </div>
                <div className={`mt-4 px-4 py-1 rounded-full text-sm font-bold ${score >= 80 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {score >= 80 ? "Good" : score >= 50 ? "Warning" : "Critical"}
                </div>
              </div>

              {/* Progress Bars */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                 <ProgressBar label="Meta data" score={metaScore} />
                 <ProgressBar label="Page quality" score={qualityScore} />
                 <ProgressBar label="Page Structure & Links" score={structureScore} />
                 <ProgressBar label="LLM & RAG Readiness" score={llmScore} /> {/* 👈 NEW BAR! */}
                 <ProgressBar label="Server & Tech" score={techScore} />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-8 space-y-8">
               <CheckSection title="Meta data" checks={result.metaChecks} score={metaScore} />
               <CheckSection title="Page quality" checks={result.qualityChecks} score={qualityScore} />
               <CheckSection title="Page Structure & Links" checks={result.structureAndLinkChecks} score={structureScore} />
               <CheckSection title="LLM & RAG Readiness" checks={result.llmReadinessChecks} score={llmScore} /> {/* 👈 NEW LIST! */}
               <CheckSection title="Server & Technical" checks={result.technicalChecks} score={techScore} />
            </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---
function ProgressBar({ label, score }: { label: string, score: number }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2 items-center">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900">{score || 0} %</span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-blue-600 transition-all duration-1000"
          style={{ width: `${score || 0}%` }}
        />
      </div>
    </div>
  );
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function CheckSection({ title, checks, score }: { title: string, checks: any[], score: number }) {
  if (!checks || checks.length === 0) return null;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <div className="flex items-center gap-4">
           <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
             <div className="h-full bg-blue-600" style={{ width: `${score || 0}%` }}></div>
           </div>
           <span className="font-bold text-lg text-slate-800">{score || 0}%</span>
        </div>
      </div>
      <div className="space-y-4">
        {checks.map((check, index) => (
          <CheckCard key={index} label={check.label} status={check.status} value={check.value} />
        ))}
      </div>
    </div>
  );
}

function CheckCard({ label, status, value }: { label: string, status: "pass" | "warning" | "error", value: string }) {
  const styles = {
    pass: { border: "border-l-green-500", bg: "bg-white", text: "text-slate-700", icon: <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> },
    warning: { border: "border-l-yellow-400", bg: "bg-yellow-50", text: "text-yellow-800", icon: <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" /> },
    error: { border: "border-l-red-500", bg: "bg-red-50", text: "text-red-800", icon: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> }
  };
  const current = styles[status] || styles.pass;
  return (
    <div className={`border border-slate-200 border-l-[6px] rounded-lg p-5 flex flex-col sm:flex-row gap-4 sm:items-start ${current.border} ${current.bg}`}>
      <div className="min-w-[150px] font-bold text-slate-800 text-sm mt-0.5">
        {label}
      </div>
      <div className="flex items-start gap-3 bg-white border border-slate-100 p-4 rounded-md flex-grow shadow-sm">
        {current.icon}
        <p className={`text-sm leading-relaxed ${current.text}`}>
          {value}
        </p>
      </div>
    </div>
  );
}