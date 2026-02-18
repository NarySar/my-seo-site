"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Book, Cpu, Shield, BarChart3, ImageIcon, FileCode, CheckCircle } from "lucide-react";

// The Content Data
const docsContent = [
  // --- SECTION 1: GETTING STARTED ---
  {
    id: "introduction",
    category: "Getting Started",
    title: "Introduction to Agentic SEO",
    icon: <Book className="w-6 h-6 text-blue-600" />,
    content: (
      <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>PulseSeo.ai</strong> is a Hybrid SEO engine designed to help local businesses rank on Google <em>and</em> get cited by AI agents.
        </p>
        <p>
          Traditional SEO focuses on keywords and backlinks. <strong>Agentic SEO</strong> focuses on &quot;Structured Data&quot; and &quot;Token Density&quot; to help Large Language Models (LLMs) like ChatGPT, Gemini, and Claude understand your business facts.
        </p>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-lg">
          <p className="font-medium text-blue-900 dark:text-blue-200">
            💡 Key Concept: AI models don&apos;t just &quot;read&quot; websites; they &quot;ingest&quot; facts. If your facts aren&apos;t formatted as code (JSON-LD), the AI will hallucinate or ignore you.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "interpreting-scores",
    category: "Getting Started",
    title: "Interpreting Your Score",
    icon: <BarChart3 className="w-6 h-6 text-green-600" />,
    content: (
      <div className="space-y-6 text-zinc-600 dark:text-zinc-400">
        <p>We score every website on a strict 0-100 scale based on AI Readability.</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl">
            <div className="font-bold text-red-700 dark:text-red-400 mb-1">0 - 49 (Critical)</div>
            <p className="text-sm">Invisible to AI. ChatGPT cannot read your menu, hours, or services.</p>
          </div>
          <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl">
            <div className="font-bold text-yellow-700 dark:text-yellow-400 mb-1">50 - 79 (Fair)</div>
            <p className="text-sm">Visible to Google, but missing critical data for AI citations.</p>
          </div>
          <div className="p-4 border border-green-200 bg-green-50 dark:bg-green-900/10 rounded-xl">
            <div className="font-bold text-green-700 dark:text-green-400 mb-1">80 - 100 (Excellent)</div>
            <p className="text-sm">Fully optimized. You are ready to be recommended by agents.</p>
          </div>
        </div>
      </div>
    ),
  },

  // --- SECTION 2: SCORING CRITERIA (THE 5 METRICS) ---
  {
    id: "semantic-structure",
    category: "Scoring Criteria",
    title: "1. Semantic Structure",
    icon: <Cpu className="w-6 h-6 text-zinc-600" />,
    content: (
      <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>Weight: 30% (Most Important)</strong>
        </p>
        <p>
          This checks for <strong>JSON-LD Schema Markup</strong>. This is invisible code that explicitly tells the robot who you are. Without it, the AI has to &quot;guess&quot; your business details.
        </p>
        <p className="font-semibold text-zinc-900 dark:text-white mt-4">Example of Good Structure:</p>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md font-mono text-sm overflow-x-auto border border-zinc-200 dark:border-zinc-700">
          <pre>{`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  "description": "We offer X services in City Y...",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St"
  }
}`}</pre>
        </div>
      </div>
    ),
  },
  {
    id: "data-density",
    category: "Scoring Criteria",
    title: "2. Data Density",
    icon: <FileCode className="w-6 h-6 text-zinc-600" />,
    content: (
      <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>Weight: 20%</strong>
        </p>
        <p>
          AI models are text-hungry. &quot;Data Density&quot; measures the ratio of useful descriptive text to HTML code.
        </p>
        <p>
          Many modern websites use heavy images and very little text. This is bad for AI. We recommend at least <strong>600 words</strong> of descriptive text on your homepage explaining exactly what you do, who you serve, and where you are located.
        </p>
      </div>
    ),
  },
  {
    id: "trust-signals",
    category: "Scoring Criteria",
    title: "3. Trust Signals",
    icon: <Shield className="w-6 h-6 text-zinc-600" />,
    content: (
      <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>Weight: 20%</strong>
        </p>
        <p>
          AI agents are programmed to avoid scams. They look for specific &quot;Trust Anchors&quot; to verify you are a real business:
        </p>
        <ul className="space-y-2 mt-2">
          <li className="flex gap-2 items-center"><CheckCircle className="w-4 h-4 text-green-500"/> <strong>SSL Certificate:</strong> Is the site secure (https)?</li>
          <li className="flex gap-2 items-center"><CheckCircle className="w-4 h-4 text-green-500"/> <strong>Contact Info:</strong> Is there a visible phone number and email?</li>
          <li className="flex gap-2 items-center"><CheckCircle className="w-4 h-4 text-green-500"/> <strong>Social Proof:</strong> Verified LinkedIn/Twitter links.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "vector-context",
    category: "Scoring Criteria",
    title: "4. Vector Context",
    icon: <ImageIcon className="w-6 h-6 text-zinc-600" />,
    content: (
      <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>Weight: 15%</strong>
        </p>
        <p>
          Modern AIs (like GPT-4o) have &quot;Vision,&quot; but they still rely on text to understand context.
        </p>
        <p>
          We scan your images for <strong>Alt Tags</strong>. If you post a picture of your menu or a product without an Alt Tag, it is invisible to the search engine. We ensure every image has a descriptive text layer for the AI to read.
        </p>
      </div>
    ),
  },
  {
    id: "bot-access",
    category: "Scoring Criteria",
    title: "5. Bot Access",
    icon: <Cpu className="w-6 h-6 text-zinc-600" />,
    content: (
      <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>Weight: 15%</strong>
        </p>
        <p>
          You cannot rank if the robot is locked out.
        </p>
        <p>
          We check your <code>robots.txt</code> file and <code>sitemap.xml</code>. Many businesses accidentally block &quot;GPTBot&quot; or &quot;Google-Extended,&quot; preventing AI from ever seeing their content. We ensure your digital door is open to the right visitors.
        </p>
      </div>
    ),
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col md:flex-row gap-12">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="md:w-64 shrink-0">
          <div className="sticky top-32 space-y-8">
            {/* Group 1: Getting Started */}
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 px-2 uppercase text-xs tracking-wider">Getting Started</h3>
              <nav className="space-y-1">
                {docsContent.filter(d => d.category === "Getting Started").map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === item.id 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium" 
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Group 2: Scoring Criteria */}
            <div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-4 px-2 uppercase text-xs tracking-wider">Scoring Criteria</h3>
              <nav className="space-y-1">
                {docsContent.filter(d => d.category === "Scoring Criteria").map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeSection === item.id 
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium" 
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-h-[600px]">
          {docsContent.map((section) => (
            <div 
              key={section.id} 
              className={activeSection === section.id ? "block animate-in fade-in slide-in-from-bottom-4 duration-500" : "hidden"}
            >
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100 dark:border-zinc-800">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                  {section.icon}
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                  {section.title}
                </h1>
              </div>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                {section.content}
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </main>
  );
}