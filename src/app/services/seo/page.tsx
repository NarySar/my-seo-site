import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Search, Globe, Target, MapPin, CheckCircle2 } from "lucide-react";

export default function SEOServicePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Search className="w-4 h-4" /> Traditional SEO
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Rank higher on <br /> <span className="text-blue-600">Google & Bing</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          Capture high-intent human searchers. We fix your technical foundation, build domain authority, and optimize your content to dominate traditional Search Engine Results Pages (SERPs).
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/pricing/seo" className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
            View SEO Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">A Full-Stack Organic Strategy</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We go beyond basic keywords to build a robust, authoritative digital presence that search algorithms trust and prioritize.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Technical Foundations</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We investigate website architecture, page speed, mobile responsiveness, and crawlability to create a flawless foundation for search engines.
              </p>
              <ul className="space-y-2">
                {["Site Architecture Optimization", "Core Web Vitals Tuning", "Indexability & Crawl Budget", "XML Sitemaps & Redirects"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">On-Page & Intent Optimization</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We enhance your pages through strategic keyword integration, search intent matching, and comprehensive content clustering.
              </p>
              <ul className="space-y-2">
                {["Semantic Keyword Targeting", "Competitor Content Gap Analysis", "Meta Data & Header Structuring", "Conversion Rate Optimization (CRO)"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Authority & Link Building</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We build domain authority safely and effectively through targeted outreach, digital PR, and high-quality contextual backlinks.
              </p>
              <ul className="space-y-2">
                {["Contextual Backlink Acquisition", "Digital PR & Media Placements", "Toxic Link Audits & Disavowal", "Strategic Anchor Text Distribution"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Local Search Dominance</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Capture local market share by appearing in the coveted Google `&quot;`Local Pack`&quot;` and on map-based search results.
              </p>
              <ul className="space-y-2">
                {["Google Business Profile Management", "NAP Citation Syncing", "Geo-Targeted Landing Pages", "Local Review Generation Strategy"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Ready to scale your organic traffic?</h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Choose a comprehensive SEO plan that aligns with your growth targets.
        </p>
        <Link href="/pricing/seo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg transition-all hover:scale-105 shadow-xl">
          View SEO Plans & Pricing <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}