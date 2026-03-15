# Dev Deepak Website

Personal website for Dev Deepak, built as a single-page portfolio on Next.js. The site highlights career experience, education, athletics, mentoring, and contact details with a polished editorial-style UI.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## What’s In The Site

The homepage is composed of these sections:

- Hero
- Photo gallery
- Highlights
- Career
- Story timeline
- Beyond work
- Contact

Most of the written content lives in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts). Photos are loaded automatically from [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).

## Local Development

### Requirements

- Node.js `>=20.9.0`
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Content Updates

### Update text content

Edit [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts).

This file controls:

- Site metadata and LinkedIn URL
- Header navigation
- Hero stats
- Highlights
- Career cards
- Education timeline
- Athletics, mentoring, and impact data

### Update photos

Add or replace images in [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).

Supported formats:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.avif`

The gallery reads that folder at runtime and renders every supported image file automatically.

## Project Structure

```text
app/
  layout.tsx        Global layout and metadata
  page.tsx          Homepage composition
  globals.css       Global styles
components/
  Hero.tsx
  Photos.tsx
  Highlights.tsx
  Career.tsx
  Timeline.tsx
  Athletics.tsx
  Contact.tsx
  SiteHeader.tsx
  ui/               Shared layout and animation primitives
lib/
  content.ts        Site content
  utils.ts          Utility helpers
public/
  photos/           Portfolio images
```

## Configuration Notes

- `NEXT_PUBLIC_SITE_URL` can be set to override the default canonical site URL used in metadata.
- The site uses `reactStrictMode` in [`next.config.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/next.config.ts).
- Scroll-in animations are implemented in [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx) with reduced-motion support.

## Deployment

This project is set up like a standard Next.js application and can be deployed to Vercel or any platform that supports Next.js.
