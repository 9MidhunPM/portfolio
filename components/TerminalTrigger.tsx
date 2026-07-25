"use client";

export function TerminalTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-terminal"))}
      className="font-mono text-xs text-muted transition-all hover:text-accent hover:[text-shadow:0_0_12px_rgb(var(--accent)/0.6)]"
      aria-label="Open hidden terminal"
      title=">_"
    >
      {">_"}
    </button>
  );
}
