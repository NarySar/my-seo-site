import Link from "next/link";
// Update the import to remove Twitter and add Facebook/Reddit
import { Github, Linkedin, Facebook, MessageCircle } from "lucide-react"; 

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto py-12 px-6 md:flex md:items-center md:justify-between">
        
        {/* Left Side: Copyright */}
        <div className="flex justify-center md:justify-start gap-8">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} PulseSeo.ai. All rights reserved.
          </p>
        </div>

        {/* Center: Legal Links */}
        <div className="mt-8 md:mt-0 flex justify-center gap-8">
          <Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* Right Side: Social Icons */}
        <div className="mt-8 md:mt-0 flex justify-center gap-6">
          <Link href="https://github.com/NarySar" target="_blank" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          
          {/* Facebook */}
          <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors">
            <Facebook className="h-5 w-5" />
          </Link>

          {/* Reddit (Using MessageCircle or a specific Reddit icon if available in your version) */}
          <Link href="#" className="text-zinc-400 hover:text-orange-500 transition-colors">
            {/* Lucide doesn't always have a perfect 'Reddit' icon in older versions, so simple 'MessageCircle' looks similar, 
                OR if your version supports it, you can try importing 'Slice' or just use 'Linkedin' style. 
                Standard generic for Reddit often uses a simple circle or custom SVG. 
                Let's stick to standard Lucide icons available: */}
            <MessageCircle className="h-5 w-5" />
          </Link>

          <Link href="#" className="text-zinc-400 hover:text-blue-500 transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
        
      </div>
    </footer>
  );
}