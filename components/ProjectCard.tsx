import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col justify-between rounded-lg border border-border p-6 transition-colors duration-200 hover:border-muted has-[a:focus-visible]:border-muted">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-medium text-foreground">
            {/*
              Stretched link so the whole card is clickable, matching the
              card-wide hover state. The external links below sit above this
              overlay via relative z-10.
            */}
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <div className="relative z-10 flex shrink-0 items-center gap-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
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
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
              >
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
