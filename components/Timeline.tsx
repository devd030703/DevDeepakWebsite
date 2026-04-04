"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { timelineEntries } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

type TimelineEntry = (typeof timelineEntries)[number];

type EntryTheme = {
  accent: string;
  border: string;
  shadow: string;
};

type LogoConfig = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
  fallbackWordmark?: string;
};

const DEFAULT_THEME: EntryTheme = {
  accent: "#475569",
  border: "rgba(71, 85, 105, 0.14)",
  shadow: "rgba(15, 23, 42, 0.08)",
};

const ENTRY_THEMES: Record<string, EntryTheme> = {
  "Engine by Starling": {
    accent: "#0f766e",
    border: "rgba(15, 118, 110, 0.18)",
    shadow: "rgba(15, 118, 110, 0.1)",
  },
  "Starling Bank": {
    accent: "#0f9f8c",
    border: "rgba(15, 159, 140, 0.18)",
    shadow: "rgba(15, 159, 140, 0.1)",
  },
  amicable: {
    accent: "#8b5cf6",
    border: "rgba(139, 92, 246, 0.18)",
    shadow: "rgba(139, 92, 246, 0.1)",
  },
  "Episode 1 Ventures": {
    accent: "#b45309",
    border: "rgba(180, 83, 9, 0.18)",
    shadow: "rgba(180, 83, 9, 0.1)",
  },
  Apple: {
    accent: "#111827",
    border: "rgba(15, 23, 42, 0.14)",
    shadow: "rgba(15, 23, 42, 0.08)",
  },
  Kraken: {
    accent: "#2563eb",
    border: "rgba(37, 99, 235, 0.16)",
    shadow: "rgba(37, 99, 235, 0.1)",
  },
  "King's College London": {
    accent: "#dc2626",
    border: "rgba(220, 38, 38, 0.18)",
    shadow: "rgba(220, 38, 38, 0.1)",
  },
  "Highgate School": {
    accent: "#053776",
    border: "rgba(5, 55, 118, 0.16)",
    shadow: "rgba(5, 55, 118, 0.1)",
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

const COLLAGE_LAYOUTS = [
  {
    wrapper: "grid-cols-6 auto-rows-[6.5rem] sm:auto-rows-[7.5rem] lg:auto-rows-[8.25rem]",
    items: [
      "col-span-6 sm:col-span-4 sm:row-span-2",
      "col-span-3 sm:col-span-2 sm:translate-y-6 lg:translate-y-8",
      "col-span-3 sm:col-span-2 sm:translate-y-2",
    ],
  },
  {
    wrapper: "grid-cols-6 auto-rows-[6.5rem] sm:auto-rows-[7.5rem] lg:auto-rows-[8.25rem]",
    items: [
      "col-span-3 sm:col-span-2 sm:translate-y-8 lg:translate-y-10",
      "col-span-6 sm:col-span-4 sm:row-span-2",
      "col-span-3 sm:col-span-2 sm:-translate-y-2 lg:-translate-y-4",
    ],
  },
  {
    wrapper: "grid-cols-6 auto-rows-[6.5rem] sm:auto-rows-[7.5rem] lg:auto-rows-[8.25rem]",
    items: [
      "col-span-6 sm:col-span-3 sm:row-span-2",
      "col-span-3 sm:col-span-3 sm:translate-y-6 lg:translate-y-8",
      "col-span-3 sm:col-span-3 sm:-translate-y-3 lg:-translate-y-4",
    ],
  },
] as const;

function getEntryTheme(company: string) {
  return ENTRY_THEMES[company] ?? DEFAULT_THEME;
}

function LogoStage({ entry }: { entry: TimelineEntry }) {
  const logo = LOGO_CONFIG[entry.company];

  return (
    <div className="flex h-20 w-full max-w-[22rem] items-center overflow-hidden sm:h-24">
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
        <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.04em] text-slate-950 sm:text-[1.7rem]">
          {logo?.fallbackWordmark ?? entry.company}
        </span>
      )}
    </div>
  );
}

