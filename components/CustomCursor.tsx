"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // hide on mobile
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.08 });
      gsap.to(ring.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const expand = () => {
      gsap.to(ring.current, {
        scale: 2.2,
        borderColor: "#00DC82",
        duration: 0.25,
      });
      gsap.to(dot.current, { scale: 0, duration: 0.2 });
    };

    const shrink = () => {
      gsap.to(ring.current, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.35)",
        duration: 0.3,
      });
      gsap.to(dot.current, { scale: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", move);
    const elements = document.querySelectorAll(
      "a, button, .project-card, [data-cursor]"
    );
    elements.forEach((el) => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", expand);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#00DC82] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 border border-white/35 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
