import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// Vite 7+ defaults to `baseline-widely-available` (Chrome 107+). Android TV browsers and
// WebViews trail desktop Chromium by years, so pin the broader pre-v7 baseline instead.
const BROWSER_TARGETS = ["chrome87", "edge88", "firefox78", "safari14"];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    target: ["es2020", ...BROWSER_TARGETS],
    cssTarget: BROWSER_TARGETS,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
    restoreMocks: true,
    unstubGlobals: true,
  },
});
