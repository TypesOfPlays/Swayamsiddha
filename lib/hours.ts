import { site } from "./site";

/**
 * Whether the lab is open right now.
 *
 * Everything here works in the lab's own timezone rather than the visitor's.
 * Most people reading this page are a few kilometres away, but a son in Dubai
 * checking whether his mother can go this morning should be told about
 * Kendrapara's clock, not his own.
 *
 * The hours are the same every day of the week, which is why there is no
 * day-of-week handling. If that ever changes, this is the file to change.
 */

const TIMEZONE = "Asia/Kolkata";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Wall-clock minutes since midnight at the lab, whatever zone the reader is in. */
export function labMinutes(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  /* en-GB gives 24-hour output, but midnight comes back as "24" in some
     engines rather than "00". */
  return (get("hour") % 24) * 60 + get("minute");
}

const clockLabel = (mins: number) => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 < 12 ? "AM" : "PM";
  return m === 0 ? `${h} ${suffix}` : `${h}:${String(m).padStart(2, "0")} ${suffix}`;
};

export type OpenState = {
  open: boolean;
  /** True inside the last hour of the day — worth saying, not worth alarming. */
  closingSoon: boolean;
  /** "Open now" · "Closing soon" · "Closed" */
  label: string;
  /** "until 9 PM" · "opens 6 AM" */
  detail: string;
};

export function openStateAt(now: Date): OpenState | null {
  /* Never publish a live status derived from unconfirmed hours: it would be
     stated with more certainty than the underlying fact deserves. */
  if (site.hours.standIn) return null;

  const opens = toMinutes(site.hours.opens);
  const closes = toMinutes(site.hours.closes);
  const t = labMinutes(now);

  if (t >= opens && t < closes) {
    const closingSoon = closes - t <= 60;
    return {
      open: true,
      closingSoon,
      label: closingSoon ? "Closing soon" : "Open now",
      detail: `until ${clockLabel(closes)}`,
    };
  }

  return {
    open: false,
    closingSoon: false,
    label: "Closed",
    detail: `opens ${clockLabel(opens)}`,
  };
}
