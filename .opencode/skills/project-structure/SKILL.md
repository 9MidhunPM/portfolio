---
name: project-structure
description: Use when navigating, adding files, or organizing code in this project to understand where things go.
---

# Project Structure

## Full Folder Layout

```
portfolio/
├── app/                        # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css             # Tailwind v4 config, theme tokens, animations
│   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   └── page.tsx                # Homepage — composes all sections
│
├── components/
│   ├── About.tsx               # "use client" — GSAP animated
│   ├── Achievements.tsx        # "use client" — GSAP animated
│   ├── Certifications.tsx      # "use client"
│   ├── CustomCursor.tsx        # "use client" — desktop cursor effect
│   ├── Experience.tsx          # "use client" — GSAP animated
│   ├── Footer.tsx              # "use client" — GSAP animated
│   ├── Hero.tsx                # "use client" — GSAP + typewriter
│   ├── LaptopScroll.tsx        # "use client" — 3D laptop preview
│   ├── Navbar.tsx              # "use client" — scroll-aware nav
│   ├── Parallax.tsx            # "use client" — parallax effect
│   ├── Projects.tsx            # "use client" — GSAP animated
│   ├── ScrollProgress.tsx      # "use client" — scroll progress bar
│   ├── SectionHeading.tsx      # Server component — reusable H2
│   ├── Skills.tsx              # "use client" — GSAP animated
│   ├── SmoothScrolling.tsx     # "use client" — Lenis smooth scroll
│   ├── magicui/                # Magic UI component wrappers
│   │   ├── animated-grid-pattern.tsx
│   │   ├── blur-fade.tsx
│   │   ├── meteors.tsx
│   │   └── shimmer-button.tsx
│   └── ui/                     # shadcn/ui + custom UI primitives
│       ├── background-beams.tsx
│       ├── card-spotlight.tsx
│       ├── hover-border-gradient.tsx
│       ├── text-reveal-card.tsx
│       ├── timeline.tsx
│       ├── tracing-beam.tsx
│       ├── typewriter-effect.tsx
│       └── ...
│
├── hooks/                      # Custom React hooks (all "use client")
│   ├── useActiveSection.ts     # IntersectionObserver for nav highlighting
│   ├── useScrollDirection.ts   # Detects scroll up/down for navbar
│   ├── useScrollReveal.ts      # Generic scroll-trigger animation
│   ├── useTerminal.ts          # Terminal typing animation
│   └── useWindowSize.ts        # Window dimensions hook
│
├── lib/
│   ├── data.ts                 # All static data — personal info, projects, skills, etc.
│   ├── utils.ts                # cn() helper (clsx + tailwind-merge)
│   └── types/
│       └── index.ts            # TypeScript interfaces for data models
│
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── macbook-screen.png
│   ├── macbook-screen.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .gitignore
├── .dockerignore
├── AGENTS.md                   # Agent instructions (this file)
├── CLAUDE.md                   # Legacy agent instructions
├── Dockerfile                  # Standalone Next.js Docker build
├── eslint.config.mjs
├── next.config.ts              # output: "standalone"
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

## Future Routes (not yet created)

When blog or project detail pages are added:
```
app/
├── blog/
│   ├── page.tsx                # Blog index
│   └── [slug]/
│       └── page.tsx            # Individual blog post
├── projects/
│   ├── page.tsx                # Projects index
│   └── [slug]/
│       └── page.tsx            # Individual project page
```

## MDX Frontmatter Format (when blog/projects are added)

### Blog Posts (`content/blog/*.mdx`)
```yaml
---
title: "Post Title"
slug: "post-slug"
date: "2026-07-25"
excerpt: "One-line summary for SEO and cards."
tags: ["next.js", "react"]
published: true
---
```

### Projects (`content/projects/*.mdx`)
```yaml
---
title: "Project Name"
slug: "project-slug"
date: "2026-07-25"
excerpt: "Short description."
stack: ["Python", "FastAPI"]
github: "https://github.com/9MidhunPM/repo"
live: "https://example.com"
featured: true
---
```

## Key Conventions

- `lib/data.ts` is the single source of truth for all static content. If you're adding a new section, add its data here first.
- `lib/types/index.ts` contains all shared interfaces. Add new types here.
- Components in `components/ui/` are low-level primitives. Components in `components/` are page-section compositions.
- `hooks/` contains reusable client-side hooks. Keep them generic.
- `public/` is for static assets only. No processed images.
- Path alias `@/` maps to project root. Use `@/components/...`, `@/lib/...`, etc.
