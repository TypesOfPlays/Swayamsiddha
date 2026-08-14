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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${bare ? "" : "reveal"} ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
