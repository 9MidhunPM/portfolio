import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { parseContentImage } from "@/lib/content-image";
import type { PostMeta } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: (data.tags ?? []) as string[],
        readingTime: readingTime(content).text,
        image: parseContentImage(data.image),
        lastModified: fs.statSync(filePath).mtime,
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
    image: parseContentImage(data.image),
    lastModified: fs.statSync(filePath).mtime,
    content,
  };
}
