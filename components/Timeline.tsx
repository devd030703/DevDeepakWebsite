"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";

import { timelineEntries } from "@/lib/content";
import { cn } from "@/lib/utils";
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
  letterSpacing: "-0.035em",
};

const BRAND_TYPOGRAPHY: Record<string, BrandTypography> = {
  "Engine by Starling": {
    color: { light: "#111111", dark: "#f0faf8" },
    fontFamily: '"Universal Sans", sans-serif',
    fontWeight: 700,
    letterSpacing: "-0.06em",
  },
  "Starling Bank": {
    color: { light: "#321E37", dark: "#efe7f4" },
    fontFamily: '"Avantt", "Inter Tight", sans-serif',
    fontWeight: 650,
    letterSpacing: "-0.05em",
  },
  amicable: {
    color: { light: "#17130f", dark: "#f2ebe5" },
    fontFamily: "Solomon, Arial, sans-serif",
    fontWeight: 400,
    letterSpacing: "-0.02em",
  },
  Kraken: {
    color: { light: "#100030", dark: "#ddd6ff" },
    fontFamily: "Chromatophore, Helvetica, sans-serif",
    fontWeight: 700,
    letterSpacing: "-0.035em",
  },
  "King's College London": {
    color: { light: "#0a2d50", dark: "#bfd6ee" },
    fontFamily:
      '"KingsBureauGrotFiveOne", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  "Highgate School": {
    color: { light: "#053776", dark: "#9abfff" },
    fontWeight: 600,
    letterSpacing: "0.08em",
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

  return (
    <div className="flex h-16 w-full max-w-[22rem] items-center overflow-hidden rounded-[1.5rem] border border-[var(--logo-stage-border)] bg-[var(--surface-logo-bg)] px-4 sm:h-20 sm:px-5">
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
        <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.04em] text-[var(--page-text)] sm:text-[1.7rem]">
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
            <div className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-pill)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.26em] text-[var(--page-text-soft)] md:hidden">
              {entry.date}
            </div>
            <div className="hidden md:block md:text-right">
              <p className="text-sm font-medium leading-6 text-[var(--page-text-muted)] lg:text-[0.96rem]">
                {entry.date}
              </p>
            </div>
          </div>

          <div className="relative hidden md:flex justify-center">
            <div
              className="relative mt-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-raised)]"
              style={{ boxShadow: "0 16px 34px var(--shadow-soft)" }}
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
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="group relative pt-7 sm:pt-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--entry-accent) 50%, rgba(255, 255, 255, 0) 100%)",
                opacity: 0.38,
              }}
            />

            <div className="grid gap-3 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] xl:items-end xl:gap-9">
              <div>
                <LogoStage entry={entry} />
              </div>

              <div className="max-w-[46ch] xl:self-end">
                <p
                  className="text-[1rem] leading-[1.15] sm:text-[1.08rem] lg:text-[1.18rem]"
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
                <p className="mt-2 text-[0.88rem] leading-[1.65] text-[var(--page-text-muted)] sm:text-[0.92rem]">
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

type MosaicAspect = "landscape" | "portrait" | "square";

type MosaicPhoto = {
  src: string;
  alt: string;
  objectPosition: CSSProperties["objectPosition"];
  aspect: MosaicAspect;
};

type RawMosaicPhoto = Omit<MosaicPhoto, "aspect"> & {
  width: number;
  height: number;
};

const MOSAIC_GAP_PX = 8;
const MOSAIC_HOVER_OPEN_DELAY_MS = 90;
const MOSAIC_HOVER_CLOSE_DELAY_MS = 140;

