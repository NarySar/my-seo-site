import Link from "next/link";
import { ArrowRight, Sparkles, Search, Bot, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden selection:bg-blue-100 dark:selection:bg-blue-900">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* NEW BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm font-bold uppercase tracking-wider mb-8 shadow-sm">
          <Sparkles className="w-4 h-4" /> The Hybrid Search Agency
        </div>

        {/* NEW HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-8">
          Dominate Google. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Be Cited by AI.
          </span>
        </h1>

        {/* NEW SUBTITLE */}
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
          Stop choosing between traditional traffic and the future of search. We build unbreakable entity authority to rank your business on Google, ChatGPT, Gemini, and Perplexity.
        </p>

        {/* NEW DUAL CTAS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/services/hybrid" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20"
          >
            Explore Services <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link 
            href="/analyze" 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold text-lg transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 shadow-lg"
          >
            <Search className="w-5 h-5" /> Free AI Visibility Audit
          </Link>
        </div>

        {/* 3-PILLAR PREVIEW ROW */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {/* Pillar 1 */}
          <Link href="/services/seo" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-colors backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Traditional SEO</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Capture high-intent human searchers on Google, Bing, and local maps.</p>
          </Link>

          {/* Pillar 2 */}
          <Link href="/services/geo" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-colors backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">GEO (AI Search)</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Optimize for LLM retrieval to be cited by ChatGPT, Perplexity, and Gemini.</p>
          </Link>

          {/* Pillar 3 */}
          <Link href="/services/hybrid" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-blue-200/50 dark:border-blue-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20 -z-10"></div>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Hybrid Dominance</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">The ultimate strategy. Unified technical architecture for both humans and AI.</p>
          </Link>
        </div>

      </div>
    </section>
  );
}