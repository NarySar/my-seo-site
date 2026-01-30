import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cpu, Globe, Zap, Shield, ImageIcon, BarChart3 } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    { title: "Vector Context Analysis", desc: "We scan your images for descriptive Alt Text, ensuring AI Vision models can 'see' your products.", icon: <ImageIcon className="w-8 h-8 text-blue-500" /> },
    { title: "Token Density Check", desc: "AI skips 'thin' content. We calculate if your page has enough depth for an LLM to cite it.", icon: <BarChart3 className="w-8 h-8 text-green-500" /> },
    { title: "Schema Validator", desc: "Structured Data (JSON-LD) is the language of AI. We verify your LocalBusiness and Product tags.", icon: <Cpu className="w-8 h-8 text-purple-500" /> },
    { title: "Bot Access Control", desc: "Ensure you aren't accidentally blocking GPTBot or Google-Extended in your robots.txt.", icon: <Shield className="w-8 h-8 text-red-500" /> },
    { title: "Entity Authority", desc: "We check if your H1s and Meta Tags establish a clear 'Entity' for Knowledge Graphs.", icon: <Globe className="w-8 h-8 text-cyan-500" /> },
    { title: "Smart Caching", desc: "Results are cached for speed, allowing you to track improvements over time.", icon: <Zap className="w-8 h-8 text-yellow-500" /> },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Under the Hood</h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            PulseSeo isn't just a crawler. It's an Agentic Emulator that reads your site exactly like ChatGPT does.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-6">
              <div className="shrink-0 p-4 bg-white dark:bg-black rounded-xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}