import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function LocalSEOPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Our Local SEO plans
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Choose the perfect <strong>Local SEO</strong> plan for your business needs and budget with our comprehensive range of service packages.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Starter Plan */}
          <PricingCard 
            title="Starter"
            description="Perfect for new businesses"
            price="Under development"
            listTitle="Deliverables"
            features={[
              "Google Business Profile optimization",
              "GBP Audit",
              "Business Citations",
              "Monthly GBP posts",
              "Keyword Research",
              "Competitor Research",
              "Ticket Support",
            ]}
          />

          {/* Professional Plan */}
          <PricingCard 
            title="Professional"
            description="Comprehensive local SEO"
            price="Under development"
            listTitle="Deliverables"
            isPopular
            features={[
              "Google Business Profile optimization",
              "GBP Audit",
              "Business Citations",
              "Monthly GBP posts",
              "Keyword Research",
              "Competitor Research",
              "Local Schema Markup",
              "Ticket Support",
            ]}
          />

          {/* Enterprise Plan */}
          <PricingCard 
            title="Enterprise"
            description="Maximum local dominance"
            price="Under development"
            listTitle="Deliverables"
            features={[
              "Google Business Profile optimization",
              "GBP Audit",
              "Business Citations",
              "Weekly GBP posts",
              "Keyword Research",
              "Competitor Research",
              "Local Schema Markup",
              "Review Monitoring & Response",
              "Ticket Support",
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
  listTitle?: string;
}

function PricingCard({ title, description, price, features, isPopular, listTitle }: PricingCardProps) {
  return (
    <div className={`flex flex-col rounded-3xl overflow-hidden border ${isPopular ? 'border-blue-500 shadow-2xl shadow-blue-900/20 relative' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-lg'}`}>
      {isPopular && (
        <div className="absolute top-0 right-8 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-b-lg uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <div className={`p-8 ${isPopular ? 'bg-zinc-900 text-white' : 'bg-orange-50/50 dark:bg-zinc-800/30 text-zinc-900 dark:text-white'}`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className={`text-sm mb-8 ${isPopular ? 'text-zinc-400' : 'text-zinc-600 dark:text-zinc-400'}`}>{description}</p>
        <div className="mb-8"><span className="text-3xl font-black italic text-zinc-400 dark:text-zinc-500">{price}</span></div>
        <button className={`w-full py-4 rounded-xl font-bold transition-all ${isPopular ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200'}`}>
          Get Started
        </button>
      </div>
      <div className={`p-8 flex-1 ${isPopular ? 'bg-white dark:bg-zinc-900/80' : ''}`}>
        <p className="font-bold text-zinc-900 dark:text-white mb-6">{listTitle || "What's included"}</p>
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPopular ? 'text-blue-600' : 'text-zinc-900 dark:text-zinc-100'}`} />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}