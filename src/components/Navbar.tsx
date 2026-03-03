"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton, SignInButton, SignOutButton } from "@clerk/nextjs";
import { 
  Menu, 
  X, 
  LogOut, 
  ChevronDown, 
  Sparkles, 
  BarChart3, 
  Layers, 
  LineChart, 
  Search, 
  Bot,
  Zap,
  Cpu,
  MonitorSmartphone, // 👈 ADDED: The Web Design icon
  type LucideIcon 
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle"; 

interface NavItem {
  name: string;
  href?: string;
  children?: { 
    name: string; 
    href: string; 
    description?: string; 
    icon?: LucideIcon; 
  }[];
}

interface MobileMenuProps {
  navItems: NavItem[];
  isSignedIn: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  // 👇 UPDATED: Added Web Design to Services and Pricing arrays
  const navItems: NavItem[] = [
    { 
      name: "What Makes PulsePlusSEO Different?", 
      children: [
        { name: "The Hybrid Advantage", href: "/#hybrid", icon: Sparkles, description: "See how we combine Google & AI rankings." },
        { name: "Agentic Score", href: "/#score", icon: BarChart3, description: "Understand our 0-100 visibility metric." },
        { name: "What We Analyze", href: "/#analysis", icon: Layers, description: "The 6 critical data points for LLMs." },
      ]
    },
    { 
      name: "Services", 
      children: [
        { name: "Traditional SEO", href: "/services/seo", icon: Search, description: "Rank higher on Google, Bing, and Maps." },
        { name: "GEO (AI Search)", href: "/services/geo", icon: Bot, description: "Be cited by ChatGPT, Gemini & Perplexity." },
        { name: "Hybrid Dominance", href: "/services/hybrid", icon: Zap, description: "The ultimate unified SEO + GEO strategy." },
        { name: "Performance Web Design", href: "/services/web-design", icon: MonitorSmartphone, description: "Lightning-fast, AI-ready Next.js websites." }, // 👈 NEW
      ]
    },
    { 
      name: "Plans & Prices", 
      children: [
        { name: "SEO Plans", href: "/pricing/seo", icon: LineChart, description: "Foundational search engine visibility." },
        { name: "GEO Plans", href: "/pricing/geo", icon: Cpu, description: "Entity authority & LLM citation readiness." },
        { name: "Hybrid Plans", href: "/pricing/hybrid", icon: Sparkles, description: "Total market search dominance." },
        { name: "Web Design Plans", href: "/pricing/web-design", icon: MonitorSmartphone, description: "Flat-rate pricing for custom websites." }, // 👈 NEW
      ]
    },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-black/50 backdrop-blur-md transition-colors relative">
          
          <div className="h-24 flex items-center justify-between px-4 sm:px-6 relative z-20">
            <Logo />

            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-300 relative z-50">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <button className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors py-2 focus:outline-none">
                      {item.name}
                      <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link href={item.href!} className={`transition-colors hover:text-zinc-900 dark:hover:text-white ${isActive(item.href!) ? "text-blue-600 dark:text-blue-400" : ""}`}>
                      {item.name}
                    </Link>
                  )}

                  {/* Colorful, Glassy Dropdown Background */}
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-80 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      <div className="relative rounded-3xl border border-blue-200/60 dark:border-blue-800/50 shadow-2xl p-3 overflow-hidden bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl">
                        
                        {/* The Colorful Splash Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-transparent to-purple-100/60 dark:from-blue-900/30 dark:via-transparent dark:to-purple-900/30 z-0 pointer-events-none"></div>
                        
                        <div className="relative z-10 space-y-1">
                          {item.children.map((subItem) => (
                            <Link key={subItem.name} href={subItem.href} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:shadow-sm transition-all group/item border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50">
                              <div className="mt-1 p-2.5 rounded-xl bg-blue-600 dark:bg-blue-500 text-white shadow-md group-hover/item:scale-110 transition-transform">
                                {subItem.icon && <subItem.icon className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="font-bold text-zinc-900 dark:text-white text-sm mb-0.5">{subItem.name}</div>
                                <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">{subItem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
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

            <div className="hidden md:flex items-center gap-3 relative z-50">
              <ThemeToggle />
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInBtn />
              )}
            </div>

            <div className="md:hidden flex items-center gap-3 relative z-50">
              <ThemeToggle />
              <button onClick={() => setOpen(!open)} className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 flex items-center justify-center text-zinc-900 dark:text-white">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {open && (
             <MobileMenu navItems={navItems} isSignedIn={Boolean(isSignedIn)} onClose={() => setOpen(false)} isActive={isActive} />
          )}
        </div>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center group">
      {/* 👇 Tweak the -ml margin if you want to shift it left or right */}
      <div className="relative -ml-2"> 
        <Image 
          src="/pulselogo-vs.png" // (or whatever your current filename is!)
          alt="PulsePlusSEO Logo" 
          width={400} // 👈 BUMPED UP
          height={70} // 👈 BUMPED UP
          priority
          className="object-contain group-hover:scale-[1.03] transition-transform duration-300" 
        />
      </div>
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
            <>
              <button onClick={() => setExpanded(expanded === item.name ? null : item.name)} className="flex w-full items-center justify-between rounded-xl px-3 py-3 font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                {item.name}
                <ChevronDown className={`w-4 h-4 transition-transform ${expanded === item.name ? "rotate-180" : ""}`} />
              </button>
              
              {expanded === item.name && (
                <div className="pl-4 space-y-1 mt-1 border-l-2 border-blue-200 dark:border-blue-800 ml-4">
                  {item.children.map((sub) => (
                    <Link key={sub.name} href={sub.href} onClick={onClose} className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400">
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link href={item.href!} onClick={onClose} className={`block rounded-xl px-3 py-2 font-semibold ${isActive(item.href!) ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"}`}>
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
          <SignOutButton>
            <button onClick={onClose} className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 px-4 py-3 font-bold text-red-600 dark:text-red-400">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </SignOutButton>
        ) : (
          <SignInBtn fullWidth />
        )}
      </div>
    </div>
  );
}

function SignInBtn({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <SignInButton mode="modal">
      <button className={`${fullWidth ? "w-full" : ""} inline-flex items-center justify-center rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-5 py-2 text-sm font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors`}>
        Sign In
      </button>
    </SignInButton>
  );
}