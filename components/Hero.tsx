import Image from "next/image";
import Link from "next/link";
import portrait from "@/public/images/midhun-pm.jpg";
import { SITE } from "@/lib/data";

export function Hero() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
      <div className="space-y-7">
        <p className="animate-fade-up flex items-center gap-2.5 font-mono text-[13px] text-muted">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          {SITE.role}
        </p>

        <h1 className="animate-fade-up max-w-4xl font-serif text-5xl leading-[1.08] tracking-tight text-foreground [animation-delay:100ms] sm:text-6xl lg:text-7xl">
          I&apos;m {SITE.name},{" "}
          <span className="italic text-muted">
            a full-stack developer building AI agents.
          </span>
        </h1>

        <p className="animate-fade-up max-w-2xl text-base leading-relaxed text-muted [animation-delay:200ms] sm:text-lg">
          {SITE.bio}
        </p>

        <div className="animate-fade-up flex flex-wrap gap-3 [animation-delay:250ms]">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center rounded-md border border-foreground bg-foreground px-4 py-2 font-mono text-sm text-background transition-opacity hover:opacity-85"
          >
            View selected work
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-muted"
          >
            Contact me
          </Link>
          <Link
            href="/resume"
            className="inline-flex min-h-11 items-center px-2 py-2 font-mono text-sm text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
          >
            Résumé
          </Link>
        </div>
      </div>

      <figure className="animate-fade-up w-36 [animation-delay:300ms] sm:w-44 lg:w-64 xl:w-72">
        <div className="rotate-2 rounded-xl border border-accent/50 p-1.5 transition-transform duration-300 hover:rotate-1">
          <div className="rounded-lg border border-border bg-surface p-2 pb-1 shadow-lg">
            <Image
              src={portrait}
              alt="Midhun P M, full-stack developer and AI systems builder from Kerala"
              sizes="(min-width: 1280px) 288px, 256px"
              className="aspect-[3/4] w-full rounded-md object-cover"
              placeholder="blur"
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
      </figure>
    </div>
  );
}
