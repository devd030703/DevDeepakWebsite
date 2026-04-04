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
- [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos): logo and image assets referenced by the timeline

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

Add or replace referenced assets in [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).

## Notes

- `NEXT_PUBLIC_SITE_URL` overrides the default canonical URL.
- Global metadata lives in [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx).
- Shared typography tokens live in [`app/globals.css`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/globals.css) and are exposed through [`tailwind.config.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/tailwind.config.ts).
- Scroll and reveal motion is handled in [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx), [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx), and [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx).
