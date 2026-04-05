#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const MOSAIC_DIR = path.join(ROOT_DIR, "public", "photos", "mosaic");
const OVERRIDES_PATH = path.join(ROOT_DIR, "data", "mosaic-overrides.json");
const OUTPUT_PATH = path.join(
  ROOT_DIR,
  "lib",
  "generated",
  "mosaicPhotos.generated.ts",
);

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);
const ORDERING_COLUMNS = [4, 3, 2];
const OUTPUT_COLUMNS = [2, 3, 4];
const ORDERING_WEIGHTS = {
  2: 0.48,
  3: 0.72,
  4: 1,
};
const DEFAULT_OBJECT_POSITION = "center";
const SOF_MARKERS = new Set([
  0xc0,
  0xc1,
  0xc2,
  0xc3,
  0xc5,
  0xc6,
  0xc7,
  0xc9,
  0xca,
  0xcb,
  0xcd,
  0xce,
  0xcf,
]);

function main() {
  const overrides = readOverrides();
  const discoveredPhotos = scanMosaicDirectory(overrides);
  const orderedPhotos = orderMosaicPhotos(discoveredPhotos).map((photo, index) =>
    toGeneratedPhoto(photo, index),
  );
  const output = formatGeneratedModule(orderedPhotos);

  if (!fs.existsSync(path.dirname(OUTPUT_PATH))) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  }

  const existingOutput = fs.existsSync(OUTPUT_PATH)
    ? fs.readFileSync(OUTPUT_PATH, "utf8")
    : null;

  if (existingOutput !== output) {
    fs.writeFileSync(OUTPUT_PATH, output);
  }

  console.log(
    `Generated ${path.relative(ROOT_DIR, OUTPUT_PATH)} with ${orderedPhotos.length} mosaic photos.`,
  );
}

function readOverrides() {
  if (!fs.existsSync(OVERRIDES_PATH)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(OVERRIDES_PATH, "utf8"));
}

