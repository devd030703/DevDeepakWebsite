export type MosaicProfile =
  | "ultraWide"
  | "wide"
  | "landscape"
  | "square"
  | "portrait"
  | "tallPortrait";

export type MosaicColumnCount = 2 | 3 | 4;

export type MosaicSpan = {
  cols: number;
  rows: number;
};

export type MosaicExpansion = Record<MosaicColumnCount, MosaicSpan>;

export type MosaicPhoto = {
  src: string;
  alt: string;
  objectPosition: string;
  width: number;
  height: number;
  aspectRatio: number;
  profile: MosaicProfile;
  expansion: MosaicExpansion;
};

export const MOSAIC_GAP_PX = 8;

export const DEFAULT_MOSAIC_SPAN = {
  cols: 1,
  rows: 1,
} as const satisfies MosaicSpan;

export function getMosaicColumnCount(width: number): MosaicColumnCount {
  if (width < 640) {
    return 2;
  }

  if (width < 1024) {
    return 3;
  }

  return 4;
}

export function getExpandedSpan(
  photo: MosaicPhoto,
  columns: MosaicColumnCount,
) {
  return photo.expansion[columns] ?? DEFAULT_MOSAIC_SPAN;
}
