import Image from "next/image";
import { site, mapsLink, mapsEmbed, asset } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { GhostLink } from "@/components/cta";
import { IconPin, IconClock, IconPhone } from "@/components/icons";

export function Visit() {
  return (
    <section id="visit" className="py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            On Main Chhagharia Road,{" "}
            <em className="text-display italic">Shamagudia</em>.
          </h2>
        </Reveal>

        {/* Map as a full-width band — a composition used nowhere else */}
        <Reveal delay={100}>
          <div className="mt-12 rounded-[2rem] bg-surface/60 p-2 shadow-card ring-1 ring-line/70">
            <div className="overflow-hidden rounded-[1.625rem] bg-canvas-sunk">
              <iframe
                src={mapsEmbed}
                title={`Map showing ${site.name} in ${site.address.city}, ${site.address.state}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[20rem] w-full border-0 sm:h-[24rem] lg:h-[27rem]"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid grid-cols-12 gap-4 sm:gap-5">
          {/* Storefront — given a job ("look for this") rather than used as
              decoration, which is all it can honestly carry. */}
          <Reveal className="col-span-12 lg:col-span-5">
            <figure className="h-full overflow-hidden rounded-[1.75rem] bg-surface shadow-card ring-1 ring-line/70">
              <Image
                src={asset("/img/front.webp")}
                alt={`The green signboard of ${site.name} on Main Chhagharia Road`}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full object-cover"
                style={{ aspectRatio: "16 / 10", objectPosition: "50% 22%" }}
              />
              <figcaption className="px-6 py-5 text-[0.875rem] leading-relaxed text-ink-soft">
                Look for the green signboard. We&rsquo;re on the ground floor,
                set back from the road.
              </figcaption>
            </figure>
          </Reveal>

          {/* Detail stack */}
          <div className="col-span-12 grid gap-4 sm:gap-5 lg:col-span-7 lg:grid-cols-2">
            <Reveal delay={80} className="lg:col-span-2">
              <div className="flex h-full items-start gap-5 rounded-[1.75rem] bg-surface p-7 shadow-card ring-1 ring-line/70">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                  <IconPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-bold text-ink">Address</h3>
                  <address className="mt-2 not-italic text-[0.9375rem] leading-relaxed text-ink-soft">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <br />
                    {site.address.city}, {site.address.state}{" "}
                    <span className="tabular-nums">
                      {site.address.postalCode}
                    </span>
                  </address>
                  <div className="mt-5">
                    <GhostLink href={mapsLink} external>
                      Open in Google Maps
                    </GhostLink>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="flex h-full items-start gap-5 rounded-[1.75rem] bg-surface p-7 shadow-card ring-1 ring-line/70">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold">
                  <IconClock className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-bold text-ink">
                    Timings
                  </h3>
                  {/* Hours are only rendered once verified. Until then the
                      page says so plainly instead of guessing and sending
                      someone to a closed lab. */}
                  {site.hours.standIn ? (
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                      Please call before you set out — we&rsquo;ll confirm
                      today&rsquo;s timings and whether your test needs
                      fasting.
                    </p>
                  ) : site.hours.weekday === site.hours.sunday ? (
                    /* Same hours every day — printing two identical rows
                       would make the reader work to learn nothing. */
                    <div className="mt-2">
                      <p className="text-[1.0625rem] font-bold tabular-nums text-ink">
                        {site.hours.weekday}
                      </p>
                      <p className="mt-1 text-[0.875rem] text-ink-soft">
                        Open all seven days, including Sunday.
                      </p>
                    </div>
                  ) : (
                    <dl className="mt-2 space-y-1 text-[0.9375rem] text-ink-soft">
                      <div className="flex justify-between gap-4">
                        <dt>Mon &ndash; Sat</dt>
                        <dd className="tabular-nums">{site.hours.weekday}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt>Sunday</dt>
                        <dd className="tabular-nums">{site.hours.sunday}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <a
                href={site.phone.tel}
                className="group flex h-full items-start gap-5 rounded-[1.75rem] bg-brand p-7 shadow-brand ring-1 ring-brand-deep/20 transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-lift"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
                  <IconPhone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[0.9375rem] font-bold text-white">
                    Call the lab
                  </h3>
                  <p className="mt-2 text-[1.375rem] font-extrabold tracking-[-0.02em] text-white tabular-nums">
                    {site.phone.display}
                  </p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
