import { Reveal } from "@/components/reveal";
import { CallButton, WhatsAppButton } from "@/components/cta";
import { Magnetic } from "@/components/magnetic";
import { IconBuilding } from "@/components/icons";

/**
 * The one B2B section on an otherwise patient-facing page, so it is framed
 * as an arrangement to agree rather than a service to walk in for.
 *
 * Nothing is promised about travelling to a workplace: the owner's answer
 * was that it depends on the distance, so the page says exactly that and
 * sends the decision to a phone call — the same treatment as home
 * collection. No prices, no minimum headcount, and no claim of being
 * empanelled with any insurer.
 */
const offerings = [
  {
    title: "Insurance pre-policy medicals",
    body: "The blood work and ECG an insurer asks for before issuing a policy, done in one sitting and reported together.",
  },
  {
    title: "Office & staff health checks",
    body: "Routine panels for a whole team — sugar, lipids, liver, kidney, thyroid — scheduled as a group instead of one person at a time.",
  },
  {
    title: "One set of reports",
    body: "Results for the whole group come back together, on paper at the counter or sent to a single number on WhatsApp.",
  },
];

export function Corporate() {
  return (
    <section id="corporate" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal variant="settle">
          {/* Double bezel, used here to set the section apart as a distinct
              offer rather than another item in the patient journey. */}
          <div className="rounded-[2rem] bg-surface/60 p-1.5 shadow-card ring-1 ring-line/70">
            <div className="rounded-[1.625rem] bg-surface p-7 sm:p-10 lg:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                <div className="max-w-xl">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <IconBuilding className="h-6 w-6" />
                  </span>
                  <h2 className="mt-6 text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.375rem]">
                    Checkups for companies{" "}
                    <em className="text-display italic font-normal">
                      and groups
                    </em>
                    .
                  </h2>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
                    We take corporate and group bookings — pre-policy medicals
                    for insurance, and health checks for offices and staff
                    teams. Tell us the headcount and where you are, and
                    we&rsquo;ll work out the arrangement.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3">
                  <Magnetic className="flex">
                    <CallButton
                      label="Discuss a group booking"
                      className="w-full"
                    />
                  </Magnetic>
                  <Magnetic className="flex">
                    <WhatsAppButton
                      label="Send us the list"
                      className="w-full"
                    />
                  </Magnetic>
                </div>
              </div>

              {/* Hairline-divided row rather than another set of cards */}
              <ul className="mt-10 grid divide-y divide-line border-t border-line pt-2 sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {offerings.map((o) => (
                  <li
                    key={o.title}
                    className="py-6 sm:px-7 sm:py-4 sm:first:pl-0 sm:last:pr-0"
                  >
                    <h3 className="text-[0.9375rem] font-bold tracking-[-0.01em] text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {o.body}
                    </p>
                  </li>
                ))}
              </ul>

              {/* The honest caveat, given its own frame like home collection */}
              <div className="mt-8 rounded-[1.25rem] bg-gold-soft/70 px-6 py-5">
                <p className="text-[0.9375rem] leading-relaxed text-ink-soft">
                  <strong className="font-bold text-ink">
                    Whether we can collect at your workplace depends on the
                    distance.
                  </strong>{" "}
                  For groups we can&rsquo;t reach, we&rsquo;ll book your team
                  into the lab together so nobody waits in a queue. Call and
                  we&rsquo;ll tell you which it is.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
