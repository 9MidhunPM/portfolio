import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SITE, USES_CATEGORIES } from "@/lib/data";

const title = "Uses";
const description = `The hardware, software, and tools ${SITE.name} uses daily — Arch Linux, VS Code, FastAPI, LLaMA.cpp on an Intel Arc, and an Ubuntu home server.`;

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
  },
  alternates: {
    canonical: `${SITE.url}/uses`,
  },
};

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
          {USES_CATEGORIES.map((category) => (
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
