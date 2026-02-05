"use client";

import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
            P
          </div>
          <span>PulseSeo.ai</span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          
          {/* If Logged In: Show User Circle */}
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors hidden md:block">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            /* If Guest: Show Sign In Button */
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
                  Sign In
                </button>
              </SignInButton>

              <SignInButton mode="modal">
                <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity">
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