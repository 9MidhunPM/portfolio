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

  useEffect(() => {
    const activate = () => setActivated(true);
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

  return activated ? <TerminalEasterEgg initiallyOpen /> : null;
}
