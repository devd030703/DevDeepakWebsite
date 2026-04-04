"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Container } from "./ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

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
          className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-gray-500"
        >
          Dev Deepak
        </motion.p>

        {/* Headline — spring entry, slight overshoot */}
        <motion.h1
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.3, delay: 0.05 }
              : { type: "spring", stiffness: 240, damping: 22, delay: 0.08 }
          }
          className="mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-gray-950"
        >
          Love the<br />hard stuff.
        </motion.h1>

        {/* Subline */}
        <motion.p
          {...entry(0.36, reduceMotion)}
          className="mt-6 max-w-xs text-[1rem] leading-relaxed text-gray-600 sm:text-[1.0625rem]"
        >
          Product at Engine by Starling. Previously Apple, Octopus, Episode 1 Ventures.
        </motion.p>
      </Container>
    </section>
  );
}
