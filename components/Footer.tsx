import { TerminalTrigger } from "@/components/TerminalTrigger";
import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div className="space-y-2">
          <p className="font-mono text-sm text-foreground">
            midhunpm<span className="text-muted">.</span>
            <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          </p>
          <p className="flex items-center gap-3 text-sm text-muted">
            © {new Date().getFullYear()} {SITE.name}. Built with Next.js.
            <TerminalTrigger />
          </p>
        </div>

        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted transition-colors hover:text-foreground"
        >
          Browse my GitHub profile
        </a>
      </div>
    </footer>
  );
}
