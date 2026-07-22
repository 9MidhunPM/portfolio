"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #00DC82 0%, rgba(0, 220, 130, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #00DC82 0%, rgba(0, 220, 130, 0) 100%)",
    BOTTOM:
      "radial-gradient(20.7% 50% at 50% 100%, #00DC82 0%, rgba(0, 220, 130, 0) 100%)",
    RIGHT:
      "radial-gradient(16.2% 41.19% at 100% 50%, #00DC82 0%, rgba(0, 220, 130, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.157% at 50% 50%, #00DC82 0%, rgba(0, 220, 130, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-[#00DC82]/30 content-center hover:bg-black/10 transition duration-500 bg-[#0F1110] items-center flex-none gap-2 text-[#ECEDEE] flex-nowrap h-min justify-center overflow-visible p-px w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#0F1110] px-4 py-1.5 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration }}
      />
      <div className="bg-[#08090A] absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
