"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Certifications", href: "#certifications" },
];

export const Navbar = () => {
  const { scrollDirection, isScrolled } = useScrollDirection();
  const activeSection = useActiveSection([
    "about",
    "experience",
    "projects",
    "skills",
    "achievements",
    "certifications",
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform",
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0",
        isScrolled
          ? "bg-[#08090A]/80 backdrop-blur-md border-b border-white/5 py-3 shadow-lg"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Logo */}
        <Link
          href="#"
          className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight flex items-center"
        >
          Midhun<span className="text-[#00DC82] ml-0.5">.PM</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-sm font-sans font-medium transition-colors duration-200 py-1",
                  isActive ? "text-white" : "text-[#52525B] hover:text-[#00DC82]"
                )}
              >
                {isActive && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00DC82]" />
                )}
                {link.name}
              </Link>
            );
          })}
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm font-sans font-medium px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white hover:border-[#00DC82]/40 hover:text-[#00DC82] hover:bg-[#00DC82]/5 transition-all duration-200"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#ECEDEE] hover:text-[#00DC82] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F1110] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#ECEDEE] hover:text-[#00DC82] py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-[#00DC82] py-2"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
};
