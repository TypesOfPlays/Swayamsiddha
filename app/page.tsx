import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyActionBar } from "@/components/cta";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Equipment } from "@/components/sections/equipment";
import { TestDirectory } from "@/components/sections/test-directory";
import { HowItWorks } from "@/components/sections/how-it-works";
import { HomeCollection } from "@/components/sections/home-collection";
import { Visit } from "@/components/sections/visit";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { EcgRule } from "@/components/ecg-rule";
import { Gallery } from "@/components/sections/gallery";
import { MarqueeBand } from "@/components/ui/marquee-band";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        {/* Fills the dead run between the hero and the first section */}
        <MarqueeBand />
        <Services />
        <Equipment />
        <TestDirectory />
        <HowItWorks />
        <HomeCollection />
        {/* The one echo of the boot screen's heartbeat, at the quietest
            seam on the page — both neighbours sit on the same canvas. */}
        <EcgRule />
        {/* See the place, then get the directions */}
        <Gallery />
        <Visit />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyActionBar />
    </>
  );
}
