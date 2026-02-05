"use client";

import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle"; 

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* 1. Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
            P
          </div>
          <span>PulseSeo.ai</span>
        </Link>

        {/* 2. Middle Links (Restored!) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/features" className="hover:text-blue-600 dark:hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-blue-600 dark:hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-blue-600 dark:hover:text-white transition-colors">Docs</Link>
        </div>

        {/* 3. Right Side Actions (Login + Dark Mode) */}
        <div className="flex items-center gap-4">
          
          <ThemeToggle />

          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors hidden md:block">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>

              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                  Get Started
                </button>
              </SignInButton>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}