import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { site, SITE_URL, geo, GA_MEASUREMENT_ID } from "@/lib/site";
import { BootScreen } from "@/components/boot-screen";
import { ScrollProgress } from "@/components/scroll-progress";
import { TimeOfDay } from "@/components/time-of-day";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Odia, self-hosted and subset to the glyphs this site actually uses.
 *
 * Noto Sans Oriya's standard Oriya subset is ~96 KB per weight — 192 KB
 * across the two used here, which made it comfortably the heaviest thing on
 * the page, heavier than every photograph combined. The site shows ten short
 * lines of Odia.
 *
 * next/font's `text` option is the documented way to narrow that, and it
 * does nothing here: this version's loader accepts it and emits the full
 * subset regardless (measured — the byte count did not move). So the two
 * files in ./fonts are the same subset fetched from the Google Fonts API by
 * hand and committed. 55 KB for both, down from 192 KB.
 *
 * They were requested with the real sentences rather than a list of unique
 * letters, deliberately. Oriya forms conjuncts, and the subsetter needs to
 * see the actual sequences to keep the ligature glyphs that render them.
 *
 * ►► ADDING ODIA COPY ANYWHERE ON THE SITE MEANS REGENERATING THESE. ◄◄
 * A glyph outside the original request does not exist in these files and
 * renders as a blank box. See scripts/gen-odia-font.sh.
 */
const notoOriya = localFont({
  variable: "--font-odia",
  display: "swap",
  src: [
    { path: "./fonts/noto-oriya-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-oriya-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    /* Kept under ~580px as Google renders it. The old version was 70
       characters / ~676px and was being truncated in results. */
    default: `${site.name} — Lab & X-Ray in Kendrapara`,
    template: `%s · ${site.name}`,
  },
  description: `Fully automated pathology lab, digital X-ray and ECG at ${site.address.line2}, Kendrapara. ${site.testCount} tests, most reports the same day. Call ${site.phone.display}.`,
  keywords: [
 "diagnostic centre Kendrapara",
 "pathology lab Kendrapara",
 "blood test Ichhapur",
 "digital X-ray Kendrapara",
 "ECG Kendrapara",
 "Swayamsiddha Diagnostics",
 "lab test Shamagudia",
 "corporate health checkup Kendrapara",
 "group health checkup Odisha",
 "pre-policy medical test Kendrapara",
 "ସ୍ୱୟଂସିଦ୍ଧା ଡାଇଗ୍ନୋଷ୍ଟିକ୍ସ",
  ],
  /* Absolute, not "/" — metadataBase resolution treats a root-relative path
     as root-relative to the origin, which would drop the /<repo> base path
     a Pages project site is served from. */
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/`,
    siteName: site.name,
    title: `${site.name} — Lab & X-Ray, Kendrapara`,
    description: `${site.testCount} pathology tests, digital X-ray and ECG under one roof. Most reports the same day.`,
    /* No `images` key here on purpose, for either card.
       app/opengraph-image.tsx generates the preview and Next emits the tags
       pointing at it. An image declared here would take precedence and the
       designed card would never be seen. */
  },
  /* The link preview most of this audience will actually see is WhatsApp's,
     which reads the Open Graph tags above. Twitter's is here for completeness. */
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Lab & X-Ray, Kendrapara`,
    description: `${site.testCount} pathology tests, digital X-ray and ECG under one roof. Most reports the same day.`,
  },
  /* Icons come from app/icon.png and app/apple-icon.png — file-based icons
     take precedence, so declaring them here too would only duplicate tags. */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Medical",
};

export const viewport: Viewport = {
  themeColor: "#faf8f3",
  colorScheme: "light",
};

/**
 * Local-business structured data. Opening hours are published only once the
 * owner has confirmed them — an unverified guess here would send patients to
 * a closed lab via Google's own listing.
 */
const openingHours = site.hours.standIn
  ? {}
  : {
      openingHoursSpecification: [
        {
 "@type": "OpeningHoursSpecification",
          dayOfWeek: [
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday",
          ],
          opens: site.hours.opens,
          closes: site.hours.closes,
        },
      ],
    };

const jsonLd = {
 "@context": "https://schema.org",
 "@type": "DiagnosticLab",
  name: site.name,
  alternateName: site.nameOdia,
  description: `Pathology laboratory, digital X-ray and ECG centre serving Ichhapur, Shamagudia and Kendrapara district.`,
  url: SITE_URL,
  telephone: site.phone.e164,
  image: `${SITE_URL}/img/front.webp`,
  logo: `${SITE_URL}/img/logo-mark.png`,
  address: {
 "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  /* From the owner's own Maps listing, not geocoded from the address above */
  geo,
  areaServed: [
    { "@type": "AdministrativeArea", name: "Kendrapara district" },
    { "@type": "Place", name: "Ichhapur" },
    { "@type": "Place", name: "Shamagudia" },
  ],
  availableService: [
    { "@type": "MedicalTest", name: "Pathology blood tests" },
    { "@type": "MedicalTest", name: "Digital X-ray" },
    { "@type": "MedicalTest", name: "ECG" },
  ],
  /* No `department`. This page describes one address, and the collection
     centre is getting its own site — declaring it here would have search
     engines attribute a second location to this one. */
  ...openingHours,
};

/**
 * Holds the page still under the boot veil, then releases it.
 *
 * The veil plays on every load by choice of the owner — there is no
 * session gate. This script never removes the veil itself; CSS does that on
 * its own timeline, so a blocked or failed script can't trap a visitor.
 * The timeout only has to outlast the veil animation in globals.css.
 */
const bootScript = `try{var d=document.documentElement;d.classList.add('ss-js','ss-booting');setTimeout(function(){d.classList.remove('ss-booting')},4400)}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      /* The boot script below stamps ss-booting onto this element before
         React hydrates, so server and client markup differ here by design.
         Without this, React logs a hydration mismatch. */
      suppressHydrationWarning
      className={`${jakarta.variable} ${instrument.variable} ${notoOriya.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-canvas">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <BootScreen />
        <ScrollProgress />
        <TimeOfDay />
        {/* Tailwind's own sr-only / focus:not-sr-only pair, rather than a
            bespoke rule that can go missing in a stylesheet refactor. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-[0.9375rem] focus:font-semibold focus:text-white focus:shadow-brand"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics.
            `afterInteractive` rather than the plain <script> tags Google
            hands you: gtag.js is around 90 KB from a third-party origin, and
            dropped into <head> as written it competes with the page's own
            first paint. Loaded after hydration it reports exactly the same
            pageviews and costs the visitor nothing up front — which matters
            on a page whose audience is mostly mid-range Android over rural
            data. */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
