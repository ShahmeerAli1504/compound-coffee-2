import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { prettyDate, type InquiryInput } from "./inquiry";
import { site } from "./site";

/* ------------------------------------------------------------------
   Gmail SMTP (smtp.gmail.com:465, SSL) via an App Password.
   Env: GMAIL_USER, GMAIL_APP_PASSWORD, MAIL_TO, MAIL_FROM_NAME, SEND_CONFIRMATION
   ------------------------------------------------------------------ */

let transporter: Transporter | null = null;

export function mailConfig() {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  return {
    user,
    pass,
    to: (process.env.MAIL_TO || user).split(",").map((s) => s.trim()).filter(Boolean),
    fromName: process.env.MAIL_FROM_NAME?.trim() || site.name,
    confirm: (process.env.SEND_CONFIRMATION ?? "true").toLowerCase() !== "false",
  };
}

function getTransporter(user: string, pass: string) {
  transporter ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return transporter;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(d: InquiryInput): [string, string][] {
  const r: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Phone", d.phone || "—"],
    [d.kind === "booking" ? "Booking for" : "Topic", d.topic],
  ];
  if (d.kind === "booking") {
    r.push(["Event date", d.date ? prettyDate(d.date) : "—"], ["Location", d.location || "—"], ["Estimated guests", d.guests || "—"]);
  }
  return r;
}

function shell(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#fff6e6;font-family:Arial,Helvetica,sans-serif;color:#121016">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff6e6;padding:24px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:3px solid #121016">
      <tr><td style="background:#0b0a1c;padding:22px 26px;border-bottom:3px solid #121016">
        <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#a9dcea;font-weight:bold">The Compound Coffee</div>
        <div style="font-size:26px;line-height:1.2;color:#f7c548;font-weight:bold;margin-top:6px">${esc(title)}</div>
      </td></tr>
      <tr><td style="padding:24px 26px">${inner}</td></tr>
      <tr><td style="background:#f7c548;padding:14px 26px;border-top:3px solid #121016;font-size:12px">
        ${esc(site.city)} • ${esc(site.phone)} • <a href="${site.socials.instagram}" style="color:#121016">${esc(site.socials.instagramHandle)}</a>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

function table(d: InquiryInput) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">
    ${rows(d)
      .map(
        ([k, v]) => `<tr>
        <td style="padding:9px 0;border-bottom:1px dashed #d8cdb8;width:150px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6478;font-weight:bold;vertical-align:top">${esc(k)}</td>
        <td style="padding:9px 0;border-bottom:1px dashed #d8cdb8;font-weight:bold">${k === "Email" ? `<a href="mailto:${esc(v)}" style="color:#4a86e8">${esc(v)}</a>` : k === "Phone" && v !== "—" ? `<a href="tel:${esc(v.replace(/[^0-9+]/g, ""))}" style="color:#4a86e8">${esc(v)}</a>` : esc(v)}</td>
      </tr>`
      )
      .join("")}
  </table>`;
}

const messageBlock = (d: InquiryInput) =>
  d.message
    ? `<div style="margin-top:20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6478;font-weight:bold">${d.kind === "booking" ? "Details" : "Message"}</div>
       <div style="margin-top:8px;padding:14px 16px;background:#fff6e6;border:2px solid #121016;white-space:pre-wrap;line-height:1.55">${esc(d.message)}</div>`
    : "";

const textVersion = (d: InquiryInput) =>
  rows(d).map(([k, v]) => `${k}: ${v}`).join("\n") + (d.message ? `\n\n${d.kind === "booking" ? "Details" : "Message"}:\n${d.message}` : "");

export async function sendInquiry(d: InquiryInput, meta: { ip?: string; page?: string }) {
  const cfg = mailConfig();
  if (!cfg) throw new Error("MAIL_NOT_CONFIGURED");
  const t = getTransporter(cfg.user, cfg.pass);
  const from = { name: cfg.fromName, address: cfg.user };

  const subject =
    d.kind === "booking"
      ? `New booking inquiry — ${d.topic}${d.date ? ` · ${prettyDate(d.date)}` : ""} — ${d.name}`
      : `New message — ${d.topic} — ${d.name}`;

  const ownerHtml = shell(
    d.kind === "booking" ? "New booking inquiry" : "New website message",
    `<p style="margin:0 0 16px;line-height:1.55">Hit <b>Reply</b> to answer ${esc(d.name.split(" ")[0])} directly.</p>
     ${table(d)}${messageBlock(d)}
     <p style="margin:22px 0 0;font-size:11px;color:#8a8496">Sent from the website${meta.page ? ` (${esc(meta.page)})` : ""} • ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} Reno time</p>`
  );

  await t.sendMail({
    from,
    to: cfg.to,
    replyTo: { name: d.name, address: d.email },
    subject,
    text: `${textVersion(d)}\n\n— Sent from the website. Reply to answer ${d.name} directly.`,
    html: ownerHtml,
  });

  if (cfg.confirm) {
    const first = d.name.split(" ")[0];
    const confirmHtml = shell(
      "We got your message ✌",
      `<p style="margin:0 0 14px;line-height:1.6">Hey ${esc(first)},</p>
       <p style="margin:0 0 14px;line-height:1.6">Thanks for reaching out to The Compound Coffee. ${
         d.kind === "booking"
           ? `${esc(site.founder)} will check the calendar and get back to you with availability and a quote.`
           : `${esc(site.founder)} will get back to you soon.`
       } Here's a copy of what you sent:</p>
       ${table(d)}${messageBlock(d)}
       <p style="margin:22px 0 0;line-height:1.6">Need us sooner? Call or text <a href="${site.phoneHref}" style="color:#4a86e8">${esc(site.phone)}</a>.</p>
       <p style="margin:14px 0 0;line-height:1.6">Be legendary,<br><b>The Compound Coffee</b></p>`
    );
    // Don't fail the request if only the courtesy email bounces.
    await t
      .sendMail({
        from,
        to: { name: d.name, address: d.email },
        replyTo: cfg.to[0],
        subject: d.kind === "booking" ? "We got your booking request — The Compound Coffee" : "Thanks for reaching out — The Compound Coffee",
        text: `Hey ${first},\n\nThanks for reaching out to The Compound Coffee — we'll get back to you soon.\n\n${textVersion(d)}\n\nNeed us sooner? Call or text ${site.phone}.\n\nBe legendary,\nThe Compound Coffee`,
        html: confirmHtml,
      })
      .catch((err) => console.error("[inquiry] confirmation email failed:", err?.message));
  }
}
