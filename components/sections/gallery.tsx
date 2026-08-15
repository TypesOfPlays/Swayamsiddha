import { Reveal } from "@/components/reveal";
import {
  AccordionGallery,
  type GalleryItem,
} from "@/components/ui/accordion-gallery";

/**
 * Ordered as a visit: the road outside, the door, the lab, the bench, the
 * imaging. `reception.webp` is deliberately left out — it is an empty desk
 * with packing boxes still in shot and carries no story next to these.
 */
/* Plain public paths — <Photo> applies the deploy base path and the
   blur preview; see components/photo.tsx. */
const items: GalleryItem[] = [
  {
    src: "/img/front.webp",
    label: "Main Chhagharia Road",
    alt: "The green Swayamsiddha Diagnostics signboard above the entrance on Main Chhagharia Road",
  },
  {
    src: "/img/side1.webp",
    label: "Reception & waiting",
    alt: "The entrance and waiting area, with the reception counter and seating",
  },
  {
    src: "/img/side2.webp",
    label: "The laboratory",
    alt: "The laboratory seen through its glass front, analysers lined up on the bench",
  },
  {
    src: "/img/machines.webp",
    label: "Automated analysers",
    alt: "The Erba EM 200 NEO biochemistry analyser and H 560 haematology analyser",
  },
  {
    src: "/img/machines-2.webp",
    label: "X-ray film imaging",
    alt: "The Carestream DryView 5850 laser imager on the laboratory bench",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-xl">
          <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.75rem]">
            Look inside before{" "}
            <em className="text-display italic font-normal">you come</em>.
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
            Our own rooms and our own machines — not stock photography. You can
            see exactly where your sample is taken and what it is run on.
          </p>
        </Reveal>

        <Reveal variant="settle" delay={120} className="mt-10">
          <AccordionGallery
            items={items}
            defaultIndex={3}
            expandRatio={0.5}
            tilt={6}
            gap={10}
            radius={24}
            parallax={0.5}
          />
        </Reveal>

        <Reveal variant="settle" delay={180}>
          <p className="mt-5 text-[0.8125rem] text-ink-muted">
            Hover or tap a panel to open it. Arrow keys move between them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
