import { Reveal } from "@/components/reveal";
import { LOGO_VIEWBOX, PETAL_PATHS } from "@/lib/logo-paths";

/**
 * A letterhead rule, drawn from the logo's own petal ring.
 *
 * The second and last ornament on this page. The ECG rule already states the
 * rule this follows: a motif that returns reads as intent, the same shape
 * everywhere reads as wallpaper. So there are two marks, each used exactly
 * once, at two different seams — not one mark repeated between every section.
 *
 * This one closes the argument. It sits after the last question is answered
 * and before the invitation to call, which is where a letterhead ornament
 * belongs: marking the end of the reading, not decorating the middle of it.
 *
 * The two hairlines draw outward from the mark rather than fading in, so the
 * gesture reads as something being ruled onto the page.
 */
export function PetalRule() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Reveal
        bare
        className="petal-rule flex items-center justify-center gap-5 py-2"
      >
        <span className="petal-rule__line petal-rule__line--l" />
        <svg
          viewBox={LOGO_VIEWBOX}
          aria-hidden="true"
          className="petal-rule__mark h-7 w-7 shrink-0 text-brand/45"
        >
          {PETAL_PATHS.map((d, i) => (
            <path key={i} d={d} fill="currentColor" />
          ))}
        </svg>
        <span className="petal-rule__line petal-rule__line--r" />
      </Reveal>
    </div>
  );
}
