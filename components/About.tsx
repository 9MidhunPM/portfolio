"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { SectionHeading } from "@/components/SectionHeading";
import { ABOUT_TERMINAL_TEXT, ABOUT_STATS } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      gsap.from(".about-stat", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: aboutRef }
  );

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-[#08090A] section-glow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <SectionHeading index="01" title="About Me" />

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Terminal Block */}
          <div className="lg:col-span-7 bg-[#0F1110] border border-white/10 rounded-xl p-5 sm:p-6 font-mono text-xs sm:text-sm text-[#ECEDEE] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00DC82]/40 to-transparent" />
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[#52525B]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF4D6D]/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-[#00DC82]/80" />
              </div>
              <span className="text-xs">about.txt — bash</span>
            </div>

            {/* Terminal Content */}
            <pre className="whitespace-pre-wrap font-mono text-[#ECEDEE] leading-relaxed select-text">
              {ABOUT_TERMINAL_TEXT}
            </pre>

            <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#52525B]">
              <span className="text-[#00DC82]">● ONLINE</span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* Right Column: 3 Stat Cards */}
          <div className="about-stats lg:col-span-5 flex flex-col gap-4 justify-between">
            {ABOUT_STATS.map((stat, idx) => (
              <div key={idx} className="about-stat flex-1 flex flex-col">
                <CardSpotlight className="flex-1 flex flex-col justify-center">
                  <div className="font-mono text-xs text-[#00DC82] uppercase tracking-wider mb-1">
                    Metric {idx + 1}
                  </div>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1 text-gradient">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-[#52525B]">
                    {stat.label}
                  </div>
                </CardSpotlight>
              </div>
            ))}
          </div>
        </div>

        {/* Text Reveal Card */}
        <div className="pt-4">
          <TextRevealCard
            text="Hover over this card to reveal an unlisted detail..."
            revealText="I run quantized 8B LLMs on a laptop GPU for fun."
          />
        </div>
      </div>
    </section>
  );
};
