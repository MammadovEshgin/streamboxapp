<p align="center">
  <img src="src/assets/logo.png" alt="StreamBox" width="120" />
</p>

<h1 align="center">StreamBox Website</h1>

<p align="center">
  The landing page and download portal for the StreamBox Android app, live at
  <a href="https://streamboxapp.stream">streamboxapp.stream</a>.<br />
  Prerendered React, compositor-only animations and adaptive rendering tiers keep it smooth on
  everything from a desktop browser to a low-end Android TV.
</p>

<p align="center">
  <a href="https://github.com/MammadovEshgin/streamboxapp/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/MammadovEshgin/streamboxapp/actions/workflows/ci.yml/badge.svg" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss" />
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare" />
  <img alt="Tests" src="https://img.shields.io/badge/tests-62%20passing-brightgreen" />
  <img alt="License" src="https://img.shields.io/badge/license-Proprietary-red" />
</p>

---

## Highlights

- **Smooth on Android TV** — every animation is a CSS transition or keyframe on `transform` and
  `opacity`, run by the browser's compositor thread. No JavaScript animation loop, no per-frame
  repaints. See [Rendering Architecture](#rendering-architecture).
- **Adaptive rendering tiers** — paint-heavy effects (backdrop blur, film grain, depth-of-field
  blur, the pulsing hero glow) are opt-in for capable devices. TV browsers, low-memory devices and
  anything that fails a two-second frame-rate probe get the lite tier automatically.
- **Fits the TV screen** — short-viewport breakpoints, height-capped phone mockups and a 5%
  title-safe area keep the whole hero on a 960×540 Android TV viewport, clear of overscan.
- **Prerendered HTML** — the page is rendered to static markup at build time and hydrated on the
  client, so the first paint needs no JavaScript at all.
- **No animation dependencies** — framer-motion and Embla are replaced by three small hooks
  (`useInView`, `useExitTransition`, `usePrefersReducedMotion`), a CSS motion layer and native
  scroll-snap.
- **Accessible by default** — native anchor navigation, ARIA tab and carousel semantics, a visible
  focus ring for D-pad remotes, and `prefers-reduced-motion` honoured end to end.
- **Guardrail tests** — architecture tests fail CI if a JS animation runtime, a Tailwind blur
  utility or an ungated filter sneaks back in.
- **Real 404s** — a static `404.html` replaces the SPA catch-all, so unknown URLs return HTTP 404
  instead of a soft 200.

## Tech Stack

| Layer         | Choice                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| UI            | React 19 — prerendered with `react-dom/server`, hydrated with `hydrateRoot` |
| Language      | TypeScript 6 (strict)                                                       |
| Build         | Vite 8 + SWC, pinned to a Chrome 87 / Safari 14 browser baseline            |
| Styling       | Tailwind CSS 3 + a hand-written motion layer in `src/index.css`             |
| Motion        | CSS transitions and keyframes, `IntersectionObserver`, CSS scroll-snap      |
| Icons & fonts | lucide-react, self-hosted variable Inter and Space Grotesk                  |
| Testing       | Vitest 5 + Testing Library + jsdom                                          |
| Quality       | ESLint 10 (type-aware), Prettier, GitHub Actions CI                         |
| Hosting       | Cloudflare Pages (Git integration, `_headers`, static `404.html`)           |

## Quick Start

### Prerequisites

- Node.js 22.12+ (pinned in [`.nvmrc`](.nvmrc))
- npm 10+

### Setup

```bash
git clone https://github.com/MammadovEshgin/streamboxapp.git
cd streamboxapp
npm install
npm run dev
```

Open <http://localhost:5173>. Append `?perf=lite` or `?perf=full` to the URL to force a rendering
tier — handy when checking the site on a real TV.

## Available Scripts

| Command                           | What it does                                                |
| --------------------------------- | ----------------------------------------------------------- |
| `npm run dev`                     | Vite dev server with HMR                                    |
| `npm run build`                   | Client build → SSR build → prerender into `dist/index.html` |
| `npm run preview`                 | Serve the production build locally                          |
| `npm test`                        | Run the Vitest suite once (62 tests across 9 files)         |
| `npm run test:watch`              | Vitest in watch mode                                        |
| `npm run typecheck`               | `tsc -b` across the app, test and tooling projects          |
| `npm run lint`                    | ESLint with type-aware rules                                |
| `npm run format` / `format:check` | Prettier write / verify                                     |
| `npm run verify`                  | Everything CI runs, in the same order                       |

## Project Structure

```
src/
├── App.tsx               Page composition
├── main.tsx              Client entry — resolves the rendering tier, then hydrates
├── entry-server.tsx      Build-time render used by the prerender step
├── index.css             Tokens, paint budget, motion layer, rendering tiers
├── assets/               Logo and responsive WebP screenshots (+ typed manifest)
├── components/           Page sections and primitives (Reveal, Floating, PhoneMockup, …)
├── content/              Copy and data — features, showcase tabs, release info
├── hooks/                useInView, useExitTransition, usePrefersReducedMotion
└── lib/                  Device detection, rendering tiers, frame-rate probe, helpers

tests/                    Vitest suites + IntersectionObserver / matchMedia test doubles
scripts/prerender.mjs     Injects the server-rendered markup into dist/index.html
public/                   Favicons, robots.txt, sitemap.xml, _headers, 404.html
```

## Rendering Architecture

### Why the previous build froze on Android TV

TV browsers pair a slow CPU with a weak GPU driving a 1080p or 4K surface. Profiling the previous
build with the Chrome DevTools Protocol at 6× CPU throttling showed four compounding problems:

1. **JavaScript-driven infinite animations.** Five framer-motion `y` loops (the floating phones)
   ran through `requestAnimationFrame`, writing styles on the main thread every frame — forever,
   including while off-screen.
2. **Filters re-rasterised every frame.** Those moving phones carried `drop-shadow(0 25px 50px)`
   and `blur(1px)` filters above a 600 px glow blurred by `blur(120px)` with a pulsing opacity
   animation. A `blur(150px)` element in the download section added the same cost with no visual
   at all — its background class was never generated.
3. **Film grain at full resolution.** The hero noise was an `feTurbulence` SVG without an intrinsic
   size, so it was rasterised across the entire hero instead of as a small tile.
4. **Backdrop blur on a fixed navbar.** `backdrop-filter: blur(20px)` is recomputed on every scroll
   frame.

### What replaced it

| Before                                                   | After                                                          |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| framer-motion `motion.*`, `useInView`, `AnimatePresence` | CSS transitions/keyframes + `useInView` + `useExitTransition`  |
| Embla carousel (JS-driven track)                         | Native CSS scroll-snap with `scrollTo({ behavior: "smooth" })` |
| `blur(120px)` / `blur(150px)` glow elements              | Radial gradients                                               |
| `drop-shadow()` on animated phones                       | `box-shadow` on the static phone frame                         |
| Hero-sized SVG grain                                     | 256 px tile, full tier only                                    |
| Backdrop blur for every device                           | Full tier only; a near-opaque surface otherwise                |
| Idle loops tick off-screen                               | `[data-motion="off"]` pauses them outside the viewport         |
| Blank page until the bundle runs                         | Prerendered HTML, hydrated in place                            |

### Rendering tiers

[`src/lib/performance.ts`](src/lib/performance.ts) sets `<html data-perf="full|lite">` before
hydration:

- **lite** — TV user agents (Android TV, Google TV, Fire TV, Tizen, webOS, Bravia, Mi TV, …),
  `deviceMemory ≤ 2 GB`, two or fewer CPU cores, Save-Data, or no pointing device (D-pad only).
- **full** — everything else. A two-second `requestAnimationFrame` probe then demotes the page to
  lite if the median frame exceeds 34 ms (below ~30 fps), which catches TV browsers that spoof a
  desktop user agent.

The stylesheet is lite-first: `[data-perf="full"]` is the only place a backdrop filter, a blur
filter, the pulsing glow or the grain may appear, and
[`tests/architecture.test.ts`](tests/architecture.test.ts) enforces it. Entrances, scroll reveals,
floating phones, tab transitions and the carousel run in both tiers.

### TV layout

Android TV browsers usually lay a 1080p panel out at 2× density — a 960×540 CSS viewport. The
previous hero was 832 px tall there, with the phone mockup running 210 px off the bottom of the
screen and the logo inside the overscan zone. Now:

- **Short-viewport breakpoints** — `short` (≤ 760 px tall) and `shorter` (≤ 600 px tall) Tailwind
  screens size the hero to the viewport and scale its type and spacing down. They key off the
  viewport, not the user agent, so they also cover TV browsers in desktop mode.
- **Height-capped mockups** — phone screenshots are limited by viewport height (for example
  `max-w-[32vh]` in the hero), so they never overflow a landscape screen.
- **Title-safe area** — on TVs, `html[data-device="tv"]` adds 5% side and 2.5% top insets so
  nothing sits where a set may overscan.

### Results

Same machine and session, Chrome DevTools Protocol, 6× CPU throttling, 1920×1080, six-second
windows:

| Metric                   | Before | After (full tier) | After (lite tier) |
| ------------------------ | -----: | ----------------: | ----------------: |
| Frame rate, idle on hero | 36 fps |            60 fps |            60 fps |
| Paints, idle on hero     |    309 |                 0 |                 0 |
| Frame rate, scrolling    | 57 fps |            60 fps |            60 fps |
| Paints, scrolling        |    437 |                74 |                74 |
| Logo image               | 303 KB |             33 KB |             33 KB |

## Testing

```bash
npm test            # 62 tests across 9 suites
npm run typecheck   # strict tsc pass
```

Coverage focuses on the regressions that would silently bring the freeze back or break the
download:

- `architecture.test.ts` — no JS animation or carousel runtime, no Tailwind blur utilities, every
  heavy filter gated behind the full tier, keyframes that animate only `transform` and `opacity`.
- `performance.test.ts` — tier detection against real TV user agents, `?perf` overrides, the
  median frame-budget rule, and the probe itself driven by a fake frame clock.
- `device.test.ts` — TV detection by user agent and by D-pad-only input, and the `data-device` flag.
- `App.test.tsx` — prerendered output, hydration with zero mismatches, the APK link and checksum,
  and a target for every in-page anchor.
- `ScreenshotsSection.test.tsx` / `useExitTransition.test.ts` — exit-then-enter tab transitions,
  retargeting mid-exit, reduced motion.
- `ScreenshotCarousel.test.tsx` — scroll-snap navigation, swipe sync, autoplay only while on screen
  with wrap-around, pause on hover, reduced motion.
- `useInView.test.tsx` / `Navbar.test.tsx` — observer lifecycle and latching; an inert mobile menu
  and native anchor navigation.

## Deployment

Cloudflare Pages builds every push to `main` with `npm run build` and publishes `dist/`; other
branches get preview deployments. GitHub Actions runs typecheck, lint, format, tests and the
production build on every push and pull request, installing with `npm ci` exactly like Pages does.

- [`public/_headers`](public/_headers) — security headers; hashed `/assets/*` cached immutably.
- [`public/404.html`](public/404.html) — served with a real 404 status for unknown paths.

### Releasing a new APK

1. Attach `StreamBox.apk` to a new GitHub release — the download button always resolves
   `releases/latest`.
2. Update `APK_SHA256` in [`src/content/release.ts`](src/content/release.ts) with the digest
   GitHub shows for the asset.

## Browser Support

The build targets Chrome 87, Edge 88, Firefox 78 and Safari 14 — deliberately older than Vite 8's
default, because Android TV WebViews trail desktop Chromium. Tailwind CSS stays on v3 for the same
reason: v4 requires Chromium 111+.

## License

Proprietary. © Eshgin Mammadov. All rights reserved.
