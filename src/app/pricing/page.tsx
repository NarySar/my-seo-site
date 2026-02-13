"use client";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// ✅ 1. Define the Interface (The "ID Card" for your data)
interface ServiceCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean; // Optional
  buttonText: string;
  href: string;
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col font-sans">
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex-grow">
        
        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3 w-3" /> Agentic SEO Agency
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
            We don&apos;t just scan your site.<br />
            <span className="text-blue-600">We fix it.</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Stop guessing with DIY tools. Hire our team of AI experts to build, optimize, and manage your web presence for the AI Era.
          </p>
        </div>

        {/* SERVICE PACKAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* PACKAGE 1: THE AUDIT */}
          <ServiceCard 
            title="Deep-Dive Audit" 
            price="Developing" 
            period="one-time"
            description="A comprehensive manual review of your AI visibility."
            features={[
              "Full Agentic SEO Scan",
              "Competitor Gap Analysis",
              "Video Walkthrough of Issues",
              "Actionable Fix List",
              "1-Hour Strategy Call"
            ]}
            buttonText="Book My Audit"
            href="mailto:sales@pulseseo.ai?subject=I want a Deep Dive Audit"
          />

          {/* PACKAGE 2: THE BUILD (Highlighted) */}
          <ServiceCard 
            title="AI-First Website Build" 
            price="Developing" 
            period="starts at"
            description="We design and code a high-performance site optimized for AI agents."
            highlighted={true}
            features={[
              "Custom Next.js Development",
              "Perfect Semantic HTML Structure",
              "Schema.org Rich Data Integration",
              "Lightning Fast (100/100 Lighthouse)",
              "Mobile-First Design",
              "Content Optimization for LLMs"
            ]}
            buttonText="Get a Quote"
            href="mailto:sales@pulseseo.ai?subject=I need a new website"
          />

          {/* PACKAGE 3: THE RETAINER */}
          <ServiceCard 
            title="Monthly Management" 
            price="Developing" 
            period="/month"
            description="We ensure you stay on top as AI models evolve."
            features={[
              "Weekly Automated Scans & Fixes",
              "Monthly Content Updates",
              "Competitor Monitoring",
              "24/7 Uptime Monitoring",
              "Priority Support",
              "Quarterly Strategy Review"
            ]}
            buttonText="Apply for Retainer"
            href="mailto:sales@pulseseo.ai?subject=Monthly Management Inquiry"
          />

        </div>
      </div>
      <Footer />
    </main>
  );
}

// ✅ 2. Use the Interface here instead of 'any'
function ServiceCard({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  highlighted = false, 
  buttonText, 
  href 
}: ServiceCardProps) {
  
  return (
    <div className={`relative p-8 rounded-3xl border flex flex-col ${highlighted ? 'bg-zinc-900 dark:bg-zinc-900 border-blue-500 shadow-2xl shadow-blue-900/20' : 'bg-white dark:bg-black border-zinc-200 dark:border-zinc-800'}`}>
      
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
          Best Value
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-xl font-bold ${highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>{title}</h3>
        <p className="text-sm text-zinc-500 mt-2 min-h-[40px]">{description}</p>
      </div>

      <div className="mb-8">
        <span className={`text-4xl font-black ${highlighted ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>${price}</span>
        <span className="text-sm text-zinc-500 ml-1">{period}</span>
      </div>

      <div className="space-y-4 flex-grow mb-8">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300">
            <Check className="h-5 w-5 text-blue-500 shrink-0" />
            {feat}
          </li>
        ))}
      </div>

      <Link href={href} className="w-full">
        <button className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
          highlighted 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
        }`}>
          {buttonText} <ArrowRight className="h-4 w-4" />
        </button>
      </Link>
    </div>
  );
}