import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Hero from "@/components/Hero"; // ✅ extracted Hero
import HybridSection from "@/components/HybridSection"; // ✅ The new comparison section
import Features from "@/components/Features"; // ✅ extracted Features
import Link from "next/link";
import { ArrowRight, Cpu, Globe, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Badges (Kept inline as it's small) */}
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

      {/* 3. The New Hybrid Comparison (Your Strategic Advantage) */}
      <HybridSection />

      {/* 4. Problem / Solution Block (Kept inline) */}
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

      {/* 5. Features Grid (Component) */}
      <Features />

      {/* 6. CTA Footer (Kept inline as it's specific to this page) */}
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