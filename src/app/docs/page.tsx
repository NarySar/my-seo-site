import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Book, Code, Share2, Zap } from "lucide-react";

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <Book className="h-4 w-4" /> Documentation
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-blue-600 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                Introduction
              </Link>
              <Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-3 py-2 transition-colors">
                How Agents Crawl
              </Link>
              <Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-3 py-2 transition-colors">
                Schema Guidelines
              </Link>
              <Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-3 py-2 transition-colors">
                API Reference
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 max-w-3xl prose prose-zinc dark:prose-invert">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
            Introduction to Agentic SEO
          </h1>
          
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            The internet is changing. Previously, you optimized content for humans searching on Google. 
            Today, you must optimize for <strong>AI Agents</strong> (like ChatGPT, Gemini, and Claude) 
            that browse the web on behalf of users.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <Zap className="h-6 w-6 text-yellow-500 mb-3" />
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Speed Matters</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                LLMs have limited context windows. Your content must be concise and structured.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <Code className="h-6 w-6 text-blue-500 mb-3" />
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Structured Data</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                JSON-LD is the language of agents. We help you implement it correctly.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            How PulseSeo Works
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Our crawler simulates an LLM visit. We strip away CSS, images, and ads to see 
            exactly what the AI "reads." If your core content is hidden behind JavaScript 
            or complex layouts, agents will hallucinate your data.
          </p>

          <div className="bg-zinc-900 text-white p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 border-b border-zinc-700 pb-2">
              <span>agent-config.json</span>
              <Share2 className="h-4 w-4 text-zinc-500" />
            </div>
            <pre>
{`{
  "allow_agents": true,
  "preferred_model": "gpt-4-turbo",
  "knowledge_cutoff": "2024-01",
  "sitemap": "https://pulseseo.ai/sitemap.xml"
}`}
            </pre>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}