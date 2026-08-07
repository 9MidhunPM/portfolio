import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/now", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/open", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/uses", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/resume", priority: 0.7, changeFrequency: "monthly" as const },
  ].map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: "2026-08-07",
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map(
    (project) => ({
      url: `${SITE.url}/projects/${project.slug}`,
       lastModified: project.updated,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.updated,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
