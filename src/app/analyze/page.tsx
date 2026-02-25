"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Loader2, Globe, Sparkles, Zap, Search, 
  AlertCircle, CheckCircle2, Shield, FileText, 
  Image as ImageIcon, Database, HelpCircle
} from "lucide-react";

// --- TYPE DEFINITIONS ---
interface AnalysisResult {
  score: number;
  crawlable: boolean;
  wordCount: number;
  hasSchema: boolean;
  summary: string;
  breakdown: {
    dataDensity: number;
    structure: number;
    trust: number;
    clarity: number;
    completeness: number;
  };
  improvements: string[];
}

const SCAN_STEPS = [
  "Initializing Agentic Crawler...",
  "Analyzing Vector Context & Alt Text...",
  "Checking JSON-LD Schema Validity...",
  "Calculating Token Density...",
  "Evaluating Entity Authority...",
  "Finalizing Agentic Score..."
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

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        
        {/* HERO SECTION */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" /> The New Standard for AI Visibility
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Analyze your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">AI Visibility</span>
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

        {/* COOL LOADING STATE */}
        {loading && (
          <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center shadow-xl animate-in fade-in zoom-in-95">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Running Deep Scan...</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">
              {SCAN_STEPS[scanStep]}
            </p>
          </div>
        )}

        {/* RESULTS SECTION */}
        {result && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            
            {/* SCORE & BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Score Box */}
              <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                <h3 className="text-zinc-500 dark:text-zinc-400 font-bold mb-6 uppercase tracking-widest text-xs">Overall Agent Score</h3>
                
                <div className="relative w-48 h-48 shrink-0 rounded-full border-[12px] border-zinc-50 dark:border-zinc-950 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 shadow-inner mb-6">
                  <div className={`absolute inset-0 rounded-full border-[12px] border-r-transparent border-t-transparent -rotate-45 ${getRingColor(result.score)}`}></div>
                  <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getTextGradient(result.score)}`}>
                    {result.score}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                  {result.score >= 80 ? <CheckCircle2 className="text-green-500 w-5 h-5" /> : <AlertCircle className="text-yellow-500 w-5 h-5" />}
                  <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm uppercase tracking-wider">
                    {result.score >= 80 ? "Highly Visible" : result.score >= 50 ? "Needs Optimization" : "Invisible to AI"}
                  </span>
                </div>
              </div>

              {/* Breakdown Bars */}
              <div className="md:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
                <h3 className="text-zinc-500 dark:text-zinc-400 font-bold mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                  <Zap className="h-4 w-4" /> Score Breakdown
                </h3>
                <div className="space-y-6">
                   <ProgressBar label="Data Density" score={result.breakdown?.dataDensity || 0} explanation="Unique, specific info per paragraph." fix="Add tables, specific pricing, and specs." />
                   <ProgressBar label="Structure & Hierarchy" score={result.breakdown?.structure || 0} explanation="Logical HTML outline for AI parsers." fix="Ensure exact H1 and logical H2/H3 nesting." />
                   <ProgressBar label="Trust Signals" score={result.breakdown?.trust || 0} explanation="Indicators of authority (Authors, SSL)." fix="Add an Author section and link out to sources." />
                   <ProgressBar label="Content Clarity" score={result.breakdown?.clarity || 0} explanation="Ease of LLM parsing." fix="Shorten sentences. Break up long paragraphs." />
                   <ProgressBar label="Completeness" score={result.breakdown?.completeness || 0} explanation="Coverage of user intent." fix="Add an FAQ section to address related questions." />
                </div>
              </div>
            </div>

            {/* AI EXECUTIVE SUMMARY */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
              <h3 className="text-zinc-500 dark:text-zinc-400 font-bold mb-4 uppercase tracking-widest text-xs">AI Executive Summary</h3>
              <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
                {result.summary || "No summary generated for this scan."}
              </p>
            </div>

            {/* ACTION PLAN */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">⚡ Action Plan</h3>
              <div className="space-y-3">
                {result.improvements.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-zinc-800/50">
                    <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* UNDER THE HOOD - ALWAYS SHOWS */}
        <div className="mt-24 pt-16 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-3xl font-bold text-center mb-4 text-zinc-900 dark:text-white">Under the Hood</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
              PulseSeo isn&apos;t just a crawler. It&apos;s an Agentic Emulator that reads your site exactly like ChatGPT does.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard icon={<ImageIcon className="text-blue-500" />} title="Vector Context Analysis" desc="We scan your images for descriptive Alt Text, ensuring AI Vision models can 'see' your products." />
              <FeatureCard icon={<FileText className="text-green-500" />} title="Token Density Check" desc="AI skips 'thin' content. We calculate if your page has enough depth for an LLM to cite it." />
              <FeatureCard icon={<Database className="text-purple-500" />} title="Schema Validator" desc="Structured Data (JSON-LD) is the language of AI. We verify your LocalBusiness and Product tags." />
              <FeatureCard icon={<Shield className="text-red-500" />} title="Bot Access Control" desc="Ensure you aren't accidentally blocking GPTBot or Google-Extended in your robots.txt." />
              <FeatureCard icon={<Globe className="text-cyan-500" />} title="Entity Authority" desc="We check if your H1s and Meta Tags establish a clear 'Entity' for Knowledge Graphs." />
              <FeatureCard icon={<Zap className="text-yellow-500" />} title="Smart Caching" desc="Results are cached for speed, allowing you to track improvements over time." />
            </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---

function ProgressBar({ label, score, explanation, fix }: { label: string, score: number, explanation: string, fix: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <div className="flex justify-between mb-2 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{label}</span>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
            title="Click for details"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{score}/100</span>
      </div>
      
      <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${score}%` }}
        />
      </div>

      {isOpen && (
        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 mb-4 text-sm border-l-2 border-blue-500 animate-in fade-in slide-in-from-top-2">
          <p className="text-zinc-700 dark:text-zinc-300 mb-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">What is this?</span> {explanation}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-bold text-green-600 dark:text-green-400">How to fix:</span> {fix}
          </p>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-start gap-4 hover:border-blue-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
       <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
         <div className="h-6 w-6 [&>*]:h-full [&>*]:w-full">{icon}</div>
       </div>
       <div>
         <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">{title}</h3>
         <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}

// Helpers for the new Score Circle
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