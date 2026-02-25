"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@supabase/supabase-js";
import { useUser, SignInButton } from "@clerk/nextjs"; // 👈 KEEPING CLERK!
import { 
  Loader2, ExternalLink, Calendar, 
  BarChart3, ArrowRight, Zap, Lock 
} from "lucide-react";
import Link from "next/link";

// --- TYPE DEFINITIONS ---
interface Scan {
  id: string;
  url: string;
  domain?: string; 
  score: number;
  created_at: string;
  model?: string;
  result?: {
      modelUsed?: string;
  };
}

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser(); // 👈 USING CLERK STATE
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        fetchScans();
      } else {
        setLoading(false);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchScans = async () => {
    try {
      // 👇 Simply call our secure backend API route!
      const response = await fetch("/api/history");
      
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      
      const data = await response.json();
      setScans(data as Scan[] || []);
      
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col overflow-x-hidden selection:bg-blue-100 dark:selection:bg-blue-900">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto w-full flex-grow relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                    Client Dashboard
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Track your Agentic SEO improvements and past scans.
                </p>
            </div>
            <Link href="/analyze">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <Zap className="h-4 w-4 fill-current" /> New AI Scan
                </button>
            </Link>
        </div>

        {/* LOADING STATE */}
        {!isLoaded || loading ? (
            <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                <p className="text-zinc-500 font-bold">Loading your portal...</p>
            </div>
        ) : null}

        {/* NOT SIGNED IN STATE */}
        {isLoaded && !loading && !isSignedIn && (
            <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col items-center">
                <div className="bg-zinc-100 dark:bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                    <Lock className="h-10 w-10 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Sign in to view dashboard</h3>
                <p className="text-zinc-500 mb-8 max-w-md">
                    Your scan history and active PulseSEO plans are private. Please sign in to access your secure client portal.
                </p>
                {/* 👈 CLERK SIGN IN BUTTON */}
                <SignInButton mode="modal">
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg">
                        Sign In Now
                    </button>
                </SignInButton>
            </div>
        )}

        {/* SIGNED IN BUT NO SCANS YET */}
        {isLoaded && !loading && isSignedIn && scans.length === 0 && (
            <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <div className="bg-zinc-100 dark:bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No scans yet</h3>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                    You haven&apos;t run any AI visibility audits yet. Run your first scan to see how AI agents view your website.
                </p>
                <Link href="/analyze">
                    <button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-full font-bold transition-all hover:scale-105">
                        Start a Scan &rarr;
                    </button>
                </Link>
            </div>
        )}

        {/* SCANS LIST */}
        {isLoaded && !loading && isSignedIn && scans.length > 0 && (
            <div className="space-y-4">
                {scans.map((scan) => (
                    <div key={scan.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                        
                        {/* LEFT SIDE: Score & Info */}
                        <div className="flex items-center gap-6 w-full md:w-auto overflow-hidden">
                            <div className={`shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black border-8 ${getScoreColor(scan.score)}`}>
                                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${getTextGradient(scan.score)}`}>
                                    {scan.score || 0}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white truncate">
                                        {scan.domain || scan.url}
                                    </h3>
                                    <a href={scan.url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-blue-500 shrink-0 transition-colors">
                                        <ExternalLink className="h-5 w-5" />
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" /> {formatDate(scan.created_at)}
                                    </span>
                                    <span className="bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 uppercase tracking-widest text-xs">
                                        {formatModelName(scan.model || scan.result?.modelUsed || "")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Button */}
                        <Link href={`/report/${scan.id}`} className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                                View Report <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>

                    </div>
                ))}
            </div>
        )}

      </div>

      {/* Background decoration */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Footer />
    </main>
  );
}

// --- HELPERS ---
function getScoreColor(score: number) {
    if (!score) return "border-gray-100 bg-gray-50";
    if (score >= 80) return "border-blue-500 border-r-transparent border-t-transparent -rotate-45 bg-zinc-50 dark:bg-zinc-950";
    if (score >= 50) return "border-yellow-500 border-r-transparent border-t-transparent -rotate-45 bg-zinc-50 dark:bg-zinc-950";
    return "border-red-500 border-r-transparent border-t-transparent -rotate-45 bg-zinc-50 dark:bg-zinc-950";
}

function getTextGradient(score: number) {
    if (score >= 80) return "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rotate-45";
    if (score >= 50) return "from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 rotate-45";
    return "from-red-600 to-rose-600 dark:from-red-400 dark:to-rose-400 rotate-45";
}

function formatDate(dateString: string) {
    if (!dateString) return "Unknown date";
    try {
        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
    } catch (e) { return "Invalid date"; }
}

function formatModelName(model: string) {
    if (!model) return "Agent V1";
    if (model.includes("V6")) return "Gemini 2.0 (V6)";
    if (model.includes("Gemini")) return "Gemini 2.0";
    return model;
}