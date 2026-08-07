import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project } from "@/lib/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const CATEGORIES = [
  "AI systems",
  "Production apps",
  "Mobile",
  "Systems & C++",
] as const;

export interface ProjectWithContent extends Project {
  content: string;
}

function fail(file: string, field: string): never {
  throw new Error(`Invalid project frontmatter in ${file}: ${field}`);
}

function requiredString(value: unknown, file: string, field: string): string {
  if (typeof value !== "string" || value.trim() === "") fail(file, field);
  return value;
}

function optionalUrl(value: unknown, file: string, field: string) {
  if (value === undefined) return undefined;
  const url = requiredString(value, file, field);
  try {
    return new URL(url).toString();
  } catch {
    fail(file, `${field} must be a valid URL`);
  }
}

function parseProject(file: string): ProjectWithContent {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const category = requiredString(data.category, file, "category");
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    fail(file, `category must be one of ${CATEGORIES.join(", ")}`);
  }
  if (!Array.isArray(data.tech) || !data.tech.every((item) => typeof item === "string")) {
    fail(file, "tech must be an array of strings");
  }
  if (typeof data.order !== "number" || !Number.isFinite(data.order)) {
    fail(file, "order must be a number");
  }
  const updated = requiredString(data.updated, file, "updated");
  if (Number.isNaN(Date.parse(updated))) fail(file, "updated must be a valid date");

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: requiredString(data.title, file, "title"),
    description: requiredString(data.description, file, "description"),
    tech: data.tech,
    github: optionalUrl(data.github, file, "github"),
    live: optionalUrl(data.live, file, "live"),
    featured: Boolean(data.featured),
    order: data.order,
    award: data.award === undefined ? undefined : requiredString(data.award, file, "award"),
    category: category as Project["category"],
    outcome: requiredString(data.outcome, file, "outcome"),
    role: requiredString(data.role, file, "role"),
    status: requiredString(data.status, file, "status"),
    updated,
    content,
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const project = parseProject(file);
      return {
        slug: project.slug,
        title: project.title,
        description: project.description,
        tech: project.tech,
        github: project.github,
        live: project.live,
        featured: project.featured,
        order: project.order,
        award: project.award,
        category: project.category,
        outcome: project.outcome,
        role: project.role,
        status: project.status,
        updated: project.updated,
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): ProjectWithContent | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parseProject(`${slug}.mdx`);
}

export function getProjectCategories(): Project["category"][] {
  return [...CATEGORIES];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllProjects().forEach((project) =>
    project.tech.forEach((technology) => tags.add(technology))
  );
  return Array.from(tags).sort();
}
