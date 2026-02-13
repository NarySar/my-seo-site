"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Menu, X, Zap, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle"; 

// --- TYPE DEFINITIONS ---
interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  links: NavLink[];
  isSignedIn: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}

interface ScanButtonProps {
  label: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navLinks: NavLink[] = [
    { name: "Features", href: "/features" },
    { name: "Analyze", href: "/analyze" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-black/50 backdrop-blur-md transition-colors">
          <div className="h-16 flex items-center justify-between px-4 sm:px-6">
            
            {/* 1. SHARED LOGO */}
            <Logo />

            {/* 2. DESKTOP NAVIGATION */}
            <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-zinc-900 dark:hover:text-white ${
                    isActive(item.href) ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isSignedIn && (
                 <Link href="/dashboard" className={`transition-colors hover:text-zinc-900 dark:hover:text-white ${isActive("/dashboard") ? "text-blue-600 dark:text-blue-400" : ""}`}>
                   Dashboard
                 </Link>
              )}
            </div>

            {/* 3. DESKTOP ACTIONS */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <ScanButton label="Run Scan" />
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <ScanButton label="Audit Free" />
                  <SignInBtn />
                </div>
              )}
            </div>

            {/* 4. MOBILE TOGGLE */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 flex items-center justify-center text-zinc-900 dark:text-white"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* 5. MOBILE MENU COMPONENT */}
          {open && (
             <MobileMenu 
               links={navLinks} 
               isSignedIn={Boolean(isSignedIn)} 
               onClose={() => setOpen(false)} 
               isActive={isActive} 
             />
          )}
        </div>
      </nav>
    </header>
  );
}

// --- SUB-COMPONENTS (Now Fully Typed!) ---

function MobileMenu({ links, isSignedIn, onClose, isActive }: MobileMenuProps) {
  return (
    <div className="md:hidden border-t border-zinc-200/70 dark:border-zinc-800/70 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className={`block rounded-xl px-3 py-2 font-semibold ${
            isActive(item.href)
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
              : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
          }`}
        >
          {item.name}
        </Link>
      ))}

      {isSignedIn && (
        <Link href="/dashboard" onClick={onClose} className="block rounded-xl px-3 py-2 font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50">
          Dashboard
        </Link>
      )}

      <div className="pt-2 space-y-3">
        {isSignedIn ? (
          <>
            <ScanButton fullWidth label="Run Scan" onClick={onClose} />
            <SignOutButton>
              <button onClick={onClose} className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 px-4 py-3 font-bold text-red-600 dark:text-red-400">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </SignOutButton>
          </>
        ) : (
          <>
            <ScanButton fullWidth label="Audit Free" onClick={onClose} />
            <SignInBtn fullWidth />
          </>
        )}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-zinc-900 dark:text-white group">
      <span className="h-9 w-9 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:rotate-12 transition-transform">
        <Zap className="h-5 w-5 fill-current" />
      </span>
      <span className="text-lg">PulseSeo.ai</span>
    </Link>
  );
}

function ScanButton({ label, fullWidth, onClick }: ScanButtonProps) {
  return (
    <Link
      href="/analyze"
      onClick={onClick}
      className={`${fullWidth ? "block w-full text-center" : "inline-flex"} items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-bold transition-transform hover:scale-105`}
    >
      {label}
    </Link>
  );
}

function SignInBtn({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <SignInButton mode="modal">
      <button className={`${fullWidth ? "w-full" : ""} inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 px-5 py-2 text-sm font-bold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors`}>
        Sign In
      </button>
    </SignInButton>
  );
}