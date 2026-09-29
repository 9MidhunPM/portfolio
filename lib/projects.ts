import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { parseContentImage } from "@/lib/content-image";
import type { Project } from "@/lib/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectWithContent extends Project {
  content: string;
}

function parseProject(file: string): ProjectWithContent {
  const filePath = path.join(PROJECTS_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title as string,
    seoTitle: data.seoTitle as string | undefined,
    description: data.description as string,
    updated: data.updated as string | undefined,
    tech: (data.tech ?? []) as string[],
    github: data.github as string | undefined,
    live: data.live as string | undefined,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : 99,
    award: data.award as string | undefined,
    applicationCategory: data.applicationCategory as string | undefined,
    softwareVersion: data.softwareVersion as string | undefined,
    image: parseContentImage(data.image),
    ...(data.updated
      ? { lastModified: new Date(`${data.updated as string}T00:00:00.000Z`) }
      : {}),
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
