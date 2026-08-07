import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import codexPhoto from "@/public/images/midhun-pm-codex-presenting.jpg";
import { Hero } from "@/components/Hero";
import { GitHubProfile } from "@/components/GitHubProfile";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import { getAllProjects } from "@/lib/projects";
import { getGitHubStats } from "@/lib/github";
import { SITE } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Full-Stack Developer & AI Systems Builder",
  description: SITE.description,
  openGraph: {
    title: `Full-Stack Developer & AI Systems Builder | ${SITE.name}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE.url}/images/midhun-pm.jpg`,
        width: 1200,
        height: 630,
        alt: "Midhun P M — Software Developer from Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Full-Stack Developer & AI Systems Builder | ${SITE.name}`,
    description: SITE.description,
    images: [`${SITE.url}/images/midhun-pm.jpg`],
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default async function HomePage() {
  const featuredProjects = getAllProjects()
    .filter((p) => p.featured)
    .slice(0, 3);
  const recentPosts = getAllPosts().slice(0, 2);
  const gh = await getGitHubStats();

  const proofPoints: { value: string; label: string; href: string }[] = [
    {
      value: "Top 10 / 100",
      label: "MetroMind at OpenAI Codex Nightline",
      href: "/projects/metromind",
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
    ...(gh
      ? [
          {
            value: String(gh.publicRepos),
            label: "public repositories on GitHub",
            href: SITE.github,
          },
        ]
      : []),
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    image: `${SITE.url}/images/midhun-pm.jpg`,
    url: SITE.url,
    email: SITE.email,
    jobTitle: "Full-Stack Developer and AI Systems Builder",
    alumniOf: "Sahrdaya College of Engineering and Technology",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    sameAs: [SITE.github, SITE.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="mx-auto max-w-content px-5 sm:px-8">
        {/* Hero */}
        <section className="py-24 sm:py-32 lg:py-40" aria-label="Introduction">
          <Hero />
        </section>

        {/* Featured projects */}
        <section className="py-16 sm:py-20" aria-label="Featured projects">
          <div className="space-y-8">
            <SectionHeading
              index="01"
              title="Selected work"
              linkHref="/projects"
              linkLabel="All projects"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Recognition and project evidence */}
        <section
          className="border-y border-border py-16 sm:py-20"
          aria-labelledby="recognition-heading"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-start">
            <div className="max-w-2xl space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Recognition
              </p>
              <h2
                id="recognition-heading"
                className="font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl"
              >
                Built on a moving metro.{" "}
                <span className="italic text-muted">
                  Finished in the Top 10.
                </span>
              </h2>
              <p className="max-w-prose text-base leading-relaxed text-muted">
                I built MetroMind during OpenAI Codex Nightline, a build sprint
                inside a moving Kochi Metro train. The WhatsApp agent plans
                routes, finds nearby stations, and handles ticket-booking
                flows. It finished in the Top 10 out of 100 builders.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs">
                <Link
                  href="/projects/metromind"
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  Read the MetroMind case study
                </Link>
                <a
                  href="https://github.com/9MidhunPM/MetroMind"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
                >
                  View the source on GitHub
                </a>
              </div>
            </div>

            <figure className="space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border border-l-2 border-l-accent">
                <Image
                  src={codexPhoto}
                  alt="Midhun P M presenting MetroMind at OpenAI Codex Nightline in Kochi"
                  fill
                  sizes="(min-width: 1024px) 448px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  className="object-cover object-[center_60%]"
                  placeholder="blur"
                  loading="lazy"
                />
              </div>
              <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
                OpenAI Codex Nightline · Top 10 of 100 builders · Kochi, July
                2026
              </figcaption>
            </figure>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => {
              const content = (
                <>
                  <p className="stat-number font-serif text-3xl tracking-tight">
                    {point.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {point.label}
                  </p>
                </>
              );

              return point.href.startsWith("http") ? (
                <a
                  key={point.label}
                  href={point.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background p-5 transition-colors hover:bg-surface"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={point.label}
                  href={point.href}
                  className="bg-background p-5 transition-colors hover:bg-surface"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        {gh && (
          <section className="py-16 sm:py-20" aria-label="Live GitHub profile">
            <div className="space-y-8">
              <SectionHeading index="02" title="Open source, live" />
              <GitHubProfile stats={gh} compact />
            </div>
          </section>
        )}

        {/* Recent posts — only when real posts exist */}
        {recentPosts.length > 0 && (
          <section className="py-16 sm:py-20" aria-label="Recent blog posts">
            <div className="space-y-8">
              <SectionHeading
                index="03"
                title="Writing"
                linkHref="/blog"
                linkLabel="All posts"
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[calc(66.666%-0.5rem)]">
                {recentPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section
          className="border-t border-border py-20 sm:py-24"
          aria-label="Contact"
        >
          <div className="max-w-2xl space-y-6">
            <p className="font-serif text-3xl leading-snug tracking-tight text-foreground sm:text-4xl">
              Have a project in mind, or just want to say hi?
            </p>
            <p className="max-w-prose text-base leading-relaxed text-muted">
              My inbox is always open. I read everything, and I usually reply
              within a day.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-muted"
            >
              Get in touch
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
