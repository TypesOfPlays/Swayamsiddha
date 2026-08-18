/**
 * Single source of truth for business facts.
 *
 * Anything marked STAND-IN is unconfirmed and must be verified by the owner
 * before this page goes live. Nothing about accreditation, credentials or
 * pricing is invented here — those fields are intentionally empty.
 */

export const site = {
  name: "Swayamsiddha Diagnostics",
  nameOdia: "ସ୍ୱୟଂସିଦ୍ଧା ଡାଇଗ୍ନୋଷ୍ଟିକ୍ସ",
  tagline: "Lab & X-Ray",
  taglineOdia: "ଲ୍ୟାବ ଓ ଏକ୍ସ-ରେ",

  /* Confirmed from the installed signboard */
  phone: {
    display: "78478 89009",
    e164: "+917847889009",
    tel: "tel:+917847889009",
  },

  /**
   * Supplied by the owner for written enquiries.
   *
   * Deliberately not given equal billing with the phone number. Patients
   * booking a blood test ring or send a WhatsApp; the address exists for the
   * enquiries a call cannot carry — a company sending a staff list, a
   * purchase order, a request for a written quote — which is exactly where
   * having no address was costing something.
   */
  email: "swayamsiddha999@yahoo.com",

  whatsapp: {
    /* Confirmed by the owner: same handset as the primary number above. */
    e164: "917847889009",
    message:
      "Namaskar, I would like to book a test at Swayamsiddha Diagnostics.",
  },

  address: {
    line1: "Main Chhagharia Road",
    line2: "Shamagudia, Ichhapur",
    city: "Kendrapara",
    state: "Odisha",
    postalCode: "754212",
    country: "IN",
    full:
      "Main Chhagharia Road, Shamagudia, Ichhapur, Kendrapara, Odisha 754212",
  },

  /**
   * The laboratory's place on the map.
   *
   * This site is about the laboratory and nothing else. The collection
   * centre in Kendrapara town is getting its own site, so it is deliberately
   * absent here rather than half-present — no second address, no branch
   * picker, and nothing in the structured data that would have a search
   * engine treat this page as covering two places.
   *
   * The pin is exact, from the owner's own listing (Knowledge Graph id
   * /g/11nr14147m). It came from the `!3d…!4d…` pair in the resolved Maps
   * URL, which is the place itself — the `/@…` pair in the same URL is only
   * where the camera happened to sit and is about 30 m off.
   */
  map: {
    coords: "20.4788066,86.4452888",
    url: "https://maps.app.goo.gl/pCQozP99fm2FW1ot6",
  },

  /**
   * The collection centre, which is a separate site.
   *
   * Present here only as a pointer: a name, where it is, and a way to get
   * directions. It is deliberately kept out of the structured data — this
   * page describes one address, and declaring a second would have search
   * engines attribute both to this business, which is exactly the tangle
   * removing it in the first place was meant to undo.
   *
   * `website` stays empty until its own site is live; the link renders only
   * when there is something to link to.
   */
  collectionCentre: {
    name: "Collection Centre",
    line1: "Near Old Medical",
    line2: "Kendrapara town",
    city: "Kendrapara",
    postalCode: "754211",
    coords: "20.5024353,86.4247906",
    mapsUrl: "https://maps.app.goo.gl/WTZCHa7rrEfwwabH7",
    website: "",
  },

  /* Confirmed by the owner: open every day, 6 AM to 9 PM. */
  hours: {
    standIn: false,
    weekday: "6:00 AM – 9:00 PM",
    sunday: "6:00 AM – 9:00 PM",
    /* 24-hour form, used only for search-engine structured data */
    opens: "06:00",
    closes: "21:00",
  },

  /* Services the owner explicitly confirmed. Nothing else is claimed. */
  services: {
    pathology: true,
    digitalXray: true,
    ecg: true,
    sameDayReports: true,
    /* Offered, but genuinely distance-dependent — never promised outright */
    homeCollection: "conditional" as const,
    /* Owner has confirmed the lab is not accredited. Stays null — a false
       accreditation claim is a regulatory and reputational risk. */
    accreditation: null,
  },

  testCount: 73,
} as const;

/**
 * Where this build will be served from.
 *
 * Both values are injected by the deploy workflow: the origin from the
 * GitHub account name, the path from the repository name. Locally they are
 * empty, so links resolve against localhost as usual.
 *
 * SITE_URL deliberately includes the base path. A GitHub Pages project site
 * lives under /<repo>, and canonical tags, sitemap entries and Open Graph
 * images must all carry it or they point at URLs that do not exist.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") + BASE_PATH;

/** Absolute URL for a file in public/. Relative paths would drop BASE_PATH. */
export const absUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Site-relative path to a file in public/, carrying the base path.
 *
 * Required for every <Image src>. next/image normally folds basePath into
 * the optimizer URL, but `images.unoptimized` (forced on us by static
 * export) skips the optimizer and emits the string verbatim — so without
 * this, every image 404s on a project site served from /<repo>.
 */
export const asset = (path: string) =>
  `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Google Analytics 4 measurement ID.
 *
 * Set to an empty string to remove analytics entirely — the tag is only
 * rendered when this has a value, so nothing else has to change.
 */
export const GA_MEASUREMENT_ID = "G-XML5RBJY6M";

export const waLink = `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

/**
 * Maps, driven by the pin rather than by a text search.
 *
 * A postal address in rural Odisha geocodes loosely and "Main Chhagharia
 * Road" is not a unique string, so a name-and-address query is Google's best
 * guess where coordinates are the door itself.
 */
export const mapsLink = site.map.url;

export const mapsEmbed = `https://maps.google.com/maps?q=${site.map.coords}&z=17&output=embed`;

/**
 * schema.org GeoCoordinates, spread into the structured data.
 *
 * Worth publishing rather than leaving to the address alone: coordinates
 * tell a search engine exactly how far a searcher is from the door, and
 * distance is most of what decides which businesses appear on the map above
 * the results.
 */
export const geo = (() => {
  const [latitude, longitude] = site.map.coords.split(",").map(Number);
  return { "@type": "GeoCoordinates", latitude, longitude };
})();
