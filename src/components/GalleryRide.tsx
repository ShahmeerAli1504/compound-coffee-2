"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { shots } from "@/lib/gallery";
import { FlowText } from "./FlowText";

/* Scroll down → photos ride sideways (desktop). Swipe on phones. */
export function GalleryRide() {
  const ride = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const scene = () => {
      raf = 0;
      const r = ride.current, t = track.current;
      if (!r || !t) return;
      if (innerWidth <= 640) {
        t.style.transform = "";
        return;
      }
      const rect = r.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - innerHeight)));
      const max = t.scrollWidth - innerWidth + 80;
      t.style.transform = `translateX(${-p * max}px)`;
    };
    const req = () => {
      if (!raf) raf = requestAnimationFrame(scene);
    };
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    scene();
    return () => {
      removeEventListener("scroll", req);
      removeEventListener("resize", req);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ride} id="gallery" className="relative h-[320vh] bg-emerald text-cream max-sm:h-auto">
      <div className="sticky top-0 flex h-screen h-[100svh] flex-col justify-center overflow-hidden max-sm:relative max-sm:h-auto max-sm:py-[90px]">
        <div className="wrap flex flex-wrap items-end justify-between gap-4 pb-[26px]">
          <div>
            <span className="eyebrow">Truck • Drinks • Community</span>
            <h2 className="mega mt-2 text-[clamp(3.4rem,9vw,8rem)]">
              <FlowText text="Life on Compound St." />
            </h2>
          </div>
          <Link href="/gallery" className="btn btn-cream">
            Full gallery
          </Link>
        </div>
        <div
          ref={track}
          className="flex w-max items-center gap-[34px] px-10 pb-[30px] pt-2.5 will-change-transform max-sm:w-auto max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:px-4 max-sm:pb-10"
        >
          {shots.map((s, i) => (
            <figure
              key={s.caption}
              className={`m-0 flex-none snap-center border-[3px] border-ink bg-cream p-3 pb-3.5 text-ink shadow-[8px_8px_0_var(--color-night)] ${
                s.wide ? "w-[clamp(320px,38vw,540px)] max-sm:w-[86vw]" : "w-[clamp(240px,26vw,360px)] max-sm:w-[78vw]"
              } ${i % 2 ? "translate-y-6 rotate-[2.5deg]" : "-rotate-3"}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                placeholder="blur"
                sizes={s.wide ? "(max-width: 640px) 86vw, 540px" : "(max-width: 640px) 78vw, 360px"}
                className={`w-full border-2 border-ink object-cover ${s.wide ? "aspect-[4/3]" : "aspect-[3/4]"}`}
              />
              <figcaption className="mt-2.5 font-marker text-[1.05rem]">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
