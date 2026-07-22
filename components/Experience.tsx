"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { SectionHeading } from "@/components/SectionHeading";
import { EXPERIENCES } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      gsap.fromTo(
        ".timeline-entry",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
          },
        }
      );
    },
    { scope: timelineRef }
  );

  const timelineData: TimelineEntry[] = EXPERIENCES.map((exp) => ({
    title: exp.period,
    content: (
      <div className="timeline-entry bg-[#0F1110] border border-white/10 p-6 rounded-xl space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00DC82]/40 to-transparent" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
          <h4 className="font-display text-xl font-bold text-white">
            {exp.title}
          </h4>
          <span className="font-mono text-sm text-[#00DC82]">
            @ {exp.company}
          </span>
        </div>
        <ul className="space-y-2 font-sans text-sm text-[#ECEDEE] list-disc list-inside marker:text-[#00DC82]">
          {exp.points.map((pt, idx) => (
            <li key={idx} className="leading-relaxed">
              {pt}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section id="experience" ref={timelineRef} className="py-20 bg-[#08090A] section-glow">
      <div className="timeline-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <SectionHeading index="02" title="Work & Experience" />

        {/* Aceternity Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};
