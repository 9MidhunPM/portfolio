---
name: seo-rules
description: Use before writing any page, layout, or metadata in this project to enforce SEO requirements.
---

# SEO Rules — Non-Negotiable

These rules apply to every page on the site. No exceptions.

## H1 Rule

Every page MUST have exactly one `<h1>` that contains the string `Midhun P M`. This is already the case on the homepage via the Hero component. Future pages (blog post, project detail, etc.) must include the name in their H1 or page-level heading.

## generateMetadata on Every Page

Every `page.tsx` MUST export metadata. Use the `generateMetadata()` async function for dynamic pages, or a static `metadata` export for static pages.

Required fields on every page:
- `title` — format: `"Page Title | Midhun P M"`
- `description` — unique per page, 120-160 chars
- `openGraph` — `title`, `description`, `url`, `siteName: "Midhun P M"`, `locale: "en_US"`, `type` (website or article)
- `twitter` — `card: "summary_large_image"`, `title`, `description`
- `alternates.canonical` — `https://midhunpm.in/{path}`

Example for a blog post:
```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);
  return {
    title: `${post.title} | Midhun P M`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://midhunpm.in/blog/${post.slug}`,
      siteName: "Midhun P M",
      type: "article",
      publishedTime: post.date,
      authors: ["Midhun P M"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://midhunpm.in/blog/${post.slug}`,
    },
  };
}
```

## JSON-LD Structured Data

### Homepage — Person Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Midhun P M",
  "url": "https://midhunpm.in",
  "jobTitle": "Full-stack Developer",
  "sameAs": [
    "https://github.com/9MidhunPM",
    "https://linkedin.com/in/midhun-pm-b947a1279"
  ]
}
```

### Blog Posts — Article Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "Midhun P M",
    "url": "https://midhunpm.in"
  },
  "datePublished": "...",
  "dateModified": "...",
  "publisher": {
    "@type": "Person",
    "name": "Midhun P M"
  }
}
```

### Inner Pages — BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://midhunpm.in" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://midhunpm.in/blog" },
    { "@type": "ListItem", "position": 3, "name": "Post Title" }
  ]
}
```

Inject JSON-LD via a `<script type="application/ld+json">` tag in the page component or layout. Do not use a third-party library for this.

## Sitemap & Robots

- `next-sitemap` handles sitemap generation. Config is at project root.
- `robots.txt` is generated automatically. Ensure no private routes are indexed.

## Additional Rules

- Every image must have a descriptive `alt` attribute.
- Use semantic HTML: `<article>` for blog posts, `<nav>` for navigation, `<main>` for page content.
- Internal links between pages should use descriptive anchor text.
- The `lang="en"` attribute is already set on `<html>` in `layout.tsx`.
