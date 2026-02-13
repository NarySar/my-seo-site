"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// 👇 Added 'Globe' to imports
import { Book, Code, Zap, Shield, FileText, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

// ✅ Define Interface for DocCard
interface DocCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col font-sans">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex-grow flex flex-col md:flex-row gap-12">
        
        {/* LEFT SIDEBAR (Sticky) */}
        <aside className="md:w-64 flex-shrink-0">
          <div className="sticky top-32 space-y-8">
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 px-2">Getting Started</h3>
              <div className="space-y-1">
                <SidebarLink active>Introduction</SidebarLink>
                <SidebarLink>How it Works</SidebarLink>
                <SidebarLink>Interpreting Scores</SidebarLink>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 px-2">Scoring Criteria</h3>
              <div className="space-y-1">
                <SidebarLink>Data Density</SidebarLink>
                <SidebarLink>Trust Signals</SidebarLink>
                <SidebarLink>Semantic Structure</SidebarLink>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-grow max-w-3xl space-y-16">
          
          {/* Section: Intro */}
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider">
              <Book className="h-3 w-3" /> Documentation
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              What is Agentic SEO?
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Traditional SEO optimizes for Google&apos;s algorithm. <strong>Agentic SEO</strong> optimizes for AI Agents (like ChatGPT, Claude, and Perplexity).
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When a user asks ChatGPT <em>&quot;What is the best CRM for small business?&quot;</em>, the AI reads dozens of websites in seconds. It doesn&apos;t look for keywords—it looks for <strong>Trust</strong>, <strong>Data Density</strong>, and <strong>Clarity</strong>. PulseSeo helps you rank in these AI answers.
            </p>
          </section>

          {/* Section: The Metrics */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">The 5 Core Metrics</h2>
            
            <DocCard 
              icon={<Zap className="text-yellow-500" />}
              title="Data Density"
              desc="AI loves facts. We measure how many specific numbers, prices, dates, and specifications appear in your text. Fluff text lowers this score."
            />
            
            <DocCard 
              icon={<Code className="text-blue-500" />}
              title="Semantic Structure"
              desc="AI reads code, not pixels. We verify that your H1, H2, and H3 tags create a logical outline that an LLM can easily parse."
            />

            <DocCard 
              icon={<Shield className="text-green-500" />}
              title="Trust Signals"
              desc="AI is programmed to avoid misinformation. We look for citations, author bios, privacy policies, and HTTPS to verify legitimacy."
            />
            
            <DocCard 
              icon={<FileText className="text-purple-500" />}
              title="Content Clarity"
              desc="Complex sentence structures confuse AI models. We score your readability to ensure LLMs can summarize your content accurately."
            />

             {/* 👇 ADDED THE MISSING 5TH METRIC */}
            <DocCard 
              icon={<Globe className="text-cyan-500" />}
              title="Topic Completeness"
              desc="Does your page answer the user intent fully? We check if you cover related entities and sub-topics compared to top-ranking results."
            />
          </section>

          {/* Section: Call to Action */}
          <div className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to optimize?</h3>
            <p className="text-zinc-400 mb-8">Run a free scan on your landing page today.</p>
            <Link href="/analyze">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all">
                Run Audit
              </button>
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}

// --- HELPER COMPONENTS ---

function SidebarLink({ children, active }: { children: React.ReactNode, active?: boolean }) {
  return (
    <button className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" 
        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
    }`}>
      {children}
    </button>
  );
}

function DocCard({ icon, title, desc }: DocCardProps) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
      <div className="shrink-0 h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}