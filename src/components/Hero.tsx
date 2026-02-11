import Link from "next/link";
import { Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-28 pb-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-950/40 backdrop-blur p-8 sm:p-12">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 px-3 py-1 text-sm text-zinc-600 dark:text-zinc-300">
            <Sparkles className="h-4 w-4 text-blue-600" />
            The new standard for AI visibility
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Get recommended by{" "}
            <span className="text-blue-600">AI search</span>, not just ranked on Google.
          </h1>

          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
            PulseSeo helps ChatGPT, Gemini, Claude, and Perplexity understand what you do
            — and when to recommend you.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/analyze"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors"
            >
              <Zap className="h-4 w-4" />
              Audit my website free
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 px-6 py-3 font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Read the docs
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-600 dark:text-zinc-300">
              Optimized for:
            </span>
            {["OpenAI", "Perplexity", "Gemini", "Claude"].map((x) => (
              <span
                key={x}
                className="rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 bg-white/60 dark:bg-zinc-900/30"
              >
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}