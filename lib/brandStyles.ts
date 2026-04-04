import type { CSSProperties } from "react";

type BrandStyle = Pick<CSSProperties, "fontFamily" | "fontWeight" | "color">;

const BRAND_STYLES: Record<string, BrandStyle> = {
  "Engine by Starling": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    color: "#0d9488",
  },
  "Starling Bank": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    color: "#00b4a6",
  },
  Apple: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#1d1d1f",
  },
  "Octopus Energy": {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 700,
    color: "#e879f9",
  },
  "Octopus Money / Amicable": {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    color: "#f97316",
  },
  amicable: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeight: 600,
    color: "#f97316",
  },
  "Episode 1 Ventures": {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    color: "#92400e",
  },
  "King's College London": {
    fontFamily: "'Crimson Pro', serif",
    fontWeight: 600,
    color: "#7c3aed",
  },
  "Highgate School": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    color: "#6b7280",
  },
  "Nower Hill High School": {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    color: "#6b7280",
  },
};

export function getCompanyStyle(company: string): BrandStyle {
  return BRAND_STYLES[company] ?? {};
}