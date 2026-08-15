import type { CSSProperties } from "react";

/**
 * Dust drifting through the hero's light.
 *
 * What separates light in a photograph from light in a graphic is that real
 * light has something in it. A handful of motes rising slowly through the
 * rays is the whole difference between a gradient and a room with a window.
 *
 * Positions come from the same seeded generator the rays use, so the markup
 * is identical on the server and the client — no pop-in after hydration, no
 * mismatch. Everything animates opacity and translate, which the compositor
 * owns, so this is a handful of spans and no JavaScript at runtime.
 */

type MotesProps = {
  className?: string;
  count?: number;
  color?: string;
  seed?: number;
};

/** mulberry32 — same generator as the rays, so the two agree on determinism. */
function mulberry32(seed: number) {
  return function next() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Motes({
  className = "",
  count = 16,
  color = "rgba(186, 138, 58, 0.5)",
  seed = 31,
}: MotesProps) {
  const rand = mulberry32(seed);
  const band = 100 / count;

  const motes = Array.from({ length: count }, (_, index) => {
    const duration = 26 + rand() * 26;
    return {
      id: index,
      /* Stratified across the width like the rays, so they never clump into
         one corner and leave the rest of the light empty. */
      left: index * band + rand() * band,
      top: rand() * 100,
      size: 1.5 + rand() * 2.5,
      drift: (rand() - 0.5) * 3.2,
      duration,
      /* Negative and spread, so the field is already in motion on the first
         frame rather than every mote starting together. */
      delay: -(rand() * duration),
      opacity: 0.25 + rand() * 0.55,
    };
  });

  return (
    <div aria-hidden="true" className={`motes ${className}`}>
      {motes.map((m) => (
        <span
          key={m.id}
          className="mote"
          style={
            {
              "--mote-left": `${m.left}%`,
              "--mote-top": `${m.top}%`,
              "--mote-size": `${m.size}px`,
              "--mote-drift": `${m.drift}rem`,
              "--mote-dur": `${m.duration}s`,
              "--mote-delay": `${m.delay}s`,
              "--mote-opacity": m.opacity,
              "--mote-color": color,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
