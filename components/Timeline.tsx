"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { timelineEntries } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PhotoMosaic } from "./PhotoMosaic";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

type TimelineEntry = (typeof timelineEntries)[number];

type ThemeValue = {
  light: string;
  dark: string;
};

type EntryTheme = {
  accent: ThemeValue;
};

type LogoConfig = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
  fallbackWordmark?: string;
};

type BrandTypography = {
  color: ThemeValue;
  fontFamily?: string;
  fontWeight?: CSSProperties["fontWeight"];
  fontStyle?: CSSProperties["fontStyle"];
  letterSpacing?: string;
  textTransform?: CSSProperties["textTransform"];
};

const DEFAULT_THEME: EntryTheme = {
  accent: { light: "#475569", dark: "#94a3b8" },
};

const ENTRY_THEMES: Record<string, EntryTheme> = {
  "Engine by Starling": {
    accent: { light: "#0f766e", dark: "#53c6b5" },
  },
  "Starling Bank": {
    accent: { light: "#0f9f8c", dark: "#65d8c7" },
  },
  amicable: {
    accent: { light: "#8b5cf6", dark: "#baa0ff" },
  },
  "Episode 1 Ventures": {
    accent: { light: "#b45309", dark: "#f1a45f" },
  },
  Apple: {
    accent: { light: "#111827", dark: "#dfe7ef" },
  },
  Kraken: {
    accent: { light: "#2563eb", dark: "#80a9ff" },
  },
  "King's College London": {
    accent: { light: "#dc2626", dark: "#ff9d91" },
  },
  "Highgate School": {
    accent: { light: "#053776", dark: "#7ca8ff" },
  },
};

const DEFAULT_BRAND_TYPOGRAPHY: BrandTypography = {
  color: { light: "#0f172a", dark: "#edf2f7" },
  fontWeight: 600,
  letterSpacing: "0",
};

const BRAND_TYPOGRAPHY: Record<string, BrandTypography> = {
  "Engine by Starling": {
    color: { light: "#111111", dark: "#f0faf8" },
    fontFamily: '"Universal Sans", sans-serif',
    fontWeight: 700,
    letterSpacing: "0",
  },
  "Starling Bank": {
    color: { light: "#321E37", dark: "#efe7f4" },
    fontFamily: '"Avantt", "Inter Tight", sans-serif',
    fontWeight: 650,
    letterSpacing: "0",
  },
  amicable: {
    color: { light: "#17130f", dark: "#f2ebe5" },
    fontFamily: "Solomon, Arial, sans-serif",
    fontWeight: 400,
    letterSpacing: "0",
  },
  Kraken: {
    color: { light: "#100030", dark: "#ddd6ff" },
    fontFamily: "Chromatophore, Helvetica, sans-serif",
    fontWeight: 700,
    letterSpacing: "0",
  },
  "King's College London": {
    color: { light: "#0a2d50", dark: "#bfd6ee" },
    fontFamily:
      '"KingsBureauGrotFiveOne", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    letterSpacing: "0",
    textTransform: "uppercase",
  },
  "Highgate School": {
    color: { light: "#053776", dark: "#9abfff" },
    fontWeight: 600,
    letterSpacing: "0",
    textTransform: "uppercase",
  },
};

const LOGO_CONFIG: Record<string, LogoConfig> = {
  "Engine by Starling": {
    src: "/photos/engine-by-starling.svg",
    alt: "Engine by Starling",
    width: 160,
    height: 36,
    imageClassName: "max-h-8 sm:max-h-9",
  },
  "Starling Bank": {
    src: "/photos/starling.svg",
    alt: "Starling",
    width: 126,
    height: 25,
    imageClassName: "max-h-6 sm:max-h-7",
  },
  amicable: {
    src: "/photos/amicable.svg",
    alt: "amicable",
    width: 933,
    height: 240,
    imageClassName: "max-h-8 sm:max-h-9",
  },
  "Episode 1 Ventures": {
    src: "/photos/episode1.svg",
    alt: "Episode 1 Ventures",
    width: 110,
    height: 34,
    imageClassName: "max-h-9 sm:max-h-10",
  },
  Apple: {
    src: "/photos/apple.svg",
    alt: "Apple",
    width: 100,
    height: 100,
    imageClassName: "max-h-10 sm:max-h-11",
  },
  Kraken: {
    src: "/photos/Kraken.png",
    alt: "Kraken",
    width: 1144,
    height: 404,
    imageClassName: "max-h-10 sm:max-h-11",
  },
  "King's College London": {
    src: "/photos/kings-college-london.svg",
    alt: "King's College London",
    width: 477,
    height: 363,
    imageClassName: "max-h-10 sm:max-h-11",
  },
  "Highgate School": {
    src: "/photos/highgate.svg",
    alt: "Highgate School",
    width: 267,
    height: 53,
    imageClassName: "max-h-8 sm:max-h-9",
  },
  "Nower Hill High School": {
    fallbackWordmark: "Nower Hill",
  },
};

function getEntryTheme(company: string) {
  return ENTRY_THEMES[company] ?? DEFAULT_THEME;
}

