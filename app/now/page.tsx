import { SITE } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const title = "Now";
const description =
  "What Midhun P M is working on in August 2026: PRISM, Thursday, IEEE Sahrdaya, Rust, and practical AI systems that show their work.";

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
            Last updated: August 2026
          </p>
        </header>

        <section aria-label="Currently working on" className="space-y-4">
          <h2 className="font-mono text-[13px] uppercase tracking-wider text-muted">
            Working on
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>
              Semester five of my B.Tech in CSE at Sahrdaya. I&apos;m keeping
              PRISM moving after its second-place finish at ASIET&apos;s AI
              Innovation Hackathon, while still shipping work for the IEEE
              student branch as Technical Coordinator.
            </p>
            <p>
              I&apos;m also making Thursday feel more native to my Linux setup:
              visible desktop actions, a voice overlay, personal workflows,
              and contained Codex project sessions. I brought that build to
              the OpenAI Codex Community Hackathon in Bengaluru this month.
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
              Rust, because mcpd is teaching me what safe configuration tools
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
