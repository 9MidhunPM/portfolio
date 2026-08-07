import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-lg border border-border p-6 transition-colors duration-200 hover:border-muted">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-muted">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
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
                className="flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <GithubIcon width={16} height={16} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface hover:text-foreground"
              >
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <p className="border-t border-border pt-3 text-sm leading-relaxed text-foreground">
          {project.outcome}
        </p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <span>{project.role}</span>
          <span>{new Date(project.updated).getUTCFullYear()}</span>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.slice(0, 5).map((tech) => (
            <li
              key={tech}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex min-h-11 items-center gap-2 font-mono text-xs text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
        >
          Read case study
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
