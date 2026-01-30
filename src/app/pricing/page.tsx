import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Start for free, upgrade for continuous monitoring.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Hobby</h3>
            <div className="text-4xl font-bold mt-4 mb-6">$0</div>
            <ul className="space-y-4 mb-8 text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-2"><Check className="w-5 h-5 text-green-500"/> Unlimited Scans</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-green-500"/> Basic PDF Report</li>
              <li className="flex gap-2 opacity-50"><X className="w-5 h-5"/> No History Storage</li>
            </ul>
            <Link href="/analyze" className="block w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800">Scan Now</Link>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-3xl border-2 border-blue-600 bg-zinc-900 dark:bg-black relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
            <h3 className="text-lg font-bold text-white">Agency</h3>
            <div className="text-4xl font-bold mt-4 mb-6 text-white">$49<span className="text-lg font-normal text-zinc-400">/mo</span></div>
            <ul className="space-y-4 mb-8 text-zinc-300">
              <li className="flex gap-2"><Check className="w-5 h-5 text-blue-400"/> Everything in Free</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-blue-400"/> Save Client History</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-blue-400"/> White-Label PDF</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-blue-400"/> Priority Support</li>
            </ul>
            <button className="block w-full py-3 rounded-xl bg-blue-600 text-white text-center font-bold hover:bg-blue-500">Get Started</button>
          </div>
          
           {/* Enterprise Tier */}
           <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Enterprise</h3>
            <div className="text-4xl font-bold mt-4 mb-6">Custom</div>
            <ul className="space-y-4 mb-8 text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-2"><Check className="w-5 h-5 text-green-500"/> API Access</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-green-500"/> Custom Integrations</li>
              <li className="flex gap-2"><Check className="w-5 h-5 text-green-500"/> Dedicated Account Manager</li>
            </ul>
            <button className="block w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800">Contact Sales</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}