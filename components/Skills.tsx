"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/SectionHeading";
import { SKILLS_CATEGORIES } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      const pills = gsap.utils.toArray<HTMLElement>(".skill-pill");

      pills.forEach((pill, i) => {
        gsap.from(pill, {
          opacity: 0,
          y: 20,
          scale: 0.85,
          duration: 0.4,
          delay: i * 0.03,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: pill,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: skillsRef }
  );

  return (
    <section id="skills" ref={skillsRef} className="py-20 bg-[#08090A] section-glow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <SectionHeading index="04" title="Technical Toolkit" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS_CATEGORIES.map((group) => (
            <div
              key={group.category}
              className="bg-[#0F1110] border border-white/10 p-6 rounded-xl space-y-4 hover:border-[#00DC82]/30 transition duration-300 shadow-xl relative overflow-hidden"
            >
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00DC82]/40 to-transparent" />
              <h3 className="font-display uppercase text-sm tracking-wider text-white font-bold border-b border-white/5 pb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82]" />
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="skill-pill font-mono text-xs px-3 py-1.5 rounded-md bg-[#08090A] text-[#ECEDEE] border border-white/10 hover:border-[#00DC82]/50 hover:text-[#00DC82] hover:bg-[#00DC82]/5 transition duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
