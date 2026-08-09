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
  bio: "I'm a CS sophomore at Sahrdaya in Kerala, a full-stack developer building AI agents with Next.js, Python, FastAPI, LangChain, and n8n. I'm open to internships.",
} as const;

export const HOME_APPROACH = {
  eyebrow: "How I work",
  title: "Build close to the problem.",
  paragraphs: [
    "I start with the person who has to use the thing. For MetroMind, that meant someone standing at a station with a phone, not a diagram of an agent pipeline. The route search had to explain the next step clearly. Ticket booking had to survive a real website. WhatsApp had to be the place the answer arrived because that is where people already are.",
    "Then I keep the stack boring where boring helps. FastAPI gives me a direct path from an idea to an API. Next.js is where I build interfaces that need to load quickly and stay understandable. Docker makes the handoff to my home server predictable. I reach for LangChain, browser automation, or a local model only when the problem needs it, not because the tool is new.",
    "I care about the parts that show up after a demo. An agent needs useful failures, not a cheerful lie. A dashboard has to work on a small phone over bad campus wifi. A scraper needs to notice when the source site changed. I would rather spend an extra evening on logs, retries, and clear states than ship a screen that only works for me.",
    "Most of my projects are learning tools as much as portfolio pieces. Building ETLab+ taught me what happens when real students rely on a service. Running an Ubuntu server taught me that deployment is not the last checkbox. Writing C++ without an engine keeps the abstractions honest. Every project leaves me with a better question for the next one.",
    "That is also why I keep case studies and code public when I can. The interesting part is rarely the finished screenshot. It is the constraint, the wrong turn, the small fix that made the system usable, and the evidence that somebody came back to use it again.",
    "Right now, I am looking for internship work where I can help ship a real feature and learn from the failures around it. I am most useful when there is a product problem to untangle, an API to make less fragile, or a deployment that needs to become repeatable. I write down what I learn so the next build starts from evidence, not memory. If the work touches backend systems, practical AI, or performance-sensitive code, I want to be in the room for it.",
  ],
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
