---
name: component-patterns
description: Use when creating or modifying any React component in this project to follow established patterns.
---

# Component Patterns

## Exports

- **Named exports only.** Every component uses `export const ComponentName = () => {}` or `export function ComponentName() {}`.
- **No default exports** except `page.tsx` and `layout.tsx` (required by Next.js App Router).
- All imports use `import { ComponentName } from "@/components/ComponentName"`.

## Props Interface

Define the props type inline above the component, or as a separate interface if it's complex:

```tsx
// Simple — inline type
export function SectionHeading({
  index,
  title,
  reveal = false,
  className,
}: {
  index: string;
  title: string;
  reveal?: boolean;
  className?: string;
}) {
  // ...
}

// Complex — separate interface
interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  // ...
};
```

## No `any` Types

Strict TypeScript. Never use `any`. Use:
- `unknown` if the type is genuinely unknown
- Proper interfaces from `lib/types/index.ts`
- React types: `React.MouseEvent<HTMLDivElement>`, `React.RefObject<HTMLDivElement>`, etc.
- GSAP types: `gsap.TweenTarget`, `HTMLElement`, etc.

## Component Structure

Every component file follows this order:

1. `"use client"` directive (if needed)
2. Imports (React, libraries, local components, hooks, data, types)
3. GSAP plugin registration (if using GSAP)
4. Props type definition
5. Component function/export
6. Return JSX

Example:
```tsx
"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/SectionHeading";
import { DATA } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const MySection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // animation logic
  }, { scope: ref });

  return (
    <section ref={ref} className="...">
      {/* content */}
    </section>
  );
};
```

## GSAP Pattern

Most section components follow the same GSAP + ScrollTrigger pattern:

1. `useRef<HTMLDivElement>` for the section
2. `useGSAP(() => { ... }, { scope: ref })` for scoped animations
3. `gsap.from()` or `gsap.fromTo()` with `scrollTrigger` config
4. Always check `prefers-reduced-motion` before animating
5. Always use class-based selectors (`.project-card`) within the scoped `useGSAP` for targeting children

```tsx
useGSAP(
  () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    gsap.from(".child-element", {
      y: 60,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".parent-grid",
        start: "top 72%",
        toggleActions: "play none none reverse",
      },
    });
  },
  { scope: ref }
);
```

## cn() Usage

Use the `cn()` utility from `lib/utils.ts` for conditional class merging:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className  // allow caller overrides
)}>
```

## File Naming

- Component files: `PascalCase.tsx` (e.g., `SectionHeading.tsx`, `Hero.tsx`)
- UI primitives: `kebab-case.tsx` under `components/ui/` (e.g., `card-spotlight.tsx`)
- Magic UI: `kebab-case.tsx` under `components/magicui/`
- Hooks: `camelCase.ts` with `use` prefix under `hooks/`

## Server vs Client

- Only add `"use client"` when the component uses: `useState`, `useEffect`, `useRef` (with DOM access), `useContext`, event handlers, or browser APIs.
- `SectionHeading.tsx` is a server component — no hooks, no client directive. This is the pattern for pure presentational components.
- When in doubt, start as a server component. Add the client directive only when needed.
