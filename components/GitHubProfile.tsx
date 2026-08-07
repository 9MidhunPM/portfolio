import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { GitHubStats } from "@/lib/github";
import { SITE } from "@/lib/data";

function formatYear(value: string): string {
  return new Date(value).getUTCFullYear().toString();
}

function Metric({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="space-y-1">
      <p className="stat-number font-serif text-3xl tracking-tight">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </p>
    </div>
  );
}

export function GitHubProfile({
  stats,
  compact = false,
}: {
  stats: GitHubStats;
  compact?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-lg border border-border"
    >
      <div className="flex flex-col gap-5 border-b border-border bg-surface/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground">
            <GithubIcon width={19} height={19} />
          </span>
          <div>
            <p className="font-medium text-foreground">@9MidhunPM</p>
            <p className="mt-0.5 font-mono text-[11px] text-muted">
              Live public profile · updates hourly
            </p>
          </div>
        </div>

        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-xs text-muted transition-colors hover:border-muted hover:text-foreground"
        >
          View GitHub
          <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>

      <div
        className={
          compact
            ? "grid grid-cols-2 gap-px bg-border sm:grid-cols-4"
            : "grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6"
        }
      >
        <div className="bg-background p-5">
          <Metric value={stats.publicRepos} label="Public repos" />
        </div>
        <div className="bg-background p-5">
          <Metric value={stats.totalStars ?? "—"} label="Stars earned" />
        </div>
        <div className="bg-background p-5">
          <Metric value={stats.followers} label="Followers" />
        </div>
        <div className="bg-background p-5">
          <Metric value={stats.following} label="Following" />
        </div>
        {!compact && (
          <>
            <div className="bg-background p-5">
              <Metric value={stats.recentEvents ?? "—"} label="30-day events" />
            </div>
            <div className="bg-background p-5">
              <Metric value={formatYear(stats.memberSince)} label="Member since" />
            </div>
          </>
        )}
      </div>

      {!compact && stats.repositories && stats.repositories.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-3 font-mono text-[10px] text-muted sm:px-6">
          <span className="flex items-center gap-1.5">
            <Star size={12} strokeWidth={1.75} aria-hidden="true" />
            Stars count original public repositories
          </span>
          <span className="flex items-center gap-1.5">
            <GitFork size={12} strokeWidth={1.75} aria-hidden="true" />
            Forks shown per repository
          </span>
        </div>
      )}
    </div>
  );
}
