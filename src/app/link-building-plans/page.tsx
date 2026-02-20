import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

export default function LinkBuildingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Our Link Building plans
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Transform your website&apos;s authority with our premium contextual link building services. We secure high-quality backlinks from authoritative websites in your industry, strategically placed within relevant, comprehensive content to boost your search rankings and drive qualified traffic to your business.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          
          <PricingCard 
            title="Essential"
            description="Build your foundation with quality links"
            price="Under development"
            listTitle="Deliverables"
            features={[
              "3 Contextual Backlinks",
              "Minimum Ahrefs DR 30+",
              "Minimum 1000-word content",
              "Strategic anchor text distribution",
              "Industry-relevant content placement",
              "Comprehensive reporting",
              "Backlink profile audit",
              "Ticket Support",
            ]}
          />

          <PricingCard 
            title="Advanced"
            description="Accelerate growth with strategic link building"
            price="Under development"
            listTitle="Deliverables"
            isPopular
            features={[
              "5 Contextual Backlinks",
              "Minimum Ahrefs DR 30+",
              "Minimum 1000-word content",
              "Strategic anchor text distribution",
              "Industry-relevant content placement",
              "Comprehensive reporting",
              "Backlink profile audit",
              "Ticket Support",
            ]}
          />

          <PricingCard 
            title="Ultimate"
            description="Dominate your market with maximum power"
            price="Under development"
            listTitle="Deliverables"
            features={[
              "10 Contextual Backlinks",
              "Minimum Ahrefs DR 30+",
              "Minimum 1000-word content",
              "Strategic anchor text distribution",
              "Industry-relevant content placement",
              "Comprehensive reporting",
              "Backlink profile audit",
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