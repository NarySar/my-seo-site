"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// The highly optimized Q&A data for PulsePlusSEO
const faqs = [
  {
    question: "What is Agentic SEO and how is it different from traditional SEO?",
    answer: "Traditional SEO targets keywords to rank on standard Google search pages. Agentic SEO (or GEO) optimizes your website's data structure specifically for Large Language Models (LLMs) like ChatGPT, Gemini, and Perplexity, ensuring AI agents confidently cite and recommend your business in their conversational answers."
  },
  {
    question: "What is GEO (Generative Engine Optimization)?",
    answer: "Generative Engine Optimization (GEO) is the strategy of making your website 'RAG-Ready' (Retrieval-Augmented Generation). We optimize your entity recognition, sentiment bias, and token density so AI algorithms easily parse and retrieve your content when users ask questions in your niche."
  },
  {
    question: "How does the PulsePlus AI Visibility Scan work?",
    answer: "Our enterprise-grade scanner evaluates your website across 5 critical pillars: Meta Data, Page Quality, Structure & Links, Server Technology, and LLM Readiness. It uses an AI-powered hybrid engine to emulate how modern crawlers view your site, giving you a precise AI Visibility Score."
  },
  {
    question: "Do I still need traditional Google SEO?",
    answer: "Absolutely. We utilize a 'Hybrid Dominance' approach. Our web design and technical architecture are built to capture high-intent human searchers on Google and local maps, while simultaneously feeding structured data to modern AI retrieval systems."
  },
  {
    question: "Why does my website need JSON-LD Schema?",
    answer: "JSON-LD Schema acts as a direct translation layer for AI crawlers. Instead of forcing an AI to guess what your website is about, Schema explicitly defines your business entity, services, and FAQs, injecting your brand directly into core Knowledge Graphs."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // 🧠 THE MAGIC: Automatically generate JSON-LD Schema for AI Crawlers!
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Hidden JSON-LD block for Perplexity, ChatGPT, and Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            Everything you need to know about Agentic SEO and AI Search Visibility.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-zinc-50 dark:bg-zinc-900/50 shadow-md' : 'bg-white dark:bg-zinc-900'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100 pr-8">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}