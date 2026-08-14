import Image from "next/image";
import { asset } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CallButton, WhatsAppButton } from "@/components/cta";
import { Magnetic } from "@/components/magnetic";
import { IconArrowUpRight } from "@/components/icons";
import { LOGO_VIEWBOX, PETAL_PATHS, CROWN_PATH } from "@/lib/logo-paths";

/**
 * The visit, told as a journey.
 *
 * Replaces the old four-card "how it works" row: the same information, but
 * paced so a nervous first-time patient can picture the whole thing before
 * they set out.
 *
 * Each step carries one Odia line — the spoken, human half — under the
 * English detail. THESE NEED A NATIVE READ before they are trusted; the
 * gloss in each comment is what the line is meant to say.
 *
 * `image` is optional on purpose. Steps 02, 03 and 05 are human moments the
 * owner has no photograph of yet, so they render a designed panel built from
 * the brand mark instead of a broken or borrowed image. Dropping a photo in
 * later is one line: add `image` and `alt`.
 */

type Step = {
  n: string;
  title: string;
  body: string;
  odia: string;
  image?: string;
  alt?: string;
  /** Secondary note, for a step that has more than one way to begin. */
  aside?: string;
  /** Branches out of this step — used where the journey can start elsewhere. */
  links?: { label: string; href: string }[];
};

const steps: Step[] = [
  {
    n: "01",
    title: "Call first, or simply walk in",
    body: "Ring and ask anything — which test your doctor meant, what it will cost, whether you need to come fasting. There is no appointment and no waiting list. We open at six in the morning, so a fasting sample never costs you your breakfast.",
    /* "First make a call, or come straight in." */
    odia: "ପ୍ରଥମେ ଫୋନ କରନ୍ତୁ, କିମ୍ବା ସିଧା ଚାଲି ଆସନ୍ତୁ।",
    /* Coming in is not the only way the visit can start. Still no promise
       of reaching anyone — the distance caveat lives in the sections these
       link to, so it is stated once and properly rather than twice loosely. */
    aside:
      "And if coming in is hard — an elderly patient at home, a whole office, or a group booking — we may be able to collect where you are instead. It depends how far you are, so call and we will tell you straight away.",
    links: [
      { label: "Home collection", href: "#home-collection" },
      { label: "Office & group bookings", href: "#corporate" },
    ],
    image: "/img/front.webp",
    alt: "The green Swayamsiddha Diagnostics signboard above the entrance on Main Chhagharia Road",
  },
  {
    n: "02",
    title: "Show us the prescription",
    body: "Hand over the slip your doctor wrote, or just describe what you need. We read it back to you, tell you the price before anything begins, and explain in plain words what each test is looking for.",
    /* "Show the doctor's prescription — we will explain it." */
    odia: "ଡାକ୍ତରଙ୍କ ପ୍ରେସକ୍ରିପସନ ଦେଖାନ୍ତୁ — ଆମେ ବୁଝାଇ ଦେବୁ।",
    /* Stock, Pexels licence. Chosen for hands-and-paper with no identifiable
       face — a recognisable stranger in a lab coat would read as fake in a
       town this size. Replace with your own counter when you can. */
    image: "/img/step-prescription.webp",
    alt: "A prescription being read before any test is booked",
  },
  {
    n: "03",
    title: "The sample is taken",
    body: "A fresh needle and a sealed vacutainer, opened in front of you. It is over in under a minute. If an X-ray or ECG is on the same slip, it happens in the same visit — nobody is sent back a second time.",
    /* "A new needle, opened before your eyes." */
    odia: "ନୂଆ ସୂଚୀ, ଆପଣଙ୍କ ଆଖି ଆଗରେ ଖୋଲାଯାଏ।",
    /* Stock, Pexels licence. Gloved hands and a sealed EDTA tube, no face. */
    image: "/img/step-sample.webp",
    alt: "A sealed blood collection tube handled in gloves, beside a rack of vacutainers",
  },
  {
    n: "04",
    title: "Into the analysers",
    body: "Your sample goes onto a closed automated system — the Erba EM 200 NEO for biochemistry, the H 560 for blood counts. Nothing is pipetted by hand. The machine measures the same way at six in the morning as it does at nine at night, which is the whole point of it.",
    /* "The machine measures — not the hand." */
    odia: "ମେସିନ ମାପେ, ହାତ ନୁହେଁ।",
    image: "/img/machines.webp",
    alt: "Close view of the Erba EM 200 NEO biochemistry analyser and H 560 haematology analyser",
  },
  {
    n: "05",
    title: "Your report, the same day",
    body: "Most reports are ready before your day is over. Collect them at the counter, or ask us to send a copy to your phone on WhatsApp so you can forward it straight to your doctor without another trip.",
    /* "The same day's report — into your hands." */
    odia: "ସେହି ଦିନର ରିପୋର୍ଟ, ଆପଣଙ୍କ ହାତରେ।",
    /* PHOTO WANTED: a printed report being handed across the counter.
       Add: image: asset("/img/step-report.webp") */
  },
];

