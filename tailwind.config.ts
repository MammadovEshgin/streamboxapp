import type { Config } from "tailwindcss";

// Tailwind stays on v3: v4 emits `@layer`, `@property` and `color-mix()`, which require
// Chromium 111+ and would break the older WebViews shipped on Android TV devices.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      screens: {
        // Landscape viewports too short for the full-height hero. TV browsers report 1280×720
        // or 960×540 (a 1080p panel at 2× density); these win over the width breakpoints.
        short: { raw: "(min-width: 768px) and (max-height: 760px)" },
        shorter: { raw: "(min-width: 768px) and (max-height: 600px)" },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "system-ui", "sans-serif"],
        body: ['"Inter Variable"', "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
      },
    },
  },
} satisfies Config;
