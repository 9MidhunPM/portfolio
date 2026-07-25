"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { SITE } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function Hero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]"
    >
      <div className="space-y-7">
        <motion.p
          variants={item}
          className="flex items-center gap-2.5 font-mono text-[13px] text-muted"
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          {SITE.role}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-3xl font-serif text-5xl leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          I&apos;m {SITE.name}.<br />
          <span className="italic text-muted">I build things for the web.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-prose text-base leading-relaxed text-muted"
        >
          {SITE.bio}
        </motion.p>
      </div>

      <motion.figure
        variants={item}
        className="hidden w-64 lg:block xl:w-72"
        aria-hidden="false"
      >
        <div className="rotate-2 rounded-xl border border-accent/50 p-1.5 transition-transform duration-300 hover:rotate-1">
          <div className="rounded-lg border border-border bg-surface p-2 pb-1 shadow-lg">
            <Image
              src="/images/midhun-pm.jpg"
              alt="Midhun P M — software developer from Kerala"
              width={1200}
              height={1600}
              sizes="(max-width: 1280px) 256px, 288px"
              className="aspect-[3/4] w-full rounded-md object-cover"
              priority
            />
            <figcaption className="flex items-center justify-center gap-1.5 py-2.5 font-mono text-[10px] text-muted">
              <span
                className="inline-block h-1 w-1 rounded-full bg-accent"
                aria-hidden="true"
              />
              midhun, kochi
            </figcaption>
          </div>
        </div>
      </motion.figure>
    </motion.div>
  );
}
