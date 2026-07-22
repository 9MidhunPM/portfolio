"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none opacity-30",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00DC82]/10 to-transparent opacity-20" />
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
      <motion.div
        initial={{ opacity: 0.2, y: -200 }}
        animate={{ opacity: [0.2, 0.5, 0.2], y: [ -200, 200, -200 ] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#00DC82]/10 rounded-full blur-[140px]"
      />
    </div>
  );
};
