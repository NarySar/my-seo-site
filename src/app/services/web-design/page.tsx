import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MonitorSmartphone, Zap, MousePointerClick, Code, Database } from "lucide-react";

export default function WebDesignServicesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-teal-100 dark:selection:bg-teal-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6">
          <MonitorSmartphone className="w-4 h-4" /> Performance Web Design
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Built for humans. <br /> <span className="text-teal-600">Engineered for search.</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          We don&apos;t just build pretty brochures. We develop lightning-fast, conversion-optimized Next.js and React websites with technical SEO and AI-readiness baked into the code from day one.
        </p>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Service Pillar 1 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
            <Zap className="w-10 h-10 text-teal-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Core Web Vitals Mastery</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Site speed is a direct ranking factor. We build on modern frameworks like Next.js to ensure perfect Google Lighthouse scores, instant page loads, and flawless mobile responsiveness.
            </p>
          </div>

          {/* Service Pillar 2 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
            <MousePointerClick className="w-10 h-10 text-teal-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Conversion-First UX</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Traffic is meaningless if it doesn&apos;t convert. We design intuitive user journeys, compelling calls-to-action, and frictionless forms to turn your organic visitors into paying customers.
            </p>
          </div>

          {/* Service Pillar 3 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
            <Code className="w-10 h-10 text-teal-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Flawless Technical SEO</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Most web developers treat SEO as an afterthought. We build it into the foundation—clean semantic HTML, dynamic sitemaps, perfect canonical tags, and optimized meta structures.
            </p>
          </div>

          {/* Service Pillar 4 */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
            <Database className="w-10 h-10 text-teal-500 mb-6" />
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">AI & RAG Ready</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Your site will be built to feed Large Language Models. We implement advanced JSON-LD Schema and structure your content so ChatGPT and Gemini can easily scrape, understand, and cite you.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-3xl p-10 border border-teal-100 dark:border-teal-800/50">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Ready for a new digital storefront?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Check out our flat-rate Web Design packages to launch your high-performance site.
          </p>
          <Link 
            href="/pricing/web-design"
            style={{ backgroundColor: "#0d9488", color: "#ffffff" }}
            className="inline-block hover:opacity-90 font-semibold py-3 px-8 rounded-full transition-all"
          >
            View Design Pricing
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}