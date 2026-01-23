import { Cpu, Search, Globe, ShieldCheck } from "lucide-react";

const features = [
  {
    name: "Agent-First Indexing",
    description: "Structure your data so LLMs like ChatGPT and Gemini can read it instantly without hallucinating.",
    icon: Cpu,
  },
  {
    name: "Voice Search Ready",
    description: "Optimize for the conversational queries used by Siri, Alexa, and Google Assistant.",
    icon: Search,
  },
  {
    name: "Global Knowledge Graph",
    description: "Connect your content to the semantic web so AI understands your authority and context.",
    icon: Globe,
  },
];

export function Features() {
  return (
    <div className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Why PulseSeo?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Built for the Machine Economy
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Traditional SEO is about keywords. Agentic SEO is about 
            meaning, structure, and authority.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-zinc-900 dark:text-white">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}