import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostMeta } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post extends PostMeta {
  content: string;
}

/**
 * Last filesystem modification time for a post's source file, used for
 * accurate sitemap <lastmod> values. Falls back to the frontmatter date.
 */
export function getPostLastModified(slug: string): Date {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    const post = getPost(slug);
    return post ? new Date(post.date) : new Date();
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: (data.tags ?? []) as string[],
        readingTime: readingTime(content).text,
      } satisfies PostMeta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags ?? []) as string[],
    readingTime: readingTime(content).text,
    content,
  };
}
