import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Search, Zap, Shield, Globe, Cpu, BarChart3, ImageIcon as ImageIconLucide } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    // 👇 ADDED "overflow-x-hidden" to stop horizontal wiggling
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      
      {/* Navbar (Your updated one with the Theme Toggle) */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        
        {/* 👇 THE FIX: Heavy blur only for Desktop (hidden on mobile) */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        {/* 👇 THE FIX: Lightweight blur for Mobile (hidden on desktop) */}
        <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-blue-500/15 rounded-full blur-[40px] -z-10 pointer-events-none"></div>
        
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

      {/* ... (Keep the rest of your sections exactly the same) ... */}
      
      {/* If you want to optimize the footer noise too, use this: */}
       <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
            {/* Optimized Noise: Hidden on mobile to save CPU */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to rank in the AI era?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Get your comprehensive Agentic SEO report in less than 10 seconds.</p>
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

// ... Icon components ...