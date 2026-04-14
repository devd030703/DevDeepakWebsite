"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "./ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

// Chromatic aberration snap — timeline: appear → hold blurred → snap clear
const ANIM_DURATION = 0.82;
const ANIM_TIMES = [0, 0.38, 0.85, 1]; // spend 47% holding the blurred state
const ABERRATION_PX = 7;
const HEADLINE_LINES = ["Love", "building."] as const;

function entry(delay: number, reduceMotion: boolean | null) {
  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.3, delay },
    };
  }
  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  };
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden py-28 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--primary)] opacity-20 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-16 left-[8%] h-28 w-28 rounded-[2rem] bg-[var(--tertiary)] opacity-[0.18] blur-3xl sm:h-40 sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[34%] h-36 w-36 rounded-[2.5rem] bg-[var(--secondary)] opacity-[0.16] blur-3xl sm:h-52 sm:w-52"
      />

      <Container className="relative max-w-7xl text-center">
        {/* Name */}
        <motion.p
          {...entry(0, reduceMotion)}
          className="mx-auto inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-pill)] px-4 py-2 font-display text-[0.68rem] font-bold uppercase tracking-normal text-[var(--primary)] shadow-[0_20px_60px_var(--shadow-warm)] backdrop-blur-2xl"
        >
          Dev Deepak
        </motion.p>

        {/* Headline — chromatic aberration snap */}
        <h1 className="mx-auto mt-8 max-w-5xl font-display text-[4rem] font-black leading-[0.86] tracking-normal text-[var(--page-text)] sm:text-[5.75rem] md:text-[7.5rem] lg:text-[9rem]">
          {HEADLINE_LINES.map((line, i) => {
            const isAccentLine = line === "building.";

            if (reduceMotion) {
              return (
                <motion.div
                  key={line}
                  className={isAccentLine ? "italic text-[var(--primary)]" : undefined}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.08 }}
                >
                  {line}
                </motion.div>
              );
            }

            const delay = 0.05 + i * 0.09;

            return (
              <div key={line} className="relative">
                {/* Main text — in flow (gives parent its height), snaps to sharp */}
                <motion.span
                  className={`relative z-[1] block ${isAccentLine ? "italic text-[var(--primary)]" : ""}`}
                  initial={{ opacity: 0, filter: "blur(20px)" }}
                  animate={{
                    opacity: [0, 0.65, 0.65, 1],
                    filter: [
                      "blur(20px)",
                      "blur(14px)",
                      "blur(14px)",
                      "blur(0px)",
                    ],
                  }}
                  transition={{
                    duration: ANIM_DURATION,
                    times: ANIM_TIMES,
                    ease: ["easeOut", "linear", EASE],
                    delay,
                  }}
                >
                  {line}
                </motion.span>

                {/* Red channel — offset left, vanishes on snap */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 block select-none"
                  style={{ color: "var(--hero-glitch-red)" }}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{
                    opacity: [0, 0.5, 0.5, 0],
                    x: [-ABERRATION_PX, -ABERRATION_PX, -ABERRATION_PX, 0],
                    filter: ["blur(4px)", "blur(3px)", "blur(3px)", "blur(0px)"],
                  }}
                  transition={{
                    duration: ANIM_DURATION,
                    times: ANIM_TIMES,
                    ease: ["easeOut", "linear", EASE],
                    delay,
                  }}
                >
                  {line}
                </motion.span>

                {/* Electric blue channel — offset right, vanishes on snap */}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 block select-none"
                  style={{ color: "var(--hero-glitch-blue)" }}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{
                    opacity: [0, 0.45, 0.45, 0],
                    x: [ABERRATION_PX, ABERRATION_PX, ABERRATION_PX, 0],
                    filter: ["blur(4px)", "blur(3px)", "blur(3px)", "blur(0px)"],
                  }}
                  transition={{
                    duration: ANIM_DURATION,
                    times: ANIM_TIMES,
                    ease: ["easeOut", "linear", EASE],
                    delay,
                  }}
                >
                  {line}
                </motion.span>
              </div>
            );
          })}
        </h1>

        {/* Subline — appears after the snap resolves */}
        <motion.p
          {...entry(0.88, reduceMotion)}
          className="mx-auto mt-9 max-w-xl text-[1.03rem] font-medium leading-relaxed text-[var(--page-text-muted)] sm:text-[1.2rem]"
        >
          Product at Engine by Starling. Previously at Apple, Octopus Energy, Starling Bank, Episode 1 Ventures.
        </motion.p>
      </Container>
    </section>
  );
}
