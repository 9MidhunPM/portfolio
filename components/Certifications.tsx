"use client";

import React from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { CERTIFICATIONS } from "@/lib/data";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Certifications = () => {
  const containerRef = useScrollReveal({ y: 40, stagger: 0.1 });

  return (
    <section id="certifications" className="py-20 bg-[#08090A] section-glow">
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        {/* Section Heading */}
        <SectionHeading index="06" title="Certifications & Training" reveal />

        {/* Minimal Terminal Table Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              data-reveal
              className="bg-[#0F1110] border border-white/10 p-5 rounded-lg flex flex-col justify-between space-y-4 hover:border-[#00DC82]/40 hover:bg-[#00DC82]/5 transition duration-300 relative overflow-hidden group"
            >
              <div className="absolute -top-px left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#00DC82]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="space-y-1">
                <h3 className="font-mono text-sm font-semibold text-white">
                  {cert.name}
                </h3>
                <p className="font-mono text-xs text-[#52525B]">
                  {cert.issuer}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 font-mono text-xs text-[#ECEDEE] flex items-center justify-between">
                <span className="text-[#52525B]">Grade:</span>
                <span className="text-[#00DC82]">{cert.grade || "Completed"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
