import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostMeta } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post extends PostMeta {
  content: string;
}

function fail(file: string, field: string): never {
  throw new Error(`Invalid blog frontmatter in ${file}: ${field}`);
}

function requiredString(value: unknown, file: string, field: string): string {
  if (typeof value !== "string" || value.trim() === "") fail(file, field);
  return value;
}

function parsePost(file: string): Post & { published: boolean } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string")) {
    fail(file, "tags must be an array of strings");
  }
  if (typeof data.published !== "boolean") fail(file, "published must be a boolean");
  const date = requiredString(data.date, file, "date");
  const updated = requiredString(data.updated ?? data.date, file, "updated");
  if (Number.isNaN(Date.parse(date))) fail(file, "date must be a valid date");
  if (Number.isNaN(Date.parse(updated))) fail(file, "updated must be a valid date");

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: requiredString(data.title, file, "title"),
    date,
    updated,
    description: requiredString(data.description, file, "description"),
    tags: data.tags,
    readingTime: readingTime(content).text,
    content,
    published: data.published,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parsePost)
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      updated: post.updated,
      description: post.description,
      tags: post.tags,
      readingTime: post.readingTime,
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { published, ...post } = parsePost(`${slug}.mdx`);
  return published ? post : null;
}
