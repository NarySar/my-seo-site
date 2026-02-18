import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, X, Zap, Cpu, Globe } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    // 👇 Added 'overflow-x-hidden' to stop the horizontal scrolling issue
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden">
      <Navbar />

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            Simple, Transparent <br/>
            <span className="text-blue-600">Hybrid Pricing.</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            Stop paying for SEO that only targets humans. Get a plan that ranks you on Google <strong>and</strong> recommends you on ChatGPT.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Plan 1: Starter */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Audit</h3>
              <p className="text-zinc-500 text-sm mt-2">Perfect for checking your AI visibility.</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">$0</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <Link href="/analyze" className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-center transition-colors">
              Scan Website
            </Link>
            <div className="mt-8 space-y-4">
              <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                Single URL Scan
              </li>
              <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                Basic Score (0-100)
              </li>
              <li className="flex gap-3 text-sm text-zinc-400">
                <X className="w-5 h-5 shrink-0" />
                Detailed Fixes
              </li>
            </div>
          </div>

          {/* Plan 2: Pro (Highlight) */}
          <div className="bg-zinc-900 dark:bg-white rounded-3xl p-8 border border-zinc-900 dark:border-white flex flex-col relative overflow-hidden transform md:-translate-y-4 shadow-2xl">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white dark:text-black">Growth</h3>
              <p className="text-zinc-400 dark:text-zinc-600 text-sm mt-2">For local businesses wanting to rank.</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white dark:text-black">under development</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center transition-colors shadow-lg shadow-blue-900/20">
              Get Started
            </button>
            <div className="mt-8 space-y-4">
              <li className="flex gap-3 text-sm text-zinc-300 dark:text-zinc-700">
                <Check className="w-5 h-5 text-blue-400 dark:text-blue-600 shrink-0" />
                <strong>Hybrid Optimization</strong> (Google + AI)
              </li>
              <li className="flex gap-3 text-sm text-zinc-300 dark:text-zinc-700">
                <Check className="w-5 h-5 text-blue-400 dark:text-blue-600 shrink-0" />
                JSON-LD Schema Setup
              </li>
              <li className="flex gap-3 text-sm text-zinc-300 dark:text-zinc-700">
                <Check className="w-5 h-5 text-blue-400 dark:text-blue-600 shrink-0" />
                Monthly Token Density Blog
              </li>
              <li className="flex gap-3 text-sm text-zinc-300 dark:text-zinc-700">
                <Check className="w-5 h-5 text-blue-400 dark:text-blue-600 shrink-0" />
                Competitor Monitoring
              </li>
            </div>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Dominance</h3>
              <p className="text-zinc-500 text-sm mt-2">Multi-location & Franchise.</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">under development</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <button className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-center transition-colors">
              Contact Sales
            </button>
            <div className="mt-8 space-y-4">
              <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                Unlimited Locations
              </li>
              <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                API Access
              </li>
              <li className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Check className="w-5 h-5 text-blue-600 shrink-0" />
                White-label Reports
              </li>
            </div>
          </div>

        </div>

        {/* Feature Comparison Table */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 text-center">Feature Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-4 px-4 font-medium text-zinc-500">Feature</th>
                  <th className="py-4 px-4 font-medium text-zinc-900 dark:text-white text-center">Audit</th>
                  <th className="py-4 px-4 font-medium text-blue-600 text-center">Growth</th>
                  <th className="py-4 px-4 font-medium text-zinc-900 dark:text-white text-center">Dominance</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 flex items-center gap-2"><Globe className="w-4 h-4"/> Google Ranking</td>
                  <td className="text-center text-zinc-300">-</td>
                  <td className="text-center text-blue-600"><Check className="w-4 h-4 mx-auto"/></td>
                  <td className="text-center text-zinc-900 dark:text-white"><Check className="w-4 h-4 mx-auto"/></td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 flex items-center gap-2"><Cpu className="w-4 h-4"/> AI Optimization</td>
                  <td className="text-center text-zinc-300">-</td>
                  <td className="text-center text-blue-600"><Check className="w-4 h-4 mx-auto"/></td>
                  <td className="text-center text-zinc-900 dark:text-white"><Check className="w-4 h-4 mx-auto"/></td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                  <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400 flex items-center gap-2"><Zap className="w-4 h-4"/> Speed Optimization</td>
                  <td className="text-center text-zinc-300">-</td>
                  <td className="text-center text-blue-600"><Check className="w-4 h-4 mx-auto"/></td>
                  <td className="text-center text-zinc-900 dark:text-white"><Check className="w-4 h-4 mx-auto"/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}