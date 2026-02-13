"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Bot, Search, Zap, Shield, 
  BarChart3, Globe, Code2, Cpu 
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col font-sans">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex-grow">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
            Built for the <span className="text-blue-600">AI Era</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Traditional SEO tools track Google. We track ChatGPT, Claude, and Perplexity. 
            See how your site performs when an AI Agent is the visitor.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          
          <FeatureCard 
            icon={<Bot className="text-blue-500" />}
            title="AI Agent Simulation"
            desc="We use real LLMs (Gemini & GPT-4) to visit your site. We don't just simulate a crawler; we simulate the actual 'reading' process of an AI."
          />

          <FeatureCard 
            icon={<Cpu className="text-purple-500" />}
            title="SPA & React Support"
            desc="Most scanners fail on React/Next.js apps. Our engine renders JavaScript first, ensuring we see exactly what the AI sees."
          />

          <FeatureCard 
            icon={<Shield className="text-green-500" />}
            title="Trust & Citation Scoring"
            desc="AI models prioritize 'high-authority' sources. We check for schema, SSL, and entity verification to maximize your citation chances."
          />

          <FeatureCard 
            icon={<Code2 className="text-yellow-500" />}
            title="Semantic HTML Analysis"
            desc="We parse your H-tags and structure to ensure your content hierarchy is logical and machine-readable."
          />

          <FeatureCard 
            icon={<BarChart3 className="text-red-500" />}
            title="Data Density Check"
            desc="LLMs love facts. We calculate your 'facts-per-paragraph' ratio to see if your content is dense enough to be cited as a source."
          />

          <FeatureCard 
            icon={<Globe className="text-cyan-500" />}
            title="Competitor Benchmarking"
            desc="Compare your AI visibility score against your top 3 competitors to see who is winning the 'Answer Engine' war."
          />

        </div>

        {/* BOTTOM CTA */}
        <div className="bg-zinc-900 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 pointer-events-none" />
          
          <h2 className="text-3xl font-bold text-white mb-6 relative z-10">
            Stop guessing. Start ranking in AI.
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto relative z-10">
            Join 1,000+ developers and marketers optimizing for the next generation of search.
          </p>
          
          <Link href="/analyze" className="relative z-10">
            <button className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-white/10">
              Audit Your Site Free
            </button>
          </Link>
        </div>

      </div>
      <Footer />
    </main>
  );
}

// --- HELPER COMPONENT ---

// ✅ FIXED INTERFACE
interface FeatureCardProps {
  // We tell TS: "This element definitely supports a className prop"
  icon: React.ReactElement<{ className?: string }>; 
  title: string;
  desc: string;
}

function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-colors group">
      <div className="mb-6 bg-zinc-100 dark:bg-zinc-800 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {/* ✅ FIXED: Now safely merging the existing class with our new size classes */}
        {React.cloneElement(icon, { 
          className: `h-7 w-7 ${icon.props.className || ""}` 
        })}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}