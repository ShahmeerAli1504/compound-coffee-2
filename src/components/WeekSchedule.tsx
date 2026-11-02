"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { dayInfo, parseIsoDay, type Day, type Stop } from "@/lib/schedule";
import { mapsLink, site } from "@/lib/site";
import { DAY_MS, dayStamp, fmtDay, renoNow } from "@/lib/time";

const todayStamp = () => {
  const preview = typeof window !== "undefined" ? parseIsoDay(new URLSearchParams(location.search).get("date")) : null;
  if (preview !== null) return preview;
  const n = renoNow();
  return dayStamp(n.y, n.m, n.d);
};

const longDay = (t: number) => fmtDay(t, { weekday: "long", month: "short", day: "numeric" });

function Stops({ stops }: { stops: Stop[] }) {
  return (
    <>
      {stops.map((s, i) => (
        <div key={i} className="grid gap-0.5 border-t-2 border-dotted border-ink/25 py-2 first:border-t-0 sm:grid-cols-[120px_1fr] sm:gap-3">
          <time className="text-[.9rem] font-bold">{s.t}</time>
          <div>
            <b className="block">{s.n}</b>
            {/^\d/.test(s.a) ? (
              <a href={mapsLink(s.a)} target="_blank" rel="noopener noreferrer" className="text-[.9rem] text-[#3c3850] underline-offset-2 hover:text-hot">
                {s.a} ↗
              </a>
            ) : (
              <span className="text-[.9rem] text-[#3c3850]">{s.a}</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

function DayCard({ day, today, flash }: { day: Day; today: boolean; flash: boolean }) {
  const tag = today ? <TodayTag /> : <TomorrowTag />;
  if (!day.stops) {
    return (
      <Empty id={`day-${day.iso}`} title={<>{longDay(day.t)} {tag}</>}>
        No public stops posted {today ? "today" : "for tomorrow"} yet. Check{" "}
        <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="font-bold underline">
          {site.socials.instagramHandle}
        </a>{" "}
        for pop-ups — or{" "}
        <Link href={`/book?date=${day.iso}&type=Private%20Event#inquiry`} className="font-bold underline">
          book the truck
        </Link>
        .
      </Empty>
    );
  }
  return (
    <article
      id={`day-${day.iso}`}
      className={`scroll-mt-[110px] border-[3px] border-ink bg-cream px-6 py-5 text-ink transition-[box-shadow,transform] duration-300 ${
        flash ? "-translate-1 shadow-[8px_8px_0_var(--color-hot)]" : today ? "shadow-[6px_6px_0_var(--color-hot)]" : ""
      }`}
    >
      <h3 className="m-0 mb-2.5 font-marker text-[1.25rem] font-normal uppercase tracking-[.02em] text-kraft-dark">
        {longDay(day.t)}
        {tag}
      </h3>
      {day.stops ? <Stops stops={day.stops} /> : null}
    </article>
  );
}

const TodayTag = () => (
  <em className="ml-2 bg-hot px-2 py-[3px] align-[3px] font-sans text-[.7rem] font-extrabold not-italic tracking-[.14em] text-cream">TODAY</em>
);

const TomorrowTag = () => (
  <em className="ml-2 bg-ink px-2 py-[3px] align-[3px] font-sans text-[.7rem] font-extrabold not-italic tracking-[.14em] text-mustard">TOMORROW</em>
);

/* Only today + tomorrow are shown; the rest of the week stays hidden.
   Rolls over at midnight Reno time, no edits needed. */
export function WeekSchedule() {
  const [today, setToday] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

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
    return <div className="grid min-h-[320px] place-items-center border-[3px] border-ink bg-cream font-marker text-xl text-kraft-dark">Loading the schedule…</div>;
  }

  const days = [dayInfo(today), dayInfo(today + DAY_MS)];

  const jump = (iso: string) => {
    requestAnimationFrame(() => {
      const card = document.getElementById(`day-${iso}`);
      if (!card) return;
      card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      setFlash(iso);
      setTimeout(() => setFlash(null), 1600);
    });
  };

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[.95fr_1.05fr]">
      {/* today + tomorrow strip */}
      <div className="border-[3px] border-ink bg-cream p-3.5 text-ink shadow-[10px_10px_0_var(--color-kraft)] sm:p-5 lg:sticky lg:top-[100px]" aria-label="Today and tomorrow's schedule">
        <div className="mb-3.5 flex items-baseline justify-between">
          <b className="font-display text-[2.4rem] font-normal tracking-[.03em]">
            {fmtDay(days[0].t, { month: "short", day: "numeric" })} – {fmtDay(days[1].t, { month: "short", day: "numeric" })}
          </b>
          <span className="font-marker text-kraft-dark">on the road</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {days.map((w, i) => (
            <div key={"h" + w.iso} className="pb-1 text-center text-[.68rem] font-extrabold tracking-[.12em] opacity-60">
              {i ? "TOMORROW" : "TODAY"} · {fmtDay(w.t, { weekday: "short" }).toUpperCase()}
            </div>
          ))}
          {days.map((w, i) => {
            const isToday = i === 0, n = w.stops?.length ?? 0;
            const label = `${longDay(w.t)} (${isToday ? "today" : "tomorrow"}): ${n ? `${n} stop${n > 1 ? "s" : ""}` : "open for booking"}`;
            const cls = `flex min-h-[92px] flex-col justify-between border-2 border-ink px-2 py-[5px] text-[1.6rem] font-extrabold text-ink no-underline transition-transform hover:-translate-y-[3px] sm:min-h-[120px] sm:px-3 sm:py-2 sm:text-[2rem] ${
              n ? "bg-ink text-mustard" : "striped-open"
            } ${isToday ? "outline-[3px] outline-offset-2 outline-hot" : ""}`;
            const inner = (
              <>
                {w.d}
                <i className={`text-[.6rem] font-extrabold uppercase not-italic leading-none tracking-[.06em] sm:text-[.72rem] ${n ? "" : "text-kraft-dark"}`}>
                  {n ? `${n} ${n > 1 ? "stops" : "stop"}` : "open"}
                </i>
              </>
            );
            return n ? (
              <button key={w.iso} type="button" aria-label={label} onClick={() => jump(w.iso)} className={`${cls} text-left`}>
                {inner}
              </button>
            ) : (
              <Link key={w.iso} href={`/book?date=${w.iso}&type=Private%20Event#inquiry`} aria-label={label} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
        <div className="mt-3.5 flex flex-wrap gap-4 text-[.78rem] font-bold">
          <Legend swatch="bg-ink">Truck booked</Legend>
          <Legend swatch="bg-[#fdeccb]">Open — book it</Legend>
          <Legend swatch="bg-white outline-[3px] outline-offset-1 outline-hot">Today</Legend>
        </div>
      </div>

      {/* list */}
      <div>
        <div className="grid gap-4" aria-live="polite">
          {days.map((w, i) => (
            <DayCard key={w.iso} day={w} today={i === 0} flash={flash === w.iso} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3.5">
          <a className="btn" href={site.socials.instagram} target="_blank" rel="noopener noreferrer">
            Follow {site.socials.instagramHandle}
          </a>
          <Link className="btn btn-cream" href="/book">
            Book an open date
          </Link>
        </div>
      </div>
    </div>
  );
}

function Legend({ swatch, children }: { swatch: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block size-3 border-2 border-ink ${swatch}`} />
      {children}
    </span>
  );
}

function Empty({ id, title, children }: { id?: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-[110px] border-[3px] border-ink bg-cream px-6 py-5 text-ink shadow-[6px_6px_0_var(--color-hot)]">
      <h3 className="m-0 mb-2.5 font-marker text-[1.25rem] font-normal uppercase text-kraft-dark">{title}</h3>
      <p className="m-0 leading-relaxed">{children}</p>
    </div>
  );
}
