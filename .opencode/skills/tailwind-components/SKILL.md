---
name: tailwind-components
description: Use when creating or modifying any styled component or Tailwind classes in this project.
---

# Tailwind CSS Component Patterns

## Color Palette

Defined in `globals.css` via `@theme`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#08090A` | Page background |
| `--color-surface` | `#0F1110` | Card/panel backgrounds |
| `--color-accent-primary` | `#00DC82` | The one accent color — links, badges, highlights, scrollbar, selection |
| `--color-accent-secondary` | `#FF4D6D` | Error states, coral badges only |
| `--color-text-primary` | `#ECEDEE` | Body text, headings |
| `--color-text-muted` | `#52525B` | Secondary/muted text |

Use Tailwind arbitrary values referencing these tokens: `bg-[#08090A]`, `text-[#00DC82]`, `border-white/10`, etc.

## One Accent Color

The only accent color is `#00DC82` (green). Use it for:
- Active/hover states on interactive elements
- Badge pills and skill tags
- Gradient text highlights (`.text-gradient` class)
- Scrollbar thumb
- Selection highlight (`selection:bg-[#00DC82]/30`)

`#FF4D6D` is reserved exclusively for error states and the coral achievement badge. Never use it as a general accent.

## Font Pairing

| Font | CSS Variable | Usage |
|------|-------------|-------|
| **Space Grotesk** | `--font-space-grotesk` / `.font-display` | Headings (H1-H3), section titles, stat values. Applied via `className="font-display"`. |
| **Inter** | `--font-inter` / `--font-sans` | Body text, navigation, descriptions, UI elements. Default sans-serif. |
| **JetBrains Mono** | `--font-jetbrains` / `.font-mono` | Code, terminal blocks, badges, metadata, skill pills, technical labels. |

Note: The user mentioned "Instrument Serif for hero H1 only" but the current implementation uses Space Grotesk for all display text. If Instrument Serif is added later, apply it only to the `.hero-heading` h1 element.

## Reusable Class Patterns

### Card
```
bg-[#0F1110] border border-white/10 rounded-xl p-6 hover:border-[#00DC82]/40 transition duration-300 relative overflow-hidden
```

### Card with top accent line
Add inside any card:
```
<div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00DC82]/40 to-transparent" />
```

### Section
```
py-20 bg-[#08090A] section-glow
```

### Section inner container
```
max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12
```

### Badge / Pill (skill tag)
```
font-mono text-xs px-3 py-1.5 rounded-md bg-[#08090A] text-[#ECEDEE] border border-white/10 hover:border-[#00DC82]/50 hover:text-[#00DC82] hover:bg-[#00DC82]/5 transition duration-200
```

### Badge (highlight / award)
```
font-mono text-xs px-2.5 py-1 rounded-full border
```
Variant coral: `bg-[#FF4D6D]/10 text-[#FF4D6D] border-[#FF4D6D]/30`
Variant default: `bg-white/5 text-[#ECEDEE] border-white/10`

### Heading (H2 section title)
```
font-display text-3xl sm:text-4xl font-bold text-white tracking-tight
```

### Section index label
```
font-mono text-sm text-[#00DC82]
```

### External link (inline)
```
text-[#52525B] hover:text-[#00DC82] transition-colors flex items-center gap-1.5 font-mono text-xs
```

### CTA Button (ghost outline)
```
px-6 py-3 rounded-full border border-white/10 bg-[#0F1110] text-[#ECEDEE] hover:text-[#00DC82] hover:border-[#00DC82]/40 hover:bg-[#00DC82]/5 transition duration-300 font-mono text-sm
```

## No Gradients on Backgrounds

Gradients are only used for:
- Text gradients (`.text-gradient` class)
- Thin accent lines (hairline dividers)
- Section glow backdrop (`.section-glow::before`)

Never apply gradient backgrounds to cards, sections, or buttons.

## No Inline Styles

Use Tailwind classes for all styling. The only exception is `style={{ transformStyle: "preserve-3d" }}` on 3D-tilt cards, which has no Tailwind equivalent.

## Responsive Breakpoints

Standard Tailwind: `sm:` (640px), `md:` (768px), `lg:` (1024px). Mobile-first. Sections stack vertically on mobile, use grid on `md:` and `lg:`.

## Utility Function

Use `cn()` from `lib/utils.ts` for conditional/merged class names:
```ts
import { cn } from "@/lib/utils";
className={cn("base-class", condition && "conditional-class", className)}
```
