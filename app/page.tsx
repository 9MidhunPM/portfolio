import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import codexBengaluru from "@/public/images/midhun-pm-codex-bangalore.jpeg";
import { Hero } from "@/components/Hero";
import { GitHubProfile } from "@/components/GitHubProfile";
import { SectionHeading } from "@/components/SectionHeading";
import { ShareButtons } from "@/components/ShareButtons";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import { getAllProjects } from "@/lib/projects";
import { getGitHubStats } from "@/lib/github";
import { HOME_APPROACH, SITE } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import { getSocialImages } from "@/lib/seo";

export const revalidate = 3600;

const socialImages = getSocialImages();

export const metadata: Metadata = {
  title: "Midhun P M - Software Developer",
  description: SITE.description,
  openGraph: {
    title: "Midhun P M - Software Developer",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: socialImages,
  },
  twitter: {
    card: "summary_large_image",
    title: "Midhun P M - Software Developer",
    description: SITE.description,
    images: socialImages.map((image) => image.url),
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default async function HomePage() {
  const featuredProjects = getAllProjects()
    .filter((p) => p.featured)
    .slice(0, 3);
  const recentPosts = getAllPosts().slice(0, 3);
  const gh = await getGitHubStats();

  const proofPoints: { value: string; label: string; href: string }[] = [
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
    knowsAbout: ["AI systems", "Full-stack development", "Python", "Rust", "Next.js", "FastAPI"],
    award: [
      "Second Place — AI Innovation Hackathon 2026, ASIET",
      "Selected participant — OpenAI Codex Community Hackathon, Bengaluru",
      "Top 10 Finalist — OpenAI Codex Nightline Hackathon 2026",
    ],
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
            <nav
              aria-label="More project case studies"
              className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs"
            >
              <Link
                className="text-muted underline decoration-border underline-offset-4 hover:text-foreground"
                href="/projects/mcpd"
              >
                Read the Syncplane case study
              </Link>
              <Link
                className="text-muted underline decoration-border underline-offset-4 hover:text-foreground"
                href="/projects/probe-interview"
              >
                Read the Probe Interview case study
              </Link>
              <Link
                className="text-muted underline decoration-border underline-offset-4 hover:text-foreground"
                href="/projects/ani-reminder"
              >
                Read the AniReminder case study
              </Link>
            </nav>
          </div>
        </section>

        {/* Recent recognition */}
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
                Selected to build in Bengaluru.{" "}
                <span className="italic text-muted">
                  Kept shipping after the room cleared.
                </span>
              </h2>
              <p className="max-w-prose text-base leading-relaxed text-muted">
                I took Thursday to the OpenAI Codex Community Hackathon in
                Bengaluru after selection from nearly 2,000 applications into
                around 60 seats. It was a chance to put a local-first desktop
                assistant in front of other builders, trade ideas, and keep
                improving the parts that make an agent trustworthy on a real
                computer.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs">
                <Link
                  href="/projects/thursday"
                  className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
                >
                  Read the Thursday case study
                </Link>
                <Link
                  href="/blog/taking-thursday-to-openai-codex-community-hackathon-bengaluru"
                  className="text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
                >
                  Read the Bengaluru build note
                </Link>
              </div>
            </div>

            <figure className="space-y-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border border-l-2 border-l-accent">
                <Image
                  src={codexBengaluru}
                  alt="Midhun P M at the OpenAI Codex Community Hackathon in Bengaluru"
                  fill
                  sizes="(min-width: 1024px) 448px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
                  className="object-cover object-[center_45%]"
                  placeholder="blur"
                  loading="lazy"
                />
              </div>
              <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
                OpenAI Codex Community Hackathon · Bengaluru · August 2026
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

        <section
          className="border-t border-border py-16 sm:py-20"
          aria-labelledby="approach-heading"
        >
          <div className="max-w-2xl space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {HOME_APPROACH.eyebrow}
            </p>
            <h2
              id="approach-heading"
              className="font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl"
            >
              {HOME_APPROACH.title}
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted">
              {HOME_APPROACH.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="flex items-center gap-3 pt-2">
              <span className="font-mono text-xs text-muted">Share this site</span>
              <ShareButtons
                url={SITE.url}
                title="Midhun P M - Full-Stack Developer and AI Systems Builder"
                ariaLabel="Share Midhun P M's portfolio"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
