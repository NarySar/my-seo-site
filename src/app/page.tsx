import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  ArrowRight, Sparkles, Search, Bot, Zap, 
  Activity, Radar, Network, BrainCircuit, ShieldCheck, Database,
  MonitorSmartphone, Code, CheckCircle2
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
            <Sparkles className="w-4 h-4" /> The Full-Stack Search & Web Agency
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-8">
            Dominate Google. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Be Cited by AI.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Stop choosing between traditional traffic and the future of search. We build high-performance websites and unbreakable entity authority to rank your business on Google, ChatGPT, and Gemini.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services/hybrid" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/20">
              Explore Services <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/analyze" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold text-lg transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 shadow-lg">
              <Search className="w-5 h-5" /> Free AI Visibility Audit
            </Link>
          </div>

          {/* Expanded 4-Column Hero Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto text-left">
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Hybrid Dominance</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">The ultimate strategy. Unified technical architecture for both humans and AI.</p>
            </Link>

            <Link href="/services/web-design" className="group p-6 rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-colors backdrop-blur-sm shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MonitorSmartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Web Design <span className="text-[10px] bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-full ml-1 align-top">NEW</span></h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Lightning-fast, conversion-optimized websites built for modern search algorithms.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OUR CORE SERVICES OVERVIEW */}
      <section id="services-overview" className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
            <div className="flex-1">
              <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Complete Digital Ecosystem</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                Everything you need to own the internet.
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                A beautiful website is useless if no one can find it. Ranking on Google is great, but irrelevant if AI recommends your competitor. 
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We are a full-stack agency. We build the digital foundation (Web Design), drive human traffic (SEO), and ensure AI language models trust your brand (GEO).
              </p>
            </div>
            {/* Agency Image */}
            <div className="flex-1 w-full">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
                <Image 
                  src="/marketing-agency.png" 
                  alt="PulseSEO Agency Team" 
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Deep Dive Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* SEO Block */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">Traditional SEO</h4>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">We map high-intent keywords to perfectly optimized pages, build authoritative backlinks, and fix technical errors so you climb the Google ranks.</p>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> On-Page & Technical Audits</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> High-Authority Link Building</li>
              </ul>
            </div>

            {/* GEO Block */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
                  <Bot className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">GEO (AI Optimization)</h4>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">We structure your data for Retrieval-Augmented Generation (RAG) and optimize your entity authority so LLMs natively recommend you.</p>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> AI Prompt Research</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-500" /> Knowledge Graph & Schema Injection</li>
              </ul>
            </div>

            {/* Hybrid Block */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-200 dark:border-blue-800 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">Hybrid Strategy</h4>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 mb-6">The best of both worlds. A unified, dual-engine strategy designed to dominate traditional search while securing your citations for tomorrow.</p>
              <ul className="space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Omni-Channel Authority</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Dual-Optimized Content Creation</li>
              </ul>
            </div>

            {/* Web Design Block */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-600 dark:text-teal-400">
                  <Code className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">Performance Web Design</h4>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">We design and develop blazing-fast Next.js and React websites built with SEO and AI-readiness baked into the code from day one.</p>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Conversion-Optimized UI/UX</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Lightning Fast Core Web Vitals</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 3. AGENTIC SCORE (#score) - Featuring: data-dashboard.png */}
      <section id="score" className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800 scroll-mt-24 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 lg:order-2">
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
            <Link href="/analyze" className="inline-flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Check your score for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Data Dashboard laptop image */}
          <div className="flex-1 w-full relative mt-10 lg:mt-0 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-lg mx-auto lg:mr-auto">
              <Image 
                src="/data-dashboard.png" 
                alt="AI Data Dashboard" 
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Score UI */}
            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-4 animate-[bounce_6s_infinite] max-w-[220px]">
              <div className="relative w-14 h-14 shrink-0 rounded-full border-[6px] border-zinc-50 dark:border-zinc-800 flex items-center justify-center bg-white dark:bg-zinc-900">
                <div className="absolute inset-0 rounded-full border-[6px] border-purple-500 border-r-transparent border-t-transparent -rotate-45"></div>
                <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">84</span>
              </div>
              <div>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Status</p>
                <p className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">Highly Visible to AI</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHAT WE ANALYZE (#analysis) */}
      <section id="analysis" className="py-24 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 scroll-mt-24">
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
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <BrainCircuit className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Entity Recognition</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Does the AI understand *what* your business is and explicitly link it to your target industry?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <Activity className="w-8 h-8 text-purple-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Sentiment Bias</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Is the overarching conversation around your brand positive, neutral, or negative across the web?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <Database className="w-8 h-8 text-green-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">RAG Readiness</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Is your on-page content structured in an &quot;answer-first&quot; format that AI retrieval models can easily parse?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <ShieldCheck className="w-8 h-8 text-orange-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Citation Authority</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Are high-trust, authoritative websites (like Wikipedia, News outlets, and directories) talking about you?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <Network className="w-8 h-8 text-red-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Knowledge Graph Density</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">How deep and interconnected is your brand&apos;s data footprint within Google&apos;s core Knowledge Graph?</p>
            </div>
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <Radar className="w-8 h-8 text-teal-500 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Competitor Overlap</h4>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">When users ask AI for options in your niche, are you recommended alongside, or instead of, competitors?</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS / PROCESS SECTION - Featuring: agency-workflow.png */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
            {/* Agency Workflow laptop image */}
            <div className="flex-1 w-full">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
                <Image 
                  src="/agency-workflow.png" 
                  alt="PulseSEO Agency Workflow" 
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">How It Works</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                Our Transparent Process
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We don&apos;t do black-box retainers. Our streamlined framework ensures complete transparency from initial plan selection through ongoing monthly deliverables, all tracked via your custom dashboard.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            <div className="flex-1 bg-white dark:bg-black rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 relative shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-8 right-8 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full tracking-wider">
                STEP 1
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 pr-20">Select a plan</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Choose from our core service plans, each tailored to different business sizes and growth goals. Upgrade, downgrade, pause, or cancel at any time with no lock-in contracts.
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
                Our team maps your business objectives, target audience, and current baseline. We configure your Analytics, build your PulseSEO live dashboard, and craft your custom strategy.
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
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 pr-20">Monthly Execution</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Each month we execute RAG-optimized content updates, acquire contextual backlinks, and manage entity associations. Track your traditional Google rankings and AI citations within your portal.
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