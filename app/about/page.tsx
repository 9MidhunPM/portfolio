import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { ContributionGraph } from "@/components/ContributionGraph";
import { getGitHubStats } from "@/lib/github";
import { SITE, SKILLS, EXPERIENCE, ACHIEVEMENTS, TIMELINE } from "@/lib/data";

export const revalidate = 86400;

const title = "About";
const description = `About ${SITE.name} — CS undergrad at Sahrdaya building AI agents, mobile apps, and low-level C++ projects. IEEE Technical Coordinator, hackathon winner.`;

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
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
  },
  alternates: {
    canonical: `${SITE.url}/about`,
  },
};

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

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/images/midhun-pm.jpg`,
      email: SITE.email,
      jobTitle: SITE.jobTitle,
      description: SITE.description,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: SITE.almaMater,
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      knowsAbout: SKILLS.flatMap((group) => group.items),
      sameAs: [SITE.github, SITE.linkedin],
    },
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
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
            <div className="overflow-hidden rounded-lg border border-border border-l-2 border-l-accent">
              <Image
                src="/images/midhun-pm.jpg"
                alt="Midhun P M — software developer from Kerala"
                width={1200}
                height={1600}
                sizes="(max-width: 768px) 100vw, 300px"
                className="aspect-[4/5] w-full object-cover"
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
        {gh && (
          <section aria-label="GitHub activity">
            <ContributionGraph
              activity={gh.activity}
              size="sm"
              caption="GitHub activity — public events, last 90 days"
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
                      src="/images/midhun-pm-codex-badge.jpg"
                      alt="Midhun P M builder badge from OpenAI Codex Nightline hackathon"
                      width={1200}
                      height={1600}
                      sizes="(max-width: 640px) 112px, 144px"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section aria-label="Timeline">
          <h2 className="mb-8 text-xl font-medium tracking-tight text-foreground sm:text-2xl">
            <span className="mr-3 font-mono text-sm text-muted">04</span>
            The semesters so far
          </h2>
          <ol className="max-w-prose space-y-10 border-l border-border pl-8">
            {TIMELINE.map((entry) => (
              <li key={entry.period} className="relative">
                <span
                  className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-muted"
                  aria-hidden="true"
                />
                <p className="font-mono text-[13px] text-muted">
                  {entry.period}
                </p>
                <h3 className="mt-1.5 font-medium text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {entry.detail}
                </p>
              </li>
            ))}

            {/* Codex Nightline — with photo evidence */}
            <li className="relative">
              <span
                className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-accent"
                aria-hidden="true"
              />
              <p className="font-mono text-[13px] text-muted">
                S4 · Jul 2026
              </p>
              <h3 className="mt-1.5 font-medium text-foreground">
                Top 10 at Codex Nightline
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                Presented MetroMind at the OpenAI Codex Nightline Hackathon
                — the Kochi Metro AI Sprint — and finished Top 10 among 100
                curated builders.
              </p>
              <figure className="mt-4 max-w-[280px] space-y-2">
                <div className="overflow-hidden rounded-lg border border-border">
                  <Image
                    src="/images/midhun-pm-codex-presenting.jpg"
                    alt="Midhun P M presenting at OpenAI Codex Nightline hackathon, Kochi, July 2026"
                    width={1200}
                    height={1600}
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
                  Presenting MetroMind at Codex Nightline, Kochi Metro, July
                  2026
                </figcaption>
              </figure>
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
}
