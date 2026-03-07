"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Minus, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
          Transparent pricing for every stage.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          No contracts. No lock-in. Cancel anytime. We operate on a monthly rolling basis because our results speak for themselves.
        </p>
      </section>

      {/* COMPARISON MATRIX SECTION */}
      <section className="pb-32 px-6 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
          
          {/* Table Header / Pricing */}
          <div className="grid grid-cols-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
            <div className="p-8 hidden md:block">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Compare plans</h3>
              <p className="text-sm text-zinc-500">Find the perfect strategy for your growth goals.</p>
            </div>
            
            {/* Tier 1: Traditional SEO */}
            <div className="p-6 md:p-8 text-center border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Traditional SEO</h3>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">Under development</div>
                <div className="text-sm text-zinc-500 mb-6">per month</div>
              </div>
              <button className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm transition-colors">
                Get Started
              </button>
            </div>

            {/* Tier 2: GEO (AI Search) */}
            <div className="p-6 md:p-8 text-center border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between relative">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">GEO (AI Search)</h3>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">Under development</div>
                <div className="text-sm text-zinc-500 mb-6">per month</div>
              </div>
              <button className="w-full py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-sm transition-colors">
                Get Started
              </button>
            </div>

            {/* Tier 3: Hybrid Dominance */}
            <div className="p-6 md:p-8 text-center border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between bg-blue-50/50 dark:bg-blue-900/10 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute -top-4 -right-4 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-bold px-6 py-1 rotate-45 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> RECOMMENDED
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2 mt-2">Hybrid Dominance</h3>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">Under development</div>
                <div className="text-sm text-zinc-500 mb-6">per month</div>
              </div>
              <button className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/25">
                Get Started
              </button>
            </div>
          </div>

          {/* TABLE ROWS */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            
            {/* Category: Strategy & Setup */}
            <div className="bg-zinc-50 dark:bg-zinc-950/30 py-3 px-8 text-sm font-bold text-zinc-500 uppercase tracking-wider">
              Strategy & Setup
            </div>
            <FeatureRow title="Custom Strategy & Roadmap" desc="Personalized plan built around your business goals." t1={true} t2={true} t3={true} />
            <FeatureRow title="Live Data Dashboard" desc="Track your human and AI traffic 24/7." t1={true} t2={true} t3={true} />
            
            {/* Category: Traditional SEO */}
            <div className="bg-zinc-50 dark:bg-zinc-950/30 py-3 px-8 text-sm font-bold text-zinc-500 uppercase tracking-wider mt-4">
              Traditional Google SEO
            </div>
            <FeatureRow title="Technical SEO Audits" desc="Fixing site speed, indexing, and mobile errors." t1={true} t2={false} t3={true} />
            <FeatureRow title="High-Intent Keyword Mapping" desc="Targeting phrases humans type into Google." t1={true} t2={false} t3={true} />
            <FeatureRow title="Authority Link Building" desc="Acquiring backlinks from high-DR websites." t1={true} t2={false} t3={true} />

            {/* Category: GEO (AI Visibility) */}
            <div className="bg-purple-50/50 dark:bg-purple-950/10 py-3 px-8 text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mt-4">
              Generative Engine Optimization (AI)
            </div>
            <FeatureRow title="RAG Content Formatting" desc="Structuring content for LLM retrieval and Q&A." t1={false} t2={true} t3={true} />
            <FeatureRow title="Entity & Knowledge Graph" desc="Injecting semantic schema to establish identity." t1={false} t2={true} t3={true} />
            <FeatureRow title="Brand Sentiment Engineering" desc="Ensuring AI models view your brand positively." t1={false} t2={true} t3={true} />
            <FeatureRow title="AI Prompt Research" desc="Finding exactly what users ask ChatGPT in your niche." t1={false} t2={true} t3={true} />

          </div>
        </div>

        {/* Call to Action Below Table */}
        <div className="mt-16 text-center bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-10 border border-blue-100 dark:border-blue-900/50">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Not sure which plan you need?</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Run your website through our proprietary 6-Pillar scanner to see exactly where your current strategy is failing. 
          </p>
          <Link href="/analyze">
            <button className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-8 py-3.5 rounded-full font-bold transition-all shadow-sm">
              Run Free Hybrid Audit
            </button>
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}

// Helper Component for the Table Rows
function FeatureRow({ title, desc, t1, t2, t3 }: { title: string, desc: string, t1: boolean, t2: boolean, t3: boolean }) {
  return (
    <div className="grid grid-cols-4 items-center hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
      <div className="p-4 md:p-6 pl-8">
        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{title}</h4>
        <p className="text-xs text-zinc-500 mt-1 hidden md:block">{desc}</p>
      </div>
      <div className="p-4 md:p-6 text-center border-l border-zinc-200 dark:border-zinc-800 flex justify-center">
        {t1 ? <CheckCircle2 className="w-5 h-5 text-zinc-400" /> : <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />}
      </div>
      <div className="p-4 md:p-6 text-center border-l border-zinc-200 dark:border-zinc-800 flex justify-center">
        {t2 ? <CheckCircle2 className="w-5 h-5 text-purple-400 dark:text-purple-600" /> : <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />}
      </div>
      <div className="p-4 md:p-6 text-center border-l border-zinc-200 dark:border-zinc-800 flex justify-center bg-blue-50/30 dark:bg-blue-900/5">
        {t3 ? <CheckCircle2 className="w-5 h-5 text-blue-500" /> : <Minus className="w-5 h-5 text-zinc-300 dark:text-zinc-700" />}
      </div>
    </div>
  );
}