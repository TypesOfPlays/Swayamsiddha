import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/* Answers are kept identical between the visible page and the structured
   data below — search engines and patients get the same wording. */
const faqs = [
  {
    q: "Do I need an appointment?",
    a: "No. You can walk in during working hours. A quick call ahead only helps us tell you whether your test needs fasting, so you don't make the trip twice.",
  },
  {
    q: "When will my report be ready?",
    a: "Most routine tests are reported the same day. A few specialised tests take longer — ask at the desk when you give the sample and we'll tell you the exact time.",
  },
  {
    q: "Do I need to come fasting?",
    a: "It depends on the test. Fasting sugar, lipid profile and a few others need 8–10 hours without food — water is fine. We open at 6 AM so you can give the sample early and have your breakfast at a normal hour. Call us with your prescription and we'll tell you before you travel.",
  },
  {
    q: "Can you collect the sample from my home?",
    a: "Sometimes — it depends how far you are from the lab. Call and tell us your village or a nearby landmark, and we'll tell you straight away whether we can reach you.",
  },
  {
    q: "Can I get my report on WhatsApp?",
    a: "Yes. Ask for it when you give the sample and we'll send a copy to your number, so you can forward it to your doctor without another trip.",
  },
  {
    q: "What does a test cost?",
    a: "Prices depend on the test and on the panel your doctor has advised. Call us with the prescription and we'll tell you the cost before you commit to anything.",
  },
  {
    q: "Which X-rays do you take?",
    a: "Chest, spine, limbs and joints, taken digitally and printed on dry laser film. Bring any earlier films with you so the doctor can compare.",
  },
];

export function Faq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-canvas-sunk py-24 sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-brand">Common questions</p>
          <h2 className="mt-5 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
            Before you{" "}
            <em className="text-display italic">make the trip</em>.
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
            Still unsure about something? Call{" "}
            <a
              href={site.phone.tel}
              className="font-semibold text-brand underline underline-offset-4 decoration-brand/30 transition-colors hover:decoration-brand"
            >
              {site.phone.display}
            </a>{" "}
            — a person answers, not a menu.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-[2rem] bg-surface/60 p-1.5 shadow-card ring-1 ring-line/70">
            <div className="rounded-[1.625rem] bg-surface px-6 py-2 sm:px-8">
              <Accordion className="w-full">
                {faqs.map((f) => (
                  <AccordionItem
                    key={f.q}
                    value={f.q}
                    className="border-line/70 not-last:border-b"
                  >
                    <AccordionTrigger className="py-5 text-[1rem] font-bold tracking-[-0.01em] text-ink">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pr-10 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
