/* Everything runs on Reno time, wherever the visitor is. */
export const RENO_TZ = "America/Los_Angeles";
export const DAY_MS = 864e5;

export type RenoNow = { y: number; m: number; d: number; h: number; min: number; dow: number };

export function renoNow(date = new Date()): RenoNow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: RENO_TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    weekday: "short",
    hour12: false,
  }).formatToParts(date);
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const days: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { y: +g("year"), m: +g("month"), d: +g("day"), h: +g("hour") % 24, min: +g("minute"), dow: days[g("weekday")] ?? 0 };
}

export const pad = (n: number) => String(n).padStart(2, "0");

/** Calendar day as a UTC timestamp (midnight). Lets us do day math without DST surprises. */
export const dayStamp = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);

export const fmtDay = (t: number, o: Intl.DateTimeFormatOptions) =>
  new Date(t).toLocaleDateString("en-US", { timeZone: "UTC", ...o });
