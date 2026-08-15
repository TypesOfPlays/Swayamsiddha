"use client";

import { useEffect, useState } from "react";
import { openStateAt, type OpenState } from "@/lib/hours";

/**
 * Live "Open now · until 9 PM" pill.
 *
 * Renders nothing on the server and nothing on the first client paint. That
 * is deliberate: this page is a static export, so anything rendered on the
 * server is frozen at build time — a status baked in at 3 PM in August would
 * still claim the lab was open at midnight in December. Mounting empty and
 * filling in after hydration is the only honest option, and it is also the
 * one with no hydration mismatch.
 *
 * The published opening hours are still in the markup for crawlers, in the
 * Timings card and the structured data. This only serves the reader.
 */
export function OpenStatus({
  className = "",
  detail = true,
}: {
  className?: string;
  /** Drop the "· until 9 PM" tail where space is tight. */
  detail?: boolean;
}) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(openStateAt(new Date()));
    update();
    /* A minute is fine: the only moments that matter are 6 AM, 8 PM and
       9 PM, and being up to 60s late on those costs nothing. */
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) return null;

  const tone = state.open
    ? state.closingSoon
      ? "text-gold"
      : "text-brand"
    : "text-ink-muted";

  return (
    <p
      className={`open-status inline-flex items-center gap-2 ${tone} ${className}`}
      data-open={state.open || undefined}
    >
      <span className="open-status__dot" aria-hidden="true" />
      <span className="font-semibold">{state.label}</span>
      {/* A real space, not just the flex gap. Gap separates the boxes but
          leaves no character between them, so a screen reader would run the
          two together as "Open nowuntil 9 PM". Whitespace-only text nodes are
          dropped from flex layout, so this changes nothing visually. */}
      {detail && " "}
      {detail && (
        <span className="open-status__detail font-medium text-ink-muted">
          {state.detail}
        </span>
      )}
    </p>
  );
}
