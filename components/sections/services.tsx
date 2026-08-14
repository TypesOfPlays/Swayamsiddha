import { Reveal } from "@/components/reveal";
import { GhostLink } from "@/components/cta";
import { site } from "@/lib/site";
import {
  IconMicroscope,
  IconXray,
  IconPulse,
  IconHomeVisit,
  IconArrowUpRight,
} from "@/components/icons";

const popular = [
  "CBC",
  "Thyroid profile",
  "Diabetes (FBS / PPBS / HbA1c)",
  "Liver function",
  "Kidney function",
  "Dengue & malaria",
  "Lipid profile",
];

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="max-w-2xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            Lab, X-ray and ECG under{" "}
            <em className="text-display italic">one roof</em>.
          </h2>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft">
            One visit, one reception desk, one set of reports — instead of
            three separate errands across town.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-12 gap-4 sm:gap-5">
          {/* ---- Pathology: the anchor card, double-bezelled and tall ---- */}
          <Reveal className="col-span-12 md:col-span-7 md:row-span-2">
            <article className="group h-full rounded-[2rem] bg-surface/60 p-1.5 shadow-card ring-1 ring-line/70">
              <div className="flex h-full flex-col rounded-[1.625rem] bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-6 group-hover:scale-110">
                  <IconMicroscope className="h-6 w-6" />
                </span>

                <h3 className="mt-7 text-[1.5rem] font-bold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                  Pathology laboratory
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  Samples are run on automated analysers rather than by hand, so
                  results stay consistent from one visit to the next.{" "}
                  {site.testCount} tests are on the menu, from a routine blood
                  count to full organ panels.
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {popular.map((p) => (
                    <li
                      key={p}
                      className="rounded-full bg-canvas-sunk px-3.5 py-2 text-[0.8125rem] font-semibold text-ink-soft"
                    >
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <GhostLink href="#tests">
                    See all {site.testCount} tests
                  </GhostLink>
                </div>
              </div>
            </article>
          </Reveal>

          {/* ---- X-ray ---- */}
          <Reveal delay={80} className="col-span-12 md:col-span-5">
            <article className="group h-full rounded-[1.75rem] bg-surface p-7 shadow-card ring-1 ring-line/70 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lift sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-soft text-gold transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-3 group-hover:scale-110">
                <IconXray className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-[1.375rem] font-bold tracking-[-0.02em] text-ink">
                Digital X-ray
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                Chest, spine, limbs and joints — captured digitally, so there is
                no waiting on film to develop and the image can be reprinted if
                your doctor needs another copy.
              </p>
            </article>
          </Reveal>

          {/* ---- ECG ---- */}
          <Reveal delay={140} className="col-span-12 md:col-span-5">
            <article className="group h-full rounded-[1.75rem] bg-surface p-7 shadow-card ring-1 ring-line/70 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-lift sm:p-8">
              {/* icon-trace makes the pulse redraw itself on hover */}
              <span className="icon-trace grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110">
                <IconPulse className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-[1.375rem] font-bold tracking-[-0.02em] text-ink">
                ECG
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                A resting ECG takes a few minutes and needs no preparation.
                Useful alongside a lipid profile or troponin test when your
                doctor is checking the heart.
              </p>
            </article>
          </Reveal>

          {/* ---- Home collection strip: inverted, full width ---- */}
          <Reveal delay={80} className="col-span-12">
            <a
              href="#home-collection"
              className="group flex flex-col gap-6 rounded-[1.75rem] bg-brand-ink p-7 shadow-lift ring-1 ring-brand-deep transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-float sm:flex-row sm:items-center sm:justify-between sm:p-9"
            >
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
                  <IconHomeVisit className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[1.375rem] font-bold tracking-[-0.02em] text-white">
                    Home sample collection
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-white/65">
                    Available for households near the lab. Because it depends on
                    the distance, give us a call and we&rsquo;ll tell you
                    straight away whether we can reach you.
                  </p>
                </div>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                <IconArrowUpRight className="h-5 w-5" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
