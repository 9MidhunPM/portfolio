"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { LaptopScroll } from "@/components/LaptopScroll";
import { PERSONAL_INFO } from "@/lib/data";
import Link from "next/link";
import { FiArrowDownRight, FiFileText } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Split heading into chars manually (group chars by word so words
      // never break mid-word when the heading wraps)
      const heading = document.querySelector(".hero-heading");
      if (heading) {
        const text = heading.textContent || "";
        const words = text.split(" ");
        heading.innerHTML = words
          .map(
            (word) =>
              `<span class="hero-word" style="display:inline-block;white-space:nowrap">${word
                .split("")
                .map(
                  (char) =>
                    `<span class="hero-char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${char}</span></span>`
                )
                .join("")}</span>`
          )
          .join('<span style="display:inline-block">&nbsp;</span>');

        tl.from(".hero-char > span", {
          y: "110%",
          duration: 0.7,
          stagger: 0.025,
          delay: 0.2,
        });
      }

      tl.fromTo(".hero-badge", { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1)
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.6)
        .fromTo(".hero-typewriter", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.85)
        .fromTo(
          ".hero-ctas > *",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          1.0
        )
        .fromTo(".hero-scroll-hint", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.4);
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen pt-28 pb-16 flex flex-col items-center justify-between overflow-hidden bg-[#08090A]"
    >
      {/* Background Beams */}
      <BackgroundBeams className="opacity-25" />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6 mt-4 sm:mt-8">
        {/* Open to internships badge */}
        <div className="hero-badge">
          <HoverBorderGradient
            as="div"
            className="text-xs sm:text-sm font-mono tracking-wide text-[#00DC82] flex items-center gap-2 cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-[#00DC82] animate-pulse" />
            ⚡ Open to internships
          </HoverBorderGradient>
        </div>

        {/* Main Heading */}
        <h1 className="hero-heading font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl py-1">
          {PERSONAL_INFO.title}
        </h1>

        {/* Subheading */}
        <p className="hero-sub font-mono text-sm sm:text-base md:text-lg text-[#52525B] max-w-2xl">
          {PERSONAL_INFO.subheading}
        </p>

        {/* Typewriter effect roles */}
        <div className="hero-typewriter text-base sm:text-lg font-mono text-[#00DC82] h-8 flex items-center justify-center">
          <span className="text-[#52525B] mr-2">&gt;</span>
          <TypewriterEffect words={PERSONAL_INFO.roles} />
        </div>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center gap-4 mt-4">
          <Link href="#projects">
            <ShimmerButton className="text-sm font-mono tracking-wide flex items-center gap-2">
              View my work
              <FiArrowDownRight className="w-4 h-4 text-[#00DC82]" />
            </ShimmerButton>
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/10 bg-[#0F1110] text-[#ECEDEE] hover:text-[#00DC82] hover:border-[#00DC82]/40 hover:bg-[#00DC82]/5 transition duration-300 font-mono text-sm flex items-center gap-2"
          >
            <FiFileText className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        {/* Hero Scroll hint */}
        <p className="hero-scroll-hint text-xs font-mono text-[#52525B] mt-6 animate-pulse">
          Scroll to explore ↓
        </p>
      </div>

      {/* Laptop Scroll preview */}
      <div className="relative z-10 w-full mt-12 sm:mt-16">
        <LaptopScroll src="/macbook-screen.png" />
      </div>
    </section>
  );
};
