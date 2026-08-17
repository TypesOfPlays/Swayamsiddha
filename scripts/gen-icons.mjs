/**
 * Regenerates the site icons from public/img/logo-mark.png.
 *
 *   npm i --no-save sharp png-to-ico && node scripts/gen-icons.mjs
 *
 * Neither package is a dependency: this runs when the logo changes, which is
 * approximately never, and the outputs are committed.
 *
 * The sizes are not arbitrary. Google Search will only use a favicon that is
 * "a square that's a multiple of 48px" — 48, 96, 144, 192 and so on. The
 * icon here was 64×64, which browsers were perfectly happy with and Google
 * silently refused, showing a generic globe beside the search result
 * instead. A tab icon looking correct tells you nothing about the search
 * result; they are different requirements read by different software.
 *
 * /favicon.ico exists for the same reason. Google reads the <link rel="icon">
 * tag, but the root .ico is the older path it still checks, and it costs a
 * few kilobytes to remove all doubt.
 */

import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);

let sharp, pngToIco;
try {
  sharp = require("sharp");
  /* Ships as an ES module, so requiring it hands back the namespace object
     rather than the function itself. */
  const mod = require("png-to-ico");
  pngToIco = typeof mod === "function" ? mod : mod.default;
} catch {
  console.error(
    "Missing build-time tools. Install them for this run only:\n" +
      "  npm i --no-save sharp png-to-ico && node scripts/gen-icons.mjs",
  );
  process.exit(1);
}

const SRC = path.join(process.cwd(), "public/img/logo-mark.png");

const square = (size) =>
  sharp(SRC)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

/* 192 = 4 × 48. Large enough to stay crisp on a high-density screen and
   still a legal size for Google. */
const icon = await square(192);
await fs.writeFile("app/icon.png", icon);
console.log(`app/icon.png            192x192  ${icon.length} bytes`);

/* Apple's home-screen icon answers to Apple's spec, not Google's — 180 is
   correct here and is deliberately not rounded to a multiple of 48. */
const apple = await square(180);
await fs.writeFile("app/apple-icon.png", apple);
console.log(`app/apple-icon.png      180x180  ${apple.length} bytes`);

/* A real multi-resolution .ico rather than a PNG wearing the extension. */
const ico = await pngToIco([await square(16), await square(32), await square(48)]);
await fs.writeFile("app/favicon.ico", ico);
console.log(`app/favicon.ico         16/32/48 ${ico.length} bytes`);
