import Link from "next/link";
import { SITE } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const title = "Now";
const description =
  "Midhun P M's October 2026 update: NightWatch's Calicut hackathon second prize, Thursday's desktop copilot, Syncplane, and practical AI systems.";

export const metadata = createPageMetadata({ title, description, path: "/now" });

export default function NowPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-prose space-y-16">
        <header className="space-y-4">
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
            <span className="mb-4 block font-mono text-[13px] font-normal text-muted">
              {SITE.name} — {title}
            </span>
            What I&apos;m up to now
          </h1>
          <p className="font-serif text-sm italic text-muted">
            Last updated: October 2026
          </p>
        </header>

        <section aria-label="Currently working on" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Working on
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              Semester five of my B.Tech in CSE at Sahrdaya. NightWatch won
              second prize at the Codex Community Hackathon in Calicut in
              September: 3 months of ChatGPT Pro and $500 in OpenAI API credits.{" "}
              <Link
                href="/projects/nightwatch"
                className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
              >
                Read the NightWatch case study.
              </Link>
            </p>
            <p>
              Thursday now has native Hypruse desktop controls, screenshot
              understanding, task checkpoints, and personal-memory review.
              Its desktop profile uses GPT-6 Luna through the Responses API;
              local llama.cpp remains configurable. I took an earlier build
              to the Bengaluru Codex Community Hackathon in August.
            </p>
            <p>
              PRISM and Probe Interview taught me to keep AI decisions tied
              to evidence. I carry that lesson into my projects and my work
              as IEEE student branch Technical Coordinator.
            </p>
          </div>
        </section>

        <section aria-label="Currently learning" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Learning
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              AI systems beyond the happy path — local and cloud model
              trade-offs, typed outputs, and where a model should stop and
              deterministic code should take over. PRISM and Probe Interview
              have made that boundary impossible to ignore.
            </p>
            <p>
              Rust, because Syncplane is teaching me what safe configuration tools
              owe their users. And systems programming in C++, because
              Calculus Dash showed me how much I still do not know.
            </p>
          </div>
        </section>

        <section aria-label="Reading and watching" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Reading &amp; watching
          </h2>
          <p className="text-base leading-relaxed text-muted">
            The pile is real but I haven&apos;t written it down yet —
            updating this section soon.
          </p>
        </section>

        <p className="border-t border-border pt-8 font-mono text-[11px] leading-relaxed text-muted">
          This is a /now page — a snapshot of what has my attention right
          now. Inspired by nownownow.com.
        </p>
      </div>
    </div>
  );
}
