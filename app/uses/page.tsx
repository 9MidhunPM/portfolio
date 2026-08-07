import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/lib/data";

const title = "Uses";
const description =
  "The hardware, software, and tools Midhun P M uses daily — Arch Linux, VS Code, FastAPI, LLaMA.cpp on an Intel Arc, and an Ubuntu home server.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/uses`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [SITE.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
    images: [SITE.ogImage],
  },
  alternates: {
    canonical: `${SITE.url}/uses`,
  },
};

const CATEGORIES: { name: string; items: { name: string; note: string }[] }[] =
  [
    {
      name: "Editor & OS",
      items: [
        {
          name: "VS Code",
          note: "Where most of the code gets written. Nothing exotic — a few extensions and a dark theme.",
        },
        {
          name: "Arch Linux",
          note: "Daily driver. I maintain my own dotfiles, so a fresh install is an afternoon, not a weekend.",
        },
        {
          name: "Git",
          note: "Every project, every config, every lab record. Commit early, squash never.",
        },
      ],
    },
    {
      name: "Languages",
      items: [
        {
          name: "Python",
          note: "Default for backends, agents, and scraping. Most of my projects start here.",
        },
        {
          name: "JavaScript / TypeScript",
          note: "For anything with a UI. TypeScript once the project outlives the weekend.",
        },
        {
          name: "C++",
          note: "For game dev and understanding what the frameworks are hiding. Raylib, no engine.",
        },
      ],
    },
    {
      name: "AI & agents",
      items: [
        {
          name: "LLaMA.cpp + Vulkan",
          note: "Runs quantized 8B models on my Intel Arc GPU. Local inference, no API keys.",
        },
        {
          name: "LangChain",
          note: "The ReAct agent loop behind MetroMind's brain.",
        },
        {
          name: "n8n",
          note: "Orchestration for agent workflows — webhooks in, tools out, cron watching everything.",
        },
        {
          name: "Playwright",
          note: "Browser automation that survives bot detection. MetroMind books real tickets with it.",
        },
      ],
    },
    {
      name: "Web & mobile",
      items: [
        {
          name: "React + Next.js",
          note: "This site, the IEEE branch site, and most things with a browser UI.",
        },
        {
          name: "Flutter",
          note: "EtlabPro's app. One codebase, and it handles bad campus wifi gracefully.",
        },
        {
          name: "FastAPI",
          note: "My default backend. MetroMind and EtlabPro both run on it.",
        },
        {
          name: "Spring Boot + Node.js",
          note: "Spring Boot for ETLab+ (Java done right), Node when the job is small.",
        },
        {
          name: "Supabase + Appwrite + PostgreSQL",
          note: "Managed when the deadline is short, raw Postgres when I want control.",
        },
      ],
    },
    {
      name: "Infrastructure",
      items: [
        {
          name: "Ubuntu home server",
          note: "An old machine that runs my self-hosted stack. Boring on purpose.",
        },
        {
          name: "Tailscale",
          note: "Every device on one private network. My server is reachable from anywhere, open to no one.",
        },
        {
          name: "Docker + Dokploy",
          note: "Everything ships in containers. Dokploy is my self-hosted PaaS — EtlabPro lives on it.",
        },
        {
          name: "AWS",
          note: "S3, Lambda, API Gateway, DynamoDB — picked up properly at the ICSET 2026 workshop.",
        },
      ],
    },
    {
      name: "Also in the toolbox",
      items: [
        {
          name: "Twilio",
          note: "WhatsApp for agents. MetroMind talks to the world through it.",
        },
        {
          name: "Discord Webhooks",
          note: "Alerts and notifications where my friends actually look.",
        },
        {
          name: "GTFS + Haversine",
          note: "Transit data and the geo math to make sense of it. MetroMind's route engine.",
        },
      ],
    },
  ];

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <div className="space-y-16">
        <PageHeader
          eyebrow={title}
          title="What I use"
          description="The tools I reach for every day — editors, languages, agent plumbing, and the boxes under my desk. Inspired by uses.tech. Nothing here is sponsored; it's just what survived my habit of reinstalling everything twice a year."
        />

        <div className="space-y-14">
          {CATEGORIES.map((category) => (
            <section
              key={category.name}
              aria-label={category.name}
              className="grid gap-6 border-t border-border pt-8 sm:grid-cols-[160px_minmax(0,1fr)]"
            >
              <h2 className="font-mono text-[13px] text-muted">
                {category.name}
              </h2>
              <ul className="max-w-prose divide-y divide-border">
                {category.items.map((item) => (
                  <li key={item.name} className="py-4 first:pt-0 last:pb-0">
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.note}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
