import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Search, Bot, Zap, BarChart3, Globe, Cpu, CheckCircle2, Star, Trophy, Users } from "lucide-react";


export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <HybridSection />  {/* Contains id="hybrid" */}
      <ScoreSection />   {/* Contains id="score" - NEW SECTION based on your screenshot */}
      <AnalysisGrid />   {/* Contains id="analysis" - Renamed from FeaturesGrid */}
      <CTA />
      <Footer />
    </main>
  );
}

// --- COMPONENTS ---

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-950/50 dark:via-transparent dark:to-transparent opacity-70"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Zap className="w-4 h-4" /> The New Standard for AI Visibility
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Is your business <br className="hidden md:block" />
            <span className="text-blue-600">invisible to AI?</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
            Traditional SEO helps Google find you. <strong>Agentic SEO</strong> ensures ChatGPT, Gemini, and Perplexity can recommend you. Scan your site now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Link href="/analyze" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
              Audit My Website Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
      </div>
    </section>
  );
}

// 1. THE HYBRID ADVANTAGE (Linked via Dropdown)
function HybridSection() {
  return (
    <section id="hybrid" className="py-24 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
          The <span className="text-blue-600">Hybrid Advantage</span>
        </h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Why choose PulseSeo? Because we don&apos;t just optimize for keywords. We optimize for the entire AI ecosystem.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <Image src="/hybrid-seo.jpg" alt="Hybrid SEO Diagram" fill className="object-contain p-4 md:p-8" priority />
          </div>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><Users className="w-6 h-6" /></div>
              <div><h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Verified Client Results</h3><p className="text-zinc-600 dark:text-zinc-400">Our hybrid approach has helped local businesses rank #1 on Google Maps while simultaneously appearing in ChatGPT recommendations.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400"><Trophy className="w-6 h-6" /></div>
              <div><h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Future-Proof Case Studies</h3><p className="text-zinc-600 dark:text-zinc-400">We don&apos;t guess. We use proven schema structures that act as a `&quot;`digital passport,`&quot;` ensuring AI agents trust your data.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400"><Star className="w-6 h-6" /></div>
              <div><h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Transparent About Us</h3><p className="text-zinc-600 dark:text-zinc-400">No black-box magic. We provide clear dashboards showing exactly which agents (Gemini, Claude, OpenAI) are citing your business.</p></div>
            </div>
            <div className="pt-4"><Link href="/pricing" className="text-blue-600 font-bold hover:text-blue-500 flex items-center gap-2">See our pricing plans <ArrowRight className="w-5 h-5" /></Link></div>
          </div>
      </div>
    </section>
  );
}

// 2. SCORE SECTION (Linked via Dropdown)
function ScoreSection() {
  return (
    <section id="score" className="py-24 bg-zinc-900 text-white scroll-mt-24 relative overflow-hidden">
       <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-900/20 pointer-events-none" />
       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
         <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
              The PulseSeo Standard
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Don&apos;t choose between <br/> <span className="text-blue-400">Google & AI.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              Most agencies only optimize for traditional search. We build a <strong>Hybrid Digital Twin</strong> of your business—one layer for human searchers, and a hidden data layer for AI agents.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Search className="w-5 h-5"/></div>
                <div><h4 className="font-bold text-white">Traditional SEO</h4><p className="text-sm text-zinc-400">Targeting Keywords, Backlinks, and Google Rankings.</p></div>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-4">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Bot className="w-5 h-5"/></div>
                <div><h4 className="font-bold text-white">Agentic SEO (GEO)</h4><p className="text-sm text-zinc-400">Structuring Data, Vector Context, and Token Density.</p></div>
              </div>
            </div>
         </div>
         {/* Simulated Score Card UI */}
         <div className="bg-black rounded-3xl p-8 border border-zinc-800 shadow-2xl">
           <div className="flex justify-between items-start mb-8">
             <div>
               <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Visibility Score</div>
               <div className="text-6xl font-black text-white">92<span className="text-2xl text-zinc-600 font-medium">/100</span></div>
             </div>
             <div className="h-12 w-12 rounded-full border-4 border-green-500 flex items-center justify-center text-green-500 font-bold text-xl">A+</div>
           </div>
           <div className="space-y-4">
             <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
               <div className="flex items-center gap-3"><Search className="text-blue-500 w-4 h-4"/><span className="font-medium">Google Indexing</span></div>
               <span className="text-green-500 text-sm font-bold">Active</span>
             </div>
             <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
               <div className="flex items-center gap-3"><Bot className="text-purple-500 w-4 h-4"/><span className="font-medium">ChatGPT Retrieval</span></div>
               <span className="text-green-500 text-sm font-bold">Optimized</span>
             </div>
             <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
               <div className="flex items-center gap-3"><Zap className="text-yellow-500 w-4 h-4"/><span className="font-medium">Schema Validity</span></div>
               <span className="text-green-500 text-sm font-bold">Perfect</span>
             </div>
           </div>
           <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
             <p className="text-zinc-500 text-xs mb-4">Your competitors are missing half the picture.</p>
             <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">Check My Hybrid Score →</button>
           </div>
         </div>
       </div>
    </section>
  );
}

// 3. ANALYSIS GRID (Linked via Dropdown)
function AnalysisGrid() {
  const features = [
    { icon: <Cpu className="w-6 h-6" />, title: "Vector Context", desc: "Do your images have descriptive Alt Text for AI vision models?" },
    { icon: <BarChart3 className="w-6 h-6" />, title: "Token Density", desc: "Is there enough text content for the LLM to process and learn?" },
    { icon: <Globe className="w-6 h-6" />, title: "Structured Data", desc: "Do you feed facts (JSON-LD) directly to the AI's knowledge graph?" },
    { icon: <Zap className="w-6 h-6" />, title: "Bot Access", desc: "Are you accidentally blocking AI crawlers in your robots.txt?" },
    { icon: <Star className="w-6 h-6" />, title: "Topic Authority", desc: "Does your H1 and Meta Data clearly define your niche?" },
    { icon: <Users className="w-6 h-6" />, title: "Connectivity", desc: "Is your site an authority hub or an orphaned island?" },
  ];

  return (
    <section id="analysis" className="py-24 bg-zinc-50 dark:bg-black scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">What we analyze</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Our deep-scan technology checks the 6 critical data points that Large Language Models use to understand your business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 mb-6 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">{f.icon}</div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900">
        {/* 👇 I REMOVED THE MISSING 'grid-pattern.svg' LINE HERE */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          Stop being a link. <br/> Start being the answer.
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          The shift to AI search is happening now. Ensure your local business is the one being recommended.
        </p>
        <Link href="/analyze" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-blue-600 font-bold text-lg transition-all hover:bg-blue-50 shadow-xl">
          Start Your Free Audit <Zap className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}