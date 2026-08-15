"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/brand";
import { site } from "@/lib/site";
import { IconPhone } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";

const links = [
  { href: "#services", label: "What we do" },
  { href: "#tests", label: "Test list" },
  { href: "#home-collection", label: "Home visit" },
  { href: "#visit", label: "Find us" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Lock the page behind the overlay, and close on Escape. */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Move focus into the panel when it opens so keyboard users land there. */
  useEffect(() => {
    if (open) panelRef.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
        {/* Brand pill — detached from the top edge, never glued to it */}
        <a
          href="#top"
          className="group pointer-events-auto rounded-full bg-canvas/85 py-2 pl-2 pr-4 shadow-card ring-1 ring-line/70 backdrop-blur-xl transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-lift"
          aria-label={`${site.name} — home`}
        >
          <BrandLockup />
        </a>

        {/* Live status, in the gap the layout already leaves between the
            brand and the island. Wrapped rather than given `hidden` directly,
            because the component sets its own display and the two classes
            would collide. Shown from lg only: below that the island is the
            tighter constraint, and the Timings card carries the same status
            for phones. */}
        <div className="pointer-events-auto hidden lg:block">
          <OpenStatus className="open-status--tight rounded-full bg-canvas/85 px-4 py-2.5 text-[0.8125rem] shadow-card ring-1 ring-line/70 backdrop-blur-xl" />
        </div>

        {/* Desktop island */}
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden items-center gap-1 rounded-full bg-canvas/85 p-1.5 shadow-card ring-1 ring-line/70 backdrop-blur-xl md:flex"
        >
          {links.map((l) => (
            /* Pill treatment: transparent at rest so the island looks
               unchanged, with the brand circle sweeping up on hover and the
               label swapping for a white one. */
            <a key={l.href} href={l.href} className="pill">
              <span className="pill__circle" aria-hidden="true" />
              <span className="pill__stack">
                <span className="pill__label">{l.label}</span>
                <span className="pill__label pill__label--hover" aria-hidden="true">
                  {l.label}
                </span>
              </span>
            </a>
          ))}

          <a
            href={site.phone.tel}
            className="group ml-1 inline-flex items-center gap-2 rounded-full bg-brand py-2.5 pl-3 pr-5 text-[0.875rem] font-semibold text-white shadow-brand transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-hover active:scale-[0.98]"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105">
              <IconPhone className="h-[15px] w-[15px]" />
            </span>
            <span className="tabular-nums">{site.phone.display}</span>
          </a>
        </nav>

        {/* Mobile toggle — two bars that rotate into an X, never a swap */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="pointer-events-auto relative grid h-12 w-12 place-items-center rounded-full bg-canvas/85 shadow-card ring-1 ring-line/70 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95 md:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 block h-[1.5px] w-5 rounded-full bg-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[3px]"
              }`}
            />
            <span
              className={`absolute left-0 block h-[1.5px] rounded-full bg-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open
                  ? "top-1/2 w-5 -translate-y-1/2 -rotate-45"
                  : "bottom-[3px] w-3.5"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Full-bleed overlay */}
      <div
        id="mobile-menu"
        ref={panelRef}
        aria-hidden={!open}
        className={`pointer-events-auto fixed inset-0 z-40 flex flex-col justify-end bg-canvas/92 px-5 pb-10 backdrop-blur-2xl transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              className={`border-b border-line/70 py-4 text-[1.75rem] font-bold tracking-[-0.02em] text-ink transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
          className={`mt-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm text-ink-muted">{site.address.full}</p>
          <a
            href={site.phone.tel}
            tabIndex={open ? 0 : -1}
            className="mt-3 inline-flex items-center gap-2 text-2xl font-bold tabular-nums text-brand"
          >
            <IconPhone className="h-5 w-5" />
            {site.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}
