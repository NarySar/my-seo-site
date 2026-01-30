"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white">
          <div className="h-8 w-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold">
            P
          </div>
          <span>PulseSeo.ai</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/features" className="hover:text-black dark:hover:text-white transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
          <Link href="/docs" className="hover:text-black dark:hover:text-white transition-colors">Docs</Link>
        </div>

        {/* Desktop Actions (Toggle + CTA) */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="/analyze" className="bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button & Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            className="text-zinc-900 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-2">
           <Link href="/features" className="text-lg font-medium text-zinc-900 dark:text-white" onClick={() => setIsOpen(false)}>Features</Link>
           <Link href="/pricing" className="text-lg font-medium text-zinc-900 dark:text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
           <Link href="/docs" className="text-lg font-medium text-zinc-900 dark:text-white" onClick={() => setIsOpen(false)}>Docs</Link>
           <hr className="border-zinc-100 dark:border-zinc-800"/>
           <Link href="/analyze" className="bg-blue-600 text-white py-3 rounded-xl text-center font-bold" onClick={() => setIsOpen(false)}>
            Get Started Free
           </Link>
        </div>
      )}
    </nav>
  );
}