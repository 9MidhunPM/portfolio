# AGENTS.md — Midhun P M Portfolio

## Before Any Task

1. **Load the relevant skill** from `.opencode/skills/` before writing or modifying code. Skills are in `.opencode/skills/<skill-name>/SKILL.md`. Load the one that matches your task:
   - Modifying pages, routes, layouts, or data fetching → `nextjs-app-router`
   - Writing or updating metadata, SEO tags, structured data → `seo-rules`
   - Creating or editing styled components, Tailwind classes → `tailwind-components`
   - Writing any user-facing copy, bio text, project descriptions, blog content → `writing-voice`
   - Adding new files or organizing code → `project-structure`
   - Creating or modifying React components → `component-patterns`

   Note: some skill files still reference the previous iteration of this site (GSAP, Tailwind v4, `#00DC82`). Where they conflict with this file or the current code, **the current code and this file win**. The writing-voice, SEO, and component-structure guidance still applies.

2. **Use `context7` for docs lookups** whenever you need to reference library APIs (Next.js, React, Tailwind, Framer Motion, etc.). Do not guess APIs — look them up.

3. **Use `gh_grep` when unsure how to implement something.** Search for real-world code patterns in public repos before inventing your own solution.

## Project Rules

- **Next.js 14.x** App Router, **React 18**, **TypeScript strict mode.** No `any`. No `@ts-ignore`.
- **Tailwind CSS v3.4** with `darkMode: "class"`. Design tokens are CSS variables in `app/globals.css` (`:root` = light, `.dark` = dark), wired into `tailwind.config.ts` as `rgb(var(--token) / <alpha-value>)`. Use `cn()` from `lib/utils.ts` for class merging.
- **Framer Motion** for all animations. Subtle only: fade-up on load, staggered lists, opacity page transitions (`app/template.tsx`), reading progress bar. No parallax, no scroll-jacking, no 3D tilt.
- **One accent color:** `#E8FF59` (electric lime), used sparingly — one element per section max, never as a background fill. `#FF4D6D` for form error states only.
- **Fonts:** Instrument Serif (`--font-instrument-serif`, hero H1 + pull quotes only), Geist Sans (`--font-geist-sans`, all UI), Geist Mono (`--font-geist-mono`, code + tech tags). Geist comes from the `geist` npm package; Instrument Serif from `next/font/google`.
- **Dark mode is the default**, light mode available, toggled via `next-themes` (`components/theme-provider.tsx`, `defaultTheme="dark"`, `enableSystem={false}`).
- **No default exports** except `page.tsx`, `layout.tsx`, `template.tsx`, `sitemap.ts`, `manifest.ts`, `opengraph-image.tsx`, `apple-icon.tsx`.
- **No inline styles.** No gradients. No glassmorphism.
- **Data lives in `lib/data.ts`** (site config, nav). Types in `lib/types/index.ts`. Do not hardcode content in components.
- **No backend / no Supabase.** The site is fully static. Contact is a mailto link + copy-to-clipboard button (`components/CopyEmailButton.tsx`). Do not re-add a form backend without asking.

## Structure

```
app/                    # Routes: /, /about, /projects(+[slug]), /blog(+[slug]), /now, /open, /uses, /contact
app/sitemap.ts          # Dynamic sitemap (includes all content)
app/template.tsx        # Opacity-fade page transitions
public/robots.txt       # Static robots file (has crawler easter-egg comments). Do NOT recreate app/robots.ts.
components/             # Header, Footer, cards, MDXContent, ToC, CopyEmailButton, TerminalEasterEgg...
content/blog/*.mdx      # Blog posts (gray-matter frontmatter); empty = styled empty state
content/projects/*.mdx  # Case studies — frontmatter IS the project metadata
lib/blog.ts             # Post loading (fs — server only, never import from client comps)
lib/projects.ts         # Project loading (server only)
lib/github.ts           # GitHub API stats (server only, revalidate 86400, returns null on failure)
lib/utils.ts            # cn() + formatDate() — safe for client imports
public/images/          # Real photos (midhun-pm.jpg, codex hackathon shots). No placeholders.
```

## Live Data & Easter Eggs

- **GitHub stats** (`/open`, homepage "By the numbers" strip, `/about` activity graph) come from `lib/github.ts` via the public GitHub API, revalidated daily. If the API fails, omit the stat — never fake numbers.
- **`ContributionGraph`** renders a 13×7 activity grid from `events/public` — exactly the 90-day window the API exposes, no fake empty history.
- **Terminal easter egg:** typing `sudo` anywhere (or the `>_` button in the footer) opens `components/TerminalEasterEgg.tsx`. Keep it unannounced.
- **Availability badge** (pulsing accent dot, "Open to internships") lives in `components/Header.tsx`, links to /contact, hardcoded — no backend.

## Content Pipeline

- MDX rendered via `next-mdx-remote/rsc` in `components/MDXContent.tsx`, with `rehype-slug` (heading ids) and `rehype-pretty-code` + shiki dual theme (github-dark/light, switched by `.dark` CSS in globals.css).
- Blog post metadata (title, date, description, tags) lives in MDX frontmatter. Reading time computed by `reading-time` in `lib/blog.ts`.
- Project metadata lives entirely in each case study's frontmatter: `title`, `description`, `tech[]`, `github?`, `live?`, `featured`, `order`. `lib/projects.ts` parses it; projects are sorted by `order`.
- ToC is extracted from raw markdown in `lib/toc.ts` (h2/h3 only, github-slugger ids must match rehype-slug output).

## SEO — Non-Negotiable

- Every page: metadata with title (`"Page | Midhun P M"`), description, openGraph, twitter card, `alternates.canonical`.
- Every page: exactly one `<h1>` containing the string `Midhun P M` (use `components/PageHeader.tsx` or the eyebrow-span pattern).
- JSON-LD: Person + WebSite on homepage, Article + BreadcrumbList on blog posts, SoftwareApplication + BreadcrumbList on project pages.
- `app/sitemap.ts` is the live sitemap (dynamic, real MDX mtimes for `lastmod`). `public/robots.txt` is the live robots file — there is **no** `app/robots.ts`, and it should not be created (it would conflict with the static file). `next-sitemap.config.js` is a fallback only — do not run its postbuild while `app/sitemap.ts` exists (route conflict).
- OG images are generated at build time by `app/opengraph-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`, and `app/projects/[slug]/opengraph-image.tsx` via the shared renderer in `lib/og/render.tsx`. Do not hand-write `openGraph.images` in page metadata — the file-based routes are inherited down the segment tree and override it. Satori cannot read `.woff2`, so the fonts are vendored `.ttf` files in `lib/og/fonts/`, kept in the standalone bundle by `experimental.outputFileTracingIncludes` in `next.config.mjs`.

## Design Direction

Clean, minimal, confident. Lots of whitespace. Asymmetric, left-aligned, editorial — never the centered-symmetric AI-portfolio look. Mobile-first, verified at 375px with no horizontal overflow.

## Lint & Verify

Run `npm run lint` and `npx next build` before committing. Both must pass clean.
