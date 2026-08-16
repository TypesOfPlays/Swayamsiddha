import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";

/**
 * The card that appears when someone forwards this link on WhatsApp.
 *
 * For this audience that card is not a detail — it is the first thing most
 * new visitors ever see of the business, because the link arrives in a
 * family group rather than from a search result. It was a generic image.
 *
 * Rendered at build time by next/og, which ships inside Next, so this adds
 * no dependency and nothing at runtime. The output is a static PNG in the
 * export like any other file.
 *
 * Kept deliberately plain: a name, what the place does, where it is, and
 * the number. A preview card is read at about the size of a postage stamp
 * in a chat list, so anything smaller than the phone number is decoration
 * nobody will resolve.
 */

export const alt = `${site.name} — pathology lab, digital X-ray and ECG in ${site.address.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Required under `output: "export"`. Without it the build refuses the route
   outright rather than rendering the card once and writing out the PNG. */
export const dynamic = "force-static";

export default async function OpengraphImage() {
  /* Inlined rather than referenced: the renderer has no origin to resolve a
     relative URL against at build time. */
  const mark = await readFile(
    path.join(process.cwd(), "public/img/logo-mark.png"),
  );
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#08240f",
          color: "#ffffff",
        }}
      >
        {/* One warm light from the top right, echoing the page's own */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 900,
            height: 700,
            background:
              "radial-gradient(closest-side, rgba(232,180,74,0.30), rgba(232,180,74,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} width={78} height={78} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
              {site.name}
            </div>
            <div
              style={{
                fontSize: 21,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.62)",
                marginTop: 6,
              }}
            >
              {site.tagline}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            {`${site.testCount} tests, digital X-ray and ECG under one roof.`}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(255,255,255,0.70)",
              marginTop: 22,
            }}
          >
            {`${site.address.line2}, ${site.address.city} · Most reports the same day`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            {site.phone.display}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(232,180,74,0.95)",
              fontWeight: 600,
            }}
          >
            {`${site.hours.weekday} · every day`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