const RAW_MOSAIC_PHOTOS: readonly RawMosaicPhoto[] = [
  { src: "/photos/Engine_Analyst_2.jpeg", alt: "Engine by Starling", objectPosition: "center 24%", width: 5712, height: 4284 },
  { src: "/photos/Engine_Analyst_4.png", alt: "Engine by Starling", objectPosition: "center 30%", width: 2259, height: 3000 },
  { src: "/photos/Engine_Analyst_1.jpeg", alt: "Engine by Starling", objectPosition: "center", width: 4105, height: 4105 },
  { src: "/photos/Engine_Product_Associate_2.jpeg", alt: "Engine by Starling", objectPosition: "center 38%", width: 5712, height: 4284 },
  { src: "/photos/Engine_Product_Associate_1.PNG", alt: "Engine by Starling", objectPosition: "center 26%", width: 1320, height: 2868 },
  { src: "/photos/Engine_Product_Associate_3.jpeg", alt: "Engine by Starling", objectPosition: "center 32%", width: 4032, height: 3024 },
  { src: "/photos/Starling_Bank_1.jpeg", alt: "Starling Bank", objectPosition: "center 22%", width: 5712, height: 4284 },
  { src: "/photos/Starling_Bank_2.jpeg", alt: "Starling Bank", objectPosition: "center 36%", width: 726, height: 1080 },
  { src: "/photos/Starling_Bank_3.jpeg", alt: "Starling Bank", objectPosition: "center 28%", width: 5712, height: 4284 },
  { src: "/photos/Starling_Bank_4.jpeg", alt: "Starling Bank", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/amicable_1.jpeg", alt: "amicable", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/amicable_2.jpeg", alt: "amicable", objectPosition: "center", width: 4284, height: 5712 },
  { src: "/photos/amicable_3.jpeg", alt: "amicable", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/apple_1.jpeg", alt: "Apple", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/apple_3.jpeg", alt: "Apple", objectPosition: "center", width: 600, height: 800 },
  { src: "/photos/apple_2.jpeg", alt: "Apple", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/apple_5.jpeg", alt: "Apple", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/King_College_London_1.jpeg", alt: "King's College London", objectPosition: "center 22%", width: 4032, height: 3024 },
  { src: "/photos/kraken_2.jpeg", alt: "Kraken", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/merch_1.jpeg", alt: "Personal", objectPosition: "center", width: 4032, height: 3024 },
] as const;

const EXPANDED_SPANS: Record<MosaicAspect, { cols: number; rows: number }> = {
  landscape: { cols: 2, rows: 1 },
  portrait: { cols: 1, rows: 2 },
  square: { cols: 2, rows: 2 },
};

function classifyMosaicAspect(width: number, height: number): MosaicAspect {
  const aspectRatio = width / height;

  if (aspectRatio > 1.15) {
    return "landscape";
  }

  if (aspectRatio < 0.85) {
    return "portrait";
  }

  return "square";
}

const MOSAIC_PHOTOS: readonly MosaicPhoto[] = RAW_MOSAIC_PHOTOS.map(
  ({ width, height, ...photo }) => ({
    ...photo,
    aspect: classifyMosaicAspect(width, height),
  }),
);

function getMosaicColumnCount(width: number) {
  if (width < 640) {
    return 2;
  }

  if (width < 1024) {
    return 3;
  }

  return 4;
}

function getExpandedSpan(aspect: MosaicAspect, columns: number) {
  const desiredSpan = EXPANDED_SPANS[aspect];

  return {
    cols: Math.min(desiredSpan.cols, columns),
    rows: desiredSpan.rows,
  };
}

function PhotoMosaic() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const activateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deactivateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearActivateTimer = () => {
    if (activateTimer.current) {
      clearTimeout(activateTimer.current);
      activateTimer.current = null;
    }
  };

  const clearDeactivateTimer = () => {
    if (deactivateTimer.current) {
      clearTimeout(deactivateTimer.current);
      deactivateTimer.current = null;
    }
  };

  const openTile = (index: number, immediate = false) => {
    clearDeactivateTimer();
    clearActivateTimer();

    if (immediate || reduceMotion) {
      setActiveIndex(index);
      return;
    }

    activateTimer.current = setTimeout(() => {
      setActiveIndex(index);
      activateTimer.current = null;
    }, MOSAIC_HOVER_OPEN_DELAY_MS);
  };

  const closeTile = (immediate = false) => {
    clearActivateTimer();
    clearDeactivateTimer();

    if (immediate || reduceMotion) {
      setActiveIndex(null);
      return;
    }

    deactivateTimer.current = setTimeout(() => {
      setActiveIndex(null);
      deactivateTimer.current = null;
    }, MOSAIC_HOVER_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    const element = gridRef.current;

    if (!element) {
      return;
    }

    const updateGridWidth = () => {
      setGridWidth(element.clientWidth);
    };

    updateGridWidth();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateGridWidth);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      clearActivateTimer();
      clearDeactivateTimer();
    };
  }, []);

  const columns = getMosaicColumnCount(gridWidth || 1024);
  const cellSize =
    gridWidth > 0
      ? (gridWidth - MOSAIC_GAP_PX * (columns - 1)) / columns
      : 96;

  return (
    <div className="mt-16 sm:mt-20">
      <LayoutGroup>
        <div
          ref={gridRef}
          className="relative"
          onMouseLeave={() => closeTile()}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeTile(true);
            }
          }}
        >
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              gridAutoRows: `${cellSize}px`,
              gridAutoFlow: "dense",
            }}
          >
            {MOSAIC_PHOTOS.map((photo, i) => {
              const isActive = activeIndex === i;
              const activeSpan = isActive
                ? getExpandedSpan(photo.aspect, columns)
                : { cols: 1, rows: 1 };
              const isDimmed = activeIndex !== null && activeIndex !== i;

              return (
                <motion.button
                  key={photo.src}
                  type="button"
                  layout
                  className="group relative overflow-hidden rounded-[1.05rem] border border-[var(--photo-frame-border)] bg-[var(--surface-soft)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--page-text-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]"
                  style={{
                    gridColumn: `span ${activeSpan.cols}`,
                    gridRow: `span ${activeSpan.rows}`,
                    zIndex: isActive ? 1 : 0,
                  }}
                  animate={{ opacity: isDimmed ? 0.34 : 1 }}
                  transition={{
                    layout: { duration: reduceMotion ? 0 : 0.52, ease: EASE },
                    opacity: { duration: reduceMotion ? 0 : 0.22 },
                  }}
                  onMouseEnter={() => openTile(i)}
                  onFocus={() => openTile(i, true)}
                  onBlur={(event) => {
                    if (!gridRef.current?.contains(event.relatedTarget as Node | null)) {
                      closeTile(true);
                    }
                  }}
                  onClick={() => {
                    if (isActive) {
                      closeTile(true);
                      return;
                    }

                    openTile(i, true);
                  }}
                  aria-label={`Expand photo: ${photo.alt}`}
                  aria-expanded={isActive}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={cn(
                      "object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isActive ? "scale-[1.02]" : "scale-100",
                    )}
                    style={{ objectPosition: photo.objectPosition }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0),rgba(15,23,42,0.08))]"
                    animate={{ opacity: isActive ? 0.18 : 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  />

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        className="absolute inset-0 p-2 sm:p-3"
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.18 }}
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-[0.82rem]">
                          <Image
                            src={photo.src}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 75vw, 520px"
                            className="scale-110 object-cover blur-xl opacity-25"
                            style={{ objectPosition: photo.objectPosition }}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_28%,rgba(15,23,42,0.16))]" />
                          <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            sizes="(max-width: 768px) 75vw, 520px"
                            className="object-contain"
                          />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden py-24 sm:py-32"
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
          <ol className="space-y-8 sm:space-y-10 lg:space-y-12">
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
