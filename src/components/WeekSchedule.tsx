"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bag } from "./Bag";
import { dayInfo, parseIsoDay } from "@/lib/schedule";
import { mapsLink, site } from "@/lib/site";
import { dayStamp, fmtDay, renoNow } from "@/lib/time";

const todayStamp = () => {
  const preview = typeof window !== "undefined" ? parseIsoDay(new URLSearchParams(location.search).get("date")) : null;
  if (preview !== null) return preview;
  const n = renoNow();
  return dayStamp(n.y, n.m, n.d);
};

const shadowColors = [
  "shadow-[8px_8px_0_var(--color-hot)]",
  "shadow-[8px_8px_0_var(--color-purple)]",
  "shadow-[8px_8px_0_var(--color-mustard)]",
  "shadow-[8px_8px_0_var(--color-emerald)]",
];

const badgeColors = [
  "bg-mustard text-ink",
  "bg-sky text-ink",
  "bg-hot text-cream",
  "bg-emerald text-ink",
];

export function WeekSchedule() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setToday((prev) => (prev === todayStamp() ? prev : todayStamp()));
    tick();
    const id = setInterval(tick, 60_000);
    const vis = () => !document.hidden && tick();
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  if (today === null) {
    return (
      <div className="grid min-h-[300px] place-items-center border-[3px] border-ink bg-cream p-10 font-marker text-2xl text-ink shadow-[8px_8px_0_var(--color-mustard)]">
        Loading today&apos;s stops…
      </div>
    );
  }

  const day = dayInfo(today);
  const stops = day.stops ?? [];
  const stopCount = stops.length;
  const isWeekend = day.dow === 0 || day.dow === 6;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[.92fr_1.08fr]">
      {/* Left: Today Command Center */}
      <div
        className="relative overflow-hidden border-[3px] border-ink bg-night p-6 text-cream shadow-[12px_12px_0_var(--color-mustard)] sm:p-8 lg:sticky lg:top-[100px]"
        aria-label="Today's live schedule summary"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-purple/30 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-hot/20 blur-2xl" />

        <div className="relative z-[1]">
          {/* Header pill & location */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 border-[2px] border-cream/30 bg-emerald px-3 py-1 font-sans text-[.74rem] font-black uppercase tracking-[.18em] text-ink shadow-hard-xs">
              <span className="size-2 rounded-full bg-ink animate-pulse" /> Live Today
            </span>
            <span className="border-[2px] border-cream/20 bg-ink/60 px-2.5 py-1 font-marker text-[.88rem] text-mustard">
              {isWeekend ? "Weekend Run" : "Weekday Route"}
            </span>
          </div>

          {/* Date typography */}
          <div className="mt-6 border-b-2 border-dashed border-cream/20 pb-6">
            <span className="block font-drip text-[clamp(1.6rem,4vw,2.2rem)] font-normal uppercase leading-none text-sky">
              {fmtDay(day.t, { weekday: "long" })}
            </span>
            <h3 className="m-0 mt-1 font-display text-[clamp(2.8rem,7vw,4.8rem)] font-normal uppercase leading-none tracking-[.02em] text-cream">
              {fmtDay(day.t, { month: "short", day: "numeric" })}
            </h3>
            <p className="m-0 mt-2 font-mono text-[.82rem] uppercase tracking-[.14em] text-haze">
              Reno &amp; Sparks, NV • Rolls over midnight
            </p>
          </div>

          {/* Status summary */}
          <div className="mt-6 border-[2px] border-cream/20 bg-ink/50 p-4 shadow-hard-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[.76rem] font-extrabold uppercase tracking-[.16em] text-cream/70">
                Today&apos;s Status
              </span>
              <span
                className={`border-2 border-ink px-2.5 py-0.5 text-[.76rem] font-black uppercase tracking-[.06em] ${
                  stopCount > 0 ? "bg-mustard text-ink" : "bg-hot text-cream"
                }`}
              >
                {stopCount > 0 ? `${stopCount} ${stopCount === 1 ? "Stop" : "Stops"} Scheduled` : "No Public Stops"}
              </span>
            </div>
            <p className="m-0 mt-2.5 text-[.98rem] leading-relaxed text-cream/85">
              {stopCount > 0
                ? "The truck is hitting the road! See the scheduled stops and time windows on the right."
                : "No public stops on today's calendar — the truck may be booked for private catering or closed-door prep. Follow Instagram stories for surprise pop-ups!"}
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="mt-7 flex flex-col gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-mustard text-center"
            >
              Follow {site.socials.instagramHandle} Stories ↗
            </a>
            <Link href="/book" className="btn btn-cream text-center">
              Book the Truck for an Event
            </Link>
          </div>
        </div>

        {/* Mascot decoration */}
        <Bag className="pointer-events-none absolute -bottom-5 -right-5 w-[110px] -rotate-12 opacity-80 sm:w-[130px]" />
      </div>

      {/* Right: Today's Stops Cards */}
      <div className="grid gap-5" aria-live="polite">
        {stopCount > 0 ? (
          stops.map((s, i) => {
            const shadow = shadowColors[i % shadowColors.length];
            const badge = badgeColors[i % badgeColors.length];
            const isFirst = i === 0;

            return (
              <article
                key={i}
                className={`relative border-[3px] border-ink bg-cream p-5 text-ink transition duration-200 hover:-translate-y-1 sm:p-6 ${shadow}`}
              >
                {/* Card Top Line */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 border-b-2 border-dashed border-ink/20 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-[1.4rem] font-normal uppercase tracking-[.04em] text-hot">
                      Stop 0{i + 1}
                    </span>
                    {isFirst && (
                      <span className="border-2 border-ink bg-hot px-2 py-0.5 font-sans text-[.66rem] font-black uppercase tracking-[.12em] text-cream">
                        First Stop
                      </span>
                    )}
                  </div>
                  <div className={`border-[2px] border-ink px-3 py-1 font-sans text-[.88rem] font-extrabold shadow-hard-xs ${badge}`}>
                    ⏰ {s.t}
                  </div>
                </div>

                {/* Location Name */}
                <h4 className="m-0 mt-4 font-display text-[clamp(1.9rem,3.8vw,2.7rem)] font-normal uppercase leading-[1.05] tracking-[.02em] text-ink">
                  {s.n}
                </h4>

                {/* Address & Navigation */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {/^\d/.test(s.a) ? (
                    <a
                      href={mapsLink(s.a)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-[2px] border-ink bg-white px-3.5 py-1.5 text-[.92rem] font-extrabold text-ink shadow-hard-xs transition hover:bg-sky"
                    >
                      <span>📍 {s.a}</span>
                      <span className="font-black text-hot">Open Maps ↗</span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 border-[2px] border-ink bg-white/70 px-3 py-1 text-[.9rem] font-bold text-ink">
                      <span>📍 {s.a}</span>
                    </span>
                  )}
                </div>

                {/* Footer notes */}
                <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3 text-[.78rem] font-extrabold uppercase tracking-[.1em] text-ink/60">
                  <span>Espresso • Matcha • Cold Foam</span>
                  <span className="font-marker text-hot">Subjective Vibe ✦</span>
                </div>
              </article>
            );
          })
        ) : (
          <div className="border-[3px] border-ink bg-mustard p-7 text-ink shadow-[10px_10px_0_var(--color-hot)] sm:p-9">
            <span className="font-drip text-[1.4rem] uppercase text-hot">today&apos;s status</span>
            <h4 className="m-0 mt-2 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-normal uppercase leading-tight">
              No Public Stops Today
            </h4>
            <p className="mt-4 text-[1.08rem] leading-relaxed">
              We don&apos;t have public stops listed on the board for today. The crew might be running private workplace catering, doing restock, or dropping a spontaneous pop-up somewhere in Reno.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                Check Instagram Stories
              </a>
              <Link href="/book" className="btn btn-cream">
                Book a Future Date
              </Link>
            </div>
          </div>
        )}

        {/* Catch the truck note */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-[3px] border-ink bg-white p-4 text-ink shadow-hard-sm">
          <div className="flex items-center gap-2 font-marker text-[.95rem]">
            <span className="text-xl">☕</span>
            <span>Menu &amp; specials change daily at the window.</span>
          </div>
          <Link href="/menu" className="btn btn-sky px-3 py-1.5 text-[.82rem]">
            See Menu Tracks →
          </Link>
        </div>
      </div>
    </div>
  );
}
