"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@/components/icons";

/**
 * The FAQ accordion, without a component library behind it.
 *
 * This was Base UI's Accordion, which cost 33 KB gzipped — a sixth of all
 * the JavaScript on the site — to open and close six answers. That is a
 * reasonable trade in an application with dozens of primitives to keep
 * consistent, and a poor one on a single marketing page whose visitors are
 * mostly on rural mobile data.
 *
 * It keeps the behaviour that mattered:
 *
 *  - The WAI-ARIA accordion pattern: a heading wrapping a button that owns
 *    `aria-expanded` and `aria-controls`, and a labelled region for the
 *    panel.
 *  - `inert` on closed panels, so their content leaves the accessibility
 *    tree and the tab order rather than lurking at zero height, which is
 *    the part hand-rolled accordions usually get wrong.
 *  - Several answers open at once, as before. Not a single-open list: that
 *    would have been a behaviour change nobody asked for.
 *  - A real open/close animation, via grid-template-rows 0fr to 1fr. That
 *    interpolates without anyone measuring a height in JavaScript, which is
 *    the only reason dropping the library was affordable at all.
 */

const AccordionContext = createContext<{
  open: ReadonlySet<string>;
  toggle: (value: string) => void;
} | null>(null);

const ItemContext = createContext<{
  value: string;
  panelId: string;
  triggerId: string;
} | null>(null);

export function Accordion({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = (value: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(value)) next.add(value);
      return next;
    });

  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div className={cn("flex w-full flex-col", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const id = useId();
  return (
    <ItemContext.Provider
      value={{ value, panelId: `${id}-panel`, triggerId: `${id}-trigger` }}
    >
      <div className={className}>{children}</div>
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const root = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!root || !item) return null;

  const isOpen = root.open.has(item.value);

  return (
    /* A heading, so the answers are reachable by heading navigation rather
       than only by tabbing through every question in order. */
    <h3 className="flex">
      <button
        type="button"
        id={item.triggerId}
        aria-expanded={isOpen}
        aria-controls={item.panelId}
        onClick={() => root.toggle(item.value)}
        className={cn(
          "group/acc flex flex-1 items-center justify-between gap-6 text-left outline-none",
          className,
        )}
      >
        {children}
        {/* One chevron that rotates, rather than two that swap — the
            rotation reads as the panel physically opening. */}
        <span
          aria-hidden="true"
          className="pointer-events-none grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-aria-expanded/acc:rotate-180"
        >
          <IconChevronDown className="size-4" />
        </span>
      </button>
    </h3>
  );
}

export function AccordionContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const root = useContext(AccordionContext);
  const item = useContext(ItemContext);
  if (!root || !item) return null;

  const isOpen = root.open.has(item.value);

  return (
    <div
      id={item.panelId}
      role="region"
      aria-labelledby={item.triggerId}
      inert={!isOpen}
      data-open={isOpen || undefined}
      className="acc-panel"
    >
      {/* The overflow clip has to sit on the grid child, not the grid
          itself, or the row never collapses. */}
      <div className="overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
