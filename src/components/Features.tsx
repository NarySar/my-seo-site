import { BarChart3, Cpu, Globe, ImageIcon as ImageIconLucide, Shield, Zap } from "lucide-react";

export default function Features() {
  return (
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
  );
}