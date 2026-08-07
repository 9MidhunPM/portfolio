export interface GitHubRepository {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  pushedAt: string;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number | null;
  memberSince: string;
  profileUpdatedAt: string;
  topLanguages: { name: string; count: number }[] | null;
  /** Public activity buckets keyed by ISO date (YYYY-MM-DD). */
  activity: Record<string, number> | null;
  /** Total public events returned in GitHub's rolling 30-day window. */
  recentEvents: number | null;
  repositories: GitHubRepository[] | null;
}

interface GitHubUserResponse {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string | null;
  fork: boolean;
  archived: boolean;
}

interface GitHubEventResponse {
  created_at: string | null;
}

const USER = "9MidhunPM";
const API_URL = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;
const EVENTS_WINDOW_DAYS = 30;
const FEATURED_REPOSITORIES = new Set([
  "MetroMind",
  "thursday-local-assistant",
  "EtlabPro",
  "CalculusDash",
  "ETLAB-Plus",
]);

function requestHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "User-Agent": "midhunpm.in",
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchJson(url: string): Promise<unknown | null> {
  try {
    const response = await fetch(url, {
      headers: requestHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isGitHubUser(value: unknown): value is GitHubUserResponse {
  if (!value || typeof value !== "object") return false;
  const user = value as Record<string, unknown>;

  return (
    isNumber(user.public_repos) &&
    isNumber(user.followers) &&
    isNumber(user.following) &&
    isString(user.created_at) &&
    isString(user.updated_at)
  );
}

function isGitHubRepo(value: unknown): value is GitHubRepoResponse {
  if (!value || typeof value !== "object") return false;
  const repo = value as Record<string, unknown>;

  return (
    isString(repo.name) &&
    (repo.description === null || isString(repo.description)) &&
    isString(repo.html_url) &&
    (repo.homepage === null || isString(repo.homepage)) &&
    (repo.language === null || isString(repo.language)) &&
    isNumber(repo.stargazers_count) &&
    isNumber(repo.forks_count) &&
    Array.isArray(repo.topics) &&
    repo.topics.every(isString) &&
    (repo.pushed_at === null || isString(repo.pushed_at)) &&
    typeof repo.fork === "boolean" &&
    typeof repo.archived === "boolean"
  );
}

function isGitHubEvent(value: unknown): value is GitHubEventResponse {
  if (!value || typeof value !== "object") return false;
  const event = value as Record<string, unknown>;
  return event.created_at === null || isString(event.created_at);
}

async function getRepositories(publicRepoCount: number): Promise<GitHubRepoResponse[] | null> {
  const pageCount = Math.max(1, Math.ceil(publicRepoCount / 100));
  const pages = await Promise.all(
    Array.from({ length: pageCount }, (_, index) =>
      fetchJson(
        `${API_URL}/users/${USER}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=${index + 1}`
      )
    )
  );

  if (pages.some((page) => !Array.isArray(page))) return null;
  return pages.flatMap((page) => (page as unknown[]).filter(isGitHubRepo));
}

async function getPublicEvents(): Promise<GitHubEventResponse[] | null> {
  const pages = await Promise.all(
    [1, 2, 3].map((page) =>
      fetchJson(`${API_URL}/users/${USER}/events/public?per_page=100&page=${page}`)
    )
  );
  if (pages[0] === null || !Array.isArray(pages[0])) return null;

  return pages.flatMap((page) =>
    Array.isArray(page) ? page.filter(isGitHubEvent) : []
  );
}

/**
 * Fetches public GitHub data in Server Components and refreshes it hourly.
 * The previous cached route remains available if a later revalidation fails.
 */
export async function getGitHubStats(): Promise<GitHubStats | null> {
  const userResponse = await fetchJson(`${API_URL}/users/${USER}`);
  if (!isGitHubUser(userResponse)) return null;

  const [repos, events] = await Promise.all([
    getRepositories(userResponse.public_repos),
    getPublicEvents(),
  ]);

  const ownedRepos = repos?.filter((repo) => !repo.fork) ?? null;
  const activeRepos = ownedRepos?.filter((repo) => !repo.archived) ?? null;
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - (EVENTS_WINDOW_DAYS - 1));
  cutoff.setUTCHours(0, 0, 0, 0);
  const windowEvents = events?.filter(
    (event) => event.created_at && new Date(event.created_at) >= cutoff
  ) ?? null;

  const languageCounts = new Map<string, number>();
  let totalStars = 0;

  for (const repo of ownedRepos ?? []) {
    totalStars += repo.stargazers_count;
    if (repo.language) {
      languageCounts.set(
        repo.language,
        (languageCounts.get(repo.language) ?? 0) + 1
      );
    }
  }

  const activity: Record<string, number> | null = windowEvents ? {} : null;
  for (const event of windowEvents ?? []) {
    if (!event.created_at) continue;
    const day = event.created_at.slice(0, 10);
    if (activity) activity[day] = (activity[day] ?? 0) + 1;
  }

  return {
    publicRepos: userResponse.public_repos,
    followers: userResponse.followers,
    following: userResponse.following,
    totalStars: ownedRepos ? totalStars : null,
    memberSince: userResponse.created_at,
    profileUpdatedAt: userResponse.updated_at,
    topLanguages: ownedRepos
      ? Array.from(languageCounts.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      : null,
    activity,
    recentEvents: windowEvents?.length ?? null,
    repositories: activeRepos
      ? activeRepos
      .filter((repo) => repo.pushed_at)
      .sort((a, b) =>
        Number(FEATURED_REPOSITORIES.has(b.name)) -
          Number(FEATURED_REPOSITORIES.has(a.name)) ||
        b.stargazers_count - a.stargazers_count ||
        (b.pushed_at ?? "").localeCompare(a.pushed_at ?? "")
      )
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics.slice(0, 4),
        pushedAt: repo.pushed_at as string,
      }))
      : null,
  };
}

export const githubActivityWindowDays = EVENTS_WINDOW_DAYS;
