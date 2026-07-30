import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getAllPosts, getPostLastModified } from "@/lib/blog";
import { getAllProjects, getProjectLastModified } from "@/lib/projects";
import { SITE } from "@/lib/data";

/**
 * Newest mtime across the content directories. Used as lastModified for the
 * index routes that list content, so they only claim to have changed when
 * something they list actually did.
 */
function newestContentMtime(): Date {
  const dirs = [
    path.join(process.cwd(), "content", "blog"),
    path.join(process.cwd(), "content", "projects"),
  ];

  let newest = 0;
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".mdx")) continue;
      const { mtimeMs } = fs.statSync(path.join(dir, file));
      if (mtimeMs > newest) newest = mtimeMs;
    }
  }

  return newest > 0 ? new Date(newest) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const projects = getAllProjects();

  const contentMtime = newestContentMtime();
  // Static pages are only edited at deploy time, so the build timestamp is
  // the honest signal — previously every revalidate claimed every page
  // had just changed, which crawlers learn to ignore.
  const buildTime = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "monthly" as const, lastModified: contentMtime },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const, lastModified: buildTime },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const, lastModified: contentMtime },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const, lastModified: contentMtime },
    { path: "/now", priority: 0.6, changeFrequency: "weekly" as const, lastModified: buildTime },
    { path: "/open", priority: 0.7, changeFrequency: "weekly" as const, lastModified: buildTime },
    { path: "/uses", priority: 0.5, changeFrequency: "yearly" as const, lastModified: buildTime },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const, lastModified: buildTime },
  ].map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified: getProjectLastModified(project.slug),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: getPostLastModified(post.slug),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
