"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { openStatus, weekHours } from "@/lib/hours";
import { renoNow } from "@/lib/time";

/* Live open/closed badge + weekly hours (today highlighted), on Reno time. */
export function Hours() {
  const [now, setNow] = useState<ReturnType<typeof renoNow> | null>(null);

  useEffect(() => {
    const tick = () => setNow(renoNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const status = now ? openStatus(now) : null;

  return (
    <div>
      <div
        className={`my-4 mb-[22px] inline-flex items-center gap-2.5 border-[3px] border-cream px-3.5 py-2 text-[.82rem] font-extrabold uppercase tracking-[.08em] before:size-2.5 before:rounded-full before:content-[''] ${
          !status ? "before:bg-lilac" : status.open ? "before:bg-green before:shadow-[0_0_10px_var(--color-green)]" : "before:bg-hot before:shadow-[0_0_10px_var(--color-hot)]"
        }`}
        aria-live="polite"
      >
        {status ? status.text : "Checking…"}
      </div>
      <ul className="m-0 list-none border-[3px] border-cream p-0">
        {weekHours.map((h) => {
          const today = now?.dow === h.dow;
          return (
            <li
              key={h.dow}
              className={`flex justify-between border-b-2 border-dashed border-cream/25 px-[18px] py-[13px] font-semibold last:border-b-0 ${today ? "bg-mustard text-ink" : ""}`}
            >
              <span>
                {h.day}
                {today && <span className="sr-only"> (today)</span>}
              </span>
              <span>{h.hours}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[.9rem] leading-relaxed text-lilac">
        We&apos;re a truck, so the spot moves — check{" "}
        <Link href="/find-us" className="underline">
          Find the Truck
        </Link>{" "}
        or our Instagram before heading out.
      </p>
    </div>
  );
}
