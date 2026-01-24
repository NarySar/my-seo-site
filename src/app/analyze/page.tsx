"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Loader2, CheckCircle, AlertTriangle, XCircle, Globe, Code } from "lucide-react";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  // We now store real data here
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      // Call our new Real API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError("Could not scan this website. (It might block bots)");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center min-h-[80vh]">
        <div className="text-center max-w-3xl mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Real-Time <span className="text-blue-600">Agent Analysis</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Enter a URL to perform a live scrape. We analyze the HTML structure for AI readability.
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="w-full max-w-2xl relative mb-16">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
            <input
              type="url"
              placeholder="https://example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-14 pl-12 pr-32 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
            </button>
          </div>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>

        {/* Display Real Results */}
        {result && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Bar: Title & Meta */}
            <div className="mb-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Page Title</h3>
              <p className="text-xl font-medium text-zinc-900 dark:text-white mb-4">{result.title}</p>
              
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Meta Description</h3>
              <p className="text-zinc-600 dark:text-zinc-300 italic">"{result.metaDescription}"</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1: JSON-LD Status */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${result.jsonLdCount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                    {result.jsonLdCount > 0 ? <Code className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Structured Data</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Found <strong>{result.jsonLdCount}</strong> Schema entities.
                  {result.jsonLdCount === 0 ? " Critical missing piece for AI." : " Good for Knowledge Graph."}
                </p>
              </div>

              {/* Card 2: H1 Tag */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                 <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">H1 Tag</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  "{result.h1Text}"
                </p>
              </div>

              {/* Card 3: Robots Tag */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                 <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Bot Permissions</h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {result.robotsTag}
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