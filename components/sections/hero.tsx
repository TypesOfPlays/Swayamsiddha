import Image from "next/image";
import { site, asset } from "@/lib/site";
import { CallButton, WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { Magnetic } from "@/components/magnetic";
import { LightRays } from "@/components/ui/light-rays";
import {
  IconCheck,
  IconPulse,
  IconXray,
  IconReport,
  IconClock,
} from "@/components/icons";

const proof = [
  { icon: IconReport, label: `${site.testCount} tests` },
  { icon: IconXray, label: "Digital X-ray" },
  { icon: IconPulse, label: "ECG" },
  { icon: IconCheck, label: "Same-day reports" },
  /* A 6 AM opening is the reason a fasting patient can eat breakfast at a
     normal hour — worth stating up front, not burying in the Timings card. */
  { icon: IconClock, label: "Open 6 AM – 9 PM, all days" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44">
      {/* Soft brand wash behind the fold — a single large radial, no orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] bg-[radial-gradient(60%_55%_at_50%_0%,var(--color-brand-tint)_0%,transparent_70%)]"
      />

      {/* Light falling through the top of the fold.
          `normal` blend with a warm, low-alpha colour — the component's
          default `screen` brightens whatever sits beneath it, and on a cream
          canvas there is nothing left to brighten. The wrapper owns the
          positioning so the component's own inset:0 has a box to fill. */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-[34rem]">
        <LightRays
          count={6}
          color="rgba(186, 138, 58, 0.20)"
          blur={46}
          speed={17}
          length="34rem"
          blend="normal"
          seed={11}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-28">
        {/* ---------------------------------------------------------- copy */}
        <div>
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-brand ring-1 ring-line shadow-hair">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Shamagudia · Ichhapur · Kendrapara
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.5rem] font-extrabold leading-[1.03] tracking-[-0.035em] text-ink sm:text-[3.25rem] lg:text-[3.9rem]">
              Accurate diagnostics,{" "}
              <em className="text-display italic font-normal">close to home.</em>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-odia mt-4 text-lg font-semibold text-brand-deep">
              {site.nameOdia} — {site.taglineOdia}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
              A fully automated pathology laboratory with digital X-ray and ECG
              on Main Chhagharia Road. {site.testCount} tests on the menu, run
              on calibrated analysers — with most reports ready the same day.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* flex on mobile so the buttons still stretch full width;
                  the magnetic pull itself is desktop-only anyway. */}
              <Magnetic className="flex sm:inline-flex">
                <CallButton className="w-full sm:w-auto" />
              </Magnetic>
              <Magnetic className="flex sm:inline-flex">
                <WhatsAppButton className="w-full sm:w-auto" />
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-5 text-sm text-ink-muted">
              Walk in without an appointment, or call ahead and we&rsquo;ll keep
              your slot ready.
            </p>
          </Reveal>

          {/* Proof strip — deliberately quiet, sits under the CTAs */}
          <Reveal delay={380}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              {proof.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-soft"
                >
                  <Icon className="h-[18px] w-[18px] text-brand" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- image */}
        <Reveal delay={220} className="relative">
          {/* Double bezel: outer tray, inner plate, concentric radii */}
          <div className="rounded-[2rem] bg-surface/70 p-2 shadow-float ring-1 ring-line/80 backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-[1.625rem] bg-canvas-sunk shadow-[inset_0_1px_2px_rgba(12,31,19,0.08)]">
              <Image
                src={asset("/img/machines.webp")}
                alt="Automated biochemistry and haematology analysers in the Swayamsiddha Diagnostics laboratory"
                width={1600}
                height={1200}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover"
                style={{ aspectRatio: "4 / 5", objectPosition: "56% 66%" }}
              />
              {/* Grounding gradient so the floating chip stays legible */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-ink/70 to-transparent"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-[1.125rem] bg-brand-ink/65 p-3 ring-1 ring-white/10 backdrop-blur-md">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                  In our lab
                </p>
                <p className="mt-1.5 text-[0.9375rem] font-semibold leading-snug text-white">
                  Erba EM 200 NEO biochemistry &amp; H 560 haematology
                  analysers
                </p>
              </div>
            </div>
          </div>

          {/* Same-day card, overlapping the frame. Removed below md so it
              never fights the image for touch targets. */}
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
        </Reveal>
      </div>
    </section>
  );
}
