import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import { getAllProjects } from "@/lib/projects";
import { getGitHubStats } from "@/lib/github";
import { SITE } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: `${SITE.name} — Software Developer`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — Software Developer`,
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
    title: `${SITE.name} — Software Developer`,
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

  const stats: { value: string; label: string }[] = [
    { value: "9.70", label: "CGPA, B.Tech CSE" },
    { value: "737+", label: "bets on WC Predict '26" },
    { value: "1000+", label: "weekly users on the IEEE site" },
    { value: "Top 10", label: "of 100, Codex Nightline" },
    ...(gh ? [{ value: String(gh.publicRepos), label: "public GitHub repos" }] : []),
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    image: `${SITE.url}/images/midhun-pm.jpg`,
    url: SITE.url,
    email: SITE.email,
    jobTitle: "Software Developer",
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

        {/* By the numbers */}
        <section
          className="border-y border-border py-14 sm:py-16"
          aria-label="By the numbers"
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="stat-number font-serif text-4xl tracking-tight sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent posts — only when real posts exist */}
        {recentPosts.length > 0 && (
          <section className="py-16 sm:py-20" aria-label="Recent blog posts">
            <div className="space-y-8">
              <SectionHeading
                index="02"
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
