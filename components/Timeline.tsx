"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";

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

type MosaicProfile =
  | "ultraWide"
  | "wide"
  | "landscape"
  | "square"
  | "portrait"
  | "tallPortrait";

type MosaicPhoto = {
  src: string;
  alt: string;
  objectPosition: CSSProperties["objectPosition"];
  width: number;
  height: number;
  aspectRatio: number;
  profile: MosaicProfile;
};

type RawMosaicPhoto = Omit<MosaicPhoto, "aspectRatio" | "profile">;

const MOSAIC_GAP_PX = 8;
const MOSAIC_HOVER_OPEN_DELAY_MS = 90;
const MOSAIC_HOVER_CLOSE_DELAY_MS = 140;
const MOSAIC_HOVER_REFLOW_GUARD_MS = 260;
const MOSAIC_HOVER_REFLOW_GUARD_DISTANCE_PX = 18;
const DESKTOP_MOSAIC_COLUMNS = 4;
const DEFAULT_MOSAIC_SPAN = { cols: 1, rows: 1 } as const;

const RAW_MOSAIC_PHOTOS: readonly RawMosaicPhoto[] = [
  { src: "/photos/Engine_Analyst_2.jpeg", alt: "Engine by Starling", objectPosition: "center 24%", width: 5712, height: 4284 },
  { src: "/photos/Starling_Bank_1.jpeg", alt: "Starling Bank", objectPosition: "center 22%", width: 5712, height: 4284 },
  { src: "/photos/amicable_2.jpeg", alt: "amicable", objectPosition: "center", width: 4284, height: 5712 },
  { src: "/photos/Engine_Analyst_1.jpeg", alt: "Engine by Starling", objectPosition: "center", width: 4105, height: 4105 },
  { src: "/photos/Engine_Product_Associate_2.jpeg", alt: "Engine by Starling", objectPosition: "center 38%", width: 5712, height: 4284 },
  { src: "/photos/Starling_Bank_3.jpeg", alt: "Starling Bank", objectPosition: "center 28%", width: 5712, height: 4284 },
  { src: "/photos/apple_3.jpeg", alt: "Apple", objectPosition: "center", width: 600, height: 800 },
  { src: "/photos/King_College_London_1.jpeg", alt: "King's College London", objectPosition: "center 22%", width: 4032, height: 3024 },
  { src: "/photos/Engine_Analyst_4.png", alt: "Engine by Starling", objectPosition: "center 30%", width: 2259, height: 3000 },
  { src: "/photos/Starling_Bank_4.jpeg", alt: "Starling Bank", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/apple_5.jpeg", alt: "Apple", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/Engine_Product_Associate_1.PNG", alt: "Engine by Starling", objectPosition: "center 26%", width: 1320, height: 2868 },
  { src: "/photos/amicable_1.jpeg", alt: "amicable", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/Starling_Bank_2.jpeg", alt: "Starling Bank", objectPosition: "center 36%", width: 726, height: 1080 },
  { src: "/photos/apple_1.jpeg", alt: "Apple", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/Engine_Product_Associate_3.jpeg", alt: "Engine by Starling", objectPosition: "center 32%", width: 4032, height: 3024 },
  { src: "/photos/amicable_3.jpeg", alt: "amicable", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/apple_2.jpeg", alt: "Apple", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/kraken_2.jpeg", alt: "Kraken", objectPosition: "center", width: 4032, height: 3024 },
  { src: "/photos/merch_1.jpeg", alt: "Personal", objectPosition: "center", width: 4032, height: 3024 },
] as const;

const PROFILE_IDLE_SCALE: Record<MosaicProfile, number> = {
  ultraWide: 1.1,
  wide: 1.08,
  landscape: 1.07,
  square: 1.05,
  portrait: 1.1,
  tallPortrait: 1.13,
};

const PROFILE_ACTIVE_SCALE: Record<MosaicProfile, number> = {
  ultraWide: 1.01,
  wide: 1.01,
  landscape: 1.01,
  square: 1,
  portrait: 1.02,
  tallPortrait: 1.03,
};

function classifyMosaicProfile(width: number, height: number): MosaicProfile {
  const aspectRatio = width / height;

  if (aspectRatio >= 2.05) {
    return "ultraWide";
  }

  if (aspectRatio >= 1.55) {
    return "wide";
  }

  if (aspectRatio >= 1.12) {
    return "landscape";
  }

  if (aspectRatio <= 0.52) {
    return "tallPortrait";
  }

  if (aspectRatio <= 0.84) {
    return "portrait";
  }

  return "square";
}

function toMosaicPhoto(photo: RawMosaicPhoto): MosaicPhoto {
  const aspectRatio = photo.width / photo.height;

  return {
    ...photo,
    aspectRatio,
    profile: classifyMosaicProfile(photo.width, photo.height),
  };
}

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getPreferredExpandedCols(aspectRatio: number, columns: number) {
  if (columns <= 1) {
    return 1;
  }

  if (aspectRatio >= 2.1) {
    return Math.min(columns, 4);
  }

  if (aspectRatio >= 1.55) {
    return Math.min(columns, 3);
  }

  if (aspectRatio >= 1.08) {
    return Math.min(columns, 2);
  }

  if (aspectRatio >= 0.88) {
    return Math.min(columns, 2);
  }

  if (columns >= 3) {
    return 2;
  }

  return aspectRatio >= 0.68 ? Math.min(columns, 2) : 1;
}

function getExpandedRowsFromRatio(
  aspectRatio: number,
  cols: number,
  columns: number,
) {
  const rawRows = Math.round(cols / aspectRatio);
  const maxRows = aspectRatio < 0.58
    ? (columns >= 4 ? 5 : 4)
    : aspectRatio < 0.82
      ? 4
      : 3;

  return clampNumber(rawRows, 2, maxRows);
}

function getPreviewExpandedSpan(
  aspectRatio: number,
  columns: number,
  slotIndex: number,
) {
  const preferredCols = getPreferredExpandedCols(aspectRatio, columns);
  const column = (slotIndex % columns) + 1;
  const remainingColumns = columns - column + 1;
  const cols = Math.max(1, Math.min(preferredCols, remainingColumns));

  return {
    cols,
    rows: getExpandedRowsFromRatio(aspectRatio, cols, columns),
  };
}

function getDesktopSlotScore(
  orderedPhotos: readonly MosaicPhoto[],
  photo: MosaicPhoto,
  slotIndex: number,
) {
  const column = (slotIndex % DESKTOP_MOSAIC_COLUMNS) + 1;
  const remainingColumns = DESKTOP_MOSAIC_COLUMNS - column + 1;
  const leftPhoto = slotIndex % DESKTOP_MOSAIC_COLUMNS === 0
    ? null
    : orderedPhotos[slotIndex - 1];
  const abovePhoto =
    slotIndex >= DESKTOP_MOSAIC_COLUMNS
      ? orderedPhotos[slotIndex - DESKTOP_MOSAIC_COLUMNS]
      : null;
  const preferredCols = getPreferredExpandedCols(
    photo.aspectRatio,
    DESKTOP_MOSAIC_COLUMNS,
  );
  const previewSpan = getPreviewExpandedSpan(
    photo.aspectRatio,
    DESKTOP_MOSAIC_COLUMNS,
    slotIndex,
  );
  let score = previewSpan.cols === preferredCols
    ? 8
    : -8 * (preferredCols - previewSpan.cols);

  if (photo.aspectRatio < 0.88) {
    score += remainingColumns >= 2 ? 6 : -10;
    score += column === DESKTOP_MOSAIC_COLUMNS ? -6 : 2;
  } else if (photo.aspectRatio >= 1.55) {
    score += column === 1 ? 5 : column === 2 ? 2 : -5;
  } else if (photo.aspectRatio >= 1.08) {
    score += column <= 2 ? 3 : -1;
  } else {
    score += column === 2 || column === 3 ? 2 : 0;
  }

  if (leftPhoto?.alt === photo.alt) {
    score -= 4;
  }

  if (abovePhoto?.alt === photo.alt) {
    score -= 3;
  }

  if (leftPhoto?.profile === photo.profile) {
    score -= 1.25;
  }

  if (abovePhoto?.profile === photo.profile) {
    score -= 0.75;
  }

  if (column === 1 && (photo.profile === "wide" || photo.profile === "ultraWide")) {
    score += 2;
  }

  return score;
}

function orderMosaicPhotos(photos: readonly MosaicPhoto[]) {
  const remaining = [...photos];
  const ordered: MosaicPhoto[] = [];

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const [index, photo] of remaining.entries()) {
      const score = getDesktopSlotScore(ordered, photo, ordered.length);

      if (score > bestScore) {
        bestScore = score;
        bestIndex = index;
      }
    }

    ordered.push(remaining[bestIndex]);
    remaining.splice(bestIndex, 1);
  }

  return ordered;
}

