import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import {
  IconDoor,
  IconTube,
  IconAnalyzer,
  IconReport,
} from "@/components/icons";

/**
 * The wave threads through the four station points below, so the dots sit
 * exactly on the curve rather than being nudged into place by eye. Each
 * cubic ends on a station with a near-horizontal tangent, which is what
 * gives the line its easy roll.
 */
const WAVE =
  "M0 74 C60 74 90 40 150 40 C240 40 330 84 450 84 C570 84 640 32 750 32 C860 32 940 76 1050 76 C1130 76 1160 62 1200 60";

const STATIONS = [
  { x: 150, y: 40 },
  { x: 450, y: 84 },
  { x: 750, y: 32 },
  { x: 1050, y: 76 },
];

const steps = [
  {
    n: "01",
    icon: IconDoor,
    title: "Walk in or call ahead",
    body: "No appointment needed for routine tests. Bring your prescription if you have one, and ask the rate at the counter before anything is drawn.",
  },
  {
    n: "02",
    icon: IconTube,
    title: "Sample taken",
    body: "A fresh needle and a sealed vacutainer, opened in front of you. X-ray and ECG are done in the same visit — no second trip.",
  },
  {
    n: "03",
    icon: IconAnalyzer,
    title: "Run on the analyser",
    body: "Your sample goes straight onto a closed automated system. Daily controls run alongside it, so the numbers are checked before they reach you.",
  },
  {
    n: "04",
    icon: IconReport,
    title: "Report the same day",
    body: "Most routine reports are ready the same day. Collect at the counter, or ask us to send it to you on WhatsApp.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-canvas-sunk py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            From the counter to{" "}
            <em className="text-display italic font-normal">your report</em>.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            Four steps, no queue-jumping, and nothing that needs a second trip
            across town.
          </p>
        </Reveal>

        {/* The journey line. Only drawn where all four cards sit in a row —
            below that the cards stack and a vertical connector takes over. */}
        <Reveal className="mt-16 hidden lg:block">
          <svg
            viewBox="0 0 1200 120"
            className="journey w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="journey__line"
              d={WAVE}
              stroke="var(--color-brand)"
              strokeOpacity={0.35}
              strokeWidth={2}
              strokeLinecap="round"
            />

            {STATIONS.map((s, i) => (
              <circle
                key={i}
                cx={s.x}
                cy={s.y}
                r={7}
                fill="var(--color-canvas-sunk)"
                stroke="var(--color-brand)"
                strokeOpacity={0.55}
                strokeWidth={2}
              />
            ))}

            {/* Two beads running the route. The path is handed to CSS as a
                custom property so the geometry lives in one place. */}
            <circle
              className="journey__dot"
              r={5}
              fill="var(--color-brand)"
              style={{ "--wave": `path("${WAVE}")` } as CSSProperties}
            />
            <circle
              className="journey__dot journey__dot--b"
              r={4}
              fill="var(--color-brand)"
              style={{ "--wave": `path("${WAVE}")` } as CSSProperties}
            />
          </svg>
        </Reveal>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 110}
              /* dashed connector between stacked cards, single column only */
              className="relative before:absolute before:-top-4 before:left-8 before:h-4 before:border-l before:border-dashed before:border-line-strong first:before:hidden sm:before:hidden"
            >
              <article className="group h-full rounded-[1.5rem] bg-surface p-6 shadow-card ring-1 ring-line/70 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-display text-[2.25rem] leading-none tabular-nums text-brand/25">
                    {s.n}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-6 group-hover:scale-110">
                    <s.icon className="h-[18px] w-[18px]" />
                  </span>
                </div>

                <h3 className="text-display mt-6 text-[1.3125rem] leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