/**
 * The thread's turning points, in the SVG's 0–100 space. Because the SVG is
 * stretched with preserveAspectRatio="none", these numbers are also literal
 * percentages of the container — so the path, the pins and the travelling
 * ball are all driven from this one list and cannot drift apart.
 */
const VERTICES = [
  { x: 20, y: 10 },
  { x: 80, y: 30 },
  { x: 20, y: 50 },
  { x: 80, y: 70 },
  { x: 20, y: 90 },
];

const ZIG = `M${VERTICES.map((p) => `${p.x} ${p.y}`).join(" L")}`;

/**
 * Vertical scatter so the frames don't sit in a ruler-straight column.
 *
 * Margins rather than translate: Tailwind v4 drives translate through
 * --tw-translate-* custom properties that did not resolve reliably here, and
 * a margin genuinely staggers the row instead of only shifting pixels.
 */
const SCATTER = [
  "lg:mt-0",
  "lg:mt-14",
  "lg:-mt-8",
  "lg:mt-16",
  "lg:-mt-6",
];

/** Stands in for a photograph without pretending to be one. */
function MarkPanel({ n }: { n: string }) {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-brand-ink">
      <svg
        viewBox={LOGO_VIEWBOX}
        className="absolute -right-10 -top-10 h-[22rem] w-[22rem] text-white/[0.055]"
        fill="currentColor"
        aria-hidden="true"
      >
        {PETAL_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <path fillRule="evenodd" d={CROWN_PATH} />
      </svg>
      <span
        aria-hidden="true"
        className="text-display relative text-[7rem] leading-none text-white/10 tabular-nums sm:text-[9rem]"
      >
        {n}
      </span>
    </div>
  );
}

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            What actually happens{" "}
            <em className="text-display italic font-normal">
              when you come in
            </em>
            .
          </h2>
          <p className="font-odia mt-4 text-lg font-semibold text-brand-deep">
            ଆସନ୍ତୁ, ଦେଖନ୍ତୁ — ଆରମ୍ଭରୁ ଶେଷ ପର୍ଯ୍ୟନ୍ତ।
          </p>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            Nobody should feel uncertain walking into a laboratory. Here is the
            whole visit, start to finish, so you know exactly what to expect
            before you leave the house.
          </p>
        </Reveal>

        <div className="trail relative mt-12 sm:mt-14">
          {/* The whole thread is wrapped in a bare Reveal: scroll-linked
              timelines would not resolve here (see globals.css), so the
              draw-in is driven by the same IntersectionObserver everything
              else on the page uses. `bare` gives us the .is-in hook without
              its fade. */}
          <Reveal bare className="trail__thread">
            {/* Narrow screens keep a straight rail down the left — a zigzag
                in 375px of width would just look like a mistake. */}
            <span className="trail__rail lg:hidden">
              <span className="trail__fill" />
              <span className="trail__runner">
                <span className="trail__bead" />
              </span>
            </span>

          {/* Wide screens get the real thing. The SVG is stretched with
              preserveAspectRatio="none", so its 0–100 viewBox maps exactly to
              0–100% of the container in both axes — which is what lets the
              pins and the travelling ball share the path's coordinates
              without a single measurement. vector-effect keeps the stroke an
              even weight despite that non-uniform scaling. */}
          {/* Two stacked SVGs rather than one.
              The coloured line is revealed by clipping, not by a dash offset:
              vector-effect:non-scaling-stroke makes dash lengths pixel based,
              which defeats pathLength normalisation and paints the line as
              repeating bands. And the clip has to sit on an element with a
              real layout box — a `view()` timeline cannot resolve against an
              SVG <g>, which has none, so the animation silently never runs. */}
          <svg
            className="trail__zig"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="trail__zig-base" d={ZIG} />
          </svg>

          <svg
            className="trail__zig trail__zig--fill"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-brand)" />
                <stop offset="100%" stopColor="var(--color-gold)" />
              </linearGradient>
            </defs>
            <path className="trail__zig-fill" d={ZIG} />
            </svg>
          </Reveal>

          <div className="trail__plot" aria-hidden="true">
            {VERTICES.map((p, i) => (
              <span
                key={i}
                className="trail__pin"
                style={{ transform: `translate(${p.x}%, ${p.y}%)` }}
              />
            ))}
            <span className="trail__orbit">
              <span className="trail__bead" />
            </span>
            <span className="trail__orbit trail__orbit--b">
              <span className="trail__bead trail__bead--sm" />
            </span>
          </div>

          <ol className="space-y-12 sm:space-y-16 lg:space-y-20">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.n} className="trail__step relative">
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* ---- frame ---- */}
                  <div
                    className={`rounded-[2rem] bg-surface/60 p-2 shadow-float ring-1 ring-line/80 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${SCATTER[i % SCATTER.length]}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.625rem] bg-canvas-sunk">
                      {step.image ? (
                        <Image
                          src={asset(step.image)}
                          alt={step.alt ?? ""}
                          fill
                          sizes="(max-width: 1024px) 100vw, 45vw"
                          className="trail__img object-cover"
                        />
                      ) : (
                        <MarkPanel n={step.n} />
                      )}
                    </div>
                  </div>

                  {/* ---- words ---- */}
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="text-display absolute -top-14 left-0 text-[5.5rem] leading-none text-brand/[0.07] tabular-nums sm:-top-16 sm:text-[7rem]"
                    >
                      {step.n}
                    </span>

                    <div className="relative">
                      <p className="eyebrow text-brand">Step {step.n}</p>
                      <h3 className="mt-4 text-[1.625rem] font-bold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2rem]">
                        {step.title}
                      </h3>

                      {/* The spoken line, given room rather than tucked away */}
                      <p className="font-odia mt-4 border-l-2 border-gold/50 pl-4 text-[1.0625rem] font-semibold text-brand-deep">
                        {step.odia}
                      </p>

                      <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
                        {step.body}
                      </p>

                      {step.aside && (
                        <p className="mt-4 border-l-2 border-brand/25 pl-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                          {step.aside}
                        </p>
                      )}

                      {step.links && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {step.links.map((l) => (
                            <li key={l.href}>
                              <a
                                href={l.href}
                                className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2.5 text-[0.8125rem] font-semibold text-brand-deep transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand hover:text-white"
                              >
                                {l.label}
                                <IconArrowUpRight className="h-3.5 w-3.5" />
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={120}>
          <div className="mt-14 rounded-[2rem] bg-brand-ink p-8 text-center shadow-float sm:p-12">
            <p className="font-odia text-lg font-semibold text-gold-bright">
              ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ଆମର ଦାୟିତ୍ୱ।
            </p>
            <h3 className="mx-auto mt-4 max-w-xl text-[1.625rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2rem]">
              That is the whole of it. No queue, no confusion, no second trip.
            </h3>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <CallButton />
              </Magnetic>
              <Magnetic>
                <WhatsAppButton />
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
