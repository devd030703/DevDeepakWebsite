"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { MOSAIC_PHOTOS } from "@/lib/generated/mosaicPhotos.generated";
import {
  DEFAULT_MOSAIC_SPAN,
  MOSAIC_GAP_PX,
  getExpandedSpan,
  getMosaicColumnCount,
  type MosaicProfile,
} from "@/lib/mosaic";

const EASE = [0.22, 1, 0.36, 1] as const;
const MOSAIC_HOVER_OPEN_DELAY_MS = 90;
const MOSAIC_HOVER_CLOSE_DELAY_MS = 140;
const MOSAIC_HOVER_REFLOW_GUARD_MS = 260;
const MOSAIC_HOVER_REFLOW_GUARD_DISTANCE_PX = 18;

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

function getThumbnailScale(profile: MosaicProfile, isActive: boolean) {
  return isActive ? PROFILE_ACTIVE_SCALE[profile] : PROFILE_IDLE_SCALE[profile];
}

export function PhotoMosaic() {
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

  const setActivePhoto = (
    photoSrc: string | null,
    source: "hover" | "focus" | "click" | "close",
  ) => {
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
            {MOSAIC_PHOTOS.map((photo) => {
              const isActive = activePhotoSrc === photo.src;
              const isDimmed = activePhotoSrc !== null && activePhotoSrc !== photo.src;
              const activeSpan = isActive
                ? getExpandedSpan(photo, columns)
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
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
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
