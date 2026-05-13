import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.resolve(__dirname, "../screenshots-source");
const OUT = path.resolve(__dirname, "../src/assets/screens");

const SIZES = [
  { w: 480, suffix: "sm" },
  { w: 768, suffix: "md" },
];

const slug = (name) =>
  name
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function run() {
  if (!existsSync(SOURCE)) {
    console.error(`Source folder not found: ${SOURCE}`);
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SOURCE)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const file of files) {
    const base = slug(file);
    const input = path.join(SOURCE, file);
    for (const { w, suffix } of SIZES) {
      const pipeline = sharp(input).resize(w, null, { withoutEnlargement: true });
      await pipeline.clone().avif({ quality: 55 }).toFile(path.join(OUT, `${base}-${suffix}.avif`));
      await pipeline.clone().webp({ quality: 72 }).toFile(path.join(OUT, `${base}-${suffix}.webp`));
      await pipeline.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT, `${base}-${suffix}.jpg`));
    }
    console.log(`✓ ${base}`);
  }
  console.log(`\nWrote ${files.length * SIZES.length * 3} image variants to ${OUT}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
