import type { Metadata } from "next";
import { ContributionGraph } from "@/components/ContributionGraph";
import { getGitHubStats } from "@/lib/github";
import { SITE } from "@/lib/data";

export const revalidate = 86400;

const title = "Open";
const description = `Open stats and numbers from ${SITE.name}'s projects, GitHub, and academic record.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/open`,
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
    canonical: `${SITE.url}/open`,
  },
};

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="stat-number font-serif text-3xl tracking-tight sm:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{label}</p>
    </div>
  );
}

export default async function OpenPage() {
  const stats = await getGitHubStats();
  const sinceYear = stats ? new Date(stats.memberSince).getFullYear() : null;

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-prose space-y-16">
        <header className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <span className="mb-4 block font-mono text-[13px] font-normal text-muted">
              {SITE.name} — {title}
            </span>
            Open
          </h1>
          <p className="text-base leading-relaxed text-muted">
            Real numbers from things I&apos;ve built and places I&apos;ve
            been. Pulled from the GitHub API and my own records — no
            rounding up.
          </p>
        </header>

        {/* GitHub */}
        <section aria-label="GitHub stats" className="space-y-8">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            GitHub
          </h2>
          {stats ? (
            <>
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                <Stat value={String(stats.publicRepos)} label="public repos" />
                <Stat value={String(stats.totalStars)} label="stars earned" />
                <Stat value={String(stats.followers)} label="followers" />
                <Stat value={sinceYear ? String(sinceYear) : "—"} label="on GitHub since" />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">
                  Top languages
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {stats.topLanguages.slice(0, 6).map((lang) => (
                    <li
                      key={lang.name}
                      className="rounded border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {lang.name}
                      <span className="ml-1.5 text-foreground">
                        ×{lang.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <ContributionGraph
                activity={stats.activity}
                caption={`GitHub activity — ${stats.recentEvents} public events in the last 90 days (the window the API exposes).`}
              />
            </>
          ) : (
            <p className="text-sm text-muted">
              GitHub stats couldn&apos;t be fetched right now. They refresh
              daily — check back soon, or browse{" "}
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-border underline-offset-4"
              >
                {SITE.github.replace("https://", "")}
              </a>{" "}
              directly.
            </p>
          )}
        </section>

        {/* Projects */}
        <section aria-label="Project numbers" className="space-y-6">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Projects
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Stat value="737+" label="bets placed on WC Predict '26" />
            <Stat value="58+" label="players on the leaderboard" />
            <Stat value="1000+" label="weekly users on ieeesahrdaya.com" />
            <Stat value="12W" label="to run my home server, all day" />
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-muted">
            <li>
              <span className="text-foreground">EtlabPro</span> — in
              production, self-hosted on Dokploy, used by real students.
            </li>
            <li>
              <span className="text-foreground">WC Predict &apos;26</span> —
              pool and fixed-odds markets with automated settlement.
            </li>
            <li>
              <span className="text-foreground">IEEE Sahrdaya</span> — the
              branch site I help keep fast as Technical Coordinator.
            </li>
          </ul>
        </section>

        {/* Recognition */}
        <section aria-label="Recognition" className="space-y-6">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Recognition
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Stat value="Top 10" label="of 100 builders, Codex Nightline 2026" />
            <Stat value="2×" label="best semester project — S1 and S3" />
            <Stat value="1st" label="place, college hackathon (PYHACK)" />
            <Stat value="1" label="moving metro built on, so far" />
          </div>
        </section>

        {/* Academic */}
        <section aria-label="Academic record" className="space-y-6">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Academic
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <Stat value="9.70" label="CGPA, B.Tech CSE" />
            <Stat value="9.53" label="S4 SGPA" />
            <Stat value="2028" label="graduating class, Sahrdaya" />
            <Stat value="S5" label="current semester" />
          </div>
        </section>
      </div>
    </div>
  );
}
