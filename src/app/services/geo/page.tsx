import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Bot, Cpu, Database, Star, CheckCircle2 } from "lucide-react";

export default function GEOServicePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Bot className="w-4 h-4" /> Generative Engine Optimization
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Be cited by <br /> <span className="text-blue-600">ChatGPT & Gemini</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          Search is evolving. We build unbreakable entity authority and optimize your data so Large Language Models (LLMs) consistently recommend your business as the definitive answer.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/pricing/geo" className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
            View GEO Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Engineering AI Trust</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              AI agents don&apos;t browse websites like humans do. We structure your brand&apos;s digital footprint so AI models can instantly extract, verify, and cite your expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Entity Authority Building</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We define your business as a distinct, verified entity in the Knowledge Graph, connecting your brand to relevant topics and trusted sources.
              </p>
              <ul className="space-y-2">
                {["Knowledge Graph Mapping", "Tier-1 AI Directory Citations", "Brand Mention Reclamation", "Digital PR for AI Trust Signals"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Advanced Schema & JSON-LD</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We deploy deeply nested structured data that acts as a direct API translation layer between your website and AI retrieval models.
              </p>
              <ul className="space-y-2">
                {["Organization & sameAs Association", "FAQ & Q&A Schema Markup", "Product & Review Rich Snippets", "Authoritative Citation Linking"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Answer-First Content (RAG)</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We restructure your content for Retrieval-Augmented Generation (RAG), answering complex user prompts directly so AI models don&apos;t have to guess.
              </p>
              <ul className="space-y-2">
                {["LLM Keyword & Prompt Research", "Fact-Dense Content Formatting", "Semantic Topic Siloing", "Multimodal Asset Optimization"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Sentiment & Reputation Tuning</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                LLMs rely heavily on the overarching sentiment associated with your brand. We monitor and manage your reputation to ensure positive AI biases.
              </p>
              <ul className="space-y-2">
                {["AI Brand Sentiment Tracking", "Review & Trust Pilot Strategies", "Negative Bias Mitigation", "Competitor AI Mention Tracking"].map((item, i) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Ready to dominate the AI ecosystem?</h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Secure your brand&apos;s position as the definitive answer across all major language models.
        </p>
        <Link href="/pricing/geo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg transition-all hover:scale-105 shadow-xl">
          View GEO Plans & Pricing <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}