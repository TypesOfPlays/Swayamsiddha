import { Reveal } from "@/components/reveal";

/**
 * The boot screen's heartbeat, echoed once mid-page.
 *
 * A motif that returns reads as intent; the same shape used everywhere reads
 * as wallpaper. This appears exactly once, at the quietest seam on the page.
 * The draw is triggered by `.reveal.is-in` in globals.css, so it reuses the
 * existing IntersectionObserver rather than adding another.
 */
export function EcgRule() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal className="flex justify-center">
        <svg
          viewBox="0 0 240 40"
          className="ecg-rule h-10 w-full max-w-md text-brand/45"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 20 H72 l6 0 l4 -6 l5 12 l6 -26 l7 38 l6 -18 l4 0 H240"
            pathLength={100}
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Three beats travel the line once it has drawn, then it rests */}
          <path
            className="ecg-pulse"
            d="M0 20 H72 l6 0 l4 -6 l5 12 l6 -26 l7 38 l6 -18 l4 0 H240"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Reveal>
    </div>
  );
}
