import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PulseSeo.ai | Optimize for the Machine Economy",
    template: "%s | PulseSeo.ai"
  },
  description: "The first SEO tool built for AI Agents, LLMs, and Voice Search. Analyze your site's readiness for the agentic future.",
  keywords: ["Agentic SEO", "LLM Optimization", "AI Search", "Technical SEO"],
  
  // This "openGraph" section is what FACEBOOK uses
  openGraph: {
    title: "PulseSeo.ai - The Future of SEO is Agentic",
    description: "Don't just rank for humans. Rank for AI. Test your site's readability for ChatGPT, Claude, and Gemini.",
    url: "https://pulseseo.ai",
    siteName: "PulseSeo.ai",
    type: "website",
    locale: "en_US",
  },
  // Twitter section removed as requested
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}