"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Loader2, Globe, Sparkles, CheckCircle2, 
  AlertCircle, AlertTriangle, XCircle
} from "lucide-react";

// --- TYPE DEFINITIONS ---
interface CheckItem {
  label: string;
  status: "pass" | "warning" | "error";
  value: string;
}

interface AnalysisResult {
  score: number;
  metaChecks: CheckItem[];
  qualityChecks: CheckItem[];
  structureAndLinkChecks: CheckItem[];
  llmReadinessChecks: CheckItem[]; // 👈 NEW: The 6 Critical LLM Data Points!
  technicalChecks: CheckItem[];
}

const SCAN_STEPS = [
  "Initializing Enterprise Scraper...",
  "Analyzing Meta Tags & Core Web Vitals...",
  "Mapping Page Structure & Link Density...",
  "Gemini Evaluates LLM Readiness & Entity...",
  "Applying 5-Pillar Agentic Rubric...",
  "Formatting UI Checklist..."
];

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setScanStep((prev) => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setScanStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to analyze");
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const calculateCategoryScore = (checks: CheckItem[]) => {
    if (!checks || checks.length === 0) return 0;
    const passes = checks.filter(c => c.status === "pass").length;
    return Math.round((passes / checks.length) * 100);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full relative z-10">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> The New Standard for SEO Audits
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Analyze your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Website Health</span>
          </h1>
          
          <form onSubmit={handleAnalyze} className="max-w-xl mx-auto relative group mt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 p-2 shadow-2xl">
              <Globe className="ml-4 h-5 w-5 text-zinc-400" />
              <input 
                type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full bg-transparent border-none text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-0 px-4 py-2 outline-none"
              />
              
              <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap">
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Analyze"}
              </button>
            </div>
          </form>

          {error && <p className="text-red-600 dark:text-red-400 text-sm mt-4 bg-red-100 dark:bg-red-900/20 inline-block px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/50">{error}</p>}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center shadow-xl animate-in fade-in zoom-in-95">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Running Agentic Scan...</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">
              {SCAN_STEPS[scanStep]}
            </p>
          </div>
        )}

        {/* DASHBOARD RESULTS */}
        {result && !loading && (() => {
          const metaScore = calculateCategoryScore(result.metaChecks);
          const qualityScore = calculateCategoryScore(result.qualityChecks);
          const structureScore = calculateCategoryScore(result.structureAndLinkChecks);
          const llmScore = calculateCategoryScore(result.llmReadinessChecks); // 👈 Calculating new LLM Pillar score
          const techScore = calculateCategoryScore(result.technicalChecks);

          return (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT COLUMN: SCORE & PROGRESS BARS */}
                <div className="lg:col-span-4 space-y-6">
                  
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
                    <h3 className="text-zinc-800 dark:text-zinc-200 font-bold mb-6 text-lg">On-page score</h3>
                    
                    <div 
                      className="relative w-48 h-48 rounded-full flex items-center justify-center mb-4"
                      style={{ background: `conic-gradient(${result.score >= 80 ? '#22c55e' : result.score >= 50 ? '#eab308' : '#ef4444'} ${result.score}%, transparent ${result.score}%)` }}
                    >
                      <div className="absolute inset-2 bg-white dark:bg-zinc-900 rounded-full flex flex-col items-center justify-center">
                         <span className="text-5xl font-black text-zinc-800 dark:text-white">{result.score}%</span>
                      </div>
                    </div>

                    <div className={`mt-4 px-4 py-1 rounded-full text-sm font-bold ${result.score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : result.score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {result.score >= 80 ? "Good" : result.score >= 50 ? "Warning" : "Critical"}
                    </div>
                  </div>

                  {/* The 5 Progress Bars */}
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg space-y-6">
                     <ProgressBar label="Meta data" score={metaScore} />
                     <ProgressBar label="Page quality" score={qualityScore} />
                     <ProgressBar label="Page Structure & Links" score={structureScore} />
                     <ProgressBar label="LLM & RAG Readiness" score={llmScore} /> {/* 👈 NEW BAR! */}
                     <ProgressBar label="Server & Tech" score={techScore} />
                  </div>
                </div>

                {/* RIGHT COLUMN: THE 5 CHECKLISTS */}
                <div className="lg:col-span-8 space-y-8">
                   <CheckSection title="Meta data" checks={result.metaChecks} score={metaScore} />
                   <CheckSection title="Page quality" checks={result.qualityChecks} score={qualityScore} />
                   <CheckSection title="Page Structure & Links" checks={result.structureAndLinkChecks} score={structureScore} />
                   <CheckSection title="LLM & RAG Readiness" checks={result.llmReadinessChecks} score={llmScore} /> {/* 👈 NEW CHECKLIST! */}
                   <CheckSection title="Server & Technical" checks={result.technicalChecks} score={techScore} />
                </div>

              </div>
            </div>
          );
        })()}
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
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="text-sm font-bold text-zinc-900 dark:text-white">{score} %</span>
      </div>
      <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-blue-600 transition-all duration-1000"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function CheckSection({ title, checks, score }: { title: string, checks: CheckItem[], score: number }) {
  if (!checks || checks.length === 0) return null;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">{title}</h2>
        <div className="flex items-center gap-4">
           <div className="h-2 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
             <div className="h-full bg-blue-600" style={{ width: `${score}%` }}></div>
           </div>
           <span className="font-bold text-lg text-zinc-800 dark:text-white">{score}%</span>
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

function CheckCard({ label, status, value }: CheckItem) {
  const styles = {
    pass: { border: "border-l-green-500", bg: "bg-white dark:bg-zinc-900", text: "text-zinc-700 dark:text-zinc-300", icon: <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> },
    warning: { border: "border-l-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/10", text: "text-yellow-800 dark:text-yellow-500", icon: <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" /> },
    error: { border: "border-l-red-500", bg: "bg-red-50 dark:bg-red-900/10", text: "text-red-800 dark:text-red-400", icon: <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> }
  };
  const current = styles[status] || styles.pass;
  return (
    <div className={`border border-zinc-200 dark:border-zinc-800 border-l-[6px] rounded-lg p-5 flex flex-col sm:flex-row gap-4 sm:items-start shadow-sm ${current.border} ${current.bg}`}>
      <div className="min-w-[150px] font-bold text-zinc-800 dark:text-zinc-200 text-sm mt-0.5">
        {label}
      </div>
      <div className="flex items-start gap-3 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/50 p-4 rounded-md flex-grow">
        {current.icon}
        <p className={`text-sm leading-relaxed ${current.text}`}>
          {value}
        </p>
      </div>
    </div>
  );
}