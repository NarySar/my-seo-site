"use client";

import { CheckCircle2, Minus, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingMatrix() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-6xl mx-auto border-t border-zinc-200 dark:border-zinc-800 mt-16">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
          Compare all plans
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Transparent pricing for every stage of your growth. No contracts. Cancel anytime.
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-8">
        <div className="min-w-[800px]">
          
          {/* Header Row */}
          <div className="grid grid-cols-4 border-b-2 border-zinc-200 dark:border-zinc-800 pb-8 mb-4">
            <div className="pr-8 flex flex-col justify-end">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Features</h3>
            </div>
            
            {/* Traditional SEO */}
            <div className="text-center px-4 flex flex-col justify-end">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Traditional SEO</h3>
              <div className="text-xl font-semibold text-zinc-600 dark:text-zinc-400">$799 /mo</div>
            </div>

            {/* GEO */}
            <div className="text-center px-4 flex flex-col justify-end">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">GEO (AI Search)</h3>
              <div className="text-xl font-semibold text-zinc-600 dark:text-zinc-400">$1299 /mo</div>
            </div>

            {/* Hybrid */}
            <div className="text-center px-4 flex flex-col justify-end">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Hybrid Dominance</h3>
              <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">$1999 /mo</div>
            </div>
          </div>

          {/* Sections */}
          <TableSection title="SETUP" />
          <FeatureRow title="Complimentary Setup" desc="We connect Google Analytics and Search Console, configure your dashboard, and get everything tracking correctly from day one." t1={true} t2={true} t3={true} />
          <FeatureRow title="Custom Strategy & Roadmap" desc="A personalised plan built around your business, your market, and your goals." t1={true} t2={true} t3={true} />
          <FeatureRow title="Live Dashboard" desc="Your own real-time dashboard showing rankings, traffic, conversions, and AI visibility." t1="Google Data" t2="AI Search Data" t3="Full Omni-Channel" />

          <TableSection title="RESEARCH" />
          <FeatureRow title="Website Audit" desc="A thorough review of your site's health. We identify what's holding you back." t1="Technical SEO" t2="LLM Readiness" t3="Comprehensive" />
          <FeatureRow title="Keyword & Prompt Research" desc="We find the exact search terms and AI prompts your local customers are using." t1="Keywords Only" t2="AI Prompts Only" t3="Keywords + Prompts" />
          <FeatureRow title="Competitor Research" desc="We analyse what your top competitors are doing in search." t1={true} t2={true} t3={true} />

          <TableSection title="DELIVERABLES" />
          <FeatureRow title="Technical SEO Maintenance" desc="Ongoing monthly fixes for crawl errors, broken links, page speed issues." t1={true} t2={false} t3={true} />
          <FeatureRow title="Google Business Profile & Posts" desc="We fully manage your GBP, keeping it optimised and active." t1="Monthly" t2={false} t3="Weekly" />
          <FeatureRow title="Contextual Backlinks & Mentions" desc="We earn you contextual editorial links and brand mentions." t1="2 /month" t2="2 /month" t3="4 /month" />
          <FeatureRow title="Brand & Entity Building" desc="We establish your business as a recognised entity across trusted platforms." t1={false} t2="10 /month" t3="10 /month" />
          <FeatureRow title="Structured Data Optimisation" desc="We add schema markup across your site so search engines and AI models natively understand your content." t1="Basic Schema" t2="Knowledge Graph" t3="Advanced Custom" />
          <FeatureRow title="Content Optimisation" desc="We improve your existing pages for search intent, readability, and local relevance." t1="For Humans" t2="For LLMs" t3="Dual-Optimized" />
          <FeatureRow title="AI Search Optimisation" desc="We structure your content to appear in AI-generated answers across ChatGPT, Gemini, and Perplexity." t1={false} t2={true} t3={true} />
          <FeatureRow title="Blog Posts" desc="SEO-optimised posts of up to 1,000 words, written to rank and drive qualified traffic." t1="1 /month" t2="2 /month" t3="4 /month" />

          <TableSection title="SUPPORT" />
          <FeatureRow title="Ticket & Email Support" desc="Direct access to your SEO team whenever you need it." t1={true} t2={true} t3={true} />
          
          {/* Action Row */}
          <div className="grid grid-cols-4 mt-12 pt-8">
            <div></div>
            <div className="px-4">
              <button className="w-full py-3.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold transition-all shadow-sm">
                Select Traditional
              </button>
            </div>
            <div className="px-4">
              <button className="w-full py-3.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold transition-all shadow-sm">
                Select GEO
              </button>
            </div>
            <div className="px-4">
              <button className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25">
                Select Hybrid
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Lead Capture Push inside the component */}
      <div className="mt-20 text-center bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-10 border border-blue-100 dark:border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
        <div className="text-left max-w-xl">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Not sure where your site stands?</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Run your website through our proprietary 6-Pillar scanner to see exactly where your current strategy is failing before you spend a dime.
          </p>
        </div>
        <Link href="/analyze">
          <button className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-8 py-4 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 whitespace-nowrap">
            Run Free Scan <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

    </section>
  );
}

// --- HELPER COMPONENTS ---

function TableSection({ title }: { title: string }) {
  return (
    <div className="border-b border-zinc-300 dark:border-zinc-700 mt-12 mb-2 pb-2">
      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">{title}</h4>
    </div>
  );
}

function FeatureRow({ title, desc, t1, t2, t3 }: { title: string, desc: string, t1: boolean | string, t2: boolean | string, t3: boolean | string }) {
  const renderValue = (val: boolean | string, colIndex: number) => {
    if (typeof val === "string") {
      return <span className={`text-sm font-semibold ${colIndex === 3 ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'}`}>{val}</span>;
    }
    if (val) {
      return <CheckCircle2 className={`w-5 h-5 ${colIndex === 3 ? 'text-blue-500' : 'text-zinc-300 dark:text-zinc-600'}`} />;
    }
    return <Minus className="w-5 h-5 text-zinc-100 dark:text-zinc-800" />;
  };

  return (
    <div className="grid grid-cols-4 items-start py-6 border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors">
      <div className="pr-8">
        <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{title}</h4>
        <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{desc}</p>
      </div>
      <div className="text-center px-4 pt-1 flex items-start justify-center h-full">
        {renderValue(t1, 1)}
      </div>
      <div className="text-center px-4 pt-1 flex items-start justify-center h-full">
        {renderValue(t2, 2)}
      </div>
      <div className="text-center px-4 pt-1 flex items-start justify-center h-full">
        {renderValue(t3, 3)}
      </div>
    </div>
  );
}