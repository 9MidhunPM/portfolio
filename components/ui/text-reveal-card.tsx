"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left: cardLeft, width } = cardRef.current.getBoundingClientRect();
      setLeft(cardLeft);
      setLocalWidth(width);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsHovered(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsHovered(true);
  }

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#0F1110] border border-white/10 p-6 md:p-8 rounded-xl w-full relative overflow-hidden group cursor-pointer",
        className
      )}
    >
      {children}
      <div className="relative flex items-center overflow-hidden min-h-[60px]">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isHovered
              ? {
                  opacity: (100 - widthPercentage) / 100,
                }
              : {
                  opacity: 1,
                }
          }
          className="transition-opacity duration-200"
        >
          <p className="text-lg md:text-xl font-mono text-[#52525B]">
            {text}
          </p>
        </motion.div>

        <motion.div
          animate={{
            clipPath: isHovered
              ? `inset(0 ${100 - widthPercentage}% 0 0)`
              : `inset(0 100% 0 0)`,
          }}
          transition={isHovered ? { ease: "linear", duration: 0 } : { duration: 0.4 }}
          className="absolute inset-0 z-20 flex items-center bg-[#0F1110] will-change-transform"
        >
          <p className="text-lg md:text-xl font-mono text-[#00DC82] font-semibold drop-shadow-[0_0_8px_rgba(0,220,130,0.5)]">
            {revealText}
          </p>
        </motion.div>
      </div>

      <p className="text-xs font-mono text-[#52525B] mt-2 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00DC82]" />
        Hover across to decrypt hidden line
      </p>
    </div>
  );
};
