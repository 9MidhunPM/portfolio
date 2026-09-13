import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MDXContent } from "@/components/MDXContent";
import { GithubIcon } from "@/components/icons";
import { getAllProjects, getProject } from "@/lib/projects";
import { SITE } from "@/lib/data";
import { getImageObject, getSocialImages } from "@/lib/seo";
import codexBadge from "@/public/images/midhun-pm-codex-badge.jpg";
import codexPresenting from "@/public/images/midhun-pm-codex-presenting.jpg";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const url = `${SITE.url}/projects/${project.slug}`;
  const images = getSocialImages(project.image);
  const pageTitle = `${project.title} | ${SITE.name}`;

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: pageTitle,
      description: project.description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: project.description,
      images: images.map((image) => image.url),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    softwareVersion: "1.0.0",
    url: project.live ?? `${SITE.url}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    ...(project.github ? { codeRepository: project.github } : {}),
    ...(project.award ? { award: project.award } : {}),
    ...(project.image ? { image: getImageObject(project.image) } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE.url}/projects`,
      },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-prose">
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          All projects
        </Link>

        <header className="space-y-6">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <span className="mb-4 block font-mono text-[13px] font-normal text-muted">
              {SITE.name} — Case study
            </span>
            {project.title}
          </h1>

          {(project.github || project.live) && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-foreground"
                >
                  <GithubIcon width={14} height={14} />
                  Explore {project.title} on GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted transition-colors hover:text-foreground"
                >
                  <ArrowUpRight size={14} />
                  Open the {project.title} site
                </a>
              )}
            </div>
          )}

          <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.award && (
            <p className="font-mono text-[12px] leading-relaxed text-foreground">
              {project.award}
            </p>
          )}
        </header>

        {project.image && (
          <figure className="mt-10 space-y-3">
            <div className="overflow-hidden rounded-lg border border-border border-l-2 border-l-accent">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 768px) calc(100vw - 2.5rem), 680px"
                className="h-auto w-full"
              />
            </div>
            {project.slug === "prism" && (
              <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
                PRISM at the AI Innovation Hackathon · ASIET · August 2026
              </figcaption>
            )}
          </figure>
        )}

        <div className="mt-12">
          <MDXContent source={project.content} />
        </div>

        {project.slug === "metromind" && (
          <section
            aria-label="Recognition"
            className="mt-16 border-t border-border pt-12"
          >
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              Recognition
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              MetroMind was built during OpenAI Codex Nightline — the
              world&apos;s first AI build sprint inside a moving metro
              system. We placed Top 10 out of 100 curated builders.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-lg border border-border">
                  <Image
                    src={codexPresenting}
                    alt="Midhun P M presenting at OpenAI Codex Nightline hackathon, Kochi, July 2026"
                    sizes="(max-width: 640px) calc(100vw - 2.5rem), 320px"
                    className="h-auto w-full"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
                  Presenting MetroMind on stage, Kochi Metro, July 2026
                </figcaption>
              </figure>
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-lg border border-border">
                  <Image
                    src={codexBadge}
                    alt="Midhun P M builder badge from OpenAI Codex Nightline hackathon"
                    sizes="(max-width: 640px) calc(100vw - 2.5rem), 320px"
                    className="h-auto w-full"
                    placeholder="blur"
                  />
                </div>
                <figcaption className="font-mono text-[11px] leading-relaxed text-muted">
                  Builder badge — OpenAI Build Week Community Hackathon,
                  Codex Nightline
                </figcaption>
              </figure>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
