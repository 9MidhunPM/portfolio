import type { NavItem } from "@/lib/types";

export const SITE = {
  name: "Midhun P M",
  url: "https://midhunpm.in",
  role: "CS sophomore at Sahrdaya · Kerala · Open to internships",
  tagline: "A full-stack developer building AI agents.",
  email: "midhun.titan@gmail.com",
  github: "https://github.com/9MidhunPM",
  linkedin: "https://linkedin.com/in/midhun-pm-b947a1279",
  description:
    "Midhun P M is a Kerala-based full-stack developer and AI systems builder creating AI agents with Next.js, Python, FastAPI, LangChain, n8n, and Docker.",
  bio: "I'm a CS sophomore at Sahrdaya in Kerala. I build practical AI systems with Next.js, Python, FastAPI, LangChain, and n8n, and I'm open to internships.",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Now", href: "/now" },
  { label: "Open", href: "/open" },
  { label: "Uses", href: "/uses" },
  { label: "Contact", href: "/contact" },
];
