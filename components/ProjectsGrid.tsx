"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types";

export function ProjectsGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Project["category"][];
}) {
  const [activeCategory, setActiveCategory] = useState<Project["category"] | null>(null);

  const visible = activeCategory
    ? projects.filter((project) => project.category === activeCategory)
    : projects;

  return (
    <div className="space-y-8">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        <FilterButton
          label="All"
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        />
        {categories.map((category) => (
          <FilterButton
            key={category}
            label={category}
            active={activeCategory === category}
            onClick={() =>
              setActiveCategory(activeCategory === category ? null : category)
            }
          />
        ))}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
        active
          ? "border-accent text-foreground"
          : "border-border text-muted hover:border-muted hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
