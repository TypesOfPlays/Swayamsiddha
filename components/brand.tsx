import Image from "next/image";
import { site, asset } from "@/lib/site";

/**
 * Wordmark lockup. The mark is the supplied logo asset; the name is set in
 * type rather than baked into an image so it stays crisp and selectable.
 */
export function BrandLockup({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "light";
  className?: string;
}) {
  const isLight = tone === "light";

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
          isLight ? "bg-white/10 ring-1 ring-white/15" : "bg-brand-soft"
        }`}
      >
        <Image
          src={asset("/img/logo-mark.png")}
          alt=""
          width={28}
          height={28}
          /* The mark has 18 petals, so 20° is exactly one step: it spins
             and lands back in perfect register. */
          className={`h-[22px] w-[22px] object-contain transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-[20deg] ${
            isLight ? "brightness-0 invert" : ""
          }`}
        />
      </span>
      {/* The visible wordmark is split across two lines for layout. Hidden
          from assistive tech so the link's accessible name is the single
          clean one below, not "Swayamsiddha Diagnostics Swayamsiddha
          Diagnostics — …" read twice. */}
      <span className="flex flex-col leading-none" aria-hidden="true">
        <span
          className={`text-[0.9375rem] font-bold tracking-[-0.01em] ${
            isLight ? "text-white" : "text-ink"
          }`}
        >
          Swayamsiddha
        </span>
        <span
          className={`mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] ${
            isLight ? "text-white/55" : "text-ink-muted"
          }`}
        >
          Diagnostics
        </span>
      </span>
      <span className="sr-only">
        {site.name} — {site.nameOdia}
      </span>
    </span>
  );
}
