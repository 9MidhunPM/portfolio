import {
  ExperienceItem,
  ProjectItem,
  SkillsCategory,
  AchievementItem,
  CertificationItem,
  StatCard,
} from "./types";

export const PERSONAL_INFO = {
  name: "Midhun P M",
  handle: "midhun.pm",
  title: "Building things that actually work.",
  subheading: "CS sophomore · AI systems · self-hosted infra · C++ game dev",
  roles: [
    "Full-stack Developer",
    "AI Systems Builder",
    "Open Source Contributor",
    "Home Server Nerd",
  ],
  college: "Sahrdaya College of Engineering",
  cgpa: "9.75",
  sgpa: "9.53",
  status: "CS sophomore, semester 4",
  location: "Kerala, India",
  email: "midhun.titan@gmail.com",
  github: "https://github.com/9MidhunPM",
  linkedin: "https://linkedin.com/in/midhun-pm-b947a1279",
};

export const ABOUT_TERMINAL_TEXT = `$ cat about.txt

Name: Midhun P M
College: Sahrdaya College of Engineering
CGPA: 9.75 (S4 SGPA: 9.53)
Status: CS sophomore, semester 4
Location: Kerala, India

Currently: Building WC Predict '26
Running Thursday on Intel Arc GPU
Coordinating IEEE Sahrdaya tech`;

export const ABOUT_STATS: StatCard[] = [
  { value: "9.75", label: "CGPA (S4 SGPA: 9.53)" },
  { value: "737+", label: "Bets on WC Predict" },
  { value: "Top 10", label: "@ Codex Nightline" },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Frontend Developer Intern",
    company: "Narrowlabs Technologies Pvt. Ltd",
    period: "Jun 2025 – Aug 2025",
    points: [
      "Built job portal UI covering both recruiter and applicant dashboards.",
      "Developed responsive, production-facing React UI components.",
      "Shipped features directly for an active user-facing product.",
    ],
  },
  {
    title: "Technical Coordinator",
    company: "IEEE Sahrdaya Student Branch",
    period: "Jan 2026 – Present",
    points: [
      "Led technical initiatives and workshops for the student branch.",
      "Built WC Predict '26 (58+ players, 737+ bets, live leaderboard, automated settlement at ieeesahrdaya.com/fifa).",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    name: "MetroMind",
    stack: ["Python", "LangChain", "n8n", "FastAPI", "Playwright", "Twilio"],
    description:
      "Autonomous AI agent for Kochi Metro — route planning, GPS lookup, Razorpay bot-evasion ticket booking, WhatsApp alerts.",
    badge: "🏆 Top 10 — Codex Nightline",
    isCoralBadge: true,
    github: "https://github.com/9MidhunPM/MetroMind",
  },
  {
    name: "Thursday",
    stack: ["Python", "LLaMA.cpp", "Vulkan", "React", "SQLite"],
    description:
      "JARVIS-style local AI on Intel Arc GPU. Quantized 8B LLMs, fully offline, tool-using agent with long-term memory.",
    github: "https://github.com/9MidhunPM/thursday-local-assistant",
  },
  {
    name: "EtlabPro",
    stack: ["Flutter", "FastAPI", "Supabase"],
    description:
      "Student companion: attendance risk analysis, CAT projection, timetable. Self-hosted on Dokploy with JWT auth.",
    github: "https://github.com/9MidhunPM/EtlabPro",
  },
  {
    name: "WC Predict '26",
    stack: ["TanStack Start", "PocketBase", "React Query", "Zod"],
    description:
      "FIFA 2026 prediction platform — pool & fixed-odds markets, live leaderboard, 58+ players, 737+ bets.",
    live: "https://ieeesahrdaya.com/fifa",
  },
  {
    name: "ETLab+",
    stack: ["React Native", "Expo", "Spring Boot"],
    description:
      "Android academic app with AI query answering, scraping, analytics. Distributed as APK.",
    badge: "🥇 Best S3 Project",
    isCoralBadge: false,
  },
  {
    name: "Calculus Dash",
    stack: ["C++", "Raylib"],
    description:
      "Geometry Dash clone — custom physics, gravity inversion, spike collision, world scrolling. No engine.",
  },
];

export const SKILLS_CATEGORIES: SkillsCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript", "Dart"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js 15", "Flutter", "React Native", "TanStack Start"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Spring Boot", "Node.js", "Supabase", "Appwrite", "PocketBase"],
  },
  {
    category: "AI & Infra",
    skills: [
      "LLaMA.cpp",
      "LangChain",
      "n8n",
      "Vulkan",
      "Docker",
      "Dokploy",
      "Traefik",
      "Cloudflare",
      "AWS",
    ],
  },
  {
    category: "Tools",
    skills: ["Git", "Arch Linux", "PostgreSQL", "SQLite", "Playwright", "Tailscale"],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "01",
    title:
      "Top 10 Finalist · OpenAI Codex Nightline Hackathon (Kochi Metro AI Sprint, July 2026)",
  },
  {
    id: "02",
    title: "Best S3 Project · ETLab+ (Academic Tracking & AI App)",
  },
  {
    id: "03",
    title: "Best S1 Project · RyMeds (Pharmacy Management System)",
  },
  {
    id: "04",
    title: "Winner · College Hackathon, Semester 1",
  },
  {
    id: "05",
    title: "CGPA 9.75 · Consistent across all semesters",
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { name: "Digital 101", issuer: "NASSCOM", grade: "Gold Category" },
  { name: "C++ Training", issuer: "IIT Bombay", grade: "77.5%" },
  { name: "PostgreSQL Training", issuer: "IIT Bombay", grade: "85%" },
  { name: "AWS Workshop", issuer: "ICSET 2026", grade: "—" },
];
