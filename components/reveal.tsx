"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger in ms. Kept small — this is a clinic, not a showreel. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "header";
  /**
   * Omit the fade-and-rise and expose only the `.is-in` hook, for callers
   * that want to drive their own transition off "this entered the viewport".
   */
  bare?: boolean;
  /**
   * How the element arrives. Three movements, not fifteen — the point is a
   * system the page repeats with intent, rather than every section entering
   * identically or every section entering differently.
   *
   * - `rise`   text-led blocks. The default, and still most of the page.
   * - `settle` panels and cards: eases down from slightly larger, so it
   *            reads as arriving into place rather than sliding up into it.
   * - `wipe`   text blocks on full-bleed bands, uncovered from the bottom.
   *            Never put this on anything with an outer shadow — clip-path
   *            cuts the shadow off with the box.
   */
  variant?: "rise" | "settle" | "wipe";
};

/**
 * Fade-and-rise on scroll entry via IntersectionObserver.
 *
 * Never a scroll listener: those fire continuously and drop frames on the
 * mid-range Android handsets most of this page's traffic will use. The
 * observer disconnects after the first intersection, so there is no
 * lingering work once an element has appeared.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  bare = false,
  variant = "rise",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion is handled entirely in CSS: the `.reveal` rule under
    // `prefers-reduced-motion: reduce` pins opacity to 1 and drops the
    // transform, so these elements are visible no matter what the observer
    // does. Nothing to branch on here.

    const supported = typeof IntersectionObserver !== "undefined";

    /* Two safety nets, and the reason they exist: a section really did ship
       blank. The content was in the DOM and the CSS was correct — `.is-in`
       simply never arrived.

       The first is a plain geometry check, once, shortly after mount. If
       this element is already on screen and the observer still has not said
       so, the observer is not to be trusted and the content goes up
       immediately. That covers the case that actually hurts: somebody
       staring at an empty band right now.

       The second is an absolute backstop for everything else. Ten seconds
       is deliberately long — short enough that nobody sits looking at empty
       colour, long enough that it never pre-empts a reader scrolling down
       at a normal pace and stealing the animation from the section they are
       about to reach.

       A browser with no IntersectionObserver at all skips both and simply
       gets the content, rather than an animation nothing can drive. */
    const onScreen = () => {
      const r = node.getBoundingClientRect();
      const h = window.innerHeight || 0;
      return r.top < h && r.bottom > 0 && r.height > 0;
    };

    const nudge = setTimeout(
      () => {
        if (!supported || onScreen()) {
          setShown(true);
          observer?.disconnect();
          clearTimeout(failsafe);
        }
      },
      supported ? 1_500 : 0,
    );

    const failsafe = setTimeout(() => {
      setShown(true);
      observer?.disconnect();
    }, 10_000);

    const observer = supported
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            setShown(true);
            observer?.disconnect();
            clearTimeout(nudge);
            clearTimeout(failsafe);
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
        )
      : null;

    observer?.observe(node);

    return () => {
      observer?.disconnect();
      clearTimeout(nudge);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${bare ? "" : `reveal reveal--${variant}`} ${
        shown ? "is-in" : ""
      } ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
