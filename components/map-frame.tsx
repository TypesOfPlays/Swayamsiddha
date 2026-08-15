"use client";

import { useState } from "react";
import { LOGO_VIEWBOX, PETAL_PATHS } from "@/lib/logo-paths";

/**
 * Google's map, behind a veil of our own until it arrives.
 *
 * The embed paints its own flat grey panel the instant the element exists,
 * well before any tiles land, and that grey rectangle was the one crude
 * moment on the page. The previous treatment faded the frame in on a fixed
 * 0.6s timer, which meant it faithfully revealed the grey.
 *
 * So the swap is driven by the iframe's own load event instead of a clock.
 * The veil holds until Google says it has something, then the two cross-fade.
 * On a slow rural connection the reader waits on a mark of ours rather than
 * on somebody else's placeholder.
 */
export function MapFrame({ src, title }: { src: string; title: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative h-[19rem] w-full sm:h-[23rem] lg:h-full lg:min-h-[26rem]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setReady(true)}
        data-ready={ready || undefined}
        className="map-frame__map absolute inset-0 h-full w-full border-0"
      />

      <div
        aria-hidden="true"
        data-ready={ready || undefined}
        className="map-frame__veil absolute inset-0 grid place-items-center bg-canvas-sunk"
      >
        <div className="absolute inset-0 bg-[radial-gradient(62%_62%_at_50%_44%,var(--color-brand-tint)_0%,transparent_72%)]" />
        <svg
          viewBox={LOGO_VIEWBOX}
          className="map-frame__mark relative h-16 w-16 text-brand/25"
        >
          {PETAL_PATHS.map((d, i) => (
            <path key={i} d={d} fill="currentColor" />
          ))}
        </svg>
      </div>
    </div>
  );
}
