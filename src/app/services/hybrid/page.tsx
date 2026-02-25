import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Zap } from "lucide-react";
// 👇 Importing the global PricingCard component
import { PricingCard } from "@/components/PricingCard";

export default function HybridPricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Zap className="w-4 h-4" /> The Ultimate Package
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Total market <br /> <span className="text-blue-600">Search Dominance.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The unified SEO + GEO strategy. Capture traffic from Google today while securing your citations in the AI models of tomorrow.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 items-stretch gap-4 md:gap-2 pt-4 pb-10 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0">
          
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-0">
            <PricingCard 
              title="Momentum"
              description="The complete hybrid search foundation."
              price="Under development"
              features={[
                "Combined SEO & GEO Audit",
                "Omni-Channel Keyword Research",
                "Technical SEO + AI Schema Markup",
                "Contextual Link Building",
                "Knowledge Panel Creation",
                "Hybrid Content Optimization",
                "GBP & Local Entity Management",
                "Unified Google + AI Live Dashboard",
                "Ticket & Email Support",
              ]}
            />
          </div>

          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-10">
            <PricingCard 
              title="Scale"
              description="For businesses ready to own the industry."
              price="Under development"
              isPopular
              features={[
                "Everything in Momentum, plus:",
                "Aggressive Link & PR Campaigns",
                "Retrieval-Augmented Generation (RAG) Prep",
                "Bi-Weekly Omni-Channel Content",
                "Multimodal Asset Optimization",
                "AI Sentiment & Review Management",
                "Dedicated Account Manager",
                "Priority Support",
              ]}
            />
          </div>

          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-0">
            <PricingCard 
              title="Elite"
              description="Our highest output volume for total dominance."
              price="Under development"
              features={[
                "Everything in Scale, plus:",
                "Enterprise Architecture & Schema",
                "Maximum Volume PR & Link Building",
                "Weekly Hybrid Content Creation",
                "Custom LLM Prompt Engineering",
                "Bespoke Multi-Location Strategy",
                "1-on-1 Monthly Strategy Calls",
                "Direct Slack Channel Support",
              ]}
            />
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}