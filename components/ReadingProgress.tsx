"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const scaleX = prefersReducedMotion ? scrollYProgress : springScaleX;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
