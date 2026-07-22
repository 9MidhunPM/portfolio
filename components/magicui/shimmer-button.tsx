"use client";
import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#00DC82",
      shimmerSize = "0.1em",
      shimmerDuration = "2s",
      borderRadius = "100px",
      background = "#0F1110",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] border border-[#00DC82]/40 transition-transform duration-300 ease-in-out active:scale-95 font-medium shadow-md shadow-[#00DC82]/10 hover:shadow-[#00DC82]/25",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [linear-gradient(0deg,transparent_0%,var(--shimmer-color)_50%,transparent_100%)] [radial-gradient(ellipse_at_center,var(--shimmer-color)_0%,transparent_70%)]" />
        </div>

        {/* backdrop */}
        <div className="absolute inset-[1px] -z-20 [background:var(--bg)] [border-radius:var(--radius)] transition-colors duration-300 group-hover:bg-[#16181B]" />

        {/* content */}
        <div className="z-10 flex items-center gap-2">{children}</div>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
