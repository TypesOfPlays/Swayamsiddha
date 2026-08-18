import { site, mapsLink, mapsEmbed } from "@/lib/site";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { GhostLink } from "@/components/cta";
import { OpenStatus } from "@/components/open-status";
import { MapFrame } from "@/components/map-frame";
import { IconPin, IconClock, IconPhone } from "@/components/icons";

/**
 * Where the laboratory is.
 *
 * One place, deliberately. This carried a two-branch picker while the
 * collection centre lived on this site; that centre is getting a site of its
 * own, so every trace of it is gone rather than left half-wired — no second
 * card, no switcher, and nothing in the structured data that would have a
 * search engine read this page as covering two addresses.
 *
 * Losing the picker also lost the only reason this was a client component.
 * It renders on the server now; MapFrame is the single interactive piece.
 */
export function Visit() {
  return (
    <section id="visit" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            Come and find us.
          </h2>
          {/* The Odia line that sat here read "two places — come to
              whichever suits you", which is no longer true. It is removed
              rather than replaced: inventing a new line in a language I
              cannot check is worse than leaving the slot empty. The owner
              can supply one and it goes straight back — see the note in
              TODO.md, and remember the font is subset to the exact strings
              in scripts/gen-odia-font.sh. */}
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            The laboratory is on Main Chhagharia Road at Shamagudia, open every
            day from six in the morning. Walk in without an appointment, or
            call ahead and we will keep your slot ready.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-[1.45fr_1fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] bg-surface/60 p-2 shadow-card ring-1 ring-line/70">
              <div className="overflow-hidden rounded-[1.625rem] bg-canvas-sunk">
                <MapFrame
                  src={mapsEmbed}
                  title={`Map showing ${site.name} on ${site.address.line1}`}
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
                    <p className="eyebrow text-brand">The laboratory</p>
                    <address className="mt-2 not-italic text-[0.9375rem] leading-relaxed text-ink-soft">
                      <strong className="block font-bold text-ink">
                        {site.name}
                      </strong>
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                      <br />
                      {site.address.city}, {site.address.state}{" "}
                      <span className="tabular-nums">
                        {site.address.postalCode}
                      </span>
                    </address>
                  </span>
                </span>
                <div className="mt-5">
                  <GhostLink href={mapsLink} external>
                    Directions on Google Maps
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
                  <p className="mt-1 text-[0.9375rem] text-ink-soft">
                    Every day, including Sunday.
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
                    Call before you set out
                  </p>
                  <p className="mt-2 text-[1.375rem] font-extrabold tabular-nums tracking-[-0.02em] text-white">
                    {site.phone.display}
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal delay={80} variant="settle">
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
              We&rsquo;re on the ground floor, set back from the road, on Main
              Chhagharia Road at Shamagudia.
            </figcaption>
          </figure>
        </Reveal>

        {/* A pointer, not a second address.
            The collection centre is a separate business site, so it gets a
            name, a location and a way to get there — and nothing in this
            page's structured data. Declaring it there would have search
            engines attribute both addresses to this business again, which
            is the tangle removing it was meant to undo.

            `rel="noopener"` without `noreferrer` on the website link: this
            is our own other site, and passing the referrer is how its
            analytics will know the traffic came from here. */}
        <Reveal delay={140} variant="settle">
          <aside className="mt-5 rounded-[1.75rem] bg-canvas-sunk p-7 ring-1 ring-line/70 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <p className="eyebrow text-ink-muted">Also nearby</p>
              <p className="mt-3 text-[1.0625rem] font-bold text-ink">
                {site.collectionCentre.name}
              </p>
              <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                Closer to town for a sample only. Everything drawn there is
                brought here and run on the same analysers, by the same
                people.
              </p>
              <address className="mt-3 not-italic text-[0.9375rem] text-ink-muted">
                {site.collectionCentre.line1}, {site.collectionCentre.line2}
              </address>
            </div>

            <div className="mt-5 flex shrink-0 flex-col gap-3 sm:mt-0">
              <GhostLink href={site.collectionCentre.mapsUrl} external>
                Directions
              </GhostLink>
              {site.collectionCentre.website && (
                <a
                  href={site.collectionCentre.website}
                  target="_blank"
                  rel="noopener"
                  /* py-3 so the tap target clears 44px; the text alone was 22 */
                  className="inline-flex min-h-11 items-center gap-2 py-3 text-[0.9375rem] font-semibold text-brand underline underline-offset-4 decoration-brand/30 transition-colors hover:decoration-brand"
                >
                  Visit its website
                </a>
              )}
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
