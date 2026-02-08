"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Loader2, Globe, Shield, Zap, Search 
} from "lucide-react";

// --- TYPE DEFINITIONS ---

// 1. Define the shape of the API response
interface AnalysisResult {
  score: number;
  crawlable: boolean;
  wordCount: number;
  hasSchema: boolean;
  improvements: string[];
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  score?: number;
}

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 2. FIX: Use the interface instead of 'any'
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

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

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze website");
      }

      setResult(data);
      
    // 3. FIX: Remove ': any' and handle the unknown type safely
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Analyze your <span className="text-blue-600">AI Visibility</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            See how Large Language Models (LLMs) like ChatGPT, Gemini, and Claude view your website content.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleAnalyze} className="max-w-xl mx-auto mb-16 relative">
          <div className="relative flex items-center">
            <Globe className="absolute left-4 h-5 w-5 text-zinc-400" />
            <input
              type="url"
              placeholder="https://example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  Analyze <Zap className="h-4 w-4 fill-current" />
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}
        </form>

        {/* RESULTS SECTION */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* SCORE CARD */}
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2 text-zinc-600 dark:text-zinc-400">
                  Overall AI Optimization Score
                </h2>
                <div className={`text-6xl md:text-7xl font-bold mb-4 ${getColor(result.score)}`}>
                  {result.score}/100
                </div>
                <p className="text-zinc-500 max-w-lg mx-auto">
                  {result.score >= 80 
                    ? "Excellent! Your site is highly visible to AI agents." 
                    : result.score >= 50 
                    ? "Good start, but there are some critical issues blocking AI crawlers." 
                    : "Your site is largely invisible to AI. Critical fixes needed."}
                </p>
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard 
                icon={<Search className="h-5 w-5" />} 
                title="Crawlability" 
                value={result.crawlable ? "Accessible" : "Blocked"} 
                score={result.crawlable ? 100 : 0} 
              />
              <MetricCard 
                icon={<Globe className="h-5 w-5" />} 
                title="Content Clarity" 
                value={result.wordCount > 500 ? "Good Depth" : "Too Thin"} 
                score={Math.min(100, Math.floor((result.wordCount / 1000) * 100))} 
              />
              <MetricCard 
                icon={<Shield className="h-5 w-5" />} 
                title="Structured Data" 
                value={result.hasSchema ? "Detected" : "Missing"} 
                score={result.hasSchema ? 100 : 0} 
              />
            </div>

            {/* IMPROVEMENTS LIST */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-500 fill-current" /> 
                Action Plan
              </h3>
              <div className="space-y-4">
                {result.improvements.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                    <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEATURES (Only show when no result) */}
        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 opacity-50 hover:opacity-100 transition-opacity">
            <FeatureCard 
              icon={<Search className="h-5 w-5 text-blue-500" />}
              title="Vector Context Analysis"
              desc="We scan images for context to ensure AI vision models understand them."
            />
            <FeatureCard 
              icon={<Zap className="h-5 w-5 text-yellow-500" />}
              title="Smart Caching"
              desc="Results are cached for speed."
            />
            <FeatureCard 
              icon={<Shield className="h-5 w-5 text-red-500" />}
              title="Bot Access Control"
              desc="Check robots.txt for AI blocking rules."
            />
             <FeatureCard 
              icon={<Globe className="h-5 w-5 text-purple-500" />}
              title="Schema Validator"
              desc="Verifies JSON-LD structured data."
            />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---

function MetricCard({ icon, title, value, score }: MetricCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center text-center">
      <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center text-zinc-500 mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-1">
        {title}
      </h3>
      <div className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
        {value}
      </div>
      {score !== undefined && (
        <div className={`text-xs font-bold px-2 py-1 rounded-full ${
          score >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
          score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          Score: {score}/100
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-start gap-4">
      <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-1 text-sm">
          {title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

function getColor(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}