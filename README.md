# Dev Deepak Website

Personal website for Dev Deepak, built as a focused single-page Next.js app. The current version is intentionally minimal: a strong hero followed by a visual career and education timeline.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Current Site Structure

The homepage is composed of two primary sections:

- Hero
- Timeline

Core content and metadata live in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts). Timeline media and brand assets live in [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).

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

### Update site metadata and timeline entries

Edit [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts).

This file currently controls:

- Site name, description, canonical URL, and LinkedIn URL
- Timeline dates, roles, descriptors, and brand-specific font settings
- Timeline image selection through the placeholder media list

### Update images and logos

Add or replace assets in [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).

This directory currently contains:

- Timeline placeholder photography
- Company and school logo assets used by the timeline

The timeline does not auto-discover every file in the directory. Image usage is driven by the arrays and paths defined in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts) and [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx).

## Project Structure

```text
app/
  layout.tsx        Global layout, metadata, and font loading
  page.tsx          Homepage composition
  globals.css       Global styles and font tokens
components/
  Hero.tsx          Intro hero section
  Timeline.tsx      Visual timeline with logos and image collages
  ui/
    Container.tsx   Shared page-width wrapper
    Reveal.tsx      Shared scroll-in animation wrapper
lib/
  content.ts        Site metadata and timeline content
  utils.ts          Utility helpers
public/
  photos/           Images and logo assets used by the timeline
```

## Configuration Notes

- `NEXT_PUBLIC_SITE_URL` can override the default canonical URL used in metadata.
- Global metadata is defined in [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx).
- Shared font tokens are defined in [`app/globals.css`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/globals.css) and mapped into Tailwind in [`tailwind.config.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/tailwind.config.ts).
- Scroll and reveal motion is implemented with Framer Motion in [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx), [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx), and [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx).

## Deployment

This project is a standard Next.js application and can be deployed to Vercel or any platform that supports Next.js.
