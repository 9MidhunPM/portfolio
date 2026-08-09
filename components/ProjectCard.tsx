import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border border-border p-6 transition-colors duration-200 hover:border-muted">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-medium text-foreground">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors group-hover:text-foreground"
            >
              {project.title}
            </Link>
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
              >
                <span className="sr-only">
                  View {project.title} source on GitHub
                </span>
                <GithubIcon width={16} height={16} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
              >
                <span className="sr-only">Visit the {project.title} live site</span>
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>
      </div>
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
