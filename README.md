<p align="center">
  <img src="src/assets/logo.png" alt="StreamBox" width="120" />
</p>

<h1 align="center">StreamBox Website</h1>

<p align="center">
  The landing page and download portal for the StreamBox Android app —
  <a href="https://streamboxapp.stream">streamboxapp.stream</a>
</p>

<p align="center">
  <a href="https://github.com/MammadovEshgin/streamboxapp/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/MammadovEshgin/streamboxapp/actions/workflows/ci.yml/badge.svg" /></a>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss" />
  <img alt="Cloudflare Pages" src="https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare" />
  <img alt="License" src="https://img.shields.io/badge/license-Proprietary-red" />
</p>

---

## Highlights

- **Prerendered** — static HTML generated at build time and hydrated on the client.
- **Lightweight motion** — CSS-only animations with no animation libraries, smooth on phones,
  desktops and Android TV.
- **Adaptive rendering** — heavier visual effects are enabled only on devices that can afford them.
- **Accessible** — keyboard and TV-remote friendly, respects `prefers-reduced-motion`.

## Tech Stack

| Layer   | Choice                           |
| ------- | -------------------------------- |
| UI      | React 19, TypeScript             |
| Build   | Vite 8                           |
| Styling | Tailwind CSS 3                   |
| Testing | Vitest, Testing Library          |
| Quality | ESLint, Prettier, GitHub Actions |
| Hosting | Cloudflare Pages                 |

## Quick Start

Requires Node.js 22.12+.

```bash
git clone https://github.com/MammadovEshgin/streamboxapp.git
cd streamboxapp
npm install
npm run dev
```

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run build`     | Production build with prerendering            |
| `npm run preview`   | Serve the production build locally            |
| `npm test`          | Run tests                                     |
| `npm run typecheck` | Type-check the project                        |
| `npm run lint`      | Lint the project                              |
| `npm run verify`    | Typecheck, lint, format check, test and build |

## Project Structure

```
src/
├── components/   Page sections and UI primitives
├── content/      Copy, features and release info
├── hooks/        Shared React hooks
├── lib/          Device detection and utilities
└── assets/       Logo and app screenshots
tests/            Test suites
scripts/          Build scripts (prerender)
public/           Static files, headers and 404 page
```

## Deployment

Every push to `main` is built and deployed by Cloudflare Pages.

To publish a new APK, attach `StreamBox.apk` to a new GitHub release and update `APK_SHA256` in
[`src/content/release.ts`](src/content/release.ts).

## License

Proprietary. © Eshgin Mammadov. All rights reserved.
