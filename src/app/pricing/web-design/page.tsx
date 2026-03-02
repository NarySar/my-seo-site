import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, MonitorSmartphone } from "lucide-react";

export default function WebDesignPricingPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-teal-100 dark:selection:bg-teal-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6">
          <MonitorSmartphone className="w-4 h-4" /> Performance Web Design
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          High-performance sites. <br /> <span className="text-teal-600">Flat-rate pricing.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Transparent, project-based pricing for websites engineered to convert humans and rank in AI search engines.
        </p>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 items-stretch gap-4 md:gap-2 pt-4 pb-10 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* Card 1 Wrapper */}
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-0">
            <PricingCard 
              title="Momentum"
              description="Perfect for local businesses needing a modern, fast refresh."
              price="Under development"
              features={[
                "Up to 5 custom pages",
                "Mobile-first responsive design",
                "Basic on-page SEO setup",
                "Contact form integration",
                "1 round of revisions",
              ]}
            />
          </div>

          {/* Card 2 Wrapper (Most Popular) */}
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-10">
            <PricingCard 
              title="Scale"
              description="Built for businesses ready to accelerate and dominate search."
              price="Under development"
              isPopular
              features={[
                "Up to 15 custom pages",
                "Advanced Technical SEO architecture",
                "AI/RAG JSON-LD Schema integration",
                "CMS integration (Blog/Portfolio)",
                "Performance optimization (90+ Speed)",
                "2 rounds of revisions",
              ]}
            />
          </div>

          {/* Card 3 Wrapper */}
          <div className="w-[85vw] md:w-auto shrink-0 snap-center relative z-0">
            <PricingCard 
              title="Elite"
              description="Our highest output volume for total market dominance."
              price="Under development"
              features={[
                "Unlimited core pages",
                "E-commerce / Complex integrations",
                "Complete Entity Authority mapping",
                "Custom web application features",
                "Dedicated project manager",
                "Priority post-launch support",
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
        ? 'border-teal-500 shadow-xl hover:shadow-2xl hover:shadow-teal-900/30' 
        : 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-2xl hover:border-teal-400 dark:hover:border-teal-600'
    }`}>
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-0 right-8 bg-gradient-to-r from-teal-600 to-teal-400 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg uppercase tracking-wider shadow-md z-10">
          Most Popular
        </div>
      )}

      {/* Top Section */}
      <div className={`relative p-8 ${
        isPopular 
          ? 'bg-gradient-to-br from-teal-900 via-zinc-900 to-black dark:from-teal-900/80 dark:via-zinc-900 dark:to-zinc-950 text-white border-b border-zinc-800' 
          : 'bg-gradient-to-br from-teal-100 via-emerald-50 to-white dark:from-teal-900/50 dark:via-emerald-900/20 dark:to-zinc-900 text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800'
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
            ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/20' 
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
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPopular ? 'text-teal-600' : 'text-zinc-400 dark:text-zinc-600'}`} />
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}