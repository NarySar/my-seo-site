import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search } from "lucide-react";
// 👇 NEW: Importing the global PricingCard component!
import { PricingCard } from "@/components/PricingCard";

export default function SEOPricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Search className="w-4 h-4" /> Traditional SEO
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Rank higher on <br /> <span className="text-blue-600">Google & Bing.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Foundational search engine visibility to drive organic traffic, clicks, and human conversions.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {/* Container has scroll-smooth removed for native, fast mobile swiping */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 items-stretch gap-4 md:gap-2 pt-4 pb-10 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* Card 1 Wrapper */}
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-0">
            <PricingCard 
              title="Momentum"
              description="Everything you need to compete in search."
              price="Under development"
              features={[
                "Technical SEO Audit",
                "Keyword Research & Strategy",
                "Competitor Gap Analysis",
                "On-Page Optimization",
                "Core Web Vitals Tuning",
                "Contextual Link Building",
                "GBP Management (Local)",
                "Live Rank Tracking Dashboard",
                "Ticket & Email Support",
              ]}
            />
          </div>

          {/* Card 2 Wrapper */}
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-10">
            <PricingCard 
              title="Scale"
              description="Built for businesses ready to accelerate."
              price="Under development"
              isPopular
              features={[
                "Everything in Momentum, plus:",
                "Advanced Technical SEO Maintenance",
                "Aggressive Link Building Campaigns",
                "Digital PR Placements",
                "Bi-Weekly Content Creation",
                "Conversion Rate Optimization (CRO)",
                "Dedicated Account Manager",
                "Priority Support",
              ]}
            />
          </div>

          {/* Card 3 Wrapper */}
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-0">
            <PricingCard 
              title="Elite"
              description="Our highest output volume for dominance."
              price="Under development"
              features={[
                "Everything in Scale, plus:",
                "Enterprise Site Architecture",
                "Maximum Volume Link Building",
                "Weekly Content Creation",
                "Franchise/Multi-Location SEO",
                "Custom Analytics & Reporting",
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