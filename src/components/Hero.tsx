import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 mb-8">
        <Sparkles className="h-4 w-4 text-yellow-500" />
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          The Future of SEO is Agentic
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-4xl mb-6">
        Optimize for the <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
          AI Agents
        </span>
        {" "}searching for you.
      </h1>

      {/* Subheadline */}
      <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
        Traditional SEO targets humans. PulseSeo helps you rank in the hidden 
        economy of AI agents, LLMs, and voice assistants.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/analyze"
          className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          Analyze My Site <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/docs"
          className="h-12 px-8 rounded-full bg-transparent border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium flex items-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Read the Docs
        </Link>
      </div>
    </section>
  );
}