function TimelineCollage({
  entry,
  index,
  theme,
}: {
  entry: TimelineEntry;
  index: number;
  theme: EntryTheme;
}) {
  const collageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: collageRef,
    offset: ["start end", "end start"],
  });

  const layout = COLLAGE_LAYOUTS[index % COLLAGE_LAYOUTS.length];
  const imageOffsets = [
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -18]),
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [10, -10]),
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [14, -14]),
  ];

  return (
    <motion.div
      ref={collageRef}
      className={cn("relative grid gap-3 sm:gap-4", layout.wrapper)}
    >
      {entry.media.map((photo, photoIndex) => (
        <motion.figure
          key={`${entry.company}-${photo}`}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.018,
                  rotate: photoIndex === 1 ? 0.35 : photoIndex === 2 ? -0.35 : 0.45,
                }
          }
          transition={{ duration: 0.45, ease: EASE }}
          className={cn(
            "group/photo relative overflow-hidden rounded-[1.55rem] border bg-slate-100",
            layout.items[photoIndex],
          )}
          style={{
            y: imageOffsets[photoIndex],
            borderColor: theme.border,
            boxShadow: `0 18px 40px ${theme.shadow}`,
          }}
        >
          <Image
            src={photo}
            alt={`${entry.company} placeholder photograph ${photoIndex + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 34vw"
            className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0.18))]" />
        </motion.figure>
      ))}
    </motion.div>
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

  return (
    <li className="relative">
      <Reveal delay={Math.min(index * 0.06, 0.42)} distance={18}>
        <div className="grid gap-4 md:grid-cols-[11rem_3.5rem_minmax(0,1fr)] md:gap-6 lg:grid-cols-[12rem_4rem_minmax(0,1fr)] lg:gap-8">
          <div className="md:pt-9 lg:pt-10">
            <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/88 px-3 py-1 text-[0.68rem] uppercase tracking-[0.26em] text-slate-500 md:hidden">
              {entry.date}
            </div>
            <div className="hidden md:block md:text-right">
              <p className="text-sm font-medium leading-6 text-slate-600 lg:text-[0.96rem]">
                {entry.date}
              </p>
            </div>
          </div>

          <div className="relative hidden md:flex justify-center">
            <div className="absolute inset-y-0 w-px bg-[linear-gradient(180deg,rgba(148,163,184,0.08),rgba(148,163,184,0.32),rgba(148,163,184,0.08))]" />
            <div className="relative mt-10 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white shadow-[0_16px_34px_rgba(15,23,42,0.09)]">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: theme.accent }}
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
              className="pointer-events-none absolute -right-12 top-2 h-32 w-32 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${theme.accent}14 0%, rgba(255, 255, 255, 0) 72%)`,
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, ${theme.accent}55 50%, rgba(255, 255, 255, 0) 100%)`,
              }}
            />

            <div className="relative flex flex-col gap-8 sm:gap-10">
              <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] xl:items-end xl:gap-10">
                <div>
                  <LogoStage entry={entry} />
                </div>

                <div className="max-w-[46ch] xl:self-end">
                  <p className="text-lg font-medium leading-tight text-slate-700 sm:text-xl lg:text-[1.35rem]">
                    {entry.role}
                  </p>
                  <p className="mt-4 text-[1rem] leading-8 text-slate-600 sm:text-[1.05rem] lg:text-[1.12rem]">
                    {entry.descriptor}
                  </p>
                </div>
              </div>

              <TimelineCollage entry={entry} index={index} theme={theme} />
            </div>
          </motion.div>
        </div>
      </Reveal>
    </li>
  );
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.8"],
  });

  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,rgba(53,99,255,0.12),rgba(255,255,255,0)_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 h-[30rem] w-[46rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(148,163,184,0.12),rgba(255,255,255,0)_72%)] blur-3xl"
      />

      <Container className="max-w-[90rem]">
        <Reveal distance={16}>
          <div>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-gray-500">
              Timeline
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 sm:mt-14">
          <motion.div
            aria-hidden
            className="absolute top-0 hidden w-px bg-[linear-gradient(180deg,rgba(148,163,184,0.08),rgba(148,163,184,0.4),rgba(148,163,184,0.08))] md:block lg:hidden"
            style={{
              left: "12.75rem",
              height: "100%",
              scaleY: reduceMotion ? 1 : spineScaleY,
              transformOrigin: "top",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute top-0 hidden w-px bg-[linear-gradient(180deg,rgba(148,163,184,0.08),rgba(148,163,184,0.4),rgba(148,163,184,0.08))] lg:block"
            style={{
              left: "14rem",
              height: "100%",
              scaleY: reduceMotion ? 1 : spineScaleY,
              transformOrigin: "top",
            }}
          />

          <ol className="space-y-8 sm:space-y-10 lg:space-y-12">
            {timelineEntries.map((entry, index) => (
              <TimelineItem key={`${entry.company}-${entry.role}`} entry={entry} index={index} />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
