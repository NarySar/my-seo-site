import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Bot } from "lucide-react";

export default function GEOPricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Bot className="w-4 h-4" /> AI Search Optimization
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Be cited by <br /> <span className="text-blue-600">ChatGPT & Gemini.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Build unbreakable entity authority so Large Language Models recommend your business first.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          
          <PricingCard 
            title="Momentum"
            description="Establish your brand in the AI ecosystem."
            price="Under development"
            features={[
              "AI Visibility Audit",
              "LLM Keyword & Prompt Research",
              "Entity Authority Mapping",
              "Advanced JSON-LD Schema",
              "Answer-First Content Optimization",
              "Knowledge Panel Optimization",
              "Tier-1 AI Directory Citations",
              "AI Brand Sentiment Tracking",
              "Ticket & Email Support",
            ]}
          />

          <PricingCard 
            title="Scale"
            description="For businesses ready to dominate AI answers."
            price="Under development"
            isPopular
            features={[
              "Everything in Momentum, plus:",
              "Retrieval-Augmented Generation (RAG) Prep",
              "Bi-Weekly AI Content Alignment",
              "Digital PR for AI Trust Signals",
              "Multimodal Asset Optimization",
              "Competitor AI Mention Tracking",
              "Dedicated Account Manager",
              "Priority Support",
            ]}
          />

          <PricingCard 
            title="Elite"
            description="Our ultimate LLM visibility package."
            price="Under development"
            features={[
              "Everything in Scale, plus:",
              "Enterprise Schema Architecture",
              "Maximum PR Trust Building",
              "Weekly Content Structuring",
              "Custom AI Prompt Engineering",
              "Bespoke LLM Analytics Reporting",
              "1-on-1 Monthly Strategy Calls",
              "Direct Slack Channel Support",
            ]}
          />

        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB-COMPONENTS ---
interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

function PricingCard({ title, description, price, features, isPopular }: PricingCardProps) {
  return (
    <div className={`flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
      isPopular 
        ? 'border-blue-500 shadow-2xl shadow-blue-900/20 relative' 
        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-lg hover:shadow-xl'
    }`}>
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 right-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg uppercase tracking-wider shadow-md z-10">
          Most Popular
        </div>
      )}

      {/* Top Section with light glassy background */}
      <div className={`relative p-8 ${
        isPopular 
          ? 'bg-gradient-to-br from-blue-900/40 via-zinc-900 to-black dark:from-blue-900/30 dark:via-zinc-900 dark:to-zinc-950 text-white border-b border-zinc-800' 
          : 'bg-gradient-to-br from-blue-100/60 via-purple-50/40 to-white/80 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-zinc-950 text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800'
      }`}>
        <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
        <p className={`text-sm mb-8 relative z-10 ${isPopular ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
          {description}
        </p>
        
        <div className="mb-8 relative z-10">
          <span className={`text-3xl font-black italic tracking-tight ${
            isPopular ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400 dark:text-zinc-500'
          }`}>
            {price}
          </span>
        </div>

        <button className={`w-full py-4 rounded-xl font-bold transition-all relative z-10 ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
            : 'bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm text-zinc-900 dark:text-white hover:bg-white dark:hover:bg-zinc-700 shadow-sm'
        }`}>
          Get Started
        </button>
      </div>

      {/* Bottom Section (Features List) */}
      <div className={`p-8 flex-1 ${isPopular ? 'bg-white dark:bg-zinc-900/80' : ''}`}>
        <p className="font-bold text-zinc-900 dark:text-white mb-6">What&apos;s included</p>
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPopular ? 'text-blue-600' : 'text-zinc-400 dark:text-zinc-600'}`} />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}