import type { Metadata } from "next";
import { SITE } from "@/lib/data";

const title = "Now";
const description = `What ${SITE.name} is currently working on, learning, and thinking about.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/now`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
  },
  alternates: {
    canonical: `${SITE.url}/now`,
  },
};

export default function NowPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-prose space-y-16">
        <header className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <span className="mb-4 block font-mono text-[13px] font-normal text-muted">
              {SITE.name} — {title}
            </span>
            What I&apos;m up to now
          </h1>
          <p className="font-serif text-sm italic text-muted">
            Last updated: July 2026
          </p>
        </header>

        <section aria-label="Currently working on" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Working on
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              Semester five of my B.Tech in CSE at Sahrdaya. Most of my
              energy outside class goes to the IEEE student branch, where
              I&apos;m Technical Coordinator — WC Predict &apos;26 just
              wrapped with 58+ players and 737+ bets, and there&apos;s
              always something on ieeesahrdaya.com that needs fixing.
            </p>
            <p>
              On the side-project bench: keeping EtlabPro alive for the
              students using it (the portal changes shape more often than
              you&apos;d think), and slowly turning Thursday from
              &quot;works on my machine&quot; into something I&apos;d hand
              to another person.
            </p>
          </div>
        </section>

        <section aria-label="Currently learning" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Learning
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              LLM deployment beyond the happy path — quantization trade-offs,
              Vulkan backends, and what it actually costs to serve models
              yourself. Building Thursday on an Intel Arc GPU has been a
              forced education in all three.
            </p>
            <p>
              Systems programming in C++, because Calculus Dash showed me how
              much I don&apos;t know. And backend architecture the honest
              way: by having EtlabPro break in production and reading the
              logs.
            </p>
          </div>
        </section>

        <section aria-label="Reading and watching" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Reading &amp; watching
          </h2>
          <p className="text-base leading-relaxed text-muted">
            The pile is real but I haven&apos;t written it down yet —
            updating this section soon.
          </p>
        </section>

        <p className="border-t border-border pt-8 font-mono text-[11px] leading-relaxed text-muted">
          This is a /now page — a snapshot of what has my attention right
          now. Inspired by nownownow.com.
        </p>
      </div>
    </div>
  );
}
