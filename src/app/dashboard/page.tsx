"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { createClient } from "@supabase/supabase-js";
import { useUser, SignInButton } from "@clerk/nextjs";
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
  model?: string; // ✅ Added 'model' directly (matches your DB column)
  result?: {
      modelUsed?: string;
  };
}

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
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
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data } = await supabase
        .from("scans")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      setScans(data as Scan[] || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto w-full flex-grow">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                    Scan History
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Track your Agentic SEO improvements over time.
                </p>
            </div>
            <Link href="/analyze">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <Zap className="h-4 w-4 fill-current" /> New Scan
                </button>
            </Link>
        </div>

        {/* LOADING */}
        {loading && (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                <p className="text-zinc-500">Loading history...</p>
            </div>
        )}

        {/* NOT SIGNED IN */}
        {!loading && !isSignedIn && (
            <div className="text-center py-24 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center">
                <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Lock className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Sign in to view history</h3>
                <p className="text-zinc-500 mb-8 max-w-md">
                    Your scan history is private. Please sign in to access your past reports.
                </p>
                <SignInButton mode="modal">
                    <button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-full font-bold hover:opacity-80 transition-opacity">
                        Sign In Now
                    </button>
                </SignInButton>
            </div>
        )}

        {/* SIGNED IN BUT EMPTY */}
        {!loading && isSignedIn && scans.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No scans yet</h3>
                <p className="text-zinc-500 mb-6 max-w-md mx-auto">
                    Run your first scan to see how AI agents view your website.
                </p>
                <Link href="/analyze">
                    <button className="text-blue-600 font-medium hover:underline">Start a Scan &rarr;</button>
                </Link>
            </div>
        )}

        {/* SCANS LIST */}
        {!loading && isSignedIn && scans.length > 0 && (
            <div className="space-y-4">
                {scans.map((scan) => (
                    <div key={scan.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6">
                        
                        {/* LEFT SIDE: Score & Info */}
                        <div className="flex items-center gap-5 w-full md:w-auto overflow-hidden">
                            <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border-4 ${getScoreColor(scan.score)}`}>
                                {scan.score || 0}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white truncate">
                                        {scan.domain || scan.url}
                                    </h3>
                                    <a href={scan.url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-blue-500 shrink-0">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-zinc-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> {formatDate(scan.created_at)}
                                    </span>
                                    <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                        {formatModelName(scan.model || scan.result?.modelUsed || "")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: Button (NOW CORRECTLY LINKED) */}
                        <Link href={`/report/${scan.id}`} className="w-full md:w-auto">
                            <button className="...">
                                View Report <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>

                    </div>
                ))}
            </div>
        )}

      </div>
      <Footer />
    </main>
  );
}

// --- HELPERS ---
function getScoreColor(score: number) {
    if (!score) return "border-gray-100 bg-gray-50 text-gray-400";
    if (score >= 80) return "border-green-100 bg-green-50 text-green-600 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-400";
    if (score >= 50) return "border-yellow-100 bg-yellow-50 text-yellow-600 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-400";
    return "border-red-100 bg-red-50 text-red-600 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-400";
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