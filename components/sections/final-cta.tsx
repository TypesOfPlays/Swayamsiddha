import { site } from "@/lib/site";
import { CallButton, WhatsAppButton } from "@/components/cta";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";
import { LightRays } from "@/components/ui/light-rays";

export function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-28 lg:pb-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-ink px-6 py-16 text-center shadow-float sm:px-12 sm:py-20">
            {/* Single soft light source, top-centre — no orbs, no mesh */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-32 h-72 bg-[radial-gradient(55%_60%_at_50%_50%,rgba(232,180,74,0.16)_0%,transparent_72%)]"
            />

            {/* Deliberately weaker and slower than the Equipment band. The
                radial above is already lighting this panel; the rays only
                have to give that glow a direction. Turned up to match, the
                two would fight. */}
            <LightRays
              count={5}
              color="rgba(232, 180, 74, 0.13)"
              blur={48}
              speed={26}
              length="20rem"
              blend="screen"
              seed={41}
            />

            <div className="relative">
              <p className="eyebrow text-gold-bright">
                {site.address.line2} · {site.address.city}
              </p>
              <h2 className="mx-auto mt-6 max-w-2xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.75rem]">
                Bring the prescription.{" "}
                <em className="text-display italic text-white/70">
                  We&rsquo;ll take it from there.
                </em>
              </h2>
              <p className="font-odia mx-auto mt-4 max-w-xl text-white/55">
                {site.nameOdia}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <CallButton />
                </Magnetic>
                <Magnetic>
                  <WhatsAppButton />
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
