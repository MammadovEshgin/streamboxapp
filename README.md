# StreamBox

> Landing page and download portal for StreamBox — a premium Android app for streaming movies and series.

<p align="center">
  <img src="src/assets/logo.png" alt="StreamBox logo" width="120" />
</p>

---

## Live Site

| Environment | URL |
|---|---|
| Production | [streamboxapp.pages.dev](https://streamboxapp.pages.dev) |
| Custom domain | [streamboxapp.stream](https://streamboxapp.stream) *(when configured)* |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| Build tool | [Vite 5](https://vitejs.dev) (SWC) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) |
| Animations | [Framer Motion](https://www.framer.com/motion) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (headings) · [Inter](https://fonts.google.com/specimen/Inter) (body) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| APK hosting | [GitHub Releases](https://github.com/MammadovEshgin/streamboxapp/releases) |

---

## Project Structure

```
├── public/
│   ├── favicon.ico          # App icon (multi-size ICO)
│   ├── _headers              # Cloudflare cache & security headers
│   ├── _redirects             # SPA catch-all for deep links
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   ├── logo.png           # Brand logo
│   │   └── screens/           # App screenshots (WebP, 2 sizes each)
│   │       └── manifest.ts    # Typed screen imports
│   ├── components/
│   │   ├── landing/           # Page-level components
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ScreenshotsSection.tsx
│   │   │   ├── AppShowcase.tsx
│   │   │   ├── DownloadSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PhoneMockup.tsx
│   │   │   └── ScreenshotCarousel.tsx
│   │   └── ui/                # Shared UI primitives
│   │       ├── sonner.tsx
│   │       └── tooltip.tsx
│   ├── lib/
│   │   └── utils.ts           # Tailwind merge helper
│   ├── pages/
│   │   ├── Index.tsx           # Home page
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Root component + router
│   ├── main.tsx                # Entry point + font imports
│   └── index.css               # Design tokens + utility classes
├── index.html                  # HTML shell
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20 ([install via nvm](https://github.com/nvm-sh/nvm))
- **npm** ≥ 10

### Install & Run

```bash
# Clone the repository
git clone https://github.com/MammadovEshgin/streamboxapp.git
cd streamboxapp

# Install dependencies
npm install

# Start dev server (http://localhost:8080)
npm run dev
```

### Build for Production

```bash
npm run build    # Output → dist/
npm run preview  # Preview the production build locally
```

---

## Deployment

This project is deployed to **Cloudflare Pages** with automatic Git integration.

**Every push to `main` triggers a new deployment.**

| Setting | Value |
|---|---|
| Framework preset | React (Vite) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | `20` (set via `NODE_VERSION` env var) |

---

## Updating the APK

The Android APK is hosted via **GitHub Releases** to bypass the 100MB Git file size limit.

### Steps to release a new version:

1. Go to [Releases](https://github.com/MammadovEshgin/streamboxapp/releases).
2. Click **"Draft a new release"**.
3. Create a new tag (e.g., `v1.1.0`).
4. Upload the new `.apk` file.
5. Publish the release.
6. Update the download URL in `src/components/landing/DownloadSection.tsx`.
7. Commit, push, and Cloudflare auto-deploys.

---

## License

This project is proprietary. All rights reserved.
