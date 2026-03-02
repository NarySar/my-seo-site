import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, LineChart, Settings, Link2, FileText } from "lucide-react";

export default function SEOServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Search className="w-4 h-4" /> Traditional SEO Service
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Dominate search results with <br /> <span className="text-blue-600">data-driven SEO.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          We don&apos;t just guess. We build a foundational search engine strategy to drive sustainable organic traffic and connect you with high-intent human searchers.
        </p>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Service Pillar 1 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Settings className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Technical SEO</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We ensure search engines can crawl, index, and understand your site perfectly. From Core Web Vitals and site speed tuning to complex schema markup and architecture restructuring.
            </p>
          </div>

          {/* Service Pillar 2 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <LineChart className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Keyword Strategy</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We find the exact phrases your target customers are typing into Google and Bing. We map these high-intent keywords to specific pages to capture traffic at every stage of the buying journey.
            </p>
          </div>

          {/* Service Pillar 3 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <FileText className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">On-Page & Content</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Content is still king for traditional search. We optimize your existing pages and create new, authoritative content that answers user intent better than your competitors.
            </p>
          </div>

          {/* Service Pillar 4 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <Link2 className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Authority Building</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We acquire high-quality, relevant backlinks to your site through digital PR and targeted outreach. This signals trust and authority to search algorithms, pushing you higher in the ranks.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-10 border border-blue-100 dark:border-blue-800/50">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Ready to scale your traffic?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Check out our transparent pricing tiers to find the perfect SEO package for your business goals.
          </p>
          <Link 
            href="/pricing/seo"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
          >
            View Plans & Pricing
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}