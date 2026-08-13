"use client";

import Image from "next/image";
import { useState, type CSSProperties, type KeyboardEvent } from "react";

/**
 * Accordion gallery, in the React Bits shape but rebuilt for this project.
 *
 * Departures from the original, all deliberate:
 *
 * 1. No GSAP. Every property it animates — flex-grow, rotate, filter,
 *    translate, opacity — is transitionable in CSS, so this adds no
 *    dependency and no timeline bookkeeping.
 * 2. No ResizeObserver. The original measures the container to give the
 *    inner image a fixed pixel width so it crops instead of squashing. Here
 *    the media is simply 118% of its panel with `object-fit: cover`, which
 *    crops correctly at any size and leaves ~9% of slack each side for the
 *    parallax drift to move into. Nothing to measure, nothing to re-measure.
 * 3. Real buttons instead of `tabIndex` divs, so focus, Enter and Space
 *    behave natively and screen readers announce them as controls.
 */

export type GalleryItem = {
  src: string;
  label: string;
  alt: string;
};

type AccordionGalleryProps = {
  items: GalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
  tilt?: number;
  gap?: number;
  radius?: number;
  duration?: number;
  parallax?: number;
  grayscale?: boolean;
  trigger?: "hover" | "click";
  className?: string;
};

export function AccordionGallery({
  items,
  defaultIndex = 0,
  expandRatio = 0.52,
  tilt = 6,
  gap = 10,
  radius = 24,
  duration = 0.6,
  parallax = 0.5,
  grayscale = true,
  trigger = "hover",
  className = "",
}: AccordionGalleryProps) {
  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), count - 1),
  );

  /* Solve flex-grow so the open panel takes `expandRatio` of the row:
     grow / (grow + count - 1) = r  →  grow = r(count - 1) / (1 - r) */
  const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
  const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <ul
      className={`ag ${className}`}
      style={
        {
          "--ag-gap": `${gap}px`,
          "--ag-radius": `${radius}px`,
          "--ag-dur": `${duration}s`,
        } as CSSProperties
      }
    >
      {items.map((item, i) => {
        const isOpen = i === active;
        const rot = isOpen ? 0 : i < active ? tilt : -tilt;
        /* Panels further from the open one drift further, capped so the
           image never slides past its 9% of slack. */
        const drift = Math.max(-1.5, Math.min(1.5, active - i));
        const shift = drift * parallax * 4;

        return (
          <li
            key={item.src}
            className="ag__item"
            style={{ flexGrow: isOpen ? grow : 1 }}
          >
            <button
              type="button"
              aria-label={item.label}
              aria-current={isOpen ? "true" : undefined}
              onMouseEnter={trigger === "hover" ? () => setActive(i) : undefined}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`ag__panel ${isOpen ? "is-open" : ""}`}
              style={
                {
                  "--ag-tilt": `${rot}deg`,
                  "--ag-shift": `${shift}%`,
                  "--ag-gray": grayscale && !isOpen ? 1 : 0,
                  "--ag-dim": isOpen ? 0 : 0.4,
                } as CSSProperties
              }
            >
              <span className="ag__media">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 55vw"
                  className="object-cover"
                  draggable={false}
                />
              </span>
              <span className="ag__veil" aria-hidden="true" />
              <span className="ag__caption" aria-hidden="true">
                <span className="ag__bar" />
                <span className="ag__text">{item.label}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