function scanMosaicDirectory(overrides) {
  if (!fs.existsSync(MOSAIC_DIR)) {
    throw new Error(`Missing mosaic photo directory: ${MOSAIC_DIR}`);
  }

  const entries = fs.readdirSync(MOSAIC_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => SUPPORTED_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
    .sort((left, right) => left.localeCompare(right));

  const discoveredFiles = new Set(files);

  for (const fileName of Object.keys(overrides)) {
    if (!discoveredFiles.has(fileName)) {
      console.warn(
        `Override exists for ${fileName} but no matching file was found in public/photos/mosaic.`,
      );
    }
  }

  if (files.length === 0) {
    throw new Error("No mosaic photos found.");
  }

  return files.flatMap((fileName) => {
    const override = overrides[fileName] ?? {};

    if (override.exclude) {
      return [];
    }

    const filePath = path.join(MOSAIC_DIR, fileName);
    const { width, height } = readImageDimensions(filePath);
    const aspectRatio = roundNumber(width / height);
    const stem = fileName.replace(/\.[^.]+$/, "");

    return {
      fileName,
      src: `/photos/mosaic/${fileName}`,
      alt: override.alt ?? humanizeStem(stem),
      objectPosition: override.objectPosition ?? DEFAULT_OBJECT_POSITION,
      width,
      height,
      aspectRatio,
      profile: classifyMosaicProfile(aspectRatio),
      series: normalizeSeriesKey(override.series ?? deriveSeriesKey(stem)),
      orderBias: typeof override.orderBias === "number" ? override.orderBias : 0,
      expansionOverride: override.expansion ?? null,
    };
  });
}

function readImageDimensions(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  if (extension === ".png") {
    return readPngDimensions(buffer, filePath);
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return readJpegDimensions(buffer, filePath);
  }

  throw new Error(`Unsupported image format for ${filePath}`);
}

function readPngDimensions(buffer, filePath) {
  const signature = "89504e470d0a1a0a";

  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error(`Invalid PNG header in ${filePath}`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function readJpegDimensions(buffer, filePath) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error(`Invalid JPEG header in ${filePath}`);
  }

  let offset = 2;

  while (offset < buffer.length) {
    while (offset < buffer.length && buffer[offset] === 0xff) {
      offset += 1;
    }

    const marker = buffer[offset];
    offset += 1;

    if (
      marker === 0xd8 ||
      marker === 0x01 ||
      (marker >= 0xd0 && marker <= 0xd9)
    ) {
      continue;
    }

    if (offset + 1 >= buffer.length) {
      break;
    }

    const segmentLength = buffer.readUInt16BE(offset);

    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      break;
    }

    if (SOF_MARKERS.has(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  throw new Error(`Unable to read JPEG dimensions from ${filePath}`);
}

function classifyMosaicProfile(aspectRatio) {
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

function deriveSeriesKey(stem) {
  const cleanedStem = stem.replace(/(?:[_-]\d+)+$/, "");
  const [firstToken] = cleanedStem.split(/[_-]+/);

  return firstToken ?? cleanedStem;
}

function normalizeSeriesKey(value) {
  return value.trim().toLowerCase();
}

function humanizeStem(stem) {
  const cleanedStem = stem.replace(/(?:[_-]\d+)+$/, "");

  return cleanedStem
    .split(/[_-]+/)
    .filter(Boolean)
    .map((token) => {
      if (token.length <= 3 && token === token.toUpperCase()) {
        return token;
      }

      return token[0].toUpperCase() + token.slice(1).toLowerCase();
    })
    .join(" ");
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getPreferredExpandedCols(aspectRatio, columns) {
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

function getExpandedRowsFromRatio(aspectRatio, cols, columns) {
  const rawRows = Math.round(cols / aspectRatio);
  const maxRows =
    aspectRatio < 0.58 ? (columns >= 4 ? 5 : 4) : aspectRatio < 0.82 ? 4 : 3;

  return clampNumber(rawRows, 2, maxRows);
}

function getPreviewExpandedSpan(aspectRatio, columns, slotIndex) {
  const preferredCols = getPreferredExpandedCols(aspectRatio, columns);
  const column = (slotIndex % columns) + 1;
  const remainingColumns = columns - column + 1;
  const cols = Math.max(1, Math.min(preferredCols, remainingColumns));

  return {
    cols,
    rows: getExpandedRowsFromRatio(aspectRatio, cols, columns),
  };
}

function getSlotScore(orderedPhotos, photo, slotIndex, columns) {
  const column = (slotIndex % columns) + 1;
  const remainingColumns = columns - column + 1;
  const leftPhoto = slotIndex % columns === 0 ? null : orderedPhotos[slotIndex - 1];
  const abovePhoto = slotIndex >= columns ? orderedPhotos[slotIndex - columns] : null;
  const preferredCols = getPreferredExpandedCols(photo.aspectRatio, columns);
  const previewSpan = getPreviewExpandedSpan(photo.aspectRatio, columns, slotIndex);

  let score =
    previewSpan.cols === preferredCols
      ? 8
      : -8 * (preferredCols - previewSpan.cols);

  if (photo.aspectRatio < 0.88) {
    score += remainingColumns >= 2 ? 6 : -10;
    score += column === columns ? -6 : 2;
  } else if (photo.aspectRatio >= 1.55) {
    score += column === 1 ? 5 : column === 2 ? 2 : -5;
  } else if (photo.aspectRatio >= 1.08) {
    score += column <= Math.ceil(columns / 2) ? 3 : -1;
  } else if (columns >= 3 && column > 1 && column < columns) {
    score += 2;
  }

  if (leftPhoto?.series === photo.series) {
    score -= 4;
  }

  if (abovePhoto?.series === photo.series) {
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

  if (photo.profile === "tallPortrait" && columns >= 3 && remainingColumns >= 2) {
    score += 1.5;
  }

  return score;
}

function getOrderingScore(orderedPhotos, photo, slotIndex) {
  return ORDERING_COLUMNS.reduce((score, columns) => {
    return score + getSlotScore(orderedPhotos, photo, slotIndex, columns) * ORDERING_WEIGHTS[columns];
  }, photo.orderBias);
}

function orderMosaicPhotos(photos) {
  const remaining = [...photos];
  const ordered = [];

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const [index, photo] of remaining.entries()) {
      const score = getOrderingScore(ordered, photo, ordered.length);
      const currentBest = remaining[bestIndex];

      if (
        score > bestScore ||
        (score === bestScore && photo.fileName.localeCompare(currentBest.fileName) < 0)
      ) {
        bestScore = score;
        bestIndex = index;
      }
    }

    ordered.push(remaining[bestIndex]);
    remaining.splice(bestIndex, 1);
  }

  return ordered;
}

function toGeneratedPhoto(photo, index) {
  const expansion = OUTPUT_COLUMNS.reduce((result, columns) => {
    const defaultSpan = getPreviewExpandedSpan(photo.aspectRatio, columns, index);
    result[columns] = applyExpansionOverride(
      defaultSpan,
      photo.expansionOverride?.[columns],
      columns,
    );
    return result;
  }, {});

  return {
    src: photo.src,
    alt: photo.alt,
    objectPosition: photo.objectPosition,
    width: photo.width,
    height: photo.height,
    aspectRatio: photo.aspectRatio,
    profile: photo.profile,
    expansion,
  };
}

function applyExpansionOverride(defaultSpan, override, columns) {
  if (!override) {
    return defaultSpan;
  }

  return {
    cols: clampNumber(
      typeof override.cols === "number" ? override.cols : defaultSpan.cols,
      1,
      columns,
    ),
    rows: clampNumber(
      typeof override.rows === "number" ? override.rows : defaultSpan.rows,
      1,
      6,
    ),
  };
}

function formatGeneratedModule(photos) {
  const lines = [
    'import type { MosaicPhoto } from "@/lib/mosaic";',
    "",
    "// This file is generated by scripts/generate-mosaic-metadata.mjs.",
    "// Do not edit manually.",
    "export const MOSAIC_PHOTOS = [",
  ];

  for (const photo of photos) {
    lines.push("  {");
    lines.push(`    src: ${JSON.stringify(photo.src)},`);
    lines.push(`    alt: ${JSON.stringify(photo.alt)},`);
    lines.push(`    objectPosition: ${JSON.stringify(photo.objectPosition)},`);
    lines.push(`    width: ${photo.width},`);
    lines.push(`    height: ${photo.height},`);
    lines.push(`    aspectRatio: ${photo.aspectRatio},`);
    lines.push(`    profile: ${JSON.stringify(photo.profile)},`);
    lines.push("    expansion: {");
    lines.push(
      `      2: { cols: ${photo.expansion[2].cols}, rows: ${photo.expansion[2].rows} },`,
    );
    lines.push(
      `      3: { cols: ${photo.expansion[3].cols}, rows: ${photo.expansion[3].rows} },`,
    );
    lines.push(
      `      4: { cols: ${photo.expansion[4].cols}, rows: ${photo.expansion[4].rows} },`,
    );
    lines.push("    },");
    lines.push("  },");
  }

  lines.push("] as const satisfies readonly MosaicPhoto[];");
  lines.push("");

  return lines.join("\n");
}

function roundNumber(value) {
  return Number(value.toFixed(4));
}

main();
