"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { Menu, X, Zap } from "lucide-react";
// Make sure you have this component, otherwise remove this line and the <ThemeToggle /> usage below
import { ThemeToggle } from "@/components/ThemeToggle"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const nav = [
    { name: "Features", href: "/features" },
    { name: "Analyze", href: "/analyze" }, // ✅ Analyze is here!
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ];

  // Only show Dashboard when signed in
  const navWithDashboard = isSignedIn
    ? [...nav, { name: "Dashboard", href: "/dashboard" }]
    : nav;

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-black/50 backdrop-blur-md transition-colors">
          <div className="h-16 flex items-center justify-between px-4 sm:px-6">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-extrabold tracking-tight text-zinc-900 dark:text-white group"
            >
              <span className="h-9 w-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Zap className="h-5 w-5 fill-current" />
              </span>
              <span className="text-lg">PulseSeo.ai</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {navWithDashboard.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-zinc-900 dark:hover:text-white ${
                    isActive(item.href)
                      ? "text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Optional: Remove <ThemeToggle /> if you don't have that file yet */}
              <ThemeToggle />

              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/analyze"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-bold transition-transform hover:scale-105"
                  >
                    Run Scan
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/analyze"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-bold transition-transform hover:scale-105"
                  >
                    Audit Free
                  </Link>
                  <SignInButton mode="modal">
                    <button className="inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 px-5 py-2 text-sm font-bold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setOpen((v) => !v)}
                className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 flex items-center justify-center text-zinc-900 dark:text-white"
                aria-label="Open menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden border-t border-zinc-200/70 dark:border-zinc-800/70 px-4 py-4 space-y-3">
              {navWithDashboard.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3 py-2 font-semibold ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                      : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-2">
                {isSignedIn ? (
                  <Link
                    href="/analyze"
                    onClick={() => setOpen(false)}
                    className="block text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-bold"
                  >
                    Run Scan
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/analyze"
                      onClick={() => setOpen(false)}
                      className="block text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-bold"
                    >
                      Audit Free
                    </Link>
                    <SignInButton mode="modal">
                      <button className="w-full text-center rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 px-4 py-3 font-bold text-zinc-900 dark:text-white">
                        Sign In
                      </button>
                    </SignInButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}