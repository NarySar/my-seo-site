import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    id: "tier-starter",
    href: "#",
    priceMonthly: "$$",
    description: "Perfect for testing your site's agent readiness.",
    features: [
      "5 pages analyzed per month",
      "Basic JSON-LD validation",
      "Community support",
      "Single user",
    ],
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    priceMonthly: "$$",
    description: "For creators and startups serious about AI traffic.",
    features: [
      "200 pages analyzed per month",
      "Advanced Knowledge Graph schema",
      "Competitor agent analysis",
      "Priority email support",
      "Voice search optimization",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$$",
    description: "Dedicated infrastructure for large-scale indexing.",
    features: [
      "Unlimited pages",
      "Custom API access",
      "Dedicated account manager",
      "SSO & Advanced Security",
      "1-hour response time",
    ],
    mostPopular: false,
  },
];

export function Pricing() {
  return (
    <div className="py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            Pricing for every stage of growth
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Start optimizing for the machine economy today. Upgrade as you scale.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-zinc-200 dark:ring-zinc-800 xl:p-10 ${
                tier.mostPopular ? 'bg-zinc-50 dark:bg-zinc-900 ring-2 ring-blue-600 dark:ring-blue-600' : 'bg-white dark:bg-black'
              }`}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h3
                  id={tier.id}
                  className="text-lg font-semibold leading-8 text-zinc-900 dark:text-white"
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <span className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600 dark:text-blue-400">
                    Most popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {tier.priceMonthly}
                </span>
                <span className="text-sm font-semibold leading-6 text-zinc-600 dark:text-zinc-400">
                  /month
                </span>
              </p>
              <a
                href={tier.href}
                className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  tier.mostPopular
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                Buy plan
              </a>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className="h-6 w-5 flex-none text-blue-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}