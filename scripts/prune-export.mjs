/**
 * Drops the client-navigation payloads from the static export.
 *
 * Next writes a `.txt` copy of every route's React Server Component payload
 * so that <Link> can swap pages without a full reload. On this site that
 * came to 603 KB across ten files — roughly a fifth of the whole deploy —
 * and not one byte of it is ever requested, because every link on the page
 * is a plain <a href="#section"> anchor. There is nowhere to navigate to.
 *
 * The guard below is the important part. The moment anyone imports
 * `next/link`, those payloads stop being dead weight and start being how
 * navigation works, and deleting them would break it. So this refuses to
 * prune rather than quietly breaking a future change, and says why.
 *
 * Runs after fix-og.mjs in the build script, so CI prunes too.
 */

import fs from "node:fs";
import path from "node:path";

const OUT = "out";

if (!fs.existsSync(OUT)) {
  console.log("prune-export: no out/ directory, skipping");
  process.exit(0);
}

/* Does anything actually navigate client-side? */
const sourceDirs = ["app", "components", "lib"];
const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? walk(p) : [p];
      })
    : [];

const usesLink = sourceDirs
  .flatMap(walk)
  .filter((f) => /\.(tsx?|jsx?)$/.test(f))
  .some((f) => /from\s+["']next\/link["']/.test(fs.readFileSync(f, "utf8")));

if (usesLink) {
  console.log(
    "prune-export: next/link is in use — the RSC payloads are how its\n" +
      "  navigation works, so nothing was removed. Delete this step from the\n" +
      "  build script if that is intentional.",
  );
  process.exit(0);
}

/* robots.txt is a real published file and must survive. */
const doomed = [];
const collect = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) collect(p);
    else if (e.name.endsWith(".txt") && e.name !== "robots.txt") doomed.push(p);
  }
};
collect(OUT);

let freed = 0;
for (const f of doomed) {
  freed += fs.statSync(f).size;
  fs.rmSync(f);
}

/* Directories the payloads left behind. */
const pruneEmpty = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) pruneEmpty(path.join(dir, e.name));
  }
  if (dir !== OUT && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
};
pruneEmpty(OUT);

console.log(
  `prune-export: removed ${doomed.length} unfetched RSC payload(s), ` +
    `${Math.round(freed / 1024)} KB`,
);
