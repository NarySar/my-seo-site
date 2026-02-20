import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, MapPin, Store, Map, Star, CheckCircle2, Navigation } from "lucide-react";

export default function LocalSEOPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900 overflow-x-hidden w-full relative">
      <Navbar />
      
      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
          <MapPin className="w-4 h-4" /> Local Dominance
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Local SEO & <br /> <span className="text-blue-600">AI Local Discovery</span>
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">
          Target local customers effectively with our specialized local SEO services. We optimize your Google Business Profile and local citations to drive foot traffic from both traditional search and AI recommendations.
        </p>
        
        {/* 👇 Top Button linking to pricing */}
        <div className="flex justify-center gap-4">
          <Link href="/local-seo-plans" className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/20">
            View Local SEO Plans <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* WHAT WE DO SECTION */}
      <section className="py-24 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">Own Your Local Market</h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We ensure your business is the undisputed answer when locals search on Google Maps or ask AI assistants for recommendations nearby.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Google Business Profile (GBP)</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Comprehensive management and optimization of your GBP to secure top rankings in the coveted Google Local Pack.
              </p>
              <ul className="space-y-2">
                {["Profile Claiming & Verification", "Category & Attribute Optimization", "Weekly/Monthly GBP Posts", "Products & Services Mapping"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">NAP Citations & Data Aggregators</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Consistent Name, Address, and Phone (NAP) citations across tier-1 directories. This is critical for AI engines that cross-reference data to verify your existence.
              </p>
              <ul className="space-y-2">
                {["Citation Audit & Cleanup", "Apple Maps & Bing Places Setup", "Yelp & Industry-Specific Directories", "Data Aggregator Submissions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6">
                <Navigation className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Geo-Targeted Content & Schema</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                We build localized landing pages and deploy LocalBusiness Schema markup so search engines perfectly understand your service areas.
              </p>
              <ul className="space-y-2">
                {["City & Service Area Pages", "LocalBusiness JSON-LD Schema", "Hyper-local Keyword Targeting", "Map Embeds & Route Data"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Reputation Management</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                AI language models rely heavily on customer sentiment. We help monitor, manage, and respond to reviews to build unbreakable trust signals.
              </p>
              <ul className="space-y-2">
                {["Review Generation Strategies", "Review Monitoring & Response", "Sentiment Analysis for AI", "Negative Review Mitigation"].map((item, i) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">Capture local search traffic today.</h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
          Whether you have one location or fifty, we have a plan to put you on the map.
        </p>
        
        {/* 👇 Bottom Button linking to pricing */}
        <Link href="/local-seo-plans" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-lg transition-all hover:scale-105 shadow-xl">
          View Plans & Pricing <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}