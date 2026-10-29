import { DAY_MS, dayStamp, pad } from "./time";

/* ------------------------------------------------------------------
   WHERE THE TRUCK IS — edit this to update the "Find the Truck" pages.

   Stops are grouped by month ("YYYY-MM") → day of month.
   The site works out the current week from Reno's date, so it rolls
   over on its own at midnight. Just keep future stops filled in.

   t = time, n = name of the stop, a = address
   (addresses that start with a number get a Google Maps link)

   Tip: add ?date=2026-11-03 to /find-us to preview any week.
   ------------------------------------------------------------------ */
export type Stop = { t: string; n: string; a: string };

export const SCHEDULE: Record<string, Record<number, Stop[]>> = {
  "2026-11": {
    1: [{ t: "All day", n: "Evergreen Plaza", a: "2300 Oddie Blvd" }],
    2: [
      { t: "7:00–8:00 AM", n: "Renown", a: "1595 Robb Dr #2" },
      { t: "8:30–9:30 AM", n: "Edgewater at Virginia Lake", a: "2490 Eastshore Place" },
      { t: "10:00–11:30 AM", n: "Renown", a: "910 Vista Blvd" },
      { t: "Night", n: "The Compound After Hours", a: "Downtown Reno — book via the calendar" },
    ],
    3: [
      { t: "6:45–7:45 AM", n: "Desert Skies Middle School", a: "7550 Donatello Dr" },
      { t: "8:30–10:00 AM", n: "Hopes Clinic", a: "1905 E 4th St" },
      { t: "10:30 AM–3:00 PM", n: "UNR", a: "University of Nevada, Reno" },
    ],
    4: [
      { t: "7:30–9:00 AM", n: "Washoe County Sheriff", a: "911 Parr Blvd" },
      { t: "9:30–11:00 AM", n: "Hopes Clinic", a: "580 W 5th St" },
    ],
    5: [
      { t: "7:30–9:00 AM", n: "NV Health Authority", a: "9850 Double R Blvd" },
      { t: "9:30–11:00 AM", n: "Access to Healthcare", a: "4001 S Virginia St" },
      { t: "11:30 AM–12:30 PM", n: "Thrive Wellness", a: "201 W Liberty St" },
    ],
    6: [{ t: "9:00–10:00 AM", n: "Decon Diabetes", a: "4864 Sparks Blvd" }],
    7: [
      { t: "9:00–10:30 AM", n: "Double R Living", a: "9200 Double R Blvd" },
      { t: "11:00 AM–12:00 PM", n: "Acura", a: "11550 S Virginia St" },
    ],
    10: [{ t: "10:00 AM–12:30 PM", n: "UNR", a: "1664 N Virginia St" }],
    11: [
      { t: "7:30–9:00 AM", n: "Police Station", a: "911 Kuenzli St" },
      { t: "9:30–11:00 AM", n: "Home2 Suites", a: "1111 Meadowood Mall Link" },
      { t: "11:30 AM–1:00 PM", n: "Concentra", a: "6410 S Virginia St" },
    ],
    15: [{ t: "10:00 AM–4:00 PM", n: "Antique Fair", a: "301 N Virginia St" }],
    17: [
      { t: "Private event", n: "Private Event", a: "Closed to the public" },
      { t: "11:00 AM–12:30 PM", n: "Sierra NV Specialty Care", a: "5437 Kietzke Ln" },
    ],
    20: [
      { t: "7:00–8:30 AM", n: "Decon Diabetes", a: "5444 Reno Corporate Dr" },
      { t: "10:00 AM–12:00 PM", n: "Corwin Ford", a: "11111 S Virginia St" },
    ],
    21: [{ t: "11:00 AM–12:30 PM", n: "SPCA", a: "75 E Moana Ln" }],
    22: [{ t: "All day", n: "Oddie Blvd", a: "Evergreen Plaza area — 2300 Oddie Blvd" }],
    24: [{ t: "9:00–10:30 AM", n: "Hopes Clinic", a: "1905 E 4th St" }],
    25: [
      { t: "7:30–9:00 AM", n: "Washoe County Sheriff", a: "911 Parr Blvd" },
      { t: "9:30–11:00 AM", n: "Hopes Clinic", a: "580 W 5th St" },
    ],
  },
};

export type Day = { t: number; y: number; m: number; d: number; dow: number; iso: string; stops: Stop[] | null };

export function dayInfo(t: number): Day {
  const x = new Date(t);
  const y = x.getUTCFullYear(), m = x.getUTCMonth() + 1, d = x.getUTCDate();
  return { t, y, m, d, dow: x.getUTCDay(), iso: `${y}-${pad(m)}-${pad(d)}`, stops: SCHEDULE[`${y}-${pad(m)}`]?.[d] ?? null };
}

/** Sunday-first week containing `today` (a UTC day stamp). */
export function weekOf(today: number): Day[] {
  const start = today - dayInfo(today).dow * DAY_MS;
  return Array.from({ length: 7 }, (_, i) => dayInfo(start + i * DAY_MS));
}

export const parseIsoDay = (s: string | null | undefined) => {
  const m = (s ?? "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? dayStamp(+m[1], +m[2], +m[3]) : null;
};
