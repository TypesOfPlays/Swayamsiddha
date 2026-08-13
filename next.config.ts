import type { NextConfig } from "next";

/**
 * A GitHub Pages project site is served from https://<user>.github.io/<repo>,
 * so every asset URL needs that prefix. The deploy workflow injects it from
 * the repository name itself, which means this keeps working if the repo is
 * ever renamed, and stays empty for local development.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* Emits a plain HTML/CSS/JS folder into out/. The site uses no server
     features — no route handlers, no server actions — so nothing is lost. */
  output: "export",

  basePath,
  assetPrefix: basePath || undefined,

  /* Pages has no directory-index rewriting, so /about must resolve to
     /about/index.html. This makes Next emit exactly that shape. */
  trailingSlash: true,

  images: {
    /* There is no image server on Pages, so next/image cannot resize on
       demand. The files in public/img were pre-resized to their real
       display sizes instead (1.5MB -> 330KB). */
    unoptimized: true,
  },
};

export default nextConfig;
