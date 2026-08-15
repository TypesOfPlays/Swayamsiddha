import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { LightRays } from "@/components/ui/light-rays";
import { Drift } from "@/components/drift";

/**
 * Every machine named here is visible and legible in the owner's own
 * photographs (assets/img/machines.webp, machines (part 2).webp).
 * Nothing is claimed that cannot be seen in those images.
 */
const machines = [
  {
    name: "Erba EM 200 NEO",
    role: "Automated biochemistry",
    detail:
      "Runs liver, kidney, lipid and sugar panels from a single sample tray, with the reagent volumes measured by the machine rather than by hand.",
  },
  {
    name: "H 560",
    role: "5-part haematology",
    detail:
      "Separates all five white-cell types for a full blood count — the level of detail a doctor needs to tell a viral fever from a bacterial one.",
  },
  {
    name: "Carestream DryView 5850",
    role: "Dry laser film imaging",
    detail:
      "Prints X-ray films by laser with no chemical bath, so the image is sharp, dry to the touch immediately, and identical if reprinted.",
  },
];

export function Equipment() {
  return (
    <section className="relative bg-brand-ink py-16 text-white sm:py-20 lg:py-24">
      {/* Screen blend does here what it was designed to do — a dark surface
          with headroom to brighten. The hero runs the same component on
          `normal` because cream has nothing left to lift, which is why the
          two calls look nothing alike. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
        <LightRays
          count={6}
          color="rgba(232, 180, 74, 0.22)"
          blur={54}
          speed={21}
          length="34rem"
          blend="screen"
          seed={23}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <Reveal variant="wipe">
            <p className="eyebrow text-gold-bright">Inside the lab</p>
            <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem]">
              Machines do the measuring.{" "}
              <em className="text-display italic text-white/70">
                People do the care.
              </em>
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/65">
              Hand-pipetted results drift between technicians and between days.
              Ours are run on automated analysers, so the number on your report
              means the same thing in June as it does in December.
            </p>
            {/* Detector type confirmed by the owner. Still not claimed: ECG
                lead count, and the assay chemistry behind hormone panels. */}
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/65">
              The X-ray works the same way. A flat-panel detector sends the
              image straight to the screen — nothing to carry to a darkroom,
              nothing to develop, and a retake takes seconds rather than
              another trip.
            </p>
          </Reveal>
        </div>

        {/* Wide image panel — a different composition from the split hero */}
        <Reveal delay={120} variant="settle">
          <div className="mt-10 rounded-[2rem] bg-white/5 p-2 ring-1 ring-white/10">
            {/* The frame stays still and the photograph moves inside it, so
                the bench reads as something seen through an opening rather
                than a picture pasted onto the page. */}
            <Drift className="relative overflow-hidden rounded-[1.625rem]">
              <Photo
                src="/img/machines-2.webp"
                alt="The Carestream DryView 5850 laser imager beside the H 560 haematology analyser and EM 200 NEO on the laboratory bench"
                width={2000}
                height={1125}
                sizes="(max-width: 1152px) 100vw, 1100px"
                className="w-full object-cover"
                style={{ aspectRatio: "16 / 9", objectPosition: "50% 70%" }}
              />
            </Drift>
          </div>
        </Reveal>

        {/* Equipment cards */}
        <ul className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-3">
          {machines.map((m, i) => (
            <Reveal as="li" key={m.name} delay={i * 90} variant="settle">
              <article className="flex h-full flex-col rounded-[1.75rem] bg-white/[0.055] p-7 ring-1 ring-white/10 transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:bg-white/[0.085]">
                <p className="eyebrow text-gold-bright">{m.role}</p>
                <h3 className="mt-4 text-[1.25rem] font-bold tracking-[-0.02em] text-white">
                  {m.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">
                  {m.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-[0.8125rem] leading-relaxed text-white/55">
            Equipment photographed in our own laboratory. Every report is
            checked before it is released.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
