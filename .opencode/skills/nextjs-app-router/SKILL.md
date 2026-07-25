---
name: nextjs-app-router
description: Use when writing or modifying any Next.js page, route, layout, or server component in this project.
---

# Next.js App Router Conventions

## Server Components by Default

Every component is a Server Component unless it explicitly starts with `"use client"`. Do not add the directive unless the component needs browser APIs, event handlers, or React state/hooks.

Current `"use client"` components in this project: Hero, About, Experience, Projects, Skills, Achievements, Certifications, Navbar, Footer, CustomCursor, SmoothScrolling, ScrollProgress, Parallax, LaptopScroll. All page-level compositions (`page.tsx`, `layout.tsx`) are server components.

## generateMetadata()

Every route segment that renders a page MUST export a `generateMetadata()` function or a static `metadata` object. The homepage uses a static `metadata` export in `layout.tsx`. Future pages (blog, projects, about) must each define their own.

```ts
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Title | Midhun P M",
    description: "...",
    openGraph: { ... },
    twitter: { ... },
    alternates: { canonical: "https://midhunpm.in/path" },
  };
}
```

## Data Fetching

- Server components can be `async` and fetch data directly. No `useEffect` for data fetching.
- Static data lives in `lib/data.ts`. Import it directly in server components.
- If future dynamic data is needed (Supabase, MDX), fetch it in the server component or a server action, never in a client-side effect.

## next/image

Always use `next/image` for images. Never use raw `<img>` tags. Configure remote patterns in `next.config.ts` if external image domains are added.

## next/link

Always use `next/link` for internal navigation. External links use standard `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`.

## Routing

- File-based routing under `app/`. Each folder is a route segment.
- `layout.tsx` wraps child routes. `page.tsx` defines the route UI.
- Use `loading.tsx`, `error.tsx`, and `not-found.tsx` for route segments where appropriate.
- Route groups: use `(group)` folders to organize without affecting the URL path.

## Server Actions

Use `"use server"` directive at the top of files that define server actions. Co-locate them with the page that uses them, or place in `lib/actions/` for shared actions.

## Caching & Revalidation

- Components are statically rendered by default.
- Use `revalidatePath()` or `revalidateTag()` when stale data needs refreshing.
- Dynamic routes must export `dynamic = "force-dynamic"` or use `unstable_noStore()` if they should never be cached.
