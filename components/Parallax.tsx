"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@/hooks/useWindowSize";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Parallax({
  children,
  speed = 1,
  id = "parallax",
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  id?: string;
  className?: string;
}) {
  const trigger = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const y = width * speed * 0.08;
      const setY = gsap.quickSetter(target.current, "y", "px");

      gsap.timeline({
        scrollTrigger: {
          id,
          trigger: trigger.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (e) => setY(e.progress * y),
        },
      });
    },
    { scope: trigger, dependencies: [id, speed, width] }
  );

  return (
    <div ref={trigger} className={className}>
      <div ref={target}>{children}</div>
    </div>
  );
}
