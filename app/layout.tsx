import type { Metadata, Viewport } from "next";
import {
  Plus_Jakarta_Sans,
  Instrument_Serif,
  Noto_Sans_Oriya,
} from "next/font/google";
import { site, SITE_URL, absUrl, geoFor, labLocation } from "@/lib/site";
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

const notoOriya = Noto_Sans_Oriya({
  variable: "--font-odia",
  subsets: ["oriya"],
  weight: ["400", "600"],
  display: "swap",
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
    images: [
      {
        url: absUrl("/img/og.jpg"),
        width: 1200,
        height: 630,
        alt: `${site.name} — lab and digital X-ray in Ichhapur, Kendrapara`,
      },
    ],
  },
  /* The link preview most of this audience will actually see is WhatsApp's,
     which reads the Open Graph tags above. Twitter's is here for completeness. */
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Lab & X-Ray, Kendrapara`,
    description: `${site.testCount} pathology tests, digital X-ray and ECG under one roof. Most reports the same day.`,
    images: [absUrl("/img/og.jpg")],
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
  ...geoFor(labLocation),
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
  /* The collection centre is a branch of the same business, not a second
     laboratory — samples drawn there are run at the address above. Declared
     as a department so search engines associate the two rather than reading
     them as competing listings. */
  department: site.locations
    .filter((l) => l.id !== "lab")
    .map((l) => ({
      "@type": "MedicalClinic",
      name: `${site.name} — ${l.name}`,
      telephone: site.phone.e164,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${l.line1}, ${l.line2}`,
        addressLocality: l.city,
        addressRegion: site.address.state,
        postalCode: l.postalCode,
        addressCountry: site.address.country,
      },
      ...geoFor(l),
      ...openingHours,
    })),
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
const bootScript = `try{var d=document.documentElement;d.classList.add('ss-booting');setTimeout(function(){d.classList.remove('ss-booting')},4400)}catch(e){}`;

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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-brand"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
