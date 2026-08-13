import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { LOGO_VIEWBOX, PETAL_PATHS, CROWN_PATH } from "@/lib/logo-paths";

/**
 * Boot veil. Plays on every page load, by choice of the owner.
 *
 * Rendered on the server so there is never a flash of page before it, and
 * dismissed by a CSS animation rather than by JavaScript — if a script fails
 * or is blocked, the veil still lifts on schedule and nobody is locked out.
 * The inline script in the layout only holds the scroll position meanwhile.
 *
 * The mark is the real logo, traced from assets/logo/logo.jpg into separate
 * subpaths (see lib/logo-paths.ts) so each of the 18 petals can bloom on its
 * own — impossible with the flat PNG. The petals are already positioned by
 * the traced geometry, so they need no rotation of their own; CSS only
 * scales them out from the centre of the viewBox.
 */
export function BootScreen() {
  return (
    <div className="boot" aria-hidden="true">
      <div className="boot__stage flex flex-col items-center px-6">
        <svg
          viewBox={LOGO_VIEWBOX}
          className="boot__mark h-44 w-44 text-brand sm:h-60 sm:w-60"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Petals bloom clockwise from the top */}
          {PETAL_PATHS.map((d, i) => (
            <path
              key={i}
              className="boot__petal"
              style={{ "--i": i } as CSSProperties}
              d={d}
            />
          ))}

          {/* Crown irises open last. evenodd keeps the lens-shaped opening
              in the crown's base a hole instead of a filled blob. */}
          <path className="boot__crown" fillRule="evenodd" d={CROWN_PATH} />
        </svg>

        <p className="boot__word mt-9 text-xl font-bold uppercase tracking-[0.34em] text-ink sm:text-2xl">
          Swayamsiddha
        </p>

        {/* The heartbeat, doubling as the rule under the name */}
        <svg
          viewBox="0 0 240 40"
          className="mt-4 h-8 w-64 sm:w-80"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 20 H72 l6 0 l4 -6 l5 12 l6 -26 l7 38 l6 -18 l4 0 H240"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="boot__trace"
          />
        </svg>

        <p className="boot__tag text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
          {site.tagline} · {site.address.city}
        </p>
      </div>
    </div>
  );
}
