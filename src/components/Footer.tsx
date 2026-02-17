import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Facebook, Mail, MapPin } from "lucide-react"; 

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black pt-12 pb-8"> {/* Reduced pt-16 to pt-12 */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 mb-12">
        
        {/* LEFT SIDE: Brand & Bio */}
        <div className="max-w-sm">
          {/* Logo with fixed zoom */}
          <Link href="/" className="inline-block relative w-96 h-24 mb-2 -ml-8 overflow-visible">
            <Image
              src="/logo.png" 
              alt="PulseSeo.ai"
              fill
              className="object-contain object-left scale-[3.5] origin-left"
            />
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm mt-0">
            We help local businesses become visible to the new generation of AI search engines. 
            Rank on Google. Get cited by AI agents.
          </p>
        </div>

        {/* RIGHT SIDE: Links Grouped Together */}
        <div className="flex flex-col sm:flex-row gap-16 md:gap-24 pt-4">
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  23 Bellvista Road<br />
                  Brighton, MA 02135
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:hello@pulseseo.ai" className="hover:text-blue-600 transition-colors">
                  hello@pulseseo.ai
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Legal */}
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <Link href="https://github.com/NarySar" target="_blank" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-blue-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex flex-col gap-2 text-sm text-zinc-500 dark:text-zinc-400">
               <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Privacy Policy</Link>
               <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">Terms of Service</Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} PulseSeo.ai. All rights reserved.
        </p>
        <p className="text-xs text-zinc-400">
          Designed in Boston.
        </p>
      </div>
    </footer>
  );
}