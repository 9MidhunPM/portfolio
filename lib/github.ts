import { SITE } from "@/lib/data";

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  memberSince: string;
  topLanguages: { name: string; count: number }[];
  /** Activity buckets keyed by ISO date (YYYY-MM-DD) → event count */
  activity: Record<string, number>;
  /** Total public events seen in the API window */
  recentEvents: number;
}

const USER = SITE.github.replace("https://github.com/", "");
const HEADERS = {
  "User-Agent": new URL(SITE.url).hostname,
  Accept: "application/vnd.github+json",
};

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Fetches live GitHub stats at build/request time. Returns null when the
 * API is unreachable — callers must handle that by omitting the section
 * rather than showing fake numbers.
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const [user, repos, events] = await Promise.all([
    fetchJson(`https://api.github.com/users/${USER}`),
    fetchJson(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`),
    fetchJson(`https://api.github.com/users/${USER}/events/public?per_page=100`),
  ]);

  if (!user || typeof user !== "object" || !("public_repos" in user)) {
    return null;
  }

  const u = user as {
    public_repos: number;
    followers: number;
    created_at: string;
  };

  let totalStars = 0;
  const langCounts = new Map<string, number>();
  if (Array.isArray(repos)) {
    for (const repo of repos as {
      stargazers_count?: number;
      language?: string | null;
    }[]) {
      totalStars += repo.stargazers_count ?? 0;
      if (repo.language) {
        langCounts.set(repo.language, (langCounts.get(repo.language) ?? 0) + 1);
      }
    }
  }

  const activity: Record<string, number> = {};
  let recentEvents = 0;
  if (Array.isArray(events)) {
    recentEvents = events.length;
    for (const event of events as { created_at?: string }[]) {
      if (!event.created_at) continue;
      const day = event.created_at.slice(0, 10);
      activity[day] = (activity[day] ?? 0) + 1;
    }
  }

  return {
    publicRepos: u.public_repos,
    followers: u.followers,
    totalStars,
    memberSince: u.created_at,
    topLanguages: Array.from(langCounts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    activity,
    recentEvents,
  };
}
