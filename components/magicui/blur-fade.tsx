"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: Variants;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = true,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const defaultVariants: Variants = {
    hidden: {
      y: direction === "down" ? -offset : direction === "up" ? offset : 0,
      x: direction === "right" ? -offset : direction === "left" ? offset : 0,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        whileInView={inView ? "visible" : undefined}
        animate={!inView ? "visible" : undefined}
        viewport={{ once: true, margin: inViewMargin as any }}
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
