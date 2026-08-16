import { site, mapsLink, waLink } from "@/lib/site";
import { BrandLockup } from "@/components/brand";

const nav = [
  { href: "#services", label: "What we do" },
  { href: "#tests", label: "Test list" },
  { href: "#home-collection", label: "Home visit" },
  { href: "#corporate", label: "For companies" },
  { href: "#visit", label: "Find us" },
  { href: "#faq", label: "Questions" },
];

export function SiteFooter() {
  return (
    /* pb clears the fixed mobile action bar so nothing is trapped under it */
    <footer className="border-t border-line bg-canvas pb-28 pt-16 md:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <BrandLockup />
            <p className="font-odia mt-5 text-[0.9375rem] text-ink-soft">
              {site.nameOdia} — {site.taglineOdia}
            </p>
            <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-ink-muted">
              {site.address.line1}, {site.address.line2}
              <br />
              {site.address.city}, {site.address.state}{" "}
              <span className="tabular-nums">{site.address.postalCode}</span>
            </address>
          </div>

          <nav aria-label="Footer" className="md:pt-1">
            <p className="eyebrow text-ink-muted">Sections</p>
            {/* py-3 on the anchors, not margin on the list items: the tap
                area has to be the link itself to count as a target. */}
            <ul className="mt-2.5 space-y-0">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-block py-3 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-300 hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:pt-1">
            <p className="eyebrow text-ink-muted">Get in touch</p>
            <ul className="mt-2.5 space-y-0">
              <li>
                <a
                  href={site.phone.tel}
                  className="inline-block py-3 text-[1.0625rem] font-bold tabular-nums text-ink transition-colors duration-300 hover:text-brand"
                >
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-300 hover:text-brand"
                >
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 text-[0.9375rem] font-medium text-ink-soft transition-colors duration-300 hover:text-brand"
                >
                  Directions on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-ink-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-lg text-[0.8125rem] leading-relaxed text-ink-muted">
            Diagnostic tests are carried out on a doctor&rsquo;s advice. Reports
            support a diagnosis — they do not replace consulting your physician.
          </p>
        </div>
      </div>
    </footer>
  );
}
