"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { createClient } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Loader2, CheckCircle2, AlertCircle, Zap, 
  Globe, ArrowLeft 
} from "lucide-react";
import Link from "next/link";

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ 1. DEFINE THE SHAPE OF YOUR DATA
interface ScanResult {
  score: number;
  summary: string;
  improvements: string[];
  breakdown: {
    dataDensity: number;
    structure: number;
    trust: number;
    clarity: number;
    completeness: number;
  };
}

interface ScanData {
  id: string;
  domain: string;
  model: string;
  created_at: string;
  result: ScanResult;
}

// Helper function for colors
function getColor(score: number) {
  if (score >= 80) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

function getColorBg(score: number) {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
}

function ProgressBar({ label, score }: { label: string, score: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="text-sm font-bold text-zinc-100">{score}/100</span>
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${getColorBg(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function ReportPage() {
  const params = useParams(); // ✅ Fixed: safely grab params
  const id = params?.id as string;

  // ✅ 2. USE THE INTERFACE HERE
  const [scan, setScan] = useState<ScanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("scans")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching report:", error);
      } else {
        setScan(data);
      }
      setLoading(false);
    }
    fetchReport();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
    </div>
  );

  if (!scan) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
      <h1 className="text-2xl font-bold">Report Not Found</h1>
      <Link href="/dashboard" className="text-blue-400 hover:underline">Back to Dashboard</Link>
    </div>
  );

  const result = scan.result;

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-6 max-w-6xl mx-auto w-full">
        
        {/* Header / Back Button */}
        <div className="mb-8">
           <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4">
             <ArrowLeft className="h-4 w-4" /> Back to Dashboard
           </Link>
           <h1 className="text-3xl font-bold text-white flex items-center gap-3">
             <Globe className="text-blue-500" /> 
             Audit Report: <span className="text-blue-400">{scan.domain}</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1">
             Scanned on {new Date(scan.created_at).toLocaleDateString()} • Model: {scan.model || "Legacy"}
           </p>
        </div>

        {/* --- REPORT CONTENT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            
            {/* Score Box */}
            <div className="md:col-span-5 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
              <h3 className="text-zinc-400 font-medium mb-4 uppercase tracking-widest text-xs">Overall Agent Score</h3>
              <div className={`text-8xl font-black mb-2 tracking-tighter ${getColor(result.score)}`}>
                {result.score}
              </div>
              <div className="flex gap-2 mb-6">
                {result.score >= 80 ? <CheckCircle2 className="text-green-500" /> : <AlertCircle className="text-yellow-500" />}
                <span className="text-zinc-300 font-medium">
                  {result.score >= 80 ? "AI Ready" : "Needs Optimization"}
                </span>
              </div>
            </div>

            {/* Breakdown Bars */}
            <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
              <h3 className="text-zinc-400 font-medium mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <Zap className="h-4 w-4" /> Score Breakdown
              </h3>
              <div className="space-y-6">
                 <ProgressBar label="Data Density" score={result.breakdown?.dataDensity || 0} />
                 <ProgressBar label="Structure" score={result.breakdown?.structure || 0} />
                 <ProgressBar label="Trust Signals" score={result.breakdown?.trust || 0} />
                 <ProgressBar label="Clarity" score={result.breakdown?.clarity || 0} />
                 <ProgressBar label="Completeness" score={result.breakdown?.completeness || 0} />
              </div>
            </div>
        </div>

        {/* Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
            <h3 className="text-zinc-400 font-medium mb-4 uppercase tracking-widest text-xs">AI Executive Summary</h3>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {result.summary || "No summary available for this report."}
            </p>
        </div>

        {/* Action Plan */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">⚡ Action Plan</h3>
            <div className="space-y-3">
              {result.improvements?.map((item: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-zinc-800/50">
                  <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}