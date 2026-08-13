import { site, waLink } from "@/lib/site";
import { IconPhone, IconWhatsApp, IconArrowUpRight } from "@/components/icons";

/* Shared physics: press-down on tap, one fluid curve, generous touch target. */
const base =
  "group inline-flex items-center gap-3 rounded-full pl-2 pr-6 py-2 min-h-14 " +
  "font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
  "active:scale-[0.98] select-none";

/* The nested circle that holds the icon — button-in-button, flush with the
   outer pill's inner padding. Shifts diagonally on hover. */
const nest =
  "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform " +
  "duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] " +
  "group-hover:scale-105 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]";

export function CallButton({
  label = "Call the lab",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={site.phone.tel}
      className={`${base} bg-brand text-white shadow-brand hover:bg-brand-hover hover:shadow-lift ${className}`}
      data-cta="call"
    >
      <span className={`${nest} bg-white/15`}>
        <IconPhone className="h-[18px] w-[18px]" />
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.9375rem]">{label}</span>
        <span className="text-[0.8125rem] font-medium text-white/70 tabular-nums">
          {site.phone.display}
        </span>
      </span>
    </a>
  );
}

export function WhatsAppButton({
  label = "Ask on WhatsApp",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-surface text-ink ring-1 ring-line-strong shadow-card hover:shadow-lift hover:ring-brand/30 ${className}`}
      data-cta="whatsapp"
    >
      <span className={`${nest} bg-brand-soft text-brand`}>
        <IconWhatsApp className="h-[18px] w-[18px]" />
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[0.9375rem]">{label}</span>
        <span className="text-[0.8125rem] font-medium text-ink-muted">
          Reply during lab hours
        </span>
      </span>
    </a>
  );
}

/** Quieter link-style CTA with the trailing arrow nested in its own circle. */
export function GhostLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group inline-flex items-center gap-2.5 rounded-full py-2 pl-5 pr-2 text-[0.9375rem] font-semibold text-ink ring-1 ring-line-strong transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-brand/35 hover:bg-brand-tint active:scale-[0.98] ${className}`}
    >
      {children}
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]">
        <IconArrowUpRight className="h-4 w-4" />
      </span>
    </a>
  );
}

/**
 * Mobile-only fixed action bar. Most visitors arrive on a phone from a
 * WhatsApp forward or a Google search; the two things they need are never
 * more than a thumb away.
 */
export function StickyActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/92 px-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden">
      <div className="flex items-stretch gap-2.5">
        <a
          href={site.phone.tel}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-[0.9375rem] font-semibold text-white shadow-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
        >
          <IconPhone className="h-[18px] w-[18px]" />
          Call now
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-surface py-3.5 text-[0.9375rem] font-semibold text-ink ring-1 ring-line-strong transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
        >
          <IconWhatsApp className="h-[18px] w-[18px] text-brand" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
