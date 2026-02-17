import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      {/* Glow Effects */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[60px] -z-10 pointer-events-none"></div>
      
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
  );
}