# AGENT.md

## Purpose

This repository is Dev Deepak's personal website. It is a tightly scoped brand and credibility surface, not a general content platform. Every change should improve at least one of these outcomes:

- make Dev look credible, differentiated, and high-agency
- make the story easier to scan and easier to trust
- keep the site polished, fast, and strong on mobile and desktop

The quality bar is closer to a deliberate editorial portfolio than a template resume site.

## Product Principles

- Preserve a point of view. The site should feel intentional and distinctive, not generic.
- Prefer specificity over hype. Real roles, dates, and outcomes beat vague claims.
- Protect trust. Do not add inflated claims, unverifiable metrics, or AI-sounding filler.
- Optimize for skim value. Most visitors should understand who Dev is and what he has done within one fast scroll.
- Respect the current simplicity. The app is intentionally narrow, so add complexity only when it clearly improves the narrative.

## Current Architecture

- Framework: Next.js App Router with TypeScript
- Styling: Tailwind CSS with lightweight project font tokens in [`app/globals.css`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/globals.css) and [`tailwind.config.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/tailwind.config.ts)
- Motion: `framer-motion`, used directly in [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx) and [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx), with shared reveal behavior in [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx)
- Shared layout primitive: [`components/ui/Container.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Container.tsx)
- Content source: [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts)
- Utility helper: [`lib/utils.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/utils.ts)
- Assets: [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos)
- Page composition: [`app/page.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/page.tsx)
- Metadata and global shell: [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx)

## Operating Rules

### 1. Change the right layer

- Put site metadata and structured timeline content in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts).
- Change component code only when presentation, composition, or interaction needs to change.
- Do not duplicate profile content across multiple components if it can live once in `lib/content.ts`.
- Keep shared primitives in [`components/ui`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui).

### 2. Preserve the current information architecture

The homepage currently flows through:

1. Hero
2. Timeline

When editing:

- keep the section order intentional
- preserve stable section `id`s unless there is a strong reason to change them
- update related anchor targets if any `id` changes
- do not reintroduce removed sections unless there is a clear product reason

### 3. Maintain the visual language

The live site is not the older dark electric-blue concept. Its current direction is:

- bright editorial presentation
- restrained palette with subtle blue accents
- large condensed headline typography
- clean white space and soft atmospheric gradients
- premium motion without visual noise

Do not regress this into a generic SaaS landing page, a resume template, or an over-styled animation demo.

When adding UI:

- reuse `Container` and `Reveal` where they fit
- keep typography deliberate and spacing generous
- prefer subtle atmosphere over loud visual effects
- ensure layouts hold up on small screens first, not only on desktop

### 4. Be disciplined with motion

- Preserve reduced-motion behavior.
- Prefer the shared [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx) wrapper for simple scroll-in motion.
- Keep motion meaningful and minimal.
- Do not add animation that harms readability, causes layout instability, or competes with the content.

### 5. Respect server/client boundaries

- [`app/page.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/page.tsx) and [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx) remain server components.
- [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx), [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx), and [`components/ui/Reveal.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui/Reveal.tsx) are client components because they depend on Framer Motion hooks and viewport interactions.
- Only add `"use client"` where interactivity genuinely requires it.
- Keep client components narrow and justified.

### 6. Treat images and logos as product assets

- Keep timeline photography and brand assets in [`public/photos`](/Users/devdeepak/Desktop/DevDeepakWebsite/public/photos).
- Timeline entries live in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts), while brand theming and logo selection live in [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx).
- Logo rendering rules live in [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx).
- Use `next/image` for rendered images.
- Be careful with oversized assets and image count; the site should stay fast.

### 7. Protect copy quality

Copy on this site should sound like a high-performing operator with real ambition and evidence, not a recruiter summary or motivational poster.

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
- unsupported claims
- bloated paragraphs where a sharper sentence would do

## File-Specific Guidance

### [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts)

- This is the primary source of truth for site metadata and timeline entries.
- Keep data structures clean, typed by inference, and easy to scan.
- Preserve naming consistency and avoid unnecessary shape churn.
- When adding fields, update only the components that actually need them.

### [`app/page.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/page.tsx)

- Keep this file focused on page composition.
- Do not move large data blobs or styling logic into it.
- It should stay easy to scan.

### [`app/layout.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/layout.tsx)

- Keep metadata accurate and aligned with `siteConfig`.
- Preserve canonical, Open Graph, and Twitter metadata coverage.
- If branding or positioning changes, update metadata intentionally and completely.

### [`app/globals.css`](/Users/devdeepak/Desktop/DevDeepakWebsite/app/globals.css)

- Use this for global tokens, base styles, and shared utilities.
- Avoid moving section-specific styling here unless it truly belongs at the global layer.
- Protect readability, contrast, and overall visual restraint.

### [`components/Hero.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Hero.tsx)

- The hero must answer who Dev is and why he is worth paying attention to quickly.
- Keep the message concise.
- Preserve the strong headline treatment and controlled motion.

### [`components/Timeline.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/Timeline.tsx)

- Keep the timeline easy to scan across mobile and desktop.
- Preserve the relationship between timeline data in `lib/content.ts` and visual theming in this component.
- Be careful with hover motion, parallax, and collage layouts so they stay tasteful and performant.
- Maintain accessible alt text and sensible fallbacks for entries without logos.

### [`components/ui/*.tsx`](/Users/devdeepak/Desktop/DevDeepakWebsite/components/ui)

- These are primitives. Keep them generic, small, and reusable.
- If a pattern is tightly coupled to one section, it probably belongs in that section component instead.

## Engineering Standards

- Keep TypeScript clean. Avoid `any` unless there is a clear reason.
- Prefer simple data flow over abstraction-heavy patterns.
- Do not add dependencies lightly. This repo is small and should stay lean.
- Preserve accessibility: semantic structure, usable focus states, reduced-motion support, and descriptive alt text.
- Preserve performance: avoid unnecessary client components, large hydration surfaces, and heavy runtime logic.
- Preserve maintainability: keep content centralized and avoid duplicated constants.

## Definition of Done

A change is not done until all of the following are true:

- the change fits the site's narrative and quality bar
- copy is consistent with the rest of the voice and fact pattern
- mobile and desktop layouts both hold up
- lint passes
- if the change is structural or styling-heavy, a production build should also pass

## Validation Commands

Run these from the repo root:

```bash
npm run dev
npm run lint
npm run build
```

There is no test suite. For most changes, lint should pass. For structural or visual changes, the production build should also succeed.

## Good Change Examples

- tightening hero copy to make positioning clearer
- refining timeline spacing, typography, or motion without hurting scanability
- improving metadata when the brand statement changes
- extending `lib/content.ts` to support a richer but still structured timeline
- improving logo fallbacks or image treatment while preserving performance

## Bad Change Examples

- adding a CMS or database for simple static profile content
- spreading biography text across multiple components
- reintroducing removed sections without a strong reason
- adding client-side state for content that can be static
- shipping copy that sounds exaggerated, vague, or machine-generated
- adding animation that is louder than the story

## If You Are Unsure

When facing a tradeoff, bias toward:

1. stronger clarity
2. stronger credibility
3. less complexity
4. preserving the current editorial feel
5. keeping content centralized in [`lib/content.ts`](/Users/devdeepak/Desktop/DevDeepakWebsite/lib/content.ts)
