import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/render";
import { getAllProjects, getProject } from "@/lib/projects";

export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);

  if (!project) {
    return renderOgImage({ eyebrow: "Case study", title: "Project not found" });
  }

  return renderOgImage({
    eyebrow: project.award ? `Case study · ${project.award}` : "Case study",
    title: project.title,
    meta: project.tech.slice(0, 3).join(" · "),
  });
}
