"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * The real number is rendered in the server HTML and the animation mutates
 * textContent directly rather than going through React state. That keeps the
 * correct figure in the markup for search engines and for anyone without
 * JavaScript, and avoids a hydration mismatch — a state-based counter would
 * ship a "0" to both.
 */
export function CountUp({
  value,
  duration = 1200,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const start = performance.now();
        el.textContent = "0";

        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          // Cubic ease-out: fast off the line, settles rather than stops.
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
