"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Globe, Shield, Zap, Search } from "lucide-react";

// --- TYPE DEFINITIONS ---
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
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Analyze your <span className="text-blue-600">AI Visibility</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            See how AI agents view your content.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="max-w-xl mx-auto mb-16 relative">
          <div className="relative flex items-center">
            <Globe className="absolute left-4 h-5 w-5 text-zinc-400" />
            <input
              type="url"
              placeholder="https://example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
            </button>
          </div>
          {error && <div className="mt-4 text-red-500 text-center text-sm">{error}</div>}
        </form>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 mb-8 text-center">
              <h2 className="text-xl font-semibold mb-2 text-zinc-600 dark:text-zinc-400">
                Overall AI Score
              </h2>
              <div className={`text-6xl font-bold mb-4 ${getColor(result.score)}`}>
                {result.score}/100
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard icon={<Search className="h-5 w-5" />} title="Crawlability" value={result.crawlable ? "Yes" : "No"} score={result.crawlable ? 100 : 0} />
              <MetricCard icon={<Globe className="h-5 w-5" />} title="Word Count" value={result.wordCount} score={Math.min(100, Math.floor((result.wordCount / 1000) * 100))} />
              <MetricCard icon={<Shield className="h-5 w-5" />} title="Schema" value={result.hasSchema ? "Yes" : "No"} score={result.hasSchema ? 100 : 0} />
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-4">Improvements</h3>
              <ul className="space-y-2">
                {result.improvements.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-500 font-bold">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

function MetricCard({ icon, title, value, score }: MetricCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-sm text-zinc-500">{title}</h3>
      <div className="text-xl font-bold">{value}</div>
      {score !== undefined && <div className="text-xs text-zinc-400 mt-1">Score: {score}</div>}
    </div>
  );
}

function getColor(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}