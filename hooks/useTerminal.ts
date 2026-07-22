"use client";

import { useState, useEffect } from "react";
import { TerminalCommand } from "@/lib/types";

interface TerminalLine {
  prompt: string;
  command: string;
  output?: string;
  isCurrent?: boolean;
}

export function useTerminal(commands: TerminalCommand[]) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const prompt = "midhun@portfolio:~$";

  useEffect(() => {
    if (commands.length === 0) return;

    if (currentCommandIndex >= commands.length) {
      setIsCompleted(true);
      setIsTyping(false);
      return;
    }

    const currentCmd = commands[currentCommandIndex];

    if (currentCharIndex < currentCmd.command.length) {
      const timeout = setTimeout(() => {
        setLines((prevLines) => {
          const updated = [...prevLines];
          const typedText = currentCmd.command.substring(0, currentCharIndex + 1);

          if (updated.length === 0 || !updated[updated.length - 1].isCurrent) {
            updated.push({
              prompt,
              command: typedText,
              isCurrent: true,
            });
          } else {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              command: typedText,
            };
          }
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 30); // ~30ms delay per character

      return () => clearTimeout(timeout);
    } else {
      // Finished typing command, show output after 400ms pause
      const timeout = setTimeout(() => {
        setLines((prevLines) => {
          const updated = [...prevLines];
          if (updated.length > 0 && updated[updated.length - 1].isCurrent) {
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              output: currentCmd.output,
              isCurrent: false,
            };
          }
          return updated;
        });

        setCurrentCommandIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 400); // 400ms delay before output & next line

      return () => clearTimeout(timeout);
    }
  }, [currentCommandIndex, currentCharIndex, commands]);

  return {
    lines,
    prompt,
    isCompleted,
    isTyping,
  };
}
