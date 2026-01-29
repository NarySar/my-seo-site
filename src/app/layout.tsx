import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 IMPORT MATCHING YOUR FILENAME EXACTLY (Case Sensitive!)
import { ThemeProvider } from "@/components/ThemeProvider"; 
import Navbar from "@/components/Navbar"; // Assuming you want Navbar on all pages
import { Footer } from "@/components/Footer"; // Assuming you want Footer on all pages

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PulseSeo.ai | Agentic SEO Scanner",
  description: "Check if your site is visible to AI Agents like ChatGPT and Gemini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* 👇 Wrap the entire app in the ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar can go here so it appears on every page */}
          {/* <Navbar />  <-- If you already have Navbar in page.tsx, remove it there and put it here! */}
          
          {children}

          {/* <Footer /> <-- Same for Footer */}
        </ThemeProvider>
      </body>
    </html>
  );
}