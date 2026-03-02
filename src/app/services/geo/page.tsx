import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Bot, Network, Database, Sparkles, MessageSquare } from "lucide-react";

export default function GEOServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Bot className="w-4 h-4" /> AI Search Optimization
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Be the answer in <br /> <span className="text-purple-600">ChatGPT & Gemini.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Generative Engine Optimization (GEO) builds unbreakable entity authority so Large Language Models and AI overviews recommend your business first.
        </p>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Service Pillar 1 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Network className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Entity Authority Mapping</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              AI doesn&apos;`t read pages; it understands entities. We structure your brand&apos;s digital footprint using advanced JSON-LD Schema and Knowledge Panel optimization so AI models deeply understand who you are and what you offer.
            </p>
          </div>

          {/* Service Pillar 2 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Database className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">RAG Readiness</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We format your website&apos;`s content specifically for Retrieval-Augmented Generation (RAG). This ensures that when an AI bot scrapes your site to answer a live user prompt, your data is perfectly structured to be cited.
            </p>
          </div>

          {/* Service Pillar 3 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Sparkles className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Answer-First Content</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Traditional keyword stuffing is dead. We perform LLM Prompt Research to discover exactly what users are asking AI, and we restructure your content to provide the direct, authoritative answers models prefer to quote.
            </p>
          </div>

          {/* Service Pillar 4 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <MessageSquare className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">AI Trust Signals</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              LLMs rely heavily on trusted, high-authority sources for their training data. We use targeted digital PR to secure mentions of your brand in the exact publications that AI engines trust most.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-3xl p-10 border border-purple-100 dark:border-purple-800/50">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Ready to dominate AI Search?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Check out our tiered AI visibility packages to secure your place in the generative search landscape.
          </p>
          <Link 
            href="/pricing/geo"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
          >
            View Plans & Pricing
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}