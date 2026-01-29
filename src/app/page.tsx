import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Search, Zap, Shield, Globe, Cpu, BarChart3, ImageIcon as ImageIconLucide } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            The New Standard for AI Visibility
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Is your business <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">invisible to AI?</span>
          </h1>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Traditional SEO helps Google find you. <strong>Agentic SEO</strong> ensures ChatGPT, Gemini, and Perplexity can recommend you. Scan your site now.
          </p>

          {/* Call to Action Area */}
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
             <Link href="/analyze" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                <Search className="w-5 h-5" />
                Audit My Website Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
             <p className="text-sm text-zinc-400">No credit card required • Instant analysis</p>
          </div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="py-10 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Optimized for the next generation of search</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Cpu className="w-6 h-6"/> OpenAI</span>
             <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Globe className="w-6 h-6"/> Perplexity</span>
             <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Zap className="w-6 h-6"/> Gemini</span>
             <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2"><Shield className="w-6 h-6"/> Claude</span>
          </div>
        </div>
      </section>

      {/* --- PROBLEM / SOLUTION (UPDATED TONE) --- */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                 Rank on Google. <br/>
                 <span className="text-blue-600">Get Cited by AI.</span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                Traditional SEO captures search clicks. <strong>Agentic SEO</strong> ensures your brand is recommended when users ask ChatGPT, Gemini, or Claude for advice. You need both to win.
              </p>
              <ul className="space-y-4">
                 {[
                   "AI cannot 'see' your images without Vector Context.",
                   "LLMs skip pages with low token density.",
                   "No Schema means no facts for the AI to cite."
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                     <div className="mt-1 h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">✕</div>
                     {item}
                   </li>
                 ))}
              </ul>
           </div>
           <div className="relative p-8 rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Abstract Visual of the Audit Tool */}
              <div className="space-y-4">
                 <div className="h-4 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                 <div className="h-8 w-3/4 bg-zinc-800 dark:bg-zinc-200 rounded-lg"></div>
                 <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="h-24 bg-blue-100 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"></div>
                    <div className="h-24 bg-green-100 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"></div>
                 </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center gap-3">
                 <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">A+</div>
                 <div>
                    <p className="text-xs text-zinc-500 font-bold">AGENT READY</p>
                    <p className="text-sm font-medium">Optimization Complete</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">What we analyze</h2>
              <p className="text-zinc-600 dark:text-zinc-400">Our deep-scan technology checks the 6 critical data points that Large Language Models use to understand your business.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Vector Context", desc: "Do your images have descriptive Alt Text for AI vision models?", icon: <ImageIconLucide className="w-6 h-6" /> },
                { title: "Token Density", desc: "Is there enough text content for the LLM to process and learn?", icon: <BarChart3 className="w-6 h-6" /> },
                { title: "Structured Data", desc: "Do you feed facts (JSON-LD) directly to the AI's knowledge graph?", icon: <Cpu className="w-6 h-6" /> },
                { title: "Bot Access", desc: "Are you accidentally blocking AI crawlers in your robots.txt?", icon: <Shield className="w-6 h-6" /> },
                { title: "Topic Authority", desc: "Does your H1 and Meta Data clearly define your niche?", icon: <Globe className="w-6 h-6" /> },
                { title: "Connectivity", desc: "Is your site an authority hub or an orphaned island?", icon: <Zap className="w-6 h-6" /> },
              ].map((f, i) => (
                <div key={i} className="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                   <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                      {f.icon}
                   </div>
                   <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{f.title}</h3>
                   <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to rank in the AI era?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Get your comprehensive Agentic SEO report in less than 10 seconds. No signup required.</p>
              <Link href="/analyze" className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors">
                 Get My Free Score
                 <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
         </div>
      </section>
      
      <Footer />
    </main>
  );
}