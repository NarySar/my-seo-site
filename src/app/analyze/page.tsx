"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Search, Loader2, Code, Globe, AlertTriangle, 
  FileText, ImageIcon, Link as LinkIcon, HelpCircle 
} from "lucide-react";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch("/api/scan", {
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
            Check your Agentic SEO score. We analyze structure, content depth, and accessibility for AI models.
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

        {/* RESULTS GRID */}
        {result && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Bar: Title */}
            <div className="mb-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Page Title</h3>
                  <p className="text-xl font-medium text-zinc-900 dark:text-white mb-2">{result.title}</p>
                  <p className="text-zinc-500 italic">"{result.metaDescription}"</p>
                </div>
                {/* Tooltip Icon */}
                <Tooltip text="The main title and description shown in Google search results. Agents use this to decide if your page is relevant." />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* 1. H1 Tag */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Primary Topic (H1)</h3>
                    </div>
                    <Tooltip text="The main headline (H1) tells AI agents exactly what this specific page is about. It should be clear and descriptive." />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">"{result.h1Text}"</p>
              </div>

              {/* 2. Schema Data */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${result.jsonLdCount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                      <Code className={`h-4 w-4 ${result.jsonLdCount > 0 ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Structured Data</h3>
                  </div>
                  <Tooltip text="Hidden code (JSON-LD) that feeds facts directly to AI. It tells bots your price, rating, address, and hours in a language they understand." />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Found {result.jsonLdCount} Schema snippets.</p>
              </div>

              {/* 3. Word Count (Context) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${result.wordCount > 300 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                      <FileText className={`h-4 w-4 ${result.wordCount > 300 ? 'text-green-600' : 'text-yellow-600'}`} />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Content Depth</h3>
                  </div>
                  <Tooltip text="AI models need text to understand context. Pages with under 300 words are often ignored by agents as 'too thin' to be useful." />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong>{result.wordCount}</strong> words. 
                  {result.wordCount < 300 ? " Too thin for AI training." : " Good context for Agents."}
                </p>
              </div>

              {/* 4. Image Alt Text */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${result.missingAlt === 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                      <ImageIcon className={`h-4 w-4 ${result.missingAlt === 0 ? 'text-green-600' : 'text-red-600'}`} />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Image Context</h3>
                  </div>
                  <Tooltip text="AI cannot 'see' images. They read the Alt Text description. If missing, the AI treats the image as a blank hole in your content." />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {result.totalImages} Images. 
                  {result.missingAlt > 0 ? <span className="text-red-500 font-bold"> {result.missingAlt} missing Alt text.</span> : " All optimized."}
                </p>
              </div>

              {/* 5. Link Count */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <LinkIcon className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Connections</h3>
                  </div>
                  <Tooltip text="Links tell AI that your page is connected to other relevant info. Isolated pages (orphans) are trusted less by search bots." />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Found <strong>{result.totalLinks}</strong> links. {result.totalLinks > 0 ? "Good connectivity." : "Page is orphaned."}
                </p>
              </div>

              {/* 6. Robots Tag */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-gray-600" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">Bot Access</h3>
                  </div>
                  <Tooltip text="The 'Do Not Enter' sign for robots. If this says 'noindex', AI agents are blocked from learning anything on this page." />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">{result.robotsTag}</p>
              </div>

            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

// Simple Tooltip Component
function Tooltip({ text }: { text: string }) {
  return (
    <div className="group relative flex items-center justify-center cursor-help">
      <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-blue-500 transition-colors" />
      <div className="absolute bottom-full mb-2 hidden w-48 p-2 bg-black text-white text-xs rounded-lg shadow-xl group-hover:block z-50 text-center pointer-events-none">
        {text}
        {/* Little arrow pointing down */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}