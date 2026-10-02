import type { ContentImage, NavItem } from "@/lib/types";

export const SITE = {
  name: "Midhun P M",
  url: "https://midhunpm.in",
  role: "Third-year CS student at Sahrdaya · Kerala · Open to internships",
  tagline: "A full-stack developer building AI systems.",
  email: "midhun.titan@gmail.com",
  github: "https://github.com/9MidhunPM",
  linkedin: "https://linkedin.com/in/midhun-pm-b947a1279",
  description:
    "Midhun P M is a Kerala-based full-stack developer who builds practical AI systems, developer tools, and web products with Python, Rust, Next.js, and FastAPI.",
  bio: "I'm a third-year CS student at Sahrdaya in Kerala. I build practical AI systems, developer tools, and web products with Python, Rust, Next.js, and FastAPI.",
} as const;

export const CALICUT_RECOGNITION = {
  title: "Second Prize in Calicut.",
  subtitle: "More fuel for the next build.",
  achievement: "🥈 Second Prize — Codex Community Hackathon, Calicut",
  description:
    "I built NightWatch to bring deployment panels, containers, metrics, domains, and logs into one infrastructure console. At TinkerSpace on 19–20 September 2026, it took second prize. The agent investigates and proposes; deterministic code checks the plan, waits for my approval, and records what happened.",
  prize: "3 months of ChatGPT Pro + $500 OpenAI API credits",
  projectHref: "/projects/nightwatch",
  blogHref: "/blog/building-nightwatch-at-codex-community-hackathon-calicut",
  image: {
    src: "/images/codex-calicut-second-prize.jpeg",
    alt: "Codex Community Hackathon Calicut winners poster listing Midhun P M and NightWatch in second place",
    width: 1024,
    height: 1536,
    caption: "NightWatch · Second Prize · TinkerSpace, Calicut · 19–20 September 2026",
  } satisfies ContentImage,
} as const;

export const HOME_PROOF_POINTS = [
  {
    value: "2nd prize",
    label: "for NightWatch at the Codex Community Hackathon, Calicut",
    href: CALICUT_RECOGNITION.projectHref,
  },
  {
    value: "≈3%",
    label: "selected for the Codex Community Hackathon in Bengaluru",
    href: "/blog/taking-thursday-to-openai-codex-community-hackathon-bengaluru",
  },
  {
    value: "2nd place",
    label: "for PRISM at ASIET's AI Innovation Hackathon",
    href: "/projects/prism",
  },
  {
    value: "737+ bets",
    label: "placed by 58+ players on WC Predict '26",
    href: "/projects/wc-predict-26",
  },
  {
    value: "1,000+",
    label: "weekly users on the IEEE Sahrdaya site",
    href: "/projects/ieee-sahrdaya-website",
  },
] as const;

export const HOME_APPROACH = {
  eyebrow: "How I work",
  title: "Build close to the problem.",
  paragraphs: [
    "I start with the person who has to use the thing. For MetroMind, that meant someone standing at a station with a phone, not a diagram of an agent pipeline. The route search had to explain the next step clearly. Ticket booking had to survive a real website. WhatsApp had to be the place the answer arrived because that is where people already are.",
    "Then I keep the stack boring where boring helps. FastAPI gives me a direct path from an idea to an API. Next.js is where I build interfaces that need to load quickly and stay understandable. Docker makes the handoff to my home server predictable. I reach for LangChain, browser automation, or a local model only when the problem needs it, not because the tool is new.",
    "I care about the parts that show up after a demo. An agent needs useful failures, not a cheerful lie. A dashboard has to work on a small phone over bad campus wifi. A scraper needs to notice when the source site changed. I would rather spend an extra evening on logs, retries, and clear states than ship a screen that only works for me.",
    "Most of my projects are learning tools as much as portfolio pieces. Building ETLab+ taught me what happens when real students rely on a service. Running an Ubuntu server taught me that deployment is not the last checkbox. Writing C++ without an engine keeps the abstractions honest. Every project leaves me with a better question for the next one.",
    "That is also why I keep case studies and code public when I can. The interesting part is rarely the finished screenshot. It is the constraint, the wrong turn, the small fix that made the system usable, and the evidence that somebody came back to use it again.",
    "Right now, I am looking for internship work where I can help ship a real feature and learn from the failures around it. I am most useful when there is a product problem to untangle, an API to make less fragile, or a deployment that needs to become repeatable. Recent hackathons have made me care even more about evidence-first AI: tools should show their work, respect a person’s control, and fail clearly. If the work touches backend systems, practical AI, or performance-sensitive code, I want to be in the room for it.",
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

export const OPEN_CASE_STUDIES = [
  {
    href: "/projects/nightwatch",
    title: "NightWatch",
    description:
      "An infrastructure operations console with typed plans and human approval. Second Prize at Codex Community Hackathon, Calicut.",
  },
  {
    href: "/projects/noolu-pidichaal-mathi",
    title: "Noolu Pidichaal Mathi",
    description:
      "A fictional metro network traced from an idiyappam photo, then made routeable in 3D.",
  },
  {
    href: "/projects/mcpd",
    title: "Syncplane",
    description:
      "A Rust CLI that keeps MCP configuration deliberate across five AI clients.",
  },
  {
    href: "/projects/ani-reminder",
    title: "AniReminder",
    description:
      "A private release tracker with encrypted preferences and timed ntfy reminders.",
  },
  {
    href: "/projects/probe-interview",
    title: "Probe Interview",
    description:
      "A LangGraph interview practice app with grounded follow-ups and useful feedback.",
  },
] as const;
