"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING_TYPES, CONTACT_TOPICS, validateInquiry, type FieldErrors, type InquiryKind } from "@/lib/inquiry";
import { site } from "@/lib/site";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const label = "text-[.74rem] font-extrabold uppercase tracking-[.1em]";

function Field({
  id,
  text,
  error,
  full,
  optional,
  children,
}: {
  id: string;
  text: string;
  error?: string;
  full?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid content-start gap-[7px] ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className={label}>
        {text}
        {optional && <span className="ml-1.5 font-semibold normal-case tracking-normal opacity-55">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="m-0 text-[.82rem] font-bold text-hot">
          {error}
        </p>
      )}
    </div>
  );
}

/* Booking + contact form → POST /api/inquiry → Gmail SMTP. */
export function InquiryForm({ kind = "booking" }: { kind?: InquiryKind }) {
  const form = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const booking = kind === "booking";
  const topics = booking ? BOOKING_TYPES : CONTACT_TOPICS;

  const [minDate, setMinDate] = useState<string>();
  useEffect(() => setMinDate(new Date().toISOString().slice(0, 10)), []);

  // Prefill from the calendar: /book?date=2026-11-12&type=Private%20Event
  useEffect(() => {
    if (!booking || !form.current) return;
    const q = new URLSearchParams(location.search);
    const el = form.current.elements;
    const date = q.get("date"), type = q.get("type");
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) (el.namedItem("date") as HTMLInputElement).value = date;
    if (type && (topics as readonly string[]).includes(type)) (el.namedItem("topic") as HTMLSelectElement).value = type;
  }, [booking, topics]);


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const { errors: errs } = validateInquiry({ ...fd, kind });
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      (e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fd, kind, startedAt: startedAt.current, page: location.pathname }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (res.ok && json.ok) {
        setStatus({ state: "sent" });
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus({ state: "error", message: json.error });
      }
    } catch {
      setStatus({ state: "error" });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="grid content-start gap-4 border-[3px] border-ink bg-green p-8 text-ink shadow-hard">
        <p className="mega text-[clamp(2.6rem,6vw,4rem)]">Got it ✌</p>
        <p className="m-0 text-[1.08rem] leading-relaxed">
          Thanks for reaching out — {site.founder} will get back to you {booking ? "with availability and a quote" : "soon"}. A copy is on its way to your inbox (check spam just in case).
        </p>
        <p className="m-0 font-bold">
          Need us sooner? Call or text <a href={site.phoneHref} className="underline">{site.phone}</a>.
        </p>
        <button type="button" className="btn btn-cream justify-self-start" onClick={() => setStatus({ state: "idle" })}>
          Send another
        </button>
      </div>
    );
  }

  const inv = (k: keyof FieldErrors) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `f-${k}-err` } : {});
  const sending = status.state === "sending";

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="relative grid gap-4 text-ink sm:grid-cols-2">
      {/* honeypot — real people never see or fill this */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="f-name" text="Name" error={errors.name}>
        <input id="f-name" name="name" autoComplete="name" required className="field-input" {...inv("name")} />
      </Field>
      <Field id="f-email" text="Email" error={errors.email}>
        <input id="f-email" name="email" type="email" autoComplete="email" required className="field-input" {...inv("email")} />
      </Field>
      <Field id="f-phone" text="Phone" optional error={errors.phone}>
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" className="field-input" {...inv("phone")} />
      </Field>

      {booking ? (
        <>
          <Field id="f-date" text="Event date" optional error={errors.date}>
            <input id="f-date" name="date" type="date" min={minDate} className="field-input" {...inv("date")} />
          </Field>
          <Field id="f-location" text="Event location" optional error={errors.location}>
            <input id="f-location" name="location" autoComplete="street-address" className="field-input" />
          </Field>
          <Field id="f-guests" text="Estimated guests" optional error={errors.guests}>
            <input id="f-guests" name="guests" type="number" min={1} inputMode="numeric" className="field-input" {...inv("guests")} />
          </Field>
          <Field id="f-topic" text="What's it for?" full>
            <select id="f-topic" name="topic" className="field-input" defaultValue={topics[0]}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field id="f-message" text="Tell us about it" full optional>
            <textarea id="f-message" name="message" rows={5} placeholder="Times, drinks you're thinking of, anything we should know…" className="field-input min-h-[140px] resize-y" />
          </Field>
        </>
      ) : (
        <>
          <Field id="f-topic" text="Topic">
            <select id="f-topic" name="topic" className="field-input" defaultValue={topics[0]}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field id="f-message" text="Message" full error={errors.message}>
            <textarea id="f-message" name="message" rows={6} required placeholder="What's on your mind?" className="field-input min-h-[160px] resize-y" {...inv("message")} />
          </Field>
        </>
      )}

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button className="btn" type="submit" disabled={sending}>
          {sending ? "Sending…" : booking ? "Send Inquiry →" : "Send Message →"}
        </button>
        <p className="m-0 text-[.82rem] opacity-70">Goes straight to {site.founder}&apos;s inbox.</p>
      </div>

      {status.state === "error" && (
        <p role="alert" className="m-0 border-[3px] border-ink bg-[#ffd9df] px-4 py-3 font-bold sm:col-span-2">
          {status.message || "Something went wrong sending that."} You can also email{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>{" "}
          or call <a href={site.phoneHref} className="underline">{site.phone}</a>.
        </p>
      )}
    </form>
  );
}
