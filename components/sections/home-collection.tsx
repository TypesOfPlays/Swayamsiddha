import { Reveal } from "@/components/reveal";
import { CallButton } from "@/components/cta";
import { Magnetic } from "@/components/magnetic";
import { IconHomeVisit } from "@/components/icons";

/**
 * Deliberately centred and narrow — a change of rhythm after the wide
 * bento and the three-column steps.
 *
 * The copy never promises coverage. The owner's answer was "it depends how
 * far it is", so the page says exactly that and routes the visitor to a
 * phone call, which is the only place the real answer exists.
 */
export function HomeCollection() {
  return (
    <section id="home-collection" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-soft text-brand">
            <IconHomeVisit className="h-7 w-7" />
          </span>
          <p className="eyebrow mt-7 text-brand">Home sample collection</p>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
            If you can&rsquo;t come to us,{" "}
            <em className="text-display italic">we may come to you</em>.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-soft">
            For elderly patients, people recovering at home, and anyone who
            simply can&rsquo;t make the trip, we can send someone to draw the
            sample at your house.
          </p>
        </Reveal>

        <Reveal variant="settle" delay={120}>
          {/* The honest caveat is given its own frame rather than buried in
              small print — it is the part people most need to read. */}
          <div className="mt-10 rounded-[2rem] bg-gold-soft/70 p-1.5 ring-1 ring-gold/15">
            <div className="rounded-[1.625rem] bg-surface px-6 py-7 text-left sm:px-8">
              <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                <strong className="font-bold text-ink">
                  Whether we can reach you depends on the distance.
                </strong>{" "}
                We would rather tell you honestly on the phone than take a
                booking we can&rsquo;t keep. Call and tell us your village or
                landmark — you&rsquo;ll have an answer in the same conversation.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="settle" delay={180}>
          <div className="mt-9 flex justify-center">
            <Magnetic>
              <CallButton label="Check if we cover your area" />
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
