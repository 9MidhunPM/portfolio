"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TerminalEasterEgg = dynamic(
  () =>
    import("@/components/TerminalEasterEgg").then(
      (module) => module.TerminalEasterEgg
    ),
  { ssr: false }
);

export function TerminalLoader() {
  const [activated, setActivated] = useState(false);
  const buffer = useRef("");
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const activate = () => {
      trigger.current = document.activeElement as HTMLElement | null;
      setActivated(true);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key.length === 1) {
        buffer.current = `${buffer.current}${event.key.toLowerCase()}`.slice(-4);
        if (buffer.current === "sudo") activate();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-terminal", activate);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-terminal", activate);
    };
  }, []);

  return activated ? (
    <TerminalEasterEgg
      initiallyOpen
      onClose={() => {
        setActivated(false);
        requestAnimationFrame(() => trigger.current?.focus());
      }}
    />
  ) : null;
}
