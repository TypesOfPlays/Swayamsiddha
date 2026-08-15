import Image, { type ImageProps } from "next/image";
import { asset } from "@/lib/site";
import { blurFor } from "@/lib/blur";

/**
 * next/image with the base path and the blur preview already applied.
 *
 * Two things every photograph on this site needs, both easy to forget at the
 * call site. `asset()` carries the base path — `images.unoptimized` is forced
 * on us by the static export, which makes next/image emit `src` verbatim, so
 * a bare "/img/…" would 404 on a project site. And the preview is a 14px
 * version inlined as a data URI, stretched and blurred until the real file
 * decodes.
 *
 * Take `src` as the plain public path, "/img/front.webp". Passing it through
 * `asset()` yourself would break the preview lookup and double the base path.
 */
export function Photo({
  src,
  /* Named rather than left to the spread. It is required either way, but
     passed through `...rest` the accessibility lint cannot see it and every
     call site gets flagged. */
  alt,
  ...rest
}: Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & { src: string }) {
  const blur = blurFor(src);

  return (
    <Image
      src={asset(src)}
      alt={alt}
      {...(blur ? { placeholder: "blur" as const, blurDataURL: blur } : {})}
      {...rest}
    />
  );
}
