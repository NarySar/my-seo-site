import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Settings, Activity, Code, Database, CheckCircle2 } from "lucide-react";

export default function TechnicalSEOPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Settings className="w-4 h-4" /> Under The Hood
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Technical SEO & <br /> <span className="text-blue-600">Platform Architecture</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          Even the best content won&apos;t rank if search engines and AI agents can&apos;t crawl it. We repair broken architecture, optimize page speed, and deploy advanced schema to ensure maximum crawlability.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/technical-seo-plans" className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
            View Technical Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Fix The Foundation</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We conduct deep-dive technical audits to uncover the hidden errors that are silently throttling your organic traffic and AI visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Crawlability & Indexation</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We ensure Googlebot, Bingbot, and AI crawlers (like GPTBot) can efficiently navigate and index your most important pages without wasting crawl budget.
              </p>
              <ul className="space-y-2">
                {["Robots.txt & Meta Robots Optimization", "XML Sitemap Configuration", "Fixing 404s & Redirect Chains", "JavaScript Rendering Fixes"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Site Speed & Core Web Vitals</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Speed is a confirmed ranking factor. We diagnose and resolve performance bottlenecks so your website passes Google&apos;s Core Web Vitals assessment.
              </p>
              <ul className="space-y-2">
                {["LCP, FID, and CLS Optimization", "Image Compression & Next-Gen Formats", "Server Response Time (TTFB)", "CSS/JS Minification & Caching"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Site Architecture & Internal Linking</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We reorganize your URL structure and internal links to funnel link equity (PageRank) directly to your highest-converting pages.
              </p>
              <ul className="space-y-2">
                {["Semantic Topic Siloing", "Fixing Orphan Pages", "Faceted Navigation Optimization", "URL Structure & Canonicalization"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Advanced Schema Markup</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We deploy nested JSON-LD structured data to explicitly tell search engines and AI agents exactly who you are, what you sell, and who trusts you.
              </p>
              <ul className="space-y-2">
                {["Organization & LocalBusiness Schema", "Product & Review Rich Snippets", "FAQ & How-To Schema", "Entity Association (sameAs)"].map((item, i) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Ready to fix your technical debt?</h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Our technical audits provide an actionable roadmap to higher rankings.
        </p>
        <Link href="/technical-seo-plans" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg transition-all hover:scale-105 shadow-xl">
          View Plans & Pricing <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}