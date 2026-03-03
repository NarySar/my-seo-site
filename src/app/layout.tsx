import type { Metadata } from "next";
import { Chatbot } from "@/components/Chatbot";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PulsePlusSEO.ai | Hybrid SEO Agency for AI & Google",
  description: "PulsePlusSEO.ai helps local businesses rank on Google and become visible to AI agents like ChatGPT, Gemini, and Perplexity. Get your free AI visibility scan today.",
  openGraph: {
    title: "PulsePlusSEO.ai | Hybrid SEO Agency",
    description: "Is your website invisible to AI? Scan it now with PulsePlusSEO.ai to find out.",
    url: "https://www.PulsePlusSEO.ai",
    siteName: "PulsePlusSEO.ai",
    images: [
      {
        url: "https://www.PulsePlusSEO.ai/opengraph-image.png", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 👇 SCHEMA MARKUP FOR AGENTIC SEO 👇 */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ProfessionalService",
                  "name": "PulsePlusSEO.ai",
                  "image": "https://www.PulsePlusSEO.ai/opengraph-image.png",
                  "@id": "https://www.PulsePlusSEO.ai",
                  "url": "https://www.PulsePlusSEO.ai",
                  "telephone": "+1-555-0100", 
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Bellvista Road",
                    "addressLocality": "Brighton",
                    "addressRegion": "MA",
                    "postalCode": "02135",
                    "addressCountry": "US",
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 42.3464,
                    "longitude": -71.1444,
                  },
                  "areaServed": [
                    { "@type": "City", "name": "Boston" },
                    { "@type": "City", "name": "Brighton" },
                    { "@type": "City", "name": "Allston" },
                    { "@type": "City", "name": "Brookline" }
                  ],
                  "description":
                    "PulsePlusSEO.ai is a Hybrid SEO Agency based in Brighton, MA. We help local businesses rank on Google and become visible to AI agents.",
                }),
              }}
            />
            {/* 👆 END SCHEMA 👆 */}

            {children}
            <Chatbot />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}