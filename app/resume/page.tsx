import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { getAllProjects } from "@/lib/projects";
import { SITE } from "@/lib/data";

const title = "Résumé";
const description =
  "Résumé for Midhun P M — full-stack developer and AI systems builder, B.Tech CSE class of 2028, open to internships.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/resume`,
    siteName: SITE.name,
    locale: "en_US",
    type: "profile",
    images: [SITE.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
    images: [SITE.ogImage],
  },
  alternates: { canonical: `${SITE.url}/resume` },
};

export default function ResumePage() {
  const projects = getAllProjects().filter((project) => project.featured);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24 print:max-w-none print:p-0">
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground print:hidden"
      >
        <ArrowLeft size={14} aria-hidden="true" /> Home
      </Link>

      <article className="space-y-12">
        <header className="border-b border-border pb-8">
          <h1 className="text-4xl font-medium tracking-tight text-foreground">
            Midhun P M
          </h1>
          <p className="mt-3 text-lg text-muted">
            Full-stack developer and AI systems builder
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted">
            <span>Kerala, India</span>
            <a href={`mailto:${SITE.email}`} className="text-foreground underline">
              {SITE.email}
            </a>
            <a href={SITE.github} className="text-foreground underline">
              GitHub
            </a>
            <a href={SITE.linkedin} className="text-foreground underline">
              LinkedIn
            </a>
          </div>
        </header>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Education</h2>
          <div className="mt-4 flex justify-between gap-6">
            <div>
              <h3 className="font-medium text-foreground">B.Tech Computer Science and Engineering</h3>
              <p className="mt-1 text-sm text-muted">Sahrdaya College of Engineering and Technology · CGPA 9.70</p>
            </div>
            <p className="shrink-0 font-mono text-xs text-muted">Class of 2028</p>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Experience</h2>
          <div className="mt-4 space-y-7">
            <div>
              <div className="flex justify-between gap-6">
                <h3 className="font-medium text-foreground">Technical Coordinator · IEEE Sahrdaya</h3>
                <p className="shrink-0 font-mono text-xs text-muted">2026–Present</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">Ship production features for 1,000+ weekly users and built WC Predict ’26, where 58+ players placed 737+ bets.</p>
            </div>
            <div>
              <div className="flex justify-between gap-6">
                <h3 className="font-medium text-foreground">Frontend Developer Intern · Narrowlabs</h3>
                <p className="shrink-0 font-mono text-xs text-muted">Jun–Aug 2025</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">Built responsive login and dashboard interfaces for recruiter and applicant workflows in a production job portal.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Selected projects</h2>
          <div className="mt-4 space-y-6">
            {projects.map((project) => (
              <div key={project.slug}>
                <div className="flex justify-between gap-6">
                  <h3 className="font-medium text-foreground">{project.title}</h3>
                  <p className="shrink-0 font-mono text-xs text-muted">{project.role}</p>
                </div>
                <p className="mt-1 text-sm text-foreground">{project.outcome}</p>
                <p className="mt-1 font-mono text-xs text-muted">{project.tech.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-wider text-muted">Technical focus</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Next.js, React, Python, FastAPI, Docker, n8n, LangChain, Flutter,
            React Native, C++, LLaMA.cpp, Vulkan, PostgreSQL, and self-hosted infrastructure.
          </p>
        </section>

        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border px-4 py-2.5 font-mono text-sm text-foreground print:hidden"
        >
          <Mail size={15} aria-hidden="true" /> Contact me
        </Link>
      </article>
    </div>
  );
}
