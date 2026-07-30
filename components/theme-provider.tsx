"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {/*
        reducedMotion="user" makes every Framer Motion component in the tree
        skip transform/layout animations when the OS asks for reduced motion,
        while still allowing opacity fades. CSS-driven animations are handled
        separately with Tailwind's motion-reduce: variant.
      */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
