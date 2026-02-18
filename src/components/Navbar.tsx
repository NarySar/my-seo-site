"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Menu, X, LogOut, ChevronDown, Sparkles, BarChart3, Layers, type LucideIcon } from "lucide-react"; // 👈 Added type import
import { ThemeToggle } from "@/components/ThemeToggle"; 

// --- TYPE DEFINITIONS ---
interface NavItem {
  name: string;
  href?: string;
  children?: { 
    name: string; 
    href: string; 
    description?: string; 
    icon?: LucideIcon; // 👈 Fixed: Changed 'any' to 'LucideIcon'
  }[];
}

interface MobileMenuProps {
  navItems: NavItem[];
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

  const navItems: NavItem[] = [
    { 
      name: "What Makes PulseSEO Different", 
      children: [
        { 
          name: "The Hybrid Advantage", 
          href: "/#hybrid", 
          icon: Sparkles,
          description: "See how we combine Google & AI rankings." 
        },
        { 
          name: "Agentic Score", 
          href: "/#score", 
          icon: BarChart3,
          description: "Understand our 0-100 visibility metric." 
        },
        { 
          name: "What We Analyze", 
          href: "/#analysis", 
          icon: Layers,
          description: "The 6 critical data points for LLMs." 
        },
      ]
    },
    { name: "Analyze", href: "/analyze" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-black/50 backdrop-blur-md transition-colors relative">
          
          {/* Main Bar */}
          <div className="h-24 flex items-center justify-between px-4 sm:px-6 relative z-20">
            
            <Logo />

            {/* DESKTOP NAVIGATION */}
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-300 relative z-50">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    // DROPDOWN PARENT
                    <button className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 focus:outline-none">
                      {item.name}
                      <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    // REGULAR LINK
                    <Link
                      href={item.href!}
                      className={`transition-colors hover:text-zinc-900 dark:hover:text-white ${
                        isActive(item.href!) ? "text-blue-600 dark:text-blue-400" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* DROPDOWN MENU (Desktop) */}
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-72 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
                      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl p-2 overflow-hidden ring-1 ring-black/5">
                        {item.children.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-start gap-4 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group/item"
                          >
                            <div className="mt-1 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-100 dark:group-hover/item:bg-blue-900/40 transition-colors">
                              {/* Check if icon exists before rendering to be safe */}
                              {subItem.icon && <subItem.icon className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-semibold text-zinc-900 dark:text-white text-sm">{subItem.name}</div>
                              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">{subItem.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isSignedIn && (
                 <Link href="/dashboard" className={`transition-colors hover:text-zinc-900 dark:hover:text-white ${isActive("/dashboard") ? "text-blue-600 dark:text-blue-400" : ""}`}>
                   Dashboard
                 </Link>
              )}
            </div>

            {/* ACTIONS */}
            <div className="hidden md:flex items-center gap-3 relative z-50">
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

            {/* MOBILE TOGGLE */}
            <div className="md:hidden flex items-center gap-3 relative z-50">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 flex items-center justify-center text-zinc-900 dark:text-white"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {open && (
             <MobileMenu 
               navItems={navItems} 
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

// --- SUB-COMPONENTS ---

function Logo() {
  return (
    <Link 
      href="/" 
      className="relative block overflow-visible z-10 transition-opacity hover:opacity-80
                 w-40 h-16 -ml-3        /* Mobile: Increased width (was w-32) */
                 md:w-64 md:h-20 md:-ml-4   /* Desktop: Stays the same */"
    >
      <Image
        src="/pulse-logo.png" 
        alt="PulseSeo.ai"
        fill
        className="object-contain object-left origin-left
                   scale-[2.5]              /* Mobile: Increased zoom (was 1.8) */
                   md:scale-[3.5]"          /* Desktop: Stays the same */
        priority
      />
    </Link>
  );
}

function MobileMenu({ navItems, isSignedIn, onClose, isActive }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="md:hidden border-t border-zinc-200/70 dark:border-zinc-800/70 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 fade-in duration-200 relative z-40 max-h-[80vh] overflow-y-auto">
      {navItems.map((item) => (
        <div key={item.name}>
          {item.children ? (
            // Mobile Dropdown
            <>
              <button
                onClick={() => setExpanded(expanded === item.name ? null : item.name)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              >
                {item.name}
                <ChevronDown className={`w-4 h-4 transition-transform ${expanded === item.name ? "rotate-180" : ""}`} />
              </button>
              
              {expanded === item.name && (
                <div className="pl-4 space-y-1 mt-1 border-l-2 border-zinc-100 dark:border-zinc-800 ml-4">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Mobile Standard Link
            <Link
              href={item.href!}
              onClick={onClose}
              className={`block rounded-xl px-3 py-2 font-semibold ${
                isActive(item.href!)
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}

      {isSignedIn && (
        <Link href="/dashboard" onClick={onClose} className="block rounded-xl px-3 py-2 font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50">
          Dashboard
        </Link>
      )}

      <div className="pt-4 space-y-3">
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