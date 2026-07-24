/**
 * Date formatting for the blog. Uses Intl with an explicit UTC timezone so the
 * server and client always agree (no hydration drift from the machine's zone).
 * Hebrew chrome still formats dates with the Gregorian calendar in `he` locale.
 */

const LOCALE_TAG: Record<string, string> = { en: "en-US", he: "he-IL" };

function tag(locale: string): string {
  return LOCALE_TAG[locale] ?? "en-US";
}

/** Split parts for the index date rail (big day + "Mon YYYY"). */
export function formatPostDate(
  iso: string,
  locale: string,
): { day: string; month: string; year: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { day: "", month: "", year: "" };
  const t = tag(locale);
  return {
    day: new Intl.DateTimeFormat(t, { day: "2-digit", timeZone: "UTC" }).format(d),
    month: new Intl.DateTimeFormat(t, { month: "short", timeZone: "UTC" }).format(d),
    year: new Intl.DateTimeFormat(t, { year: "numeric", timeZone: "UTC" }).format(d),
  };
}

/** Full readable date for the article header, e.g. "July 20, 2026". */
export function formatFullDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(tag(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}
