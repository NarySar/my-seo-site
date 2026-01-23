"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    
    // Simulate an AI scan (Wait 2 seconds then show results)
    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center min-h-[80vh]">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Live Agent Simulator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            See how AI Agents <br />
            view your website.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Enter your URL below to simulate an LLM scrape (ChatGPT, Claude, Gemini).
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleAnalyze} className="w-full max-w-2xl relative mb-16">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
            <input
              type="url"
              placeholder="https://example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-14 pl-12 pr-32 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-lg shadow-zinc-200/50 dark:shadow-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Scanning...
                </>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </form>

        {/* Results Mockup (Only shows after "Scanning") */}
        {analyzed && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Card 1: JSON-LD */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Structured Data</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  We found 2 Schema.org entities. Your site is readable by Google's Knowledge Graph.
                </p>
              </div>

              {/* Card 2: Robots.txt */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Agent Permissions</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Your robots.txt does not explicitly block GPTBot, but it's missing specific allow rules.
                </p>
              </div>

              {/* Card 3: Performance */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Readability Score</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  AI Agents can read 85% of your content. Some text is hidden behind JavaScript.
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
      <Footer />
    </main>
  );
}