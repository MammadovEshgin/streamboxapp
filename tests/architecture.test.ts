/**
 * Guardrails for the Android TV freeze. The page used to animate through a JavaScript
 * runtime and paint with huge blur/drop-shadow/backdrop filters; on TV-class GPUs every
 * frame re-rasterised them and the browser locked up. These tests keep it from coming back.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Vitest runs from the project root.
const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const sourceFiles = readdirSync(SRC, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(ts|tsx)$/.test(entry.name))
  .map((entry) => {
    const path = join(entry.parentPath, entry.name);
    return { path, code: readFileSync(path, "utf8") };
  });

const stylesheet = readFileSync(join(SRC, "index.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

/** Innermost `selector { declarations }` blocks — enough for this flat, hand-written stylesheet. */
const cssRules = [...stylesheet.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(
  ([, selector = "", body = ""]) => ({
    selector: selector.trim(),
    body,
  })
);

describe("rendering architecture", () => {
  it("ships no JavaScript animation or carousel runtime", () => {
    const manifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
      dependencies: Record<string, string>;
    };

    expect(Object.keys(manifest.dependencies)).not.toEqual(
      expect.arrayContaining([expect.stringMatching(/^(framer-motion|motion|embla-carousel.*)$/)])
    );
    for (const { path, code } of sourceFiles) {
      expect(code, path).not.toMatch(
        /from ["'](framer-motion|motion(\/.*)?|embla-carousel[\w-]*)["']/
      );
    }
  });

  it("never reaches for Tailwind blur, drop-shadow or backdrop utilities", () => {
    for (const { path, code } of sourceFiles) {
      expect(code, path).not.toMatch(/\b(backdrop-blur|blur-\S+|drop-shadow)/);
    }
  });

  it("keeps every paint-heavy filter behind the full rendering tier", () => {
    const heavyRules = cssRules.filter(({ body }) =>
      /backdrop-filter|(^|[\s;])filter\s*:\s*(blur|drop-shadow)/.test(body)
    );

    expect(heavyRules.length).toBeGreaterThan(0);
    for (const { selector } of heavyRules) {
      expect(selector).toContain('[data-perf="full"]');
    }
  });

  it("animates only compositor-friendly properties in keyframes", () => {
    const keyframeSteps = cssRules.filter(({ selector }) =>
      /^(from|to|[\d.%,\s]+)$/.test(selector)
    );
    const animatedProperties = new Set(
      keyframeSteps.flatMap(({ body }) =>
        body
          .split(";")
          .map((declaration) => declaration.split(":")[0]?.trim())
          .filter((property): property is string => Boolean(property))
      )
    );

    expect(keyframeSteps.length).toBeGreaterThan(0);
    expect([...animatedProperties].sort()).toEqual(["opacity", "transform"]);
  });
});
