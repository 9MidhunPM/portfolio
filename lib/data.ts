import type { NavItem } from "@/lib/types";

export const SITE = {
  name: "Midhun P M",
  url: "https://midhunpm.in",
  role: "CS undergrad at Sahrdaya. I build AI agents, mobile apps, and whatever seems interesting.",
  tagline: "I build things for the web.",
  email: "midhun.titan@gmail.com",
  github: "https://github.com/9MidhunPM",
  linkedin: "https://linkedin.com/in/midhun-pm-b947a1279",
  description:
    "Midhun P M is a CS undergrad at Sahrdaya building AI agents, mobile apps, and low-level systems. Based in Kerala, India.",
  bio: "I'm a CS undergrad at Sahrdaya College in Kerala, currently in semester five. I build AI agents, mobile apps, and occasionally games in raw C++ — my metro-booking agent made Top 10 at the Kochi Metro AI Sprint, and 58+ students bet real points on my World Cup prediction platform. When I'm not in class, I'm running quantized LLMs on an Intel Arc GPU or babysitting my Ubuntu home server.",
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
