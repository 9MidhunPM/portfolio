"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/SectionHeading";
import { ACHIEVEMENTS } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Achievements = () => {
  const achievementsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      gsap.fromTo(
        ".achievement-item",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".achievements-list",
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: achievementsRef }
  );

  return (
    <section
      id="achievements"
      ref={achievementsRef}
      className="py-20 bg-[#08090A] section-glow"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <SectionHeading index="05" title="Key Achievements" />

        {/* Numbered List - Ranked aesthetic */}
        <div className="achievements-list divide-y divide-white/5 border-t border-b border-white/5">
          {ACHIEVEMENTS.map((item) => (
            <div
              key={item.id}
              className="achievement-item py-5 sm:py-6 flex items-baseline gap-6 group hover:bg-[#0F1110]/60 px-3 sm:px-4 rounded-lg transition duration-200"
            >
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#00DC82] group-hover:scale-110 transition-transform duration-200 select-none">
                {item.id}
              </span>
              <p className="font-sans text-base sm:text-lg text-white font-medium group-hover:text-[#00DC82] transition-colors duration-200">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
