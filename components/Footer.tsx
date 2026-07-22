"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL_INFO } from "@/lib/data";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 95%",
        onEnter: () => {
          gsap.fromTo(
            ".footer-content > *",
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              force3D: true,
            }
          );
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#08090A] border-t border-white/5 py-10 mt-12 relative z-20 section-glow"
    >
      <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Logo */}
        <Link
          href="#"
          className="font-display font-bold text-xl text-white tracking-tight flex items-center hover:text-[#00DC82] transition-colors duration-200"
        >
          Midhun<span className="text-[#00DC82] ml-0.5">.PM</span>
        </Link>

        {/* Center Icons */}
        <div className="flex items-center gap-6">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#52525B] hover:text-[#00DC82] transition duration-200 p-2"
            aria-label="GitHub Profile"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#52525B] hover:text-[#00DC82] transition duration-200 p-2"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-[#52525B] hover:text-[#00DC82] transition duration-200 p-2"
            aria-label="Send Email"
          >
            <FiMail size={20} />
          </a>
        </div>

        {/* Right Tagline + back to top */}
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs text-[#52525B] text-center md:text-right">
            &quot;Built from source. Deployed from terminal.&quot;
          </p>
          <a
            href="#"
            aria-label="Back to top"
            className="text-[#52525B] hover:text-[#00DC82] transition duration-200 p-2 rounded-full border border-white/10 hover:border-[#00DC82]/40 hover:bg-[#00DC82]/5"
          >
            <FiArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
