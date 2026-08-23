import { ContributionGraph } from "@/components/ContributionGraph";
import { GitHubProfile } from "@/components/GitHubProfile";
import { GitHubRepositories } from "@/components/GitHubRepositories";
import { GitHubLanguages } from "@/components/GitHubLanguages";
import { getGitHubStats } from "@/lib/github";
import { SITE } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

const title = "Open";
const description =
  "Open, source-backed numbers from Midhun P M's projects, GitHub activity, hackathon recognition, and academic record — without inflated metrics.";

export const metadata = createPageMetadata({ title, description, path: "/open" });

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
              <GitHubProfile stats={stats} />

              <GitHubLanguages languages={stats.topLanguages} />

              <ContributionGraph
                activity={stats.activity}
                eventCount={stats.recentEvents}
              />

              <GitHubRepositories repositories={stats.repositories} />
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
                github.com/9MidhunPM
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
            <Stat value="≈3%" label="selected for the Codex Community Hackathon, Bengaluru" />
            <Stat value="2nd" label="place, PRISM at ASIET's AI Innovation Hackathon" />
            <Stat value="2×" label="best semester project — S1 and S3" />
            <Stat value="Top 10" label="of 100 builders, Codex Nightline 2026" />
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
