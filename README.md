# Dev Deepak Website

Personal site for Dev Deepak, built as a focused single-page Next.js app with a hero section and a branded career timeline.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Structure

The homepage renders two sections:

- `Hero`
- `Timeline`

Project content is intentionally centralized:

- [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts): site metadata and timeline entries
- [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx): intro section and headline motion
- [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx): timeline layout, logo mapping, and scroll-driven motion
- [`components/PhotoMosaic.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/PhotoMosaic.tsx): runtime mosaic renderer and interaction logic
- [`scripts/generate-mosaic-metadata.mjs`](/Users/devdeepak/Desktop/DevDeepakWebsite/scripts/generate-mosaic-metadata.mjs): build-time photo discovery, classification, ordering, and metadata generation
- [`data/mosaic-overrides.json`](/Users/devdeepak/Desktop/DevDeepakWebsite/data/mosaic-overrides.json): optional manual overrides for crop, alt text, and heuristic escape hatches
- [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos): logo assets referenced by the timeline
- [`public/photos/mosaic`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos/mosaic): raster images consumed by the mosaic generator

## Local Development

Requirements:

- Node.js `>=20.9.0`
- npm

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

## Content Updates

Update [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts) to change:

- site name, description, canonical URL, and LinkedIn URL
- timeline companies, roles, dates, and descriptors

Update [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx) to change:

- per-brand accent colors
- typography overrides
- logo asset mapping

Add new mosaic photos to [`public/photos/mosaic`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos/mosaic).

Optional mosaic overrides live in [`data/mosaic-overrides.json`](/Users/devdeepak/Desktop/DevDeepakWebsite/data/mosaic-overrides.json) for:

- custom `alt`
- custom `objectPosition`
- rare ordering or expansion overrides

Generated mosaic metadata is written to [`lib/generated/mosaicPhotos.generated.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/generated/mosaicPhotos.generated.ts).

## Notes

- `NEXT_PUBLIC_SITE_URL` overrides the default canonical URL.
- Global metadata lives in [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx).
- Shared typography tokens live in [`app/globals.css`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/globals.css) and are exposed through [`tailwind.config.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/tailwind.config.ts).
- Scroll and reveal motion is handled in [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx), [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx), and [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx).
