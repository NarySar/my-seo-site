import { Search, Bot, Zap, ArrowRight } from "lucide-react";

export default function HybridSection() {
  return (
    <section className="py-24 px-6 bg-zinc-900 text-white overflow-hidden relative">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: The Pitch */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>The PulsePlusSEO Standard</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Don&apos;t choose between <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Google & AI.
              </span>
            </h2>
            
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Most agencies only optimize for traditional search. We build a <strong>Hybrid Digital Twin</strong> of your business—one layer for human searchers, and a hidden data layer for AI agents.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                  <Search className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Traditional SEO</h3>
                  <p className="text-zinc-500 text-sm">Targeting Keywords, Backlinks, and Google Rankings to capture human intent.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Agentic SEO (GEO)</h3>
                  <p className="text-zinc-500 text-sm">Structuring Data, Vector Context, and Token Density to capture AI recommendations.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Visual Proof */}
          <div className="relative">
            {/* The 'Card' Effect */}
            <div className="relative z-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-900">
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-wider font-bold">Total Visibility Score</p>
                  <h4 className="text-5xl font-bold text-white mt-2">92<span className="text-2xl text-zinc-600">/100</span></h4>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-500/10 text-green-500 font-bold text-xl">
                  A+
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-zinc-300">Google Indexing</span>
                  </div>
                  <span className="text-green-400 font-bold">Active</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Bot className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-zinc-300">ChatGPT Retrieval</span>
                  </div>
                  <span className="text-green-400 font-bold">Optimized</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-zinc-300">Schema Validity</span>
                  </div>
                  <span className="text-green-400 font-bold">Perfect</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
                 <p className="text-sm text-zinc-500 mb-4">Your competitors are missing half the picture.</p>
                 <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                   Check My Hybrid Score <ArrowRight className="w-4 h-4"/>
                 </button>
              </div>
            </div>

            {/* Decorative back elements */}
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-zinc-800 rounded-3xl z-0"></div>
            <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-zinc-800 rounded-3xl z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
}