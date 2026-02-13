"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X } from "lucide-react";
import Link from "next/link";

// ✅ 1. DEFINE THE ID CARD (INTERFACE)
interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  missing?: string[];     // Optional (marked by ?)
  highlighted?: boolean;  // Optional (marked by ?)
  buttonText: string;
  href: string;
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col font-sans">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex-grow">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Start auditing your AI visibility for free. Upgrade to unlock competitor analysis.
          </p>

          {/* TOGGLE */}
          <div className="flex items-center justify-center mt-8 gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className={`absolute top-1 left-1 bg-white dark:bg-blue-600 w-6 h-6 rounded-full shadow-sm transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
              Yearly <span className="text-blue-600 text-xs font-bold ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <PricingCard 
            title="Hobby" 
            price="0" 
            description="Perfect for testing your personal portfolio."
            features={["3 Scans per day", "Basic Score Breakdown", "Manual Scanning", "Community Support"]}
            missing={["Competitor Analysis", "PDF Reports", "API Access"]}
            buttonText="Start for Free"
            href="/analyze"
          />

          <PricingCard 
            title="Pro Agent" 
            price={isAnnual ? "29" : "39"} 
            description="For startups and serious SEOs."
            highlighted={true}
            features={["Unlimited Scans", "Deep-Dive Technical Reports", "Competitor Comparison", "Priority Support", "PDF Export", "Scan History"]}
            buttonText="Get Started"
            href="/sign-up"
          />

          <PricingCard 
            title="Enterprise" 
            price="99" 
            description="For agencies managing multiple clients."
            features={["Everything in Pro", "Team Collaboration", "White-label Reports", "API Access", "Dedicated Account Manager"]}
            buttonText="Contact Sales"
            href="mailto:sales@pulseseo.ai"
          />

        </div>
      </div>
      <Footer />
    </main>
  );
}

// ✅ 2. USE THE INTERFACE HERE INSTEAD OF 'any'
function PricingCard({ 
  title, 
  price, 
  description, 
  features, 
  missing = [], 
  highlighted = false, 
  buttonText, 
  href 
}: PricingCardProps) {  // 👈 Look! No more 'any'
  
  return (
    <div className={`relative p-8 rounded-3xl border flex flex-col ${highlighted ? 'bg-zinc-900 dark:bg-zinc-900 border-blue-500 shadow-2xl shadow-blue-900/20' : 'bg-white dark:bg-black border-zinc-200 dark:border-zinc-800'}`}>
      
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-lg font-bold ${highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{title}</h3>
        <p className="text-sm text-zinc-500 mt-2 min-h-[40px]">{description}</p>
      </div>

      <div className="mb-8">
        <span className={`text-5xl font-black ${highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>${price}</span>
        <span className="text-zinc-500">/month</span>
      </div>

      <div className="space-y-4 flex-grow mb-8">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
            <Check className="h-5 w-5 text-blue-500 shrink-0" />
            {feat}
          </li>
        ))}
        {missing.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 dark:text-zinc-600">
            <X className="h-5 w-5 shrink-0 opacity-50" />
            {feat}
          </li>
        ))}
      </div>

      <Link href={href} className="w-full">
        <button className={`w-full py-3 rounded-xl font-bold transition-all ${
          highlighted 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
        }`}>
          {buttonText}
        </button>
      </Link>
    </div>
  );
}