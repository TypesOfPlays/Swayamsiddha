"use client";

import { useState } from "react";
import { Photo } from "@/components/photo";
import {
  site,
  mapLinkFor,
  mapEmbedFor,
  type SiteLocation,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { GhostLink } from "@/components/cta";
import { OpenStatus } from "@/components/open-status";
import { MapFrame } from "@/components/map-frame";
import { IconPin, IconClock, IconPhone, IconCheck } from "@/components/icons";

/**
 * Two branches, one map.
 *
 * Both addresses are rendered in the markup at all times — the picker only
 * moves the map — so a crawler and a screen reader both see the full set
 * rather than whichever tab happened to be open.
 *
 * The lab and the collection centre are deliberately not presented as
 * equals. Only the lab runs analysers; the centre draws samples and sends
 * them there, and the page says exactly that. It is also the stronger
 * argument: the nearer branch is trustworthy *because* the work happens on
 * the machines at the main one.
 */
export function Visit() {
  const [activeId, setActiveId] = useState<string>(site.locations[0].id);
  const active =
    site.locations.find((l) => l.id === activeId) ?? site.locations[0];

  return (
    <section id="visit" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            Two places you can{" "}
            <em className="text-display italic font-normal">walk into</em>.
          </h2>
          <p className="font-odia mt-4 text-lg font-semibold text-brand-deep">
            ଦୁଇଟି ସ୍ଥାନ — ଯେଉଁଠି ସୁବିଧା, ସେଠାକୁ ଆସନ୍ତୁ।
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            The laboratory on Main Chhagharia Road, and a collection centre
            closer to town. Same number, same timings, same analysers behind
            both.
          </p>
        </Reveal>

        {/* ---- branch picker ---- */}
        <ul className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-2">
          {site.locations.map((l, i) => (
            <Reveal as="li" key={l.id} delay={i * 90} variant="settle">
              <BranchCard
                location={l}
                selected={l.id === activeId}
                onSelect={() => setActiveId(l.id)}
              />
            </Reveal>
          ))}
        </ul>

        {/* ---- map + details ---- */}
        <div className="mt-5 grid gap-4 sm:gap-5 lg:grid-cols-[1.45fr_1fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-surface/60 p-2 shadow-card ring-1 ring-line/70">
              <div className="overflow-hidden rounded-[1.625rem] bg-canvas-sunk">
                {/* keyed so switching branches remounts — which also brings
                    the veil back while the new map loads */}
                <MapFrame
                  key={active.id}
                  src={mapEmbedFor(active)}
                  title={`Map showing ${active.name} in ${active.city}`}
                />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5">
            <Reveal delay={80}>
              <div className="rounded-[1.75rem] bg-surface p-7 shadow-card ring-1 ring-line/70">
                <span className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <span>
                    {/* announces the switch without stealing focus */}
                    <p className="eyebrow text-brand" aria-live="polite">
                      On the map
                    </p>
                    <address className="mt-2 not-italic text-[0.9375rem] leading-relaxed text-ink-soft">
                      <strong className="block font-bold text-ink">
                        {active.name}
                      </strong>
                      {active.line1}
                      <br />
                      {active.line2}
                      <br />
                      {active.city}, {site.address.state}{" "}
                      <span className="tabular-nums">{active.postalCode}</span>
                    </address>
                  </span>
                </span>
                <div className="mt-5">
                  <GhostLink href={mapLinkFor(active)} external>
                    Directions to {active.name.toLowerCase()}
                  </GhostLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex items-start gap-4 rounded-[1.75rem] bg-surface p-7 shadow-card ring-1 ring-line/70">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.9375rem] font-bold text-ink">Timings</p>
                  <p className="mt-2 text-[1.0625rem] font-bold tabular-nums text-ink">
                    {site.hours.weekday}
                  </p>
                  <p className="mt-1 text-[0.875rem] text-ink-soft">
                    Both branches, all seven days.
                  </p>
                  {/* The published hours above stay in the markup for
                      crawlers; this only tells the reader where the clock
                      is right now. */}
                  <OpenStatus className="mt-3 text-[0.8125rem]" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <a
                href={site.phone.tel}
                className="group flex items-start gap-4 rounded-[1.75rem] bg-brand p-7 shadow-brand ring-1 ring-brand-deep/20 transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-lift"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                  <IconPhone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.9375rem] font-bold text-white">
                    One number for both
                  </p>
                  <p className="mt-2 text-[1.375rem] font-extrabold tabular-nums tracking-[-0.02em] text-white">
                    {site.phone.display}
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Storefront keeps its old job — "look for this" — and belongs to
            the lab, so it only appears while the lab is selected. */}
        {active.id === "lab" && (
          <Reveal delay={80}>
            <figure className="mt-5 overflow-hidden rounded-[1.75rem] bg-surface shadow-card ring-1 ring-line/70 lg:flex lg:items-center">
              <Photo
                src="/img/front.webp"
                alt={`The green signboard of ${site.name} on Main Chhagharia Road`}
                width={1200}
                height={750}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full object-cover lg:w-1/2"
                style={{ aspectRatio: "16 / 10", objectPosition: "50% 22%" }}
              />
              <figcaption className="px-7 py-6 text-[0.9375rem] leading-relaxed text-ink-soft lg:px-9">
                <strong className="block font-bold text-ink">
                  Look for the green signboard.
                </strong>
                We&rsquo;re on the ground floor, set back from the road, on
                Main Chhagharia Road at Shamagudia.
              </figcaption>
            </figure>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function BranchCard({
  location,
  selected,
  onSelect,
}: {
  location: SiteLocation;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`branch group h-full w-full rounded-[1.75rem] p-7 text-left ring-1 transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        selected
          ? "-translate-y-0.5 bg-surface shadow-lift ring-brand/40"
          : "bg-surface/70 shadow-card ring-line/70 hover:-translate-y-0.5 hover:shadow-lift"
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span
          className={`eyebrow rounded-full px-3 py-1.5 transition-colors duration-500 ${
            selected ? "bg-brand text-white" : "bg-canvas-sunk text-ink-muted"
          }`}
        >
          {location.kind}
        </span>
        {selected && (
          <span className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold text-brand">
            <span className="branch__live grid h-3.5 w-3.5 place-items-center rounded-full bg-brand text-white">
              <IconCheck className="h-2.5 w-2.5" />
            </span>
            On the map
          </span>
        )}
      </span>

      {/* Serif, with a gradient rule that draws itself on hover or select */}
      <span className="mt-6 block">
        <span className="branch__name text-display text-[1.75rem] leading-none text-ink sm:text-[2rem]">
          {location.name}
        </span>
      </span>
      <span className="text-display mt-4 block text-[1.0625rem] italic text-brand">
        {location.tagline}
      </span>
      <span className="mt-2 block text-[0.875rem] text-ink-muted">
        {location.line1}, {location.line2}
      </span>

      <span className="mt-4 block text-[0.9375rem] leading-relaxed text-ink-soft">
        {location.blurb}
      </span>

      <span className="mt-5 flex flex-wrap gap-2">
        {location.services.map((s) => (
          <span
            key={s}
            className="rounded-full bg-canvas-sunk px-3 py-1.5 text-[0.75rem] font-semibold text-ink-soft"
          >
            {s}
          </span>
        ))}
      </span>
    </button>
  );
}
