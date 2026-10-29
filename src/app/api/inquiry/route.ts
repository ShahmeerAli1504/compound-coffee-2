import { NextResponse, type NextRequest } from "next/server";
import { validateInquiry } from "@/lib/inquiry";
import { mailConfig, sendInquiry } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Best-effort rate limit: 5 submissions per IP per 10 minutes (per server instance). */
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > LIMIT;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Spam traps: hidden "company" field must stay empty, and humans take > 2s to fill a form.
  const startedAt = Number(body.startedAt);
  if (body.company || (Number.isFinite(startedAt) && Date.now() - startedAt < 2000)) {
    return NextResponse.json({ ok: true }); // pretend success; drop silently
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages — please try again in a few minutes." }, { status: 429 });
  }

  const { data, errors } = validateInquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", errors }, { status: 422 });
  }

  if (!mailConfig()) {
    console.error("[inquiry] GMAIL_USER / GMAIL_APP_PASSWORD are not set — see .env.example");
    return NextResponse.json({ ok: false, error: "The form isn't connected yet." }, { status: 503 });
  }

  try {
    await sendInquiry(data, { ip, page: typeof body.page === "string" ? body.page.slice(0, 100) : undefined });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "We couldn't send that right now." }, { status: 502 });
  }
}
