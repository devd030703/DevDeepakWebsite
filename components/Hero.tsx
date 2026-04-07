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
      className="flex min-h-[calc(100vh-3.5rem)] flex-col justify-center py-24"
    >
      <Container>
        {/* Name */}
        <motion.p
          {...entry(0, reduceMotion)}
          className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--page-text-soft)]"
        >
          Dev Deepak
        </motion.p>

        {/* Headline — chromatic aberration snap */}
        <h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-[var(--page-text)]">
          {HEADLINE_LINES.map((line, i) => {
            if (reduceMotion) {
              return (
                <motion.div
                  key={line}
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
                  className="relative z-[1] block"
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
          className="mt-6 max-w-xs text-[1rem] leading-relaxed text-[var(--page-text-muted)] sm:text-[1.0625rem]"
        >
          Product at Engine by Starling. Previously at Apple, Octopus Energy, Starling Bank, Episode 1 Ventures.
        </motion.p>
      </Container>
    </section>
  );
}
