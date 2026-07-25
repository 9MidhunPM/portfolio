"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES: { kind: "cmd" | "out" | "gap"; text: string }[] = [
  { kind: "cmd", text: "sudo access --user=midhunpm" },
  { kind: "out", text: "[sudo] password for visitor: ••••••••" },
  { kind: "out", text: "Access granted. Welcome." },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Midhun P M — CS undergrad, builder, Kerala" },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "cat current_status.txt" },
  { kind: "out", text: "S5 @ Sahrdaya · CGPA 9.70" },
  { kind: "out", text: "IEEE Technical Coordinator" },
  { kind: "out", text: "Open to internships" },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "ls ./projects" },
  { kind: "out", text: "MetroMind/  Thursday/  EtlabPro/" },
  { kind: "out", text: "ETLab+/  CalculusDash/  RyMeds/" },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "cat ./achievements/codex.txt" },
  { kind: "out", text: "OpenAI Codex Nightline · July 2026" },
  { kind: "out", text: "Top 10 / 100 builders" },
  { kind: "out", text: "Built MetroMind on a moving metro" },
  { kind: "gap", text: "" },
  { kind: "cmd", text: "echo $STACK" },
  { kind: "out", text: "Python TypeScript C++ Dart · React Next.js Flutter" },
  { kind: "out", text: "FastAPI Node.js · Docker Tailscale · LLaMA.cpp Vulkan" },
];

const TYPE_MS = 14;
const LINE_PAUSE_MS = 90;

export function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const buffer = useRef("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const close = useCallback(() => {
    clearTimers();
    setOpen(false);
    setVisibleLines([]);
    setDone(false);
  }, []);

  const runTypewriter = useCallback(() => {
    clearTimers();
    setVisibleLines([]);
    setDone(false);

    let delay = 250;
    const rendered: string[] = [];

    LINES.forEach((line, index) => {
      if (line.kind === "gap") {
        timers.current.push(
          setTimeout(() => {
            rendered.push("");
            setVisibleLines([...rendered]);
          }, delay)
        );
        delay += LINE_PAUSE_MS / 2;
        return;
      }

      const prefix = line.kind === "cmd" ? "$ " : "";
      const full = prefix + line.text;

      for (let c = 1; c <= full.length; c++) {
        const partial = full.slice(0, c);
        timers.current.push(
          setTimeout(() => {
            rendered[index] = partial;
            setVisibleLines([...rendered]);
          }, delay)
        );
        delay += TYPE_MS;
      }
      rendered.push("");
      delay += line.kind === "cmd" ? LINE_PAUSE_MS * 2 : LINE_PAUSE_MS;
    });

    timers.current.push(setTimeout(() => setDone(true), delay));
  }, []);

  const launch = useCallback(() => {
    setOpen(true);
    runTypewriter();
  }, [runTypewriter]);

  // Global "sudo" key sequence + footer trigger event
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (open && e.key === "Escape") {
        close();
        return;
      }

      if (e.key.length === 1) {
        buffer.current = (buffer.current + e.key.toLowerCase()).slice(-8);
        if (buffer.current.endsWith("sudo")) {
          buffer.current = "";
          launch();
        }
      }
    };

    const onCustomEvent = () => launch();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-terminal", onCustomEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-terminal", onCustomEvent);
    };
  }, [open, close, launch]);

  // Lock scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Hidden terminal"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-[#0A0A0A] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-2 font-mono text-[11px] text-muted">
                visitor@midhunpm.in — zsh
              </span>
            </div>
            <div className="min-h-[320px] p-5 font-mono text-[13px] leading-relaxed">
              {visibleLines.map((line, i) =>
                line === "" ? (
                  <div key={i} className="h-4" />
                ) : (
                  <p
                    key={i}
                    className={
                      line.startsWith("$ ")
                        ? "text-[#EDEDED]"
                        : "text-accent"
                    }
                  >
                    {line}
                  </p>
                )
              )}
              {done && (
                <p className="text-[#EDEDED]">
                  ${" "}
                  <span
                    className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent"
                    aria-hidden="true"
                  />
                </p>
              )}
            </div>
            <div className="border-t border-border px-5 py-2.5">
              <p className="font-mono text-[10px] text-muted">
                esc or click outside to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
