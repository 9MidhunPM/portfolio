import { PageHeader } from "@/components/PageHeader";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { getAllProjects, getAllTags } from "@/lib/projects";
import { SITE } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const title = "Projects";
const description =
  "Projects built by Midhun P M: AI systems, web and mobile apps, developer tools, and self-hosted infrastructure, each documented as a case study.";

export const metadata = createPageMetadata({ title, description, path: "/projects" });

export default function ProjectsPage() {
  const projects = getAllProjects();
  const tags = getAllTags();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE.name} projects`,
    description,
    url: `${SITE.url}/projects`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${SITE.url}/projects/${project.slug}`,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="space-y-14">
        <PageHeader
          eyebrow={title}
          title="Things I've built"
          description="Web apps, AI agents, and infrastructure I run myself. Each project has a full case study — the problem, the build, and what went wrong."
        />
        <ProjectsGrid projects={projects} tags={tags} />
      </div>
    </div>
  );
}
