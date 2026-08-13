/**
 * Continuously scrolling capability band.
 *
 * Pure CSS: three identical tracks sit in a row and each translates by its
 * own width, so the loop is seamless with no JavaScript and no measuring.
 * Three copies rather than two so the row still fills an ultrawide monitor.
 *
 * Every line here is something the owner confirmed or something legible in
 * their own photographs. Nothing about detector type, lead count or assay
 * chemistry is asserted — see the notes in the section that uses this.
 */

const ITEMS = [
  "Erba EM 200 NEO biochemistry",
  "H 560 · 5-part differential CBC",
  "Carestream DryView 5850 laser imaging",
  "Digital X-ray",
  "ECG on the spot",
  "73 tests",
  "Same-day reports",
  "Corporate & group bookings",
  "Open 6 AM – 9 PM, all days",
  "Walk in, no appointment",
];

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item} className="marquee__item">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function MarqueeBand() {
  return (
    <section
      aria-label="What we offer"
      className="border-y border-line bg-canvas-sunk py-4"
    >
      <div className="marquee">
        <Track />
        {/* Duplicates carry no information — hidden from assistive tech */}
        <Track hidden />
        <Track hidden />
      </div>
    </section>
  );
}
