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
   * Both places a patient can walk into.
   *
   * The distinction is deliberate and stated on the page: the lab runs the
   * analysers, the collection centre only draws samples and sends them
   * there. Blurring that would be a claim the second site cannot back.
   */
  locations: [
    {
      id: "lab",
      name: "The Laboratory",
      tagline: "where the machines live",
      kind: "Full laboratory",
      line1: "Main Chhagharia Road",
      line2: "Shamagudia, Ichhapur",
      city: "Kendrapara",
      postalCode: "754212",
      /* Exact pin, from the owner's own listing (Knowledge Graph id
         /g/11nr14147m). Taken from the `!3d…!4d…` pair in the resolved Maps
         URL, which is the place itself — the `/@…` pair in the same URL is
         only where the camera happened to sit and is ~30 m off. */
      coords: "20.4788066,86.4452888" as string | null,
      mapsUrl: "https://maps.app.goo.gl/pCQozP99fm2FW1ot6" as string | null,
      blurb:
        "Everything happens here — samples, digital X-ray, ECG, the analysers and the reports.",
      services: ["Blood & urine samples", "Digital X-ray", "ECG", "Reports"],
    },
    {
      id: "collection",
      name: "Collection Centre",
      tagline: "closer to town",
      kind: "Sample collection",
      /* Address confirmed by the owner. */
      line1: "Near Old Medical",
      line2: "Kendrapara town",
      city: "Kendrapara",
      postalCode: "754211",
      /* Exact pin, from the owner's own Google Maps listing. Coordinates
         beat a landmark search — "Old Medical" alone drops the pin
         wherever Google feels like. */
      coords: "20.5024353,86.4247906" as string | null,
      mapsUrl:
        "https://maps.app.goo.gl/WTZCHa7rrEfwwabH7" as string | null,
      blurb:
        "Closer to town for a quick sample. What is drawn here is carried to Main Chhagharia Road and run on the same analysers.",
      services: ["Blood & urine samples", "Reports on WhatsApp"],
    },
  ],

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

export const waLink = `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

export const mapsQuery = encodeURIComponent(
  `${site.name}, ${site.address.full}`,
);
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${mapsQuery}&z=14&output=embed`;

export type SiteLocation = (typeof site.locations)[number];

/**
 * Map lookups per branch.
 *
 * Both branches are on Google Business now, so a name-and-address search
 * resolves to the real listing for either one. Coordinates are still
 * preferred where available: a search is Google's best interpretation of a
 * string, whereas coordinates are the pin the owner placed. The collection
 * centre has them; the laboratory does not yet.
 */
export const mapQueryFor = (l: SiteLocation) =>
  l.coords
    ? l.coords
    : encodeURIComponent(
        `${site.name}, ${l.line1}, ${l.line2}, ${l.city}, ${site.address.state} ${l.postalCode}`,
      );

/** The real listing when there is one, otherwise a search. */
export const mapLinkFor = (l: SiteLocation) =>
  l.mapsUrl ??
  `https://www.google.com/maps/search/?api=1&query=${mapQueryFor(l)}`;

/** Coordinates drop an exact pin; a text search only approximates one. */
export const mapEmbedFor = (l: SiteLocation) =>
  `https://maps.google.com/maps?q=${mapQueryFor(l)}&z=${l.coords ? 17 : 15}&output=embed`;

/**
 * schema.org GeoCoordinates for a branch, spread into its structured data.
 *
 * Worth publishing rather than leaving to the address alone: a postal
 * address in rural Odisha geocodes loosely, and "Main Chhagharia Road" is
 * not a unique string. Coordinates tell a search engine exactly how far a
 * searcher is from the door, and distance is most of what decides which
 * three businesses appear on the map above the results.
 *
 * Returns an empty object when there is no pin, so it spreads to nothing
 * rather than publishing a null.
 */
export const geoFor = (l: SiteLocation) => {
  if (!l.coords) return {};
  const [latitude, longitude] = l.coords.split(",").map(Number);
  return {
    geo: { "@type": "GeoCoordinates", latitude, longitude },
  };
};

export const labLocation =
  site.locations.find((l) => l.id === "lab") ?? site.locations[0];
