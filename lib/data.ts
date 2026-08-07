import type { NavItem } from "@/lib/types";

export const SITE = {
  name: "Midhun P M",
  url: "https://midhunpm.in",
  role: "B.Tech CSE, class of 2028 · Kerala · Open to internships",
  tagline: "A full-stack developer building AI agents.",
  email: "midhun.titan@gmail.com",
  github: "https://github.com/9MidhunPM",
  linkedin: "https://linkedin.com/in/midhun-pm-b947a1279",
  ogImage: "https://midhunpm.in/images/midhun-pm-og.jpg",
  description:
    "Midhun P M is a Kerala-based full-stack developer and AI systems builder creating AI agents with Next.js, Python, FastAPI, LangChain, n8n, and Docker.",
  bio: "I'm a CS undergrad at Sahrdaya in Kerala. I build practical AI systems with Next.js, Python, FastAPI, LangChain, and n8n, and I'm open to internships.",
  replyTime: "within a day or two",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const SECONDARY_NAV_ITEMS: NavItem[] = [
  { label: "Now", href: "/now" },
  { label: "Open source", href: "/open" },
  { label: "Uses", href: "/uses" },
];
