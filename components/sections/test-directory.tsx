"use client";

import { useMemo, useState, useId, type CSSProperties } from "react";
import { testGroups, totalTestCount } from "@/lib/tests";
import { site, waLink } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { IconSearch, IconWhatsApp } from "@/components/icons";

export function TestDirectory() {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();

  const groups = useMemo(() => {
    if (!q) return testGroups;
    return testGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((t) => t.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [q]);

  const matchCount = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="tests" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading and search sit on one line at desktop — the search is the
            point of this section, not an afterthought below the copy. */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-xl">
            <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
              All <CountUp value={totalTestCount} className="tabular-nums" />{" "}
              tests,{" "}
              <em className="text-display italic">listed openly</em>.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
              Search the name written on your prescription. If it is on this
              list, you can have it done here.
            </p>
          </Reveal>

          <Reveal delay={100} className="w-full lg:max-w-sm">
            <label
              htmlFor={inputId}
              className="mb-2.5 block text-[0.8125rem] font-semibold text-ink-soft"
            >
              Search tests
            </label>
            <div className="group relative rounded-full bg-surface p-1 shadow-card ring-1 ring-line/80 transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:shadow-lift focus-within:ring-brand/40">
              <div className="flex items-center gap-2.5 rounded-full px-4">
                <IconSearch className="h-[18px] w-[18px] shrink-0 text-ink-muted" />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. thyroid, CBC, dengue"
                  autoComplete="off"
                  className="w-full bg-transparent py-3 text-[0.9375rem] text-ink outline-none placeholder:text-ink-muted/70"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="shrink-0 rounded-full px-2.5 py-1 text-[0.8125rem] font-semibold text-ink-muted transition-colors duration-300 hover:bg-canvas-sunk hover:text-ink"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2.5 h-5 text-[0.8125rem] text-ink-muted" aria-live="polite">
              {q
                ? `${matchCount} ${matchCount === 1 ? "test" : "tests"} matching “${query.trim()}”`
                : `${totalTestCount} tests across ${testGroups.length} categories`}
            </p>
          </Reveal>
        </div>

        {/* Masonry columns rather than a rigid grid, so categories of very
            different lengths don't leave dead space under the short ones.
            Keying the container on the query remounts it, which replays the
            deal-in animation every time the filter changes. */}
        {matchCount > 0 ? (
          <div
            key={q || "all"}
            className="mt-10 gap-4 sm:gap-5 md:columns-2 lg:columns-3 [&>*]:mb-4 sm:[&>*]:mb-5"
          >
            {groups.map((g, i) => (
              <article
                key={g.id}
                style={{ "--i": i } as CSSProperties}
                className="stagger-in break-inside-avoid rounded-[1.75rem] bg-surface p-6 shadow-card ring-1 ring-line/70 sm:p-7"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.0625rem] font-bold tracking-[-0.015em] text-ink">
                    {g.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[0.6875rem] font-bold tabular-nums text-brand-deep">
                    {g.items.length}
                  </span>
                </div>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                  {g.blurb}
                </p>
                <ul className="mt-5 space-y-0">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="border-t border-line/70 py-2.5 text-[0.9375rem] leading-snug text-ink-soft first:border-t-0 first:pt-0"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ) : (
          /* Empty state — never a dead end, always a route to a human */
          <div className="mt-12 rounded-[2rem] bg-surface/60 p-1.5 shadow-card ring-1 ring-line/70">
            <div className="rounded-[1.625rem] bg-surface px-6 py-14 text-center">
              <p className="text-[1.0625rem] font-bold text-ink">
                No test matches &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                Try the short form instead — &ldquo;LFT&rdquo; rather than
                &ldquo;liver function test&rdquo;. Or send us the prescription
                and we&rsquo;ll tell you what we can do.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-full bg-canvas-sunk px-5 py-3 text-[0.9375rem] font-semibold text-ink transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-soft active:scale-[0.98]"
                >
                  Show all {totalTestCount} tests
                </button>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.9375rem] font-semibold text-white shadow-brand transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-brand-hover active:scale-[0.98]"
                >
                  <IconWhatsApp className="h-4 w-4" />
                  Send us the prescription
                </a>
              </div>
            </div>
          </div>
        )}

        <Reveal>
          <p className="mt-8 text-[0.8125rem] leading-relaxed text-ink-muted">
            Test availability can change with reagent stock. Call{" "}
            <a
              href={site.phone.tel}
              className="font-semibold text-brand underline underline-offset-4 decoration-brand/30 transition-colors hover:decoration-brand"
            >
              {site.phone.display}
            </a>{" "}
            to confirm before travelling for an uncommon test.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
