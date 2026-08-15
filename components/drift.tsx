"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves its child a few pixels as it crosses the viewport.
 *
 * Small on purpose. The intent is that a wide photograph reads as a window
 * rather than a print stuck to the page, which needs perhaps thirty pixels
 * across a full screen of scrolling — enough that the eye registers depth,
 * not enough that anyone identifies it as a parallax effect.
 *
 * The scroll listener only exists while the element is on screen, so a page
 * with one of these costs nothing anywhere else on it. The child is scaled
 * slightly by CSS to cover the distance it travels; without that, the drift
 * would expose a bare edge inside the frame at one end or the other.
 */
export function Drift({
  distance = 30,
  className = "",
  children,
}: {
  distance?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      /* +1 when the element's middle sits at the top of the screen, -1 when
         it sits at the bottom, 0 as it passes the centre. */
      const centre = rect.top + rect.height / 2;
      const span = (vh + rect.height) / 2;
      const p = Math.max(-1, Math.min(1, (vh / 2 - centre) / span));

      el.style.setProperty("--drift", `${(p * distance).toFixed(2)}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    /* Listen only while it is actually on screen. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          measure();
          window.addEventListener("scroll", schedule, { passive: true });
          window.addEventListener("resize", schedule, { passive: true });
        } else {
          window.removeEventListener("scroll", schedule);
          window.removeEventListener("resize", schedule);
        }
      },
      { rootMargin: "10% 0px" },
    );

    observer.observe(el);
    measure();

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [distance]);

  return (
    <div ref={ref} className={`drift ${className}`}>
      {children}
    </div>
  );
}
