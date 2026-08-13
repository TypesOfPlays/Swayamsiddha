import type { CSSProperties } from "react";

/**
 * Light rays shining down from above.
 *
 * Adapted from Magic UI's component, with two deliberate changes:
 *
 * 1. No `motion/react`. Everything here animates opacity and rotation, which
 *    CSS keyframes do natively — so this adds no runtime dependency and no
 *    JavaScript at all. See `.ray` in globals.css.
 * 2. Ray geometry comes from a seeded PRNG rather than `Math.random()` in an
 *    effect. The original renders nothing on the server and pops the rays in
 *    after mount; this renders identical markup on both sides, so there is no
 *    flash and no hydration mismatch. Change `seed` for a different scatter.
 *
 * `blend` matters: `screen` only reads on dark surfaces. On the cream canvas
 * use `normal` with a warm, low-alpha colour instead.
 */

type LightRaysProps = {
  className?: string;
  style?: CSSProperties;
  count?: number;
  color?: string;
  blur?: number;
  speed?: number;
  length?: string;
  blend?: "screen" | "normal" | "soft-light" | "overlay";
  seed?: number;
};

/** mulberry32 — small, fast, and stable across server and client. */
function mulberry32(seed: number) {
  return function next() {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createRays(count: number, cycle: number, seed: number) {
  const rand = mulberry32(seed);
  const band = 84 / count;

  return Array.from({ length: count }, (_, index) => ({
    id: index,
    /* Stratified, not uniform: one ray per band with jitter inside it.
       Plain random clusters — a 46px blur then merges neighbours into a
       blob instead of reading as separate shafts. */
    left: 8 + index * band + rand() * band,
    rotate: -28 + rand() * 56,
    width: 160 + rand() * 160,
    /* Negative, and spread across the cycle, so every ray starts already
       part-way through its own phase. A positive random delay can leave the
       hero bare for most of a cycle on first paint. */
    delay: -((index + rand()) * (cycle / count)),
    swing: 0.8 + rand() * 1.8,
    duration: cycle * (0.75 + rand() * 0.5),
    intensity: 0.6 + rand() * 0.5,
  }));
}

export function LightRays({
  className = "",
  style,
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  speed = 14,
  length = "70vh",
  blend = "screen",
  seed = 7,
}: LightRaysProps) {
  const cycle = Math.max(speed, 0.1);
  const rays = createRays(count, cycle, seed);

  return (
    <div
      aria-hidden="true"
      className={`rays ${className}`}
      style={
        {
          "--rays-color": color,
          "--rays-blur": `${blur}px`,
          "--rays-length": length,
          mixBlendMode: blend,
          ...style,
        } as CSSProperties
      }
    >
      {rays.map((ray) => (
        <span
          key={ray.id}
          className="ray"
          style={
            {
              "--ray-left": `${ray.left}%`,
              "--ray-width": `${ray.width}px`,
              "--ray-rot": `${ray.rotate}deg`,
              "--ray-swing": `${ray.swing}deg`,
              "--ray-delay": `${ray.delay}s`,
              "--ray-dur": `${ray.duration}s`,
              "--ray-intensity": ray.intensity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
