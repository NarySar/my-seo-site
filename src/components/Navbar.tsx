"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { Menu, X, Zap, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // State for Dark Mode
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  // 1. Initialize Theme on Load
  useEffect(() => {
    // Check local storage or system preference
    if (
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
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

  const isActive = (path: string) => pathname === path ? "text-blue-600 dark:text-blue-400 font-bold" : "text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400";

  const menuItems = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold text-lg">
            P
          </div>
          <span>PulseSeo.ai</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className={`text-sm font-medium transition-colors ${isActive(item.href)}`}>
                    {item.name}
                </Link>
            ))}
            <Link href="/analyze" className={`text-sm font-medium transition-colors ${isActive("/analyze")}`}>
              Analyze
            </Link>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
           {/* THEME TOGGLE BUTTON */}
           <button 
             onClick={toggleTheme} 
             className="p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
             aria-label="Toggle Dark Mode"
           >
             {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
           </button>

           {isSignedIn ? (
             <UserButton afterSignOutUrl="/" />
           ) : (
             <SignInButton mode="modal">
                <button className="text-sm font-medium text-zinc-900 dark:text-white hover:opacity-70">
                    Sign In
                </button>
             </SignInButton>
           )}
           <Link href="/analyze">
              <button className="bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2">
                <Zap className="h-3 w-3 fill-current" /> Get Started
              </button>
           </Link>
        </div>

        {/* MOBILE BURGER & TOGGLE */}
        <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={toggleTheme} 
                className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
            >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
            className="text-zinc-900 dark:text-white p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white dark:bg-zinc-950 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 z-40">
           {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={() => setIsOpen(false)} 
                className="text-xl font-medium text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4"
              >
                {item.name}
              </Link>
           ))}

           <Link href="/analyze" onClick={() => setIsOpen(false)} className="text-xl font-medium text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4">
             Analyze
           </Link>

           <div className="mt-auto flex flex-col gap-4">
              {isSignedIn ? (
                 <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                    <span className="font-medium">My Account</span>
                    <UserButton afterSignOutUrl="/" />
                 </div>
              ) : (
                 <SignInButton mode="modal">
                    <button className="w-full py-4 text-zinc-900 dark:text-white font-bold border border-zinc-200 dark:border-zinc-800 rounded-xl">
                        Sign In
                    </button>
                 </SignInButton>
              )}
              
              <Link href="/analyze" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20">
                    Get Started
                  </button>
              </Link>
           </div>
        </div>
      )}
    </nav>
  );
}