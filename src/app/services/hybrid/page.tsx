import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Zap, Layers, Link2, BarChart3, CheckCircle2 } from "lucide-react";

export default function HybridServicePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Zap className="w-4 h-4" /> The Ultimate Strategy
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Total Market <br /> <span className="text-blue-600">Search Dominance</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          Why choose between Google clicks and AI citations when you can have both? We synchronize traditional SEO with Generative Engine Optimization to future-proof your digital growth.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/pricing/hybrid" className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
            View Hybrid Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">The Best of Both Worlds</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We eliminate silos by executing a unified campaign. Your technical foundation, content, and authority signals are optimized for both human searchers and AI agents simultaneously.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Omni-Channel Discovery</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We uncover exactly what your customers are typing into Google, and pair it with the complex prompts they are feeding into ChatGPT and Gemini.
              </p>
              <ul className="space-y-2">
                {["Combined Keyword & Prompt Research", "Search Intent vs. Answer Intent Mapping", "Technical SEO + Advanced AI Schema", "Holistic Content Gap Analysis"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Unified Content Architecture</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Your content shouldn&apos;t just read well—it needs to compute well. We balance persuasive human copywriting with RAG-optimized structuring.
              </p>
              <ul className="space-y-2">
                {["Persuasive Copywriting for Conversions", "Fact-Dense Formatting for AI Retrieval", "Multimodal Asset Optimization", "Dynamic Internal Siloing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <Link2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Hybrid Authority Building</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We combine traditional contextual link building with digital PR designed to generate the specific entity associations that LLMs trust most.
              </p>
              <ul className="space-y-2">
                {["High-DR Contextual Backlinks", "Knowledge Graph Entity Mentions", "AI Directory Submissions", "Sentiment & Review Mitigation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Single Pane of Glass Analytics</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Stop juggling reports. Our unified dashboard tracks your traditional SERP rankings alongside your AI visibility scores in real-time.
              </p>
              <ul className="space-y-2">
                {["Unified Reporting Dashboard", "Google Core Web Vitals Monitoring", "LLM Brand Mention Tracking", "Monthly Holistic Strategy Calls"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Don&apos;t leave traffic on the table.</h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Partner with us to capture today&apos;s searchers and tomorrow&apos;s AI users.
        </p>
        <Link href="/pricing/hybrid" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg transition-all hover:scale-105 shadow-xl">
          View Hybrid Plans & Pricing <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}