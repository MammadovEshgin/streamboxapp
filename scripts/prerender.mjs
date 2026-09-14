/**
 * Injects the server-rendered landing page into dist/index.html, so the first paint needs
 * no JavaScript — on a slow Android TV CPU that is the difference between an instant page
 * and a blank screen while the bundle parses. The client bundle then hydrates the markup.
 *
 * Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
 */
import { readFile, rm, writeFile } from "node:fs/promises";

const ROOT_MARKER = '<div id="root"></div>';
const templateUrl = new URL("../dist/index.html", import.meta.url);
const serverOutDir = new URL("../dist-ssr/", import.meta.url);

const { render } = await import(new URL("entry-server.js", serverOutDir).href);
const template = await readFile(templateUrl, "utf8");

if (!template.includes(ROOT_MARKER)) {
  throw new Error(`prerender: "${ROOT_MARKER}" not found in dist/index.html`);
}

const appHtml = render();
const page = template.replace(ROOT_MARKER, () => `<div id="root">${appHtml}</div>`);

await writeFile(templateUrl, page);
await rm(serverOutDir, { recursive: true, force: true });

console.log(
  `prerender: wrote ${(appHtml.length / 1024).toFixed(1)} KiB of markup to dist/index.html`
);
