"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { SectionHeading } from "@/components/SectionHeading";
import { PROJECTS } from "@/lib/data";
import { FiGithub, FiExternalLink } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        scale: 0.96,
        duration: 0.65,
        stagger: { amount: 0.5, from: "start" },
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: projectsRef }
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / 18;
    const y = (e.clientY - r.top - r.height / 2) / 18;
    gsap.to(e.currentTarget, {
      rotateX: -y,
      rotateY: x,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-[#08090A] section-glow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <SectionHeading index="03" title="Featured Projects" />

        {/* 3-Column Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card will-change-transform"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <CardSpotlight className="flex flex-col justify-between h-full bg-[#0F1110] border border-white/10 rounded-xl p-6 hover:border-[#00DC82]/40 transition duration-300 relative overflow-hidden">
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00DC82]/40 to-transparent opacity-0 group-hover/spotlight:opacity-100 transition-opacity duration-300" />
                <div className="space-y-4">
                  {/* Header & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-white group-hover/spotlight:text-[#00DC82] transition-colors">
                      {project.name}
                    </h3>

                    {project.badge && (
                      <span
                        className={`font-mono text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${
                          project.isCoralBadge
                            ? "bg-[#FF4D6D]/10 text-[#FF4D6D] border-[#FF4D6D]/30 font-semibold"
                            : "bg-white/5 text-[#ECEDEE] border-white/10"
                        }`}
                      >
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="font-sans text-sm text-[#52525B] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-xs px-2 py-0.5 rounded bg-[#00DC82]/10 text-[#00DC82]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#52525B] hover:text-[#00DC82] transition-colors flex items-center gap-1.5 font-mono text-xs"
                      aria-label={`GitHub repo for ${project.name}`}
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Source</span>
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#52525B] hover:text-[#00DC82] transition-colors flex items-center gap-1.5 font-mono text-xs"
                      aria-label={`Live site for ${project.name}`}
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </CardSpotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