const MOSAIC_PHOTOS: readonly MosaicPhoto[] = orderMosaicPhotos(
  RAW_MOSAIC_PHOTOS.map(toMosaicPhoto),
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

function getExpandedSpan(
  photo: MosaicPhoto,
  columns: number,
  index: number,
) {
  return getPreviewExpandedSpan(photo.aspectRatio, columns, index);
}

function getThumbnailScale(profile: MosaicProfile, isActive: boolean) {
  return isActive ? PROFILE_ACTIVE_SCALE[profile] : PROFILE_IDLE_SCALE[profile];
}

function PhotoMosaic() {
  const [activePhotoSrc, setActivePhotoSrc] = useState<string | null>(null);
  const [gridWidth, setGridWidth] = useState(0);
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const activePhotoSrcRef = useRef<string | null>(null);
  const activateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deactivateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverGuardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerPositionRef = useRef<{ x: number; y: number } | null>(null);
  const hoverLockPointerRef = useRef<{ x: number; y: number } | null>(null);
  const isHoverGuardActiveRef = useRef(false);

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

  const clearHoverGuardTimer = () => {
    if (hoverGuardTimer.current) {
      clearTimeout(hoverGuardTimer.current);
      hoverGuardTimer.current = null;
    }
  };

  const setActivePhoto = (photoSrc: string | null, source: "hover" | "focus" | "click" | "close") => {
    activePhotoSrcRef.current = photoSrc;
    setActivePhotoSrc(photoSrc);

    if (photoSrc && source === "hover") {
      clearHoverGuardTimer();
      isHoverGuardActiveRef.current = true;
      hoverLockPointerRef.current = pointerPositionRef.current;
      hoverGuardTimer.current = setTimeout(() => {
        isHoverGuardActiveRef.current = false;
        hoverGuardTimer.current = null;
      }, MOSAIC_HOVER_REFLOW_GUARD_MS);
      return;
    }

    if (!photoSrc) {
      clearHoverGuardTimer();
      isHoverGuardActiveRef.current = false;
      hoverLockPointerRef.current = null;
    }
  };

  const shouldIgnoreHoverSwitch = (photoSrc: string) => {
    if (activePhotoSrcRef.current === photoSrc) {
      return false;
    }

    if (!isHoverGuardActiveRef.current) {
      return false;
    }

    const currentPointer = pointerPositionRef.current;
    const lockedPointer = hoverLockPointerRef.current;

    if (!currentPointer || !lockedPointer) {
      return true;
    }

    const pointerDelta = Math.hypot(
      currentPointer.x - lockedPointer.x,
      currentPointer.y - lockedPointer.y,
    );

    return pointerDelta < MOSAIC_HOVER_REFLOW_GUARD_DISTANCE_PX;
  };

  const openTile = (
    photoSrc: string,
    source: "hover" | "focus" | "click",
    immediate = false,
  ) => {
    clearDeactivateTimer();
    clearActivateTimer();

    if (activePhotoSrcRef.current === photoSrc) {
      return;
    }

    if (source === "hover" && shouldIgnoreHoverSwitch(photoSrc)) {
      return;
    }

    if (immediate || reduceMotion || source !== "hover") {
      setActivePhoto(photoSrc, source);
      return;
    }

    activateTimer.current = setTimeout(() => {
      setActivePhoto(photoSrc, "hover");
      activateTimer.current = null;
    }, MOSAIC_HOVER_OPEN_DELAY_MS);
  };

  const closeTile = (immediate = false) => {
    clearActivateTimer();
    clearDeactivateTimer();

    if (immediate || reduceMotion) {
      setActivePhoto(null, "close");
      return;
    }

    deactivateTimer.current = setTimeout(() => {
      setActivePhoto(null, "close");
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
      clearHoverGuardTimer();
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
          onPointerLeave={() => closeTile()}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
              return;
            }

            pointerPositionRef.current = {
              x: event.clientX,
              y: event.clientY,
            };
          }}
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
            }}
          >
            {MOSAIC_PHOTOS.map((photo, index) => {
              const isActive = activePhotoSrc === photo.src;
              const isDimmed = activePhotoSrc !== null && activePhotoSrc !== photo.src;
              const activeSpan = isActive
                ? getExpandedSpan(photo, columns, index)
                : DEFAULT_MOSAIC_SPAN;

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
                    boxShadow: isActive
                      ? "0 18px 40px light-dark(rgba(15,23,42,0.14), rgba(2,8,23,0.42))"
                      : "none",
                  }}
                  animate={{ opacity: isDimmed ? 0.34 : 1 }}
                  transition={{
                    layout: { duration: reduceMotion ? 0 : 0.5, ease: EASE },
                    opacity: { duration: reduceMotion ? 0 : 0.2 },
                  }}
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
                      return;
                    }

                    pointerPositionRef.current = {
                      x: event.clientX,
                      y: event.clientY,
                    };
                    openTile(photo.src, "hover");
                  }}
                  onFocus={() => openTile(photo.src, "focus", true)}
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

                    openTile(photo.src, "click", true);
                  }}
                  aria-label={`Expand photo: ${photo.alt}`}
                  aria-expanded={isActive}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: getThumbnailScale(photo.profile, isActive),
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.42, ease: EASE }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      style={{ objectPosition: photo.objectPosition }}
                    />
                  </motion.div>

                  <motion.div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0),rgba(15,23,42,0.1))]"
                    animate={{ opacity: isActive ? 0.18 : 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  />
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
