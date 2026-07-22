"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// 3D laptop geometry (degrees):
//   deck tilt:  +60   (base rotated forward from vertical → shallow keyboard deck)
//   lid closed: -120   (folds forward over the deck, parallel to it, back/logo up)
//   lid open:    +5    (near-vertical, slight back lean)
// closed lid and deck are parallel planes (normals match), so the lid rests on the deck.
const DECK_TILT = 60;
const LID_CLOSED = -120;
const LID_OPEN = 5;

export function LaptopScroll({ src }: { src: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Fallback: skip the pinned scroll animation on mobile / reduced-motion
      // and snap the laptop straight into its open, lit-up state.
      if (reduceMotion || isMobile) {
        gsap.set(lidRef.current, {
          rotateX: LID_OPEN,
          transformOrigin: "bottom center",
        });
        gsap.set(screenRef.current, { opacity: 1 });
        gsap.set(glowRef.current, { opacity: 1, scale: 1 });
        gsap.set(leftSideRef.current, { opacity: 1, x: 0 });
        gsap.set(rightSideRef.current, { opacity: 1, x: 0 });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Laptop settles into place + lid swings open (no shake, single sweep)
      tl.fromTo(
        laptopRef.current,
        { scale: 0.86, y: 0 },
        { scale: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0
      )
        .fromTo(
          lidRef.current,
          { rotateX: LID_CLOSED, transformOrigin: "bottom center" },
          { rotateX: LID_OPEN, duration: 0.5, ease: "power2.inOut" },
          0
        )
        // 2. Screen lights up as the lid clears vertical
        .fromTo(
          screenRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.24 },
          0.22
        )
        // 3. Ambient glow blooms under the deck
        .fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.26 },
          0.3
        )
        // 4. Side annotations slide in
        .fromTo(
          leftSideRef.current,
          { opacity: 0, x: -36 },
          { opacity: 1, x: 0, duration: 0.26, ease: "power3.out" },
          0.36
        )
        .fromTo(
          rightSideRef.current,
          { opacity: 0, x: 36 },
          { opacity: 1, x: 0, duration: 0.26, ease: "power3.out" },
          0.36
        )
        // 5. Laptop gently floats up (subtle, no rotation/shake)
        .to(
          laptopRef.current,
          { y: -16, duration: 0.2, ease: "power1.inOut" },
          0.7
        );

      // Recalculate once the screenshot + fonts have loaded so the pin
      // spacing stays accurate.
      const refresh = () => ScrollTrigger.refresh();
      const img = screenRef.current?.querySelector("img");
      if (img) {
        if (img.complete) refresh();
        else img.addEventListener("load", refresh, { once: true });
      }
      if (document.fonts) {
        document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      }
    },
    { scope: sectionRef }
  );

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#08090A] overflow-hidden py-10"
    >
      {/* Ambient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, rgba(0,220,130,0.07), transparent 70%)",
        }}
      />
      {/* Section label */}
      <p className="absolute top-10 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs tracking-[0.3em] text-[#52525B] uppercase font-mono z-20">
        Projects shipped on
      </p>

      {/* Laptop wrapper — perspective container */}
      <div
        className="relative w-full max-w-7xl mx-auto flex items-center justify-center"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 42%" }}
      >
        {/* LEFT SIDE CONTENT */}
        <div
          ref={leftSideRef}
          className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 text-left z-0"
        >
          <h3 className="text-[#00DC82] font-mono text-[10px] lg:text-xs tracking-[0.2em] uppercase">
            Core Stack
          </h3>
          <ul className="space-y-3 font-display text-base lg:text-xl text-white">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              Next.js 16
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82]" />
              React 19
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              GSAP + Lenis
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              Tailwind v4
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div
          ref={rightSideRef}
          className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 text-right z-0"
        >
          <h3 className="text-[#00DC82] font-mono text-[10px] lg:text-xs tracking-[0.2em] uppercase">
            Architecture
          </h3>
          <ul className="space-y-3 font-display text-base lg:text-xl text-white items-end flex flex-col">
            <li className="flex items-center gap-3 flex-row-reverse">
              App Router
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </li>
            <li className="flex items-center gap-3 flex-row-reverse">
              Server Components
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </li>
            <li className="flex items-center gap-3 flex-row-reverse">
              Kinetic Typography
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </li>
            <li className="flex items-center gap-3 flex-row-reverse">
              Edge Deployed
              <span className="w-1.5 h-1.5 rounded-full bg-[#00DC82]" />
            </li>
          </ul>
        </div>

        {/* THE LAPTOP — 3D model */}
        <div
          ref={laptopRef}
          className="relative scale-100 sm:scale-110 md:scale-125 z-10 will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* LID (screen) — hinged at its bottom edge (the back of the deck) */}
          <div
            ref={lidRef}
            className="relative w-[760px] h-[490px] max-w-[92vw] z-10"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: "bottom center",
              transform: `rotateX(${LID_CLOSED}deg)`,
            }}
          >
            {/* FRONT FACE — screen (visible when open) */}
            <div
              className="absolute inset-0 rounded-t-3xl rounded-b-sm overflow-hidden [backface-visibility:hidden]"
              style={{
                background: "linear-gradient(145deg, #16273F, #091421)",
                boxShadow:
                  "0 -2px 0 rgba(120,165,230,0.10) inset, 0 2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {/* Screen bezel */}
              <div className="absolute inset-3 rounded-2xl overflow-hidden bg-black">
                {/* Screen content */}
                <div ref={screenRef} className="w-full h-full relative opacity-0">
                  <Image
                    src={src}
                    alt="Project screenshot"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                    priority
                  />
                  {/* Screen power-on glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 50% 0%, rgba(0,220,130,0.10), transparent 60%)",
                    }}
                  />
                  {/* Screen reflection overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </div>
              {/* Lid bottom edge hinge detail */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-sm"
                style={{
                  background: "linear-gradient(90deg, #03080F, #1c2e48, #03080F)",
                }}
              />
            </div>

            {/* BACK FACE — clean dark Celestial Blue lid (visible when closed) */}
            <div
              className="absolute inset-0 rounded-t-sm rounded-b-3xl overflow-hidden [backface-visibility:hidden]"
              style={{
                transform: "rotateX(180deg)",
                background: "linear-gradient(150deg, #142640 0%, #08111E 100%)",
                boxShadow:
                  "0 2px 0 rgba(120,165,230,0.12) inset, 0 -2px 8px rgba(0,0,0,0.8)",
              }}
            >
              {/* Subtle sheen */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)",
                }}
              />
            </div>
          </div>

          {/* BASE (deck) — tilted forward to form a keyboard deck */}
          <div
            className="relative z-0 w-[760px] max-w-[92vw]"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${DECK_TILT}deg)`,
              transformOrigin: "top center",
            }}
          >
            {/* Hinge strip (full width — matches screen width) */}
            <div
              className="h-[5px] w-full rounded-sm"
              style={{
                background: "linear-gradient(90deg, #050d18, #1c2e48, #050d18)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.9)",
              }}
            />

            {/* Base body */}
            <div
              className="w-full rounded-b-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #16273F 0%, #091421 100%)",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.8), 0 2px 0 rgba(120,165,230,0.08) inset",
              }}
            >
              {/* Keyboard area */}
              <div className="flex justify-center pt-5 pb-2">
                <div
                  className="w-[92%] h-[160px] rounded-lg mb-2 p-2 flex flex-col gap-1"
                  style={{
                    background: "linear-gradient(180deg, #0e1c30, #050d18)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.5) inset",
                  }}
                >
                  {/* Render rows of keys */}
                  {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex gap-1 justify-center h-[20%] w-full"
                    >
                      {Array.from({ length: 14 }).map((_, colIndex) => (
                        <div
                          key={colIndex}
                          className="bg-[#050d18] rounded-[3px] flex-1 border border-[#78a5e6]/10"
                          style={{
                            boxShadow: "0 -1px 0 rgba(120,165,230,0.12) inset",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Large glass trackpad (Zenbook NumberPad) */}
              <div className="flex justify-center pb-5">
                <div
                  className="w-[300px] h-[140px] rounded-2xl"
                  style={{
                    background: "linear-gradient(145deg, #152840, #0a1626)",
                    boxShadow:
                      "0 0 0 1px rgba(120,165,230,0.18) inset, 0 1px 2px rgba(0,0,0,0.4) inset, 0 0 18px rgba(120,165,230,0.06)",
                  }}
                />
              </div>
            </div>

            {/* Base front edge */}
            <div
              className="h-[8px] w-full"
              style={{
                background: "linear-gradient(180deg, #091421, #03080F)",
                borderRadius: "0 0 12px 12px",
              }}
            />
          </div>

          {/* AMBIENT GLOW under laptop */}
          <div
            ref={glowRef}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[560px] h-[56px] rounded-full opacity-0 blur-2xl pointer-events-none"
            style={{ background: "rgba(90, 145, 235, 0.22)" }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-[#52525B] font-mono animate-bounce z-20">
        scroll ↓
      </p>
    </div>
  );
}
