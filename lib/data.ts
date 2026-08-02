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
    "Midhun P M is a software developer and CS undergrad at Sahrdaya building AI agents, full-stack web applications, and low-level systems from Kerala, India.",
  bio: "I'm a software developer and CS undergrad at Sahrdaya College in Kerala, currently in semester five. I build AI agents and full-stack web applications, then keep learning by shipping them to real people. MetroMind, my Kochi Metro booking agent, made Top 10 at the Kochi Metro AI Sprint; 58+ students used my World Cup prediction platform to place real points. When I'm not in class or coordinating technical work for IEEE Sahrdaya, I'm running quantized LLMs on an Intel Arc GPU or babysitting my Ubuntu home server.",
  jobTitle: "Software Developer" as const,
  region: "Kerala" as const,
  country: "IN" as const,
  almaMater: "Sahrdaya College of Engineering and Technology" as const,
  availability: "Open to internships" as const,
} as const;

export const HOME_NARRATIVE = [
  {
    title: "What I build",
    paragraphs: [
      "I build software around everyday friction. MetroMind turns a WhatsApp message into Kochi Metro route planning, ticket booking, and commute alerts. EtlabPro makes attendance, marks, and timetables easier to use than the college ERP. WC Predict '26 gave IEEE Sahrdaya a live World Cup prediction game with automated settlement instead of another spreadsheet that someone had to maintain by hand.",
      "The work moves between the web, mobile, and systems code because the problem decides the stack. I use Next.js and React when a fast web experience matters, Flutter and React Native when the useful place for a tool is a phone, and FastAPI or Spring Boot when the product needs an API behind it. I also enjoy the less visible work: data modeling, caching, deployment, authentication, and the small reliability details that make an app usable after launch.",
    ],
  },
  {
    title: "How I work",
    paragraphs: [
      "I start with the smallest version that can help someone, then stay close to the rough edges. At Sahrdaya, that has meant asking students what they actually need from ETLAB and building risk analysis around missed classes, not just copying portal screens. As IEEE Sahrdaya's Technical Coordinator, it means shipping features and performance work for a production site used by more than 1,000 people each week, while making changes the next student team can understand.",
      "AI is part of that toolkit, not the entire pitch. I build agents when an agent can take a real action, such as looking up a route or coordinating a workflow. Thursday explores the other side of the trade-off: a local-first assistant that can run quantized models on my own Intel Arc GPU, use carefully scoped tools, and keep private data under the user's control. I care about the plumbing as much as the model because that is where most useful software either holds up or falls apart.",
    ],
  },
  {
    title: "What I am learning next",
    paragraphs: [
      "I'm still a computer science undergrad, so I deliberately keep one foot in fundamentals. C++ games with Raylib taught me that a frame budget exposes sloppy state management quickly. Self-hosting services on an Ubuntu server and using Docker, Tailscale, and Dokploy has made networking, deployment, and failure recovery feel much less abstract than they did in class.",
      "This portfolio is a record of that process, not a gallery of mockups. Each case study explains the problem, the decisions behind the build, and what changed after real people used it. If you are looking for a software developer in Kerala who likes to take a project from an awkward first constraint to a working web product, I would be glad to talk.",
    ],
  },
] as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Now", href: "/now" },
  { label: "Open", href: "/open" },
  { label: "Uses", href: "/uses" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_SHARE = {
  twitter: (title: string, url: string) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  linkedin: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
} as const;

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "C", "C++", "Java", "JavaScript", "Dart"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js 15", "React Native (Expo)", "Flutter", "HTML/CSS"],
  },
  {
    group: "Backend",
    items: ["FastAPI", "Spring Boot", "Node.js", "Supabase", "Appwrite"],
  },
  {
    group: "Tools",
    items: ["Git", "Arch Linux", "LangChain", "n8n", "Playwright", "LLaMA.cpp", "Raylib", "Twilio"],
  },
  {
    group: "Cloud & Infra",
    items: ["AWS (S3, Lambda, API Gateway, DynamoDB)", "Docker", "Dokploy", "Tailscale", "Ubuntu home server"],
  },
];

export const EXPERIENCE: {
  role: string;
  org: string;
  period: string;
  detail: string;
}[] = [
  {
    role: "Technical Coordinator",
    org: "IEEE Sahrdaya Student Branch",
    period: "Jan 2026 — Present",
    detail:
      "Leading the branch's technical initiatives and shipping production features to ieeesahrdaya.com. Built WC Predict '26, the chapter's FIFA World Cup prediction platform — 58+ players placed 737+ bets across pool and fixed-odds markets, with a live leaderboard and automated settlement.",
  },
  {
    role: "Frontend Developer Intern",
    org: "Narrowlabs Technologies Pvt. Ltd",
    period: "Jun 2025 — Aug 2025",
    detail:
      "Built the login and dashboard UI for a job portal serving both recruiter and applicant roles. React, responsive components, real users — my first code that shipped to a production product.",
  },
];

