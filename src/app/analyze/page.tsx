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
  const [scores, setScores] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResult(null);
    setScores(null);
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
        setScores(calculateSeoScore(data.data));
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

        <form onSubmit={handleAnalyze} className="w-full max-w-2xl relative mb-12">
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

        {/* RESULTS AREA */}
        {result && scores && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- OVERALL SCORE CARD --- */}
            <div className="mb-8 p-8 rounded-3xl bg-zinc-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
               {/* Background Glow */}
               <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${scores.overall >= 80 ? 'from-green-500/20' : scores.overall >= 50 ? 'from-yellow-500/20' : 'from-red-500/20'} to-transparent rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none`}></div>
               
               <div className="z-10 text-center md:text-left mb-6 md:mb-0">
                  <h2 className="text-3xl font-bold mb-2">Overall Agent Score</h2>
                  <p className="text-zinc-400 max-w-md">
                    {scores.overall >= 90 ? "Excellent! This site is perfectly optimized for AI agents." : 
                     scores.overall >= 70 ? "Good job. A few tweaks will make this site agent-ready." : 
                     "Needs work. AI agents may struggle to understand this content."}
                  </p>
               </div>

               {/* Big Circle Score */}
               <div className="z-10 relative">
                  <div className="flex items-center justify-center w-32 h-32 rounded-full border-8 border-zinc-800 bg-zinc-950 shadow-inner">
                    <span className={`text-4xl font-black ${getColor(scores.overall)}`}>{scores.overall}</span>
                  </div>
               </div>
            </div>

            {/* --- PAGE IDENTITY (15%) --- */}
            <div className="mb-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Page Identity</h3>
                  <p className="text-xl font-medium text-zinc-900 dark:text-white mb-2">{result.title}</p>
                  <p className="text-zinc-500 italic">"{result.metaDescription}"</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <ScoreBadge score={scores.meta} />
                  <span className="text-xs font-medium text-zinc-400">Impact: 15%</span>
                </div>
              </div>
            </div>

            {/* --- METRICS GRID --- */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* 1. H1 Tag (10%) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between">
                 <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Globe className="h-4 w-4 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-zinc-900 dark:text-white">Primary Topic</h3>
                        </div>
                        <Tooltip text="The main headline (H1). Agents use this to confirm the page topic." />
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">"{result.h1Text}"</p>
                 </div>
                 <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <span className="text-xs font-medium text-zinc-400">Impact: 10%</span>
                    <ScoreBadge score={scores.h1} />
                 </div>
              </div>

              {/* 2. Structured Data (20%) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${result.jsonLdCount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        <Code className={`h-4 w-4 ${result.jsonLdCount > 0 ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Structured Data</h3>
                    </div>
                    <Tooltip text="JSON-LD code that feeds facts (price, rating, hours) directly to AI." />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Found {result.jsonLdCount} Schema snippets.</p>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <span className="text-xs font-medium text-zinc-400">Impact: 20%</span>
                    <ScoreBadge score={scores.schema} />
                 </div>
              </div>

              {/* 3. Word Count (25%) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${result.wordCount > 300 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                        <FileText className={`h-4 w-4 ${result.wordCount > 300 ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Content Depth</h3>
                    </div>
                    <Tooltip text="Agents need at least 300 words to understand context. >1000 is ideal." />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    <strong>{result.wordCount}</strong> words. 
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <span className="text-xs font-medium text-zinc-400">Impact: 25%</span>
                    <ScoreBadge score={scores.content} />
                 </div>
              </div>

              {/* 4. Image Alt Text (20%) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${scores.images > 80 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        <ImageIcon className={`h-4 w-4 ${scores.images > 80 ? 'text-green-600' : 'text-red-600'}`} />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Image Context</h3>
                    </div>
                    <Tooltip text="Percentage of images with descriptions. 100% is required for AI vision." />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    {result.totalImages} Images. <br/>
                    {result.missingAlt > 0 ? <span className="text-red-500 font-bold"> {result.missingAlt} missing descriptions.</span> : " All optimized."}
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <span className="text-xs font-medium text-zinc-400">Impact: 20%</span>
                    <ScoreBadge score={scores.images} />
                 </div>
              </div>

              {/* 5. Connections (10%) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <LinkIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Connections</h3>
                    </div>
                    <Tooltip text="Links prove your page is connected to the web. 0 links = 'Orphaned' page." />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Found <strong>{result.totalLinks}</strong> links.
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <span className="text-xs font-medium text-zinc-400">Impact: 10%</span>
                    <ScoreBadge score={scores.links} />
                 </div>
              </div>

              {/* 6. Robots Tag (Critical Check - No Impact %) */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative flex flex-col justify-between">
                <div>
                   <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-gray-600" />
                      </div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">Bot Access</h3>
                    </div>
                    <Tooltip text="If 'noindex' is found, score drops to 0 immediately." />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words mb-4">{result.robotsTag}</p>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2">
                    <span className="text-xs font-medium text-zinc-400">Critical Check</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${scores.robots === 100 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {scores.robots === 100 ? "PASS" : "FAIL"}
                    </div>
                 </div>
              </div>

            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---

function Tooltip({ text }: { text: string }) {
  return (
    <div className="group relative flex items-center justify-center cursor-help">
      <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-blue-500 transition-colors" />
      <div className="absolute bottom-full mb-2 hidden w-48 p-2 bg-black text-white text-xs rounded-lg shadow-xl group-hover:block z-50 text-center pointer-events-none">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  let color = "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300";
  if (score >= 80) color = "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300";
  else if (score >= 50) color = "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300";

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
      {score}/100
    </div>
  );
}

function getColor(score: number) {
  if (score >= 90) return "text-green-500";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
}

// --- SCORING MATH ---
function calculateSeoScore(data: any) {
  let h1 = data.h1Text && data.h1Text !== "No H1 tag found" ? 100 : 0;
  let schema = data.jsonLdCount > 0 ? 100 : 0;
  
  let content = 0;
  if (data.wordCount > 1000) content = 100;
  else if (data.wordCount > 600) content = 80;
  else if (data.wordCount > 300) content = 50;
  
  let images = 100;
  if (data.totalImages > 0) {
     const validRatio = (data.totalImages - data.missingAlt) / data.totalImages;
     images = Math.round(validRatio * 100);
  }

  let links = data.totalLinks > 0 ? 100 : 0;
  let robots = data.robotsTag.includes("noindex") ? 0 : 100;

  let meta = 100;
  if (!data.title || data.title === "No title found") meta -= 50;
  if (!data.metaDescription || data.metaDescription === "No description found") meta -= 50;

  let overall = Math.round(
    (content * 0.25) + 
    (schema * 0.20) + 
    (images * 0.20) + 
    (meta * 0.15) + 
    (links * 0.10) +
    (h1 * 0.10)
  );

  if (robots === 0) overall = 0;

  return { overall, h1, schema, content, images, links, robots, meta };
}