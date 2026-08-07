import { ArrowUpRight, GitFork, Star } from "lucide-react";
import type { GitHubRepository } from "@/lib/github";

function formatUpdatedAt(value: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function GitHubRepositories({
  repositories,
}: {
  repositories: GitHubRepository[];
}) {
  if (repositories.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Recently updated repositories
          </h3>
          <p className="mt-1 text-xs text-muted">
            Original public repositories, sorted by the latest push.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {repositories.map((repository) => (
          <article
            key={repository.url}
            className="group flex min-h-52 flex-col justify-between rounded-lg border border-border p-5 transition-colors hover:border-muted"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <h4 className="min-w-0 font-medium text-foreground">
                  <a
                    href={repository.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors group-hover:text-foreground"
                  >
                    <span className="truncate">{repository.name}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.75}
                      className="shrink-0 text-muted"
                      aria-hidden="true"
                    />
                  </a>
                </h4>
                {repository.language && (
                  <span className="shrink-0 rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                    {repository.language}
                  </span>
                )}
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                {repository.description ?? "No repository description yet."}
              </p>

              {repository.topics.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
                  {repository.topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 font-mono text-[10px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Star size={12} strokeWidth={1.75} aria-hidden="true" />
                {repository.stars}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitFork size={12} strokeWidth={1.75} aria-hidden="true" />
                {repository.forks}
              </span>
              <span className="ml-auto">
                Pushed {formatUpdatedAt(repository.pushedAt)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
