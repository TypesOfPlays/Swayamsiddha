"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { site, asset } from "@/lib/site";
import { CountUp } from "@/components/count-up";

/**
 * Loaded through next/dynamic rather than a bare import() inside the
 * component. A plain dynamic import was measured landing three.js in an
 * initial <script> anyway — the bundler is free to hoist it, and it did —
 * which meant every visitor paid for a renderer most of them would never
 * see. This form is a hard split point: ssr:false keeps it out of the server
 * render, and nothing of it is fetched until the hero mounts.
 */
const HeroModel = dynamic(
  () => import("@/components/hero-model").then((m) => m.HeroModel),
  { ssr: false },
);

/**
 * The hero's subject: the building, in three dimensions, over the photograph.
 *
 * The photograph is not a placeholder to be discarded — it is the floor. It
 * renders first, carries `priority` so it is still the element the browser
 * treats as the largest paint, and stays mounted underneath. The model fades
 * over it only once it has actually drawn a frame. If WebGL is absent, if the
 * library fails to arrive over a bad connection, or if a low-memory handset
 * drops the context halfway through, nothing is removed and the hero is
 * simply the composition it was before.
 *
 * The caption changes with what is actually on screen, and says plainly that
 * the building is an illustration. It is a generated model of the entrance
 * rather than a photograph of it, and a diagnostics centre is the last place
 * to be vague about which of the two you are looking at.
 */
export function HeroVisual() {
  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading",
  );
  const modelShown = status === "ready";

  return (
    <div className="relative">
      {/* Double bezel: outer tray, inner plate, concentric radii */}
      <div className="rounded-[2rem] bg-surface/70 p-2 shadow-float ring-1 ring-line/80 backdrop-blur-sm">
        <div
          className="relative overflow-hidden rounded-[1.625rem] bg-canvas-sunk shadow-[inset_0_1px_2px_rgba(12,31,19,0.08)]"
          style={{ aspectRatio: "4 / 5" }}
        >
          <Image
            src={asset("/img/machines.webp")}
            alt="Automated biochemistry and haematology analysers in the Swayamsiddha Diagnostics laboratory"
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={`h-full w-full object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              modelShown ? "opacity-0" : "opacity-100"
            }`}
            style={{ objectPosition: "56% 66%" }}
          />

          {/* The stage the model stands on — a soft floor wash so the
              building has something to sit against rather than floating on
              a flat panel. Only paid for once the model is actually up. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 bg-[radial-gradient(78%_58%_at_50%_38%,var(--color-canvas)_0%,var(--color-canvas-sunk)_58%,var(--color-brand-soft)_100%)] transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              modelShown ? "opacity-100" : "opacity-0"
            }`}
          />

          <HeroModel
            onStatus={setStatus}
            className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              modelShown ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Grounding gradient so the caption stays legible over either */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-ink/70 to-transparent"
          />

          <div className="absolute inset-x-3 bottom-3 rounded-[1.125rem] bg-brand-ink/65 p-3 ring-1 ring-white/10 backdrop-blur-md">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/70">
              {modelShown ? "Where to find us" : "In our lab"}
            </p>
            <p className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-white">
              {modelShown
                ? `${site.address.line1} — look for the green signboard`
                : "Erba EM 200 NEO biochemistry & H 560 haematology analysers"}
            </p>
          </div>

          {/* Says what it is. The model is a generated impression of the
              entrance, not a photograph of the building. */}
          {modelShown && (
            <p className="absolute right-3 top-3 rounded-full bg-brand-ink/55 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-white/70 ring-1 ring-white/10 backdrop-blur-md">
              Illustration
            </p>
          )}
        </div>
      </div>

      {/* Same-day card, overlapping the frame. Removed below lg so it never
          fights the visual for touch targets. */}
      <div className="absolute -left-4 top-8 hidden rounded-[1.5rem] bg-surface p-1.5 shadow-lift ring-1 ring-line/80 lg:block">
        <div className="rounded-[1.125rem] bg-gold-soft px-4 py-3">
          <p className="text-[1.75rem] font-extrabold leading-none tracking-[-0.03em] text-ink tabular-nums">
            <CountUp value={site.testCount} />
          </p>
          <p className="mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold">
            Tests available
          </p>
        </div>
      </div>
    </div>
  );
}
