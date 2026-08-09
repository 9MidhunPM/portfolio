import Image from "next/image";
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
          {SITE.name} - Software Developer
        </h1>

        <p className="animate-fade-up max-w-2xl text-base leading-relaxed text-muted [animation-delay:200ms] sm:text-lg">
          {SITE.bio}
        </p>
      </div>

      <figure className="animate-fade-up hidden w-64 [animation-delay:250ms] lg:block xl:w-72">
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
