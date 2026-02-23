import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowRight, Sparkles, Search, Bot, Zap, 
  Activity, Radar, Network, BrainCircuit, ShieldCheck, Database
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm font-bold uppercase tracking-wider mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" /> The Hybrid Search Agency
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-8">
            Dominate Google. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Be Cited by AI.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Stop choosing between traditional traffic and the future of search. We build unbreakable entity authority to rank your business on Google, ChatGPT, Gemini, and Perplexity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services/hybrid" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20">
              Explore Services <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/analyze" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold text-lg transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 shadow-lg">
              <Search className="w-5 h-5" /> Free AI Visibility Audit
            </Link>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            <Link href="/services/seo" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-colors backdrop-blur-sm shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Traditional SEO</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Capture high-intent human searchers on Google, Bing, and local maps.</p>
            </Link>

            <Link href="/services/geo" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-colors backdrop-blur-sm shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">GEO (AI Search)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Optimize for LLM retrieval to be cited by ChatGPT, Perplexity, and Gemini.</p>
            </Link>

            <Link href="/services/hybrid" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-blue-200/50 dark:border-blue-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors backdrop-blur-sm relative overflow-hidden shadow-sm">
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

      {/* 2. THE HYBRID ADVANTAGE (#hybrid) */}
      <section id="hybrid" className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">The Paradigm Shift</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              The Hybrid Advantage
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Traditional SEO focuses on matching keywords to web pages. Generative Engine Optimization (GEO) focuses on establishing trust and entity authority so AI language models use you as their source code. We do both.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Search className="w-6 h-6 text-zinc-400" /> The Old Way
              </h4>
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Relying purely on keyword density.</li>
                <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Writing content only for human readers, ignoring RAG structuring.</li>
                <li className="flex items-start gap-3"><span className="text-red-500 font-bold">✕</span> Blindly building links without focusing on Knowledge Graph connections.</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 relative overflow-hidden">
              <h4 className="text-2xl font-bold mb-4 flex items-center gap-3 text-zinc-900 dark:text-white">
                <Zap className="w-6 h-6 text-blue-600" /> The PulseSEO Way
              </h4>
              <ul className="space-y-4 text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> Unified keyword and LLM prompt research.</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> Answer-first formatting optimized for AI retrieval systems.</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> Building unbreakable entity authority via advanced Schema.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AGENTIC SCORE (#score) */}
      <section id="score" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-4">Proprietary Metric</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              The Agentic Score
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              You can&apos;t improve what you don&apos;t measure. The PulseSEO Agentic Score is our proprietary 0-100 metric that quantifies exactly how &quot;visible&quot; and &quot;trusted&quot; your brand is to AI models like ChatGPT and Gemini.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              We aggregate data across brand sentiment, knowledge graph presence, and RAG readiness to give you a single source of truth for your AI marketing performance.
            </p>
            <Link href="/analyze" className="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Check your score for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 w-full max-w-md relative">
            {/* Abstract Score Visualization */}
            <div className="aspect-square rounded-full border-[16px] border-zinc-100 dark:border-zinc-800 flex items-center justify-center relative shadow-2xl bg-white dark:bg-black">
              <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 border-r-transparent border-t-transparent -rotate-45"></div>
              <div className="text-center">
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">84</div>
                <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-2">Highly Visible</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE ANALYZE (#analysis) */}
      <section id="analysis" className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Data-Driven Approach</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              The 6 Critical LLM Data Points
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When we audit your site and deploy our monthly GEO strategies, we are systematically optimizing across the six pillars that AI algorithms care about most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <BrainCircuit className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Entity Recognition</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Does the AI understand *what* your business is and explicitly link it to your target industry?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Activity className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Sentiment Bias</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Is the overarching conversation around your brand positive, neutral, or negative across the web?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Database className="w-8 h-8 text-green-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">RAG Readiness</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Is your on-page content structured in an &quot;answer-first&quot; format that AI retrieval models can easily parse?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <ShieldCheck className="w-8 h-8 text-orange-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Citation Authority</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Are high-trust, authoritative websites (like Wikipedia, News outlets, and Tier-1 directories) talking about you?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Network className="w-8 h-8 text-red-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Knowledge Graph Density</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">How deep and interconnected is your brand&apos;s data footprint within Google&apos;s core Knowledge Graph?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <Radar className="w-8 h-8 text-teal-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Competitor Overlap</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">When users ask AI for options in your niche, are you recommended alongside, or instead of, your top competitors?</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS / PROCESS SECTION */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">How It Works</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Our Hybrid Process
            </h3>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our streamlined framework ensures smooth collaboration from initial plan selection through ongoing monthly deliverables while continuously tracking your cross-platform campaign progress.
            </p>
          </div>

          <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            <div className="flex-1 bg-white dark:bg-black rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-8 right-8 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full tracking-wider">
                STEP 1
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 pr-20">Select a plan</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Choose from our Momentum, Scale, or Elite plans, each tailored to different business sizes and growth goals. All plans feature powerful SEO and GEO deliverables, scaling based on your needs. Upgrade, downgrade, pause, or cancel at any time with no lock-in contracts.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center -mx-10 z-10">
              <div className="w-12 h-12 bg-white dark:bg-black rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 shadow-sm">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-black rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-8 right-8 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full tracking-wider">
                STEP 2
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 pr-20">Onboarding</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Our team conducts a comprehensive discovery session to map your business objectives, target audience, and AI visibility baseline. We configure your Analytics, build your PulseSEO live dashboard, and craft your initial unified search strategy based on a deep technical audit.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center -mx-10 z-10">
              <div className="w-12 h-12 bg-white dark:bg-black rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 shadow-sm">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-black rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-8 right-8 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full tracking-wider">
                STEP 3
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 pr-20">Monthly deliverables</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Each month we execute RAG-optimized content updates, acquire contextual backlinks, manage entity associations, and fine-tune your advanced Schema. You receive ongoing tracking of both traditional Google rankings and AI citations within your custom portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />
    </main>
  );
}