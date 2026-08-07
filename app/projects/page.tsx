import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getAllProjects, getProjectCategories } from "@/lib/projects";
import { SITE } from "@/lib/data";

const title = "Projects";
const description =
  "Projects built by Midhun P M — web apps, AI agents, and self-hosted infrastructure, with case studies for each.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: `${title} | ${SITE.name}`,
    description,
    url: `${SITE.url}/projects`,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE.name}`,
    description,
  },
  alternates: {
    canonical: `${SITE.url}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <div className="space-y-14">
        <PageHeader
          eyebrow={title}
          title="Things I've built"
          description="Web apps, AI agents, and infrastructure I run myself. Each project has a full case study — the problem, the build, and what went wrong."
        />
        <ProjectsGrid projects={projects} categories={categories} />
      </div>
    </div>
  );
}