function getBrandTypography(company: string) {
  return BRAND_TYPOGRAPHY[company] ?? DEFAULT_BRAND_TYPOGRAPHY;
}

function themeValue(value: ThemeValue) {
  return `light-dark(${value.light}, ${value.dark})`;
}

function LogoStage({ entry }: { entry: TimelineEntry }) {
  const logo = LOGO_CONFIG[entry.company];
  const fallbackWordmarkColor =
    entry.company === "Nower Hill High School" ? "#111111" : "var(--page-text)";

  return (
    <div className="flex h-16 w-full max-w-[22rem] items-center overflow-hidden rounded-lg border border-[var(--logo-stage-border)] bg-[var(--surface-logo-bg)] px-4 shadow-[0_18px_50px_var(--shadow-soft)] backdrop-blur-xl sm:h-20 sm:px-5">
      {logo?.src ? (
        <Image
          src={logo.src}
          alt={logo.alt ?? entry.company}
          width={logo.width ?? 240}
          height={logo.height ?? 80}
          className={cn(
            "h-auto w-auto max-w-full object-contain",
            logo.imageClassName,
          )}
        />
      ) : (
        <span
          className="font-display text-[1.45rem] font-semibold leading-none tracking-normal sm:text-[1.7rem]"
          style={{ color: fallbackWordmarkColor }}
        >
          {logo?.fallbackWordmark ?? entry.company}
        </span>
      )}
    </div>
  );
}

function TimelineItem({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const theme = getEntryTheme(entry.company);
  const brandTypography = getBrandTypography(entry.company);
  const itemTheme = {
    "--entry-accent": themeValue(theme.accent),
    "--entry-role-color": themeValue(brandTypography.color),
  } as CSSProperties;

  return (
    <li className="relative">
      <Reveal delay={Math.min(index * 0.06, 0.42)} distance={18}>
        <div
          className="grid gap-4 md:grid-cols-[11rem_3.5rem_minmax(0,1fr)] md:gap-6 lg:grid-cols-[12rem_4rem_minmax(0,1fr)] lg:gap-8"
          style={itemTheme}
        >
          <div className="md:pt-9 lg:pt-10">
            <div className="inline-flex items-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface-pill)] px-3 py-1 font-display text-[0.68rem] font-bold uppercase tracking-normal text-[var(--primary)] shadow-[0_12px_36px_var(--shadow-warm)] md:hidden">
              {entry.date}
            </div>
            <div className="hidden md:block md:text-right">
              <p className="font-display text-[1rem] font-black leading-tight tracking-normal text-[var(--page-text)] opacity-70 lg:text-[1.18rem]">
                {entry.date}
              </p>
            </div>
          </div>

          <div className="relative hidden md:flex justify-center">
            <div
              className="relative mt-10 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)]"
              style={{ boxShadow: "0 18px 44px var(--shadow-warm)" }}
            >
              {index === 0 && (
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-25"
                  style={{ backgroundColor: "var(--entry-accent)" }}
                />
              )}
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "var(--entry-accent)" }}
              />
            </div>
          </div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group relative rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-soft)] p-5 pt-7 shadow-[0_24px_70px_var(--shadow-soft)] backdrop-blur-xl sm:p-6 sm:pt-8 lg:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-0 h-px sm:inset-x-6 lg:inset-x-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--primary) 18%, var(--entry-accent) 56%, rgba(255, 255, 255, 0) 100%)",
                opacity: 0.58,
              }}
            />

            <div className="grid gap-3 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] xl:items-end xl:gap-9">
              <div>
                <LogoStage entry={entry} />
              </div>

              <div className="max-w-[46ch] xl:self-end">
                <p
                  className="text-[1.08rem] leading-[1.15] sm:text-[1.18rem] lg:text-[1.32rem]"
                  style={{
                    color: "var(--entry-role-color)",
                    fontFamily: brandTypography.fontFamily,
                    fontWeight: brandTypography.fontWeight,
                    fontStyle: brandTypography.fontStyle,
                    letterSpacing: brandTypography.letterSpacing,
                    textTransform: brandTypography.textTransform,
                  }}
                >
                  {entry.role}
                </p>
                <p className="mt-3 text-[0.9rem] font-medium leading-[1.7] text-[var(--page-text-muted)] sm:text-[0.98rem]">
                  {entry.descriptor}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </li>
  );
}

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--timeline-bg)] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 h-[30rem] w-[46rem] -translate-x-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--timeline-glow), rgba(255, 255, 255, 0) 72%)",
        }}
      />

      <Container className="max-w-[90rem]">
        <div className="relative mt-12 sm:mt-14">
          <ol className="relative space-y-8 before:absolute before:bottom-0 before:top-2 before:hidden before:w-px before:bg-[linear-gradient(180deg,var(--primary),var(--border-subtle),transparent)] before:opacity-45 before:content-[''] md:before:left-[14.75rem] md:before:block lg:before:left-[16rem] sm:space-y-10 lg:space-y-12">
            {timelineEntries.map((entry, index) => (
              <TimelineItem
                key={`${entry.company}-${entry.role}`}
                entry={entry}
                index={index}
              />
            ))}
          </ol>
        </div>

        <PhotoMosaic />
      </Container>
    </section>
  );
}
