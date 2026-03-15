# AGENT.md

## Purpose

This repository is a personal brand website for Dev Deepak. It is not a generic marketing site and it is not a blog platform. Every change should strengthen one of these outcomes:

- make Dev look more credible, differentiated, and high-agency
- make the story easier to scan and easier to trust
- keep the site fast, polished, and production-ready on mobile and desktop

The quality bar is closer to a sharp founder/product portfolio than a template-driven resume site.

## Product Principles

- Preserve a strong point of view. The site should feel ambitious, disciplined, and editorial, not corporate or generic.
- Prefer specificity over hype. Concrete achievements, real numbers, and crisp language beat vague claims every time.
- Protect trust. Do not add inflated claims, unverifiable metrics, or copy that sounds AI-generated.
- Optimize for skim value. Most visitors will scan headline, highlights, career, timeline, beyond-work, and contact in one pass.
- Respect the single-page narrative. The page is a deliberate sequence, not a loose collection of blocks.

## Current Architecture

- Framework: Next.js App Router with TypeScript
- Styling: Tailwind CSS with project-defined design tokens in `tailwind.config.ts`
- Motion: `framer-motion`, centralized through [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx)
- Content source: [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts)
- Photo source: [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos), discovered from disk in [`components/Photos.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Photos.tsx)
- Page composition: [`app/page.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/page.tsx)
- Metadata and global shell: [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx)

## Operating Rules

### 1. Change the right layer

- Put text, stats, career items, timeline items, navigation labels, and other structured profile content in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts).
- Change component code only when presentation, structure, or interaction needs to change.
- Do not hardcode profile content across multiple components if it can live once in `lib/content.ts`.
- Keep shared layout and animation primitives in [`components/ui`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui).

### 2. Preserve the single-page information architecture

The homepage currently flows through:

1. Hero
2. Photos
3. Highlights
4. Career
5. Timeline
6. Beyond Work
7. Contact

When editing:

- keep section order intentional
- maintain stable section `id`s unless there is a strong reason to change them
- update any related anchor links if a section `id`, label, or CTA target changes
- keep the sticky header navigation consistent across desktop and mobile variants

### 3. Maintain the visual language

This site already has a defined aesthetic:

- dark, premium, editorial presentation
- electric blue accent palette
- glassy panels and soft glows
- condensed display typography for headings
- restrained animation rather than novelty motion

Do not regress this into a default SaaS layout, bland resume template, or generic Tailwind block composition.

When adding UI:

- reuse `.panel`, `.section-shell`, `.section-kicker`, `Container`, and `SectionHeading` where appropriate
- prefer extending the existing electric palette and shadow system instead of inventing unrelated colors
- keep spacing generous and typography deliberate
- ensure layouts remain strong on small screens first, not only on desktop screenshots

### 4. Be disciplined with motion

- Prefer using [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx) for scroll-in motion instead of ad hoc animations.
- Keep motion meaningful and minimal.
- Preserve reduced-motion behavior.
- Do not introduce animation that harms readability, causes layout instability, or fights scroll.

### 5. Respect server/client boundaries

- Most of this site can remain server-rendered.
- [`components/Photos.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Photos.tsx) intentionally reads the filesystem on the server via `readdir`.
- Do not move filesystem access into client components.
- Only add `"use client"` where interactivity actually requires it.
- Keep client components narrow and justified.

### 6. Treat images as product assets

- Keep gallery images in [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).
- Preserve the current file-based discovery flow unless there is a compelling product reason to replace it.
- Use `next/image` for rendered images.
- Be careful with large image counts and oversized assets; this site should stay fast.
- If you change gallery behavior, keep the empty-state / placeholder behavior coherent.

### 7. Protect copy quality

Copy on this site should sound like a high-performing operator with real ambition and evidence, not like a recruiter summary or motivational poster.

Preferred traits:

- concise
- specific
- credible
- high-signal
- outcome-oriented

Avoid:

- filler adjectives
- generic leadership cliches
- duplicated points across sections
- unsupported “best-in-class” style claims
- bloated paragraphs where a sharper sentence or bullet would do

If you improve content, aim to increase signal density and consistency of voice.

## File-Specific Guidance

### [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts)

- This is the primary source of truth for profile content.
- Keep data structures clean, typed by inference, and easy to scan.
- Preserve naming consistency and avoid shape churn unless the UI genuinely needs it.
- When adding fields, update only the components that benefit from them.

### [`app/page.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/page.tsx)

