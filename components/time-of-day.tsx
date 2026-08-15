"use client";

import { useEffect } from "react";
import { labMinutes } from "@/lib/hours";

/**
 * Stamps the hour band onto the document so the hero's light can follow it.
 *
 * Nothing about this should be noticeable. It shifts one colour a few
 * percent — cooler at six in the morning, warmer toward closing — so the page
 * feels like it belongs to the time you opened it rather than being printed
 * once. If a reader can name what changed, it has been overdone.
 *
 * Deliberately client-only: a static export bakes the server render at build
 * time, so a band chosen on the server would be whatever hour the deploy ran.
 * With no attribute set, the CSS falls back to the daytime palette, which is
 * what the page looked like before this existed.
 */
export function TimeOfDay() {
  useEffect(() => {
    const apply = () => {
      const t = labMinutes(new Date());
      /* Bands, not a continuous ramp. The lab opens at 6 and closes at 9,
         and these edges sit inside that window rather than at midnight. */
      const band = t < 8 * 60 ? "dawn" : t < 16 * 60 ? "day" : "dusk";
      document.documentElement.dataset.tod = band;
    };

    apply();
    const id = setInterval(apply, 15 * 60_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
