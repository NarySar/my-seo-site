import { CheckCircle2 } from "lucide-react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({ title, description, price, features, isPopular }: PricingCardProps) {
  return (
    <div className={`flex flex-col h-full rounded-3xl overflow-hidden border transition-all duration-150 ease-out hover:-translate-y-2 active:scale-[0.98] cursor-pointer transform-gpu antialiased will-change-transform [backface-visibility:hidden] ${
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

        <button className={`w-full py-4 rounded-xl font-bold transition-all duration-150 active:scale-95 relative z-10 transform-gpu ${
          isPopular 
            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
            : 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-sm'
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