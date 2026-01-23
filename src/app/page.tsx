import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero"; // Import the new component
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PulseSeo.ai",
    "url": "https://pulseseo.ai",
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <JsonLd data={structuredData} />
      
      {/* The new Hero Section */}
      <Hero />
      <Features />
      <Pricing />
      <Footer />
      
    </main>
  );
}