- Keep this file focused on page composition, not business logic or large data blobs.
- Preserve the skip link and background treatment.
- Do not bury section composition in unnecessary abstractions.

### [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx)

- Keep metadata accurate and aligned with `siteConfig`.
- Preserve canonical, Open Graph, and Twitter metadata coverage.
- If changing site positioning or branding, update metadata intentionally, not partially.

### [`app/globals.css`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/globals.css)

- Use this for global tokens, shared utility classes, and base visual treatments.
- Avoid dumping component-specific one-off styles here unless they truly belong at the global layer.
- Protect readability, contrast, and background performance.

### [`components/SiteHeader.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/SiteHeader.tsx)

- Keep navigation labels, anchor targets, and CTA behavior aligned with `navigation` and `siteConfig`.
- Preserve sticky behavior and mobile usability.
- Horizontal overflow in mobile nav is acceptable; broken navigation is not.

### [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx)

- The hero must quickly answer who Dev is, what he does, and why he is worth paying attention to.
- Keep CTA targets real and maintained.
- Do not let this section become verbose.

### [`components/Photos.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Photos.tsx)

- Keep the gallery resilient if the directory is empty.
- Maintain accessible alt text.
- Avoid introducing client-side fetching or unnecessary state.

### [`components/ui/*.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui)

- These are primitives. Keep them generic, small, and reusable.
- If a pattern is only used once and is tightly coupled to one section, it probably does not belong here.

## Engineering Standards

- Keep TypeScript clean. Avoid `any` unless there is a clear, documented reason.
- Prefer simple data flow over abstraction-heavy patterns.
- Do not add dependencies lightly. This repo is small and should stay lean.
- Preserve accessibility: semantic headings, usable focus states, keyboard navigation, reduced-motion support, and descriptive link text where possible.
- Preserve performance: avoid unnecessary client components, large hydration surfaces, and heavy runtime logic.
- Preserve maintainability: one source of truth for content, no duplicated constants scattered across the tree.

## Definition of Done

A change is not done until all of the following are true:

- the change fits the product narrative of the site
- content is consistent with the rest of the voice and fact pattern
- navigation and anchor links still work
- mobile and desktop layouts both hold up
- lint passes
- if the change is structural or styling-heavy, a production build should also pass

## Validation Commands

Run these from the repo root:

```bash
npm run lint
npm run build
```

Use `npm run dev` for manual review when making UI or copy changes that affect flow, spacing, or interactions.

## Good Change Examples

- tightening hero copy to make the positioning clearer and more specific
- improving metadata when the brand statement changes
- refining section hierarchy or spacing without breaking the existing aesthetic
- expanding `lib/content.ts` to support a richer but still structured career or timeline presentation
- improving photo rendering or fallback behavior while preserving the file-based workflow

## Bad Change Examples

- adding a CMS or database for simple static profile content
- spreading hardcoded biography text across multiple components
- replacing the established aesthetic with generic gradient-card SaaS UI
- introducing client-side state for content that can be rendered on the server
- adding animations that are louder than the content
- shipping copy that sounds exaggerated, vague, or obviously machine-written

## If You Are Unsure

When facing a tradeoff, bias toward:

1. stronger clarity
2. stronger credibility
3. less complexity
4. preserving the existing premium editorial feel
5. keeping the content system centralized in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts)
