import type { RenoNow } from "./time";

/* Opening hours. dow: 0 = Sunday … 6 = Saturday. Minutes from midnight. */
type Slot = { open: number; close: number; label: string; openLabel: string; closeLabel: string };

const weekday: Slot = { open: 7 * 60, close: 13 * 60, label: "7:00 AM – 1:00 PM", openLabel: "7:00 AM", closeLabel: "1:00 PM" };
const weekend: Slot = { open: 9 * 60, close: 12 * 60, label: "9:00 AM – 12:00 PM", openLabel: "9:00 AM", closeLabel: "12:00 PM" };

export const hoursFor = (dow: number): Slot => (dow === 0 || dow === 6 ? weekend : weekday);

export const weekHours = [
  { dow: 1, day: "Monday" },
  { dow: 2, day: "Tuesday" },
  { dow: 3, day: "Wednesday" },
  { dow: 4, day: "Thursday" },
  { dow: 5, day: "Friday" },
  { dow: 6, day: "Saturday" },
  { dow: 0, day: "Sunday" },
].map((d) => ({ ...d, hours: hoursFor(d.dow).label }));

/** Schema.org openingHours strings */
export const openingHoursSchema = ["Mo-Fr 07:00-13:00", "Sa-Su 09:00-12:00"];

export function openStatus(n: RenoNow) {
  const mins = n.h * 60 + n.min;
  const h = hoursFor(n.dow);
  const open = mins >= h.open && mins < h.close;
  const text = open
    ? `Open now • until ${h.closeLabel}`
    : mins < h.open
      ? `Closed now • opens ${h.openLabel}`
      : `Closed now • opens ${hoursFor((n.dow + 1) % 7).openLabel} tomorrow`;
  return { open, text };
}
