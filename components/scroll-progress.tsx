"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress along the top edge.
 *
 * This was originally pure CSS, on `animation-timeline: scroll(root block)`
 * behind an `@supports` gate. That gate is useless here: the query reports
 * true while the timeline never actually advances, so the bar sat at
 * `scaleX(0)` for the life of the page and nobody could tell, because a bar
 * that never fills and a bar that isn't there look identical.
 *
 * So it is driven directly. The listener is passive and coalesced into one
 * rAF, and it writes a single custom property — no layout is read on the
 * scroll callback itself, and no React state is involved, so this never
 * re-renders anything.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const travel = doc.scrollHeight - doc.clientHeight;
      /* A page shorter than the viewport has no progress to report. Left at
         0 the bar is simply absent, which is the right answer. */
      const progress = travel > 0 ? doc.scrollTop / travel : 0;
      el.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    /* Sections reveal on scroll and images settle in, so the document keeps
       growing after first paint. Without this the bar reads full long before
       the page ends. */
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
