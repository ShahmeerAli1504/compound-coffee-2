/* Shared by the forms (client) and /api/inquiry (server). */

export const BOOKING_TYPES = [
  "Workplace Catering",
  "Private Event",
  "Market / Pop-Up",
  "After Hours",
  "Community Event",
  "Collaboration",
] as const;

export const CONTACT_TOPICS = [
  "General Question",
  "Catering Question",
  "Collaboration",
  "Compound Vintage",
  "Press / Media",
  "Feedback",
] as const;

export type InquiryKind = "booking" | "contact";

export type InquiryInput = {
  kind: InquiryKind;
  name: string;
  email: string;
  phone?: string;
  topic: string;
  date?: string;
  location?: string;
  guests?: string;
  message?: string;
};

export type FieldErrors = Partial<Record<keyof InquiryInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const line = (v: unknown, max: number) => str(v, max).replace(/[\r\n\t]+/g, " ");

/** Normalises untrusted input and returns field errors (empty object = valid). */
export function validateInquiry(raw: Record<string, unknown>): { data: InquiryInput; errors: FieldErrors } {
  const kind: InquiryKind = raw.kind === "contact" ? "contact" : "booking";
  const data: InquiryInput = {
    kind,
    name: line(raw.name, 100),
    email: line(raw.email, 200),
    phone: line(raw.phone, 40),
    topic: line(raw.topic, 60),
    date: line(raw.date, 10),
    location: line(raw.location, 200),
    guests: line(raw.guests, 7),
    message: str(raw.message, 5000),
  };
  const errors: FieldErrors = {};

  if (data.name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email so we can reply.";
  if (data.phone && !/^[0-9+().\-\s]{7,}$/.test(data.phone)) errors.phone = "That phone number looks off.";

  const topics: readonly string[] = kind === "booking" ? BOOKING_TYPES : CONTACT_TOPICS;
  if (!topics.includes(data.topic)) data.topic = topics[0];

  if (kind === "booking") {
    if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.date = "Pick a date from the calendar.";
    if (data.guests && !/^\d{1,6}$/.test(data.guests)) errors.guests = "Use a number, e.g. 40.";
  } else {
    data.date = data.location = data.guests = "";
    if ((data.message ?? "").length < 5) errors.message = "Add a quick message.";
  }

  return { data, errors };
}

export const prettyDate = (iso?: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