export const ACHIEVEMENTS: { title: string; detail: string; image?: boolean }[] = [
  {
    title: "Top 10 Finalist — OpenAI Codex Nightline Hackathon",
    detail:
      "Kochi Metro AI Sprint, July 2026. Built MetroMind with 100 curated builders in the world's first AI build sprint inside a moving metro system.",
    image: true,
  },
  {
    title: "Best S1 Project — RyMeds",
    detail:
      "Pharmacy inventory system in Python and Tkinter, built with Team RYNEM.",
  },
  {
    title: "Best S3 Project — ETLab+",
    detail:
      "Full-stack student companion for the college ERP — React Native, Spring Boot, real users.",
  },
  {
    title: "Winner — College Hackathon, Semester 1",
    detail: "PYHACK, with Team RYNEM. The one that started all of this.",
  },
  {
    title: "CGPA 9.70",
    detail: "B.Tech CSE, Sahrdaya College of Engineering and Technology.",
  },
];

export const TIMELINE: { period: string; title: string; detail: string }[] = [
  {
    period: "S1",
    title: "RyMeds and a first hackathon win",
    detail:
      "Team RYNEM built a pharmacy inventory system in Python and Tkinter at PYHACK — expiry tracking, stock alerts, SQLite. We won the hackathon, and the project was later named Best S1 Project.",
  },
  {
    period: "S2",
    title: "Foundations",
    detail:
      "Went deeper on the unglamorous stuff — Java, data structures, and my first real React apps. Landed the Narrowlabs internship off the back of it.",
  },
  {
    period: "S3",
    title: "ETLab+",
    detail:
      "Built a full student companion for our college ERP — React Native app, Spring Boot backend, real-time scraping, AI query answering. Classmates installed the APK. Best S3 Project.",
  },
  {
    period: "S4",
    title: "Internship, IEEE, and WC Predict",
    detail:
      "Shipped production UI at Narrowlabs, became IEEE Technical Coordinator, and launched WC Predict '26 — 58+ players, 737+ bets. Built Thursday, a local-first AI assistant, on the side.",
  },
];

export const USES_CATEGORIES: { name: string; items: { name: string; note: string }[] }[] = [
  {
    name: "Editor & OS",
    items: [
      { name: "VS Code", note: "Where most of the code gets written. Nothing exotic — a few extensions and a dark theme." },
      { name: "Arch Linux", note: "Daily driver. I maintain my own dotfiles, so a fresh install is an afternoon, not a weekend." },
      { name: "Git", note: "Every project, every config, every lab record. Commit early, squash never." },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "Python", note: "Default for backends, agents, and scraping. Most of my projects start here." },
      { name: "JavaScript / TypeScript", note: "For anything with a UI. TypeScript once the project outlives the weekend." },
      { name: "C++", note: "For game dev and understanding what the frameworks are hiding. Raylib, no engine." },
    ],
  },
  {
    name: "AI & agents",
    items: [
      { name: "LLaMA.cpp + Vulkan", note: "Runs quantized 8B models on my Intel Arc GPU. Local inference, no API keys." },
      { name: "LangChain", note: "The ReAct agent loop behind MetroMind's brain." },
      { name: "n8n", note: "Orchestration for agent workflows — webhooks in, tools out, cron watching everything." },
      { name: "Playwright", note: "Browser automation that survives bot detection. MetroMind books real tickets with it." },
    ],
  },
  {
    name: "Web & mobile",
    items: [
      { name: "React + Next.js", note: "This site, the IEEE branch site, and most things with a browser UI." },
      { name: "Flutter", note: "EtlabPro's app. One codebase, and it handles bad campus wifi gracefully." },
      { name: "FastAPI", note: "My default backend. MetroMind and EtlabPro both run on it." },
      { name: "Spring Boot + Node.js", note: "Spring Boot for ETLab+ (Java done right), Node when the job is small." },
      { name: "Supabase + Appwrite + PostgreSQL", note: "Managed when the deadline is short, raw Postgres when I want control." },
    ],
  },
  {
    name: "Infrastructure",
    items: [
      { name: "Ubuntu home server", note: "An old machine that runs my self-hosted stack. Boring on purpose." },
      { name: "Tailscale", note: "Every device on one private network. My server is reachable from anywhere, open to no one." },
      { name: "Docker + Dokploy", note: "Everything ships in containers. Dokploy is my self-hosted PaaS — EtlabPro lives on it." },
      { name: "AWS", note: "S3, Lambda, API Gateway, DynamoDB — picked up properly at the ICSET 2026 workshop." },
    ],
  },
  {
    name: "Also in the toolbox",
    items: [
      { name: "Twilio", note: "WhatsApp for agents. MetroMind talks to the world through it." },
      { name: "Discord Webhooks", note: "Alerts and notifications where my friends actually look." },
      { name: "GTFS + Haversine", note: "Transit data and the geo math to make sense of it. MetroMind's route engine." },
    ],
  },
];
