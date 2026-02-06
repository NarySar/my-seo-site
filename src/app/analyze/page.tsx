"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { jsPDF } from "jspdf";
import { 
  Search, Loader2, Code, Globe, FileText, Download, 
  Lightbulb, RefreshCw, CheckCircle, BarChart3, 
  HelpCircle, ChevronDown, ChevronUp, ImageIcon, Cpu, Shield, Zap
} from "lucide-react";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    runScan();
  };

  const runScan = async () => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const scanPromise = fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));
      const [response] = await Promise.all([scanPromise, delayPromise]);

      const data = await response.json();

      if (response.ok) { 
        setResult(data);
      } else {
        setError(data.summary || "Could not scan this website.");
      }
    } catch (err) {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- FIXED PDF GENERATOR ---
  const generatePDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // 1. Header (Black Bar)
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("PulseSeo.ai Analysis", 20, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Target: ${url}`, 20, 35);

    // 2. Score Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Overall Agent Score:", 20, 60);
    
    doc.setFontSize(30);
    // Color score based on value
    if (result.score >= 80) doc.setTextColor(0, 150, 0); // Green
    else if (result.score >= 50) doc.setTextColor(200, 150, 0); // Yellow
    else doc.setTextColor(200, 0, 0); // Red
    
    doc.text(`${result.score}/100`, 20, 75);
    
    // 3. Breakdown Metrics (The 5 Factors)
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("Score Breakdown:", 100, 60);
    
    doc.setFontSize(10);
    let y = 70;
    const bd = result.breakdown || {};
    const metrics = [
        { label: "Data Density", val: bd.dataDensity },
        { label: "Structure", val: bd.structure },
        { label: "Trust Signals", val: bd.trust },
        { label: "Clarity", val: bd.clarity },
        { label: "Completeness", val: bd.completeness }
    ];

    metrics.forEach(m => {
        if (m.val !== undefined) {
            doc.text(`${m.label}:`, 100, y);
            doc.text(`${m.val}/100`, 160, y);
            y += 7;
        }
    });

    // 4. Executive Summary
    y = 110;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("AI Executive Summary", 20, y);
    y += 10;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const summaryText = doc.splitTextToSize(result.summary || "No summary available.", 170);
    doc.text(summaryText, 20, y);
    y += (summaryText.length * 6) + 15;

    // 5. Improvements List
    if (result.improvements && result.improvements.length > 0) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Actionable Improvements", 20, y);
        y += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        
        result.improvements.forEach((item: string) => {
            const cleanItem = doc.splitTextToSize(`• ${item}`, 170);
            doc.text(cleanItem, 20, y);
            y += (cleanItem.length * 6) + 4;
        });
    }

    doc.save("agent-seo-report.pdf");
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
          Real-Time <span className="text-blue-600">Agent Analysis</span>
        </h1>

        <form onSubmit={handleAnalyze} className="w-full max-w-2xl relative mb-12">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-zinc-400" />
            <input
              type="url"
              placeholder="https://example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full h-14 pl-12 pr-32 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 h-10 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
            </button>
          </div>
          {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl text-center">{error}</div>}
        </form>

        {loading && <LoadingSkeleton />}

        {!loading && result && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Top Row: Score & Breakdown */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1 p-8 rounded-3xl bg-zinc-900 text-white shadow-2xl flex items-center justify-between relative overflow-hidden">
                   <div className="z-10">
                      <h2 className="text-2xl font-bold mb-2">Overall Agent Score</h2>
                      <p className="text-zinc-400 text-sm">Weighted calculation based on 5 factors.</p>
                   </div>
                   <div className="z-10 flex items-center justify-center w-24 h-24 rounded-full border-4 border-zinc-800 bg-zinc-950">
                        <span className={`text-3xl font-black ${getColor(result.score)}`}>{result.score}</span>
                   </div>
                </div>

                {result.breakdown && (
                  <div className="flex-1 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <h3 className="flex items-center gap-2 font-semibold mb-6 text-zinc-900 dark:text-white">
                        <BarChart3 className="h-4 w-4 text-blue-500" /> Score Breakdown
                      </h3>
                      <div className="space-y-4">
                          <ProgressBar 
                            label="Data Density" 
                            score={result.breakdown.dataDensity} 
                            tooltip="Does your page contain hard facts (prices, dates, specs) or just marketing fluff? AI loves raw data."
                            fix="Add specific numbers, pricing tables, or technical specifications."
                          />
                          <ProgressBar 
                            label="Structure" 
                            score={result.breakdown.structure} 
                            tooltip="Do you use H1, H2, and H3 tags correctly to organize content?"
                            fix="Ensure your main title is H1 and sub-points are H2."
                          />
                          <ProgressBar 
                            label="Trust Signals" 
                            score={result.breakdown.trust} 
                            tooltip="Can AI find your physical address, contact info, and privacy policy?"
                            fix="Add a footer with your physical address and phone number."
                          />
                          <ProgressBar 
                            label="Clarity" 
                            score={result.breakdown.clarity} 
                            tooltip="Is the language simple and direct, or complex and jargon-heavy?"
                            fix="Shorten your sentences. Aim for an 8th-grade reading level."
                          />
                          <ProgressBar 
                            label="Completeness" 
                            score={result.breakdown.completeness} 
                            tooltip="Is this a thin landing page or a deep resource?"
                            fix="Expand your content. Aim for at least 800 words."
                          />
                      </div>
                  </div>
                )}
            </div>

            {/* AI Summary */}
            <div className="mb-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
               <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">AI Executive Summary</h3>
               <p className="text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed">{result.summary}</p>
            </div>

            {/* Metrics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <MetricCard 
                icon={<Globe className="h-4 w-4 text-blue-600" />} 
                title="Main Headline" 
                value={result.mainHeadline || "No H1 Found"}
                score={result.mainHeadline ? 100 : 0}
              />
              <MetricCard 
                icon={<FileText className="h-4 w-4 text-purple-600" />} 
                title="Content Volume" 
                value={`${result.contentVolume} (${result.contentLength || 0} chars)`}
                score={result.contentVolume === "Low" ? 50 : 100}
              />
              <MetricCard 
                icon={<Code className="h-4 w-4 text-green-600" />} 
                title="Top Keywords" 
                value={result.keywords?.slice(0, 3).join(", ") || "None"}
                score={100}
              />
            </div>

             {/* Improvements & Actions */}
             <div className="p-6 rounded-2xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/50 mb-12">
                <h3 className="flex items-center gap-2 text-lg font-bold text-yellow-800 dark:text-yellow-500 mb-4">
                    <Lightbulb className="h-5 w-5" /> Recommended Improvements
                </h3>
                <ul className="space-y-3">
                    {result.improvements?.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                            <CheckCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
             </div>

             <div className="flex gap-4 justify-center mb-16">
                <button onClick={generatePDF} className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-zinc-800 flex items-center gap-2">
                    <Download className="h-4 w-4" /> Download PDF
                </button>
                <button onClick={runScan} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" /> Re-Scan
                </button>
             </div>

          </div>
        )}

        <UnderTheHood />

      </div>
      <Footer />
    </main>
  );
}

// --- SUB-COMPONENTS ---
function ProgressBar({ label, score, tooltip, fix }: { label: string, score: number, tooltip: string, fix: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group">
            <div className="flex items-center gap-3 text-sm mb-1">
                <div className="w-28 flex items-center gap-1 font-medium text-zinc-600 dark:text-zinc-400">
                    {label}
                    <div className="relative group/tooltip">
                        <HelpCircle className="h-3.5 w-3.5 text-zinc-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden w-48 p-2 bg-black text-white text-xs rounded-lg shadow-xl group-hover/tooltip:block z-50 text-center pointer-events-none">
                            {tooltip}
                        </div>
                    </div>
                </div>
                <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
                <span className="w-8 text-right font-bold text-zinc-900 dark:text-white">{score}</span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-blue-500">
                    {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
            </div>
            {isOpen && (
                <div className="ml-28 mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-zinc-600 dark:text-zinc-300 border-l-2 border-blue-500 animate-in slide-in-from-top-1">
                    <span className="font-semibold text-blue-600 block mb-1">Improvement Tip:</span>
                    {fix}
                </div>
            )}
        </div>
    )
}

function UnderTheHood() {
  return (
    <div className="w-full max-w-5xl mt-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Under the Hood</h2>
        <p className="text-zinc-500">PulseSeo isn&apos;t just a crawler. It&apos;s an Agentic Emulator.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FeatureCard icon={<ImageIcon className="h-5 w-5 text-blue-500" />} title="Vector Context Analysis" desc="We scan images for descriptive Alt Text." />
        <FeatureCard icon={<Zap className="h-5 w-5 text-yellow-500" />} title="Smart Caching" desc="Results are cached for speed." />
        <FeatureCard icon={<Shield className="h-5 w-5 text-red-500" />} title="Bot Access Control" desc="Check robots.txt for AI blockers." />
        <FeatureCard icon={<Cpu className="h-5 w-5 text-purple-500" />} title="Schema Validator" desc="Verifies JSON-LD structured data." />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-start gap-4">
      <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg shrink-0">{icon}</div>
      <div><h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{title}</h3><p className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</p></div>
    </div>
  );
}

function MetricCard({ icon, title, value, score }: any) {
    return (
      <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center">{icon}</div><h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3></div>
            <div className={`px-2 py-1 rounded text-xs font-bold ${score > 50 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{score > 50 ? "PASS" : "CHECK"}</div>
        </div>
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{value}</p>
      </div>
    );
}

function LoadingSkeleton() { return <div className="w-full max-w-5xl h-96 bg-zinc-100 animate-pulse rounded-3xl"></div>; }
function getColor(score: number) { if (score >= 80) return "text-green-500"; if (score >= 50) return "text-yellow-500"; return "text-red-500"; }