import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Zap, Target, Layers, Globe, RefreshCw } from "lucide-react";

export default function HybridServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Zap className="w-4 h-4" /> The Ultimate Strategy
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          The best of both worlds: <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Google & AI.
          </span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Our Hybrid approach combines the foundational power of traditional SEO with the cutting-edge visibility of Generative Engine Optimization for total market dominance.
        </p>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-t-4 border-blue-500 shadow-sm transition-transform hover:-translate-y-1">
            <Target className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Unified Intent Mapping</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We don&apos;t just research keywords; we research conversations. We map traditional Google search volumes alongside AI prompt trends to capture users everywhere.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-t-4 border-purple-500 shadow-sm transition-transform hover:-translate-y-1">
            <Layers className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Dual-Optimized Content</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every page we build is structured to rank in traditional SERPs while being perfectly formatted for Retrieval-Augmented Generation (RAG) so LLMs can easily cite you.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-t-4 border-purple-500 shadow-sm transition-transform hover:-translate-y-1">
            <Globe className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Omni-Channel Authority</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We build high-quality backlinks to satisfy Google&apos;s algorithm, while simultaneously securing brand mentions in the specific trusted publications that feed AI data.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border-t-4 border-blue-500 shadow-sm transition-transform hover:-translate-y-1">
            <RefreshCw className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Adaptive Architecture</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We implement advanced JSON-LD to make your site architecture clear to Googlebots, while enriching your entity data to ensure AI models recognize your authority.
            </p>
          </div>

        </div>
      </section>

      {/* COLORFUL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for total search dominance?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Explore our Hybrid packages to capture traffic today and secure your citations for tomorrow.
          </p>
          <Link 
            href="/pricing/hybrid"
            style={{ color: "#4c1d95" }}
            className="inline-block bg-white hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-md"
          >
            View Hybrid Pricing
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}