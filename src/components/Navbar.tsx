"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { Menu, X, Zap, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  // 1. Initialize Theme on Load
  useEffect(() => {
    // Check local storage or system preference
    const isDarkMode = 
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      // ✅ FIX 1: Wrap 'true' in setTimeout
      setTimeout(() => setIsDark(true), 0);
    } else {
      document.documentElement.classList.remove('dark');
      // ✅ FIX 2: Wrap 'false' in setTimeout (This is where it was crashing!)
      setTimeout(() => setIsDark(false), 0);
    }
  }, []);

  // 2. Toggle Function
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const isActive = (path: string) => pathname === path ? "text-blue-600 dark:text-blue-400 font-bold" : "text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400";

  const menuItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-zinc-900 dark:bg-white text-white dark:text-black p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
               <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              PulseSeo.ai
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className={`text-sm font-medium transition-colors ${isActive(item.href)}`}>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-bold hover:opacity-80 transition-opacity">
                   Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-zinc-600 dark:text-zinc-400">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-900 dark:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 space-y-4 shadow-xl">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
             {!isSignedIn && (
                <SignInButton mode="modal">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                    Sign In
                  </button>
                </SignInButton>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}