import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { ContributionGraph } from "@/components/ContributionGraph";
import { getGitHubStats } from "@/lib/github";
import { SITE } from "@/lib/data";
import portrait from "@/public/images/midhun-pm.jpg";
import codexBadge from "@/public/images/midhun-pm-codex-badge.jpg";

export const revalidate = 3600;

const title = "About";
const description =
  "About Midhun P M — CS undergrad at Sahrdaya building AI agents, mobile apps, and low-level C++ projects. IEEE Technical Coordinator, hackathon winner.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/about`,
    siteName: SITE.name,
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: `${SITE.url}/images/midhun-pm-og.jpg`,
        width: 1200,
        height: 630,
        alt: "Midhun P M — Software Developer from Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
    images: [`${SITE.url}/images/midhun-pm-og.jpg`],
  },
  alternates: {
    canonical: `${SITE.url}/about`,
  },
};

const SKILLS: { group: string; items: string[] }[] = [
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

const EXPERIENCE: {
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

const ACHIEVEMENTS: { title: string; detail: string; image?: boolean }[] = [
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

export default async function AboutPage() {
  const gh = await getGitHubStats();

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: `${SITE.url}/images/midhun-pm.jpg`,
    name: SITE.name,
    description: `${SITE.name}, software developer from Kerala, India`,
    author: {
      "@type": "Person",
      name: SITE.name,
    },
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />

      <div className="space-y-20">
        <PageHeader eyebrow={title} title="A bit about me" />

        {/* Story + photo — asymmetric two-column */}
        <section
          className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20"
          aria-label="My story"
        >
          <div className="max-w-prose space-y-5 text-base leading-relaxed text-muted">
            <p>
              I&apos;m a CS undergrad at Sahrdaya College of Engineering and
              Technology, class of 2028, currently in semester five with a
              9.70 CGPA. I got here by building things — my first real
              software was RyMeds, a pharmacy inventory system my team hacked
              together in semester one. It won our college hackathon, and
              more importantly, it was the first time something I made
              solved a problem someone actually had.
            </p>
            <p>
              By semester three I was building ETLab+, a mobile app that
              rescued my batch from our college ERP&apos;s web portal —
              attendance, marks, and timetable on your phone instead of a
              desktop site from another era. Classmates installed the APK.
              That project taught me the difference between code that works
              and code that survives real users.
            </p>
            <p>
              Somewhere along the way I fell down the AI rabbit hole. I
              started running quantized 8B models on an Intel Arc GPU via
              Vulkan and built Thursday, a local-first assistant with tools,
              memory, and a voice. Then came the OpenAI Codex Nightline
              Hackathon — a build sprint inside a moving Kochi Metro train —
              where MetroMind, my WhatsApp agent that plans routes and books
              real tickets, finished Top 10 among 100 builders.
            </p>
            <p>
              Between classes I&apos;m the IEEE student branch&apos;s
              Technical Coordinator, I self-host my stack on an Ubuntu home
              server behind Tailscale, and I write C++ without a game engine
              to remind myself what frameworks are hiding from me. I&apos;m
              looking for internships in backend, AI systems, and
              performance-critical work — the closer to the metal, the
              better.
            </p>
            <p className="font-serif text-xl italic leading-snug text-foreground">
              “Build the thing. Read the docs when it breaks. Write down what
              you learned.”
            </p>
          </div>

          <figure className="space-y-3 lg:pt-1">
            <div className="overflow-hidden rounded-lg border border-border">
              <Image
                src={portrait}
                alt="Midhun P M — software developer from Kerala"
                sizes="(max-width: 768px) 100vw, 300px"
                className="h-auto w-full"
                placeholder="blur"
                priority
              />
            </div>
            <figcaption className="flex items-center gap-2 font-mono text-[11px] text-muted">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              Kochi, Kerala
            </figcaption>
          </figure>
        </section>

        {/* Experience */}
        <section aria-label="Experience">
          <h2 className="mb-8 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            <span className="mr-3 font-mono text-sm text-muted">01</span>
            Experience
          </h2>
          <div className="max-w-prose space-y-10">
            {EXPERIENCE.map((job) => (
              <article key={job.role} className="border-l border-border pl-8">
                <p className="font-mono text-[13px] text-muted">
                  {job.period}
                </p>
                <h3 className="mt-1.5 font-medium text-foreground">
                  {job.role} · {job.org}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {job.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section aria-label="Skills">
          <h2 className="mb-8 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            <span className="mr-3 font-mono text-sm text-muted">02</span>
            What I work with
          </h2>
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((group) => (
              <div key={group.group} className="space-y-4">
                <h3 className="font-mono text-[13px] text-muted">
                  {group.group}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub activity */}
        {gh?.activity && gh.recentEvents !== null && (
          <section aria-label="GitHub activity">
            <ContributionGraph
              activity={gh.activity}
              eventCount={gh.recentEvents}
              size="sm"
            />
          </section>
        )}

        {/* Achievements */}
        <section aria-label="Achievements">
          <h2 className="mb-8 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            <span className="mr-3 font-mono text-sm text-muted">03</span>
            Proof of work
          </h2>
          <ul className="max-w-prose space-y-6">
            {ACHIEVEMENTS.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-5 rounded-lg border border-border p-5"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
                {item.image && (
                  <div className="w-28 shrink-0 overflow-hidden rounded-md border border-border sm:w-36">
                    <Image
                      src={codexBadge}
                      alt="Midhun P M builder badge from OpenAI Codex Nightline hackathon"
                      sizes="(max-width: 640px) 112px, 144px"
                      className="h-auto w-full"
                      placeholder="blur"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
