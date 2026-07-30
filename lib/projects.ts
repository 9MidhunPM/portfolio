import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/lib/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectWithContent extends Project {
  content: string;
}

/**
 * Last filesystem modification time for a project's source file, used for
 * accurate sitemap <lastmod> values.
 */
export function getProjectLastModified(slug: string): Date {
  try {
    return fs.statSync(path.join(PROJECTS_DIR, `${slug}.mdx`)).mtime;
  } catch {
    return new Date();
  }
}

function parseProject(file: string): ProjectWithContent {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title as string,
    description: data.description as string,
    tech: (data.tech ?? []) as string[],
    github: data.github as string | undefined,
    live: data.live as string | undefined,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : 99,
    award: data.award as string | undefined,
    content,
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseProject)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): ProjectWithContent | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseProject(`${slug}.mdx`);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((p) => p.tech.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
