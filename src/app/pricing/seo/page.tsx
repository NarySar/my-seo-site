import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Search } from "lucide-react";

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
        {/* 👇 CHANGED: Added 'pt-4' right before 'pb-10' to raise the invisible ceiling! */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 items-stretch gap-4 md:gap-2 pt-4 pb-10 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0">
          
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
    <div className={`flex flex-col h-full rounded-3xl overflow-hidden border transition-all duration-150 ease-out hover:-translate-y-2 active:scale-[0.98] cursor-pointer ${
      isPopular 
        ? 'border-blue-500 shadow-xl hover:shadow-2xl hover:shadow-blue-900/30' 
        : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-600'
    }`}>
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 right-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg uppercase tracking-wider shadow-md z-10">
          Most Popular
        </div>
      )}

      {/* Top Section */}
      <div className={`relative p-8 ${
        isPopular 
          ? 'bg-gradient-to-br from-blue-900 via-zinc-900 to-black dark:from-blue-900/80 dark:via-zinc-900 dark:to-zinc-950 text-white border-b border-zinc-800' 
          : 'bg-gradient-to-br from-blue-100 via-purple-50 to-white dark:from-blue-900/50 dark:via-purple-900/20 dark:to-zinc-900 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800'
      }`}>
        <h3 className="text-2xl font-bold mb-2 relative z-10">{title}</h3>
        
        <p className={`text-sm mb-8 min-h-[40px] relative z-10 ${isPopular ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
          {description}
        </p>
        
        <div className="mb-8 relative z-10">
          <span className={`text-3xl font-black italic tracking-tight ${
            isPopular ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-400 dark:text-zinc-500'
          }`}>
            {price}
          </span>
        </div>

        <button className={`w-full py-4 rounded-xl font-bold transition-all duration-150 active:scale-95 relative z-10 ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
            : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm'
        }`}>
          Get Started
        </button>
      </div>

      {/* Bottom Section (Features List) */}
      <div className={`p-8 flex-1 ${isPopular ? 'bg-white dark:bg-zinc-900' : ''}`}>
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