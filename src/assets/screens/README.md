# App screen assets

Responsive AVIF / WebP / JPEG variants of each app screenshot, generated from
the source images in `site/screenshots-source/` by
`site/scripts/optimize-images.mjs`.

- **Do not edit files in this directory by hand.** They are derived assets.
- To add or replace a screen: drop the high-resolution source into
  `../../../screenshots-source/`, then run
  `node scripts/optimize-images.mjs` from the `site/` directory.
- Update `manifest.ts` if you add a new screen — that file is the single
  source of truth for components (`Screenshot.tsx`, `PhoneMockup.tsx`).
