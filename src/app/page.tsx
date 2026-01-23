import Image from "next/image";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  // Agentic SEO Data: Describes the site to AI bots
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "My SEO Hybrid Site",
    "description": "A high-performance Next.js site optimized for AI agents.",
    "url": "https://your-domain.com", 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-white dark:bg-black">
      {/* 1. The Hidden SEO Layer (for AI) */}
      <JsonLd data={structuredData} />

      {/* 2. The Visual Layer (for Humans) */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Agentic SEO Project
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          This site is now configured for static export and contains embedded 
          JSON-LD for machine readability.
        </p>
        <div className="pt-4">
          <code className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded text-sm">
            Status: Ready to Build
          </code>
        </div>
      </div>
    </main>
  );
}