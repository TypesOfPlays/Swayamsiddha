"use client";

import { useEffect, useRef } from "react";

/**
 * Pulls its child gently toward the cursor, then lets it fall back.
 *
 * Desktop only, and deliberately so: it listens for a fine pointer that can
 * actually hover, so phones and tablets never pay for the listener. The
 * movement is capped in pixels rather than scaled freely, so a fast flick
 * across the button can't fling it somewhere silly.
 *
 * The transition is what sells it — the element lags the cursor slightly
 * instead of tracking it exactly, which is what reads as weight.
 */
export function Magnetic({
  children,
  strength = 0.25,
  max = 9,
  className = "inline-flex",
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduced.matches) return;

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const clamp = (n: number) => Math.max(-max, Math.min(max, n));
        el.style.transform = `translate3d(${clamp(dx * strength)}px, ${clamp(
          dy * strength,
        )}px, 0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, max]);

  return (
    <span
      ref={ref}
      className={`transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${className}`}
    >
      {children}
    </span>
  );
}
