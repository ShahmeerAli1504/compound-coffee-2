"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import truckNight from "@/assets/img/truck-night.jpg";
import { BagPaths } from "./Bag";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* The truck is the main character: scroll pushes into it, then "Be Legendary." wipes in. */
export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const truck = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLHeadingElement>(null);
  const sticker = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const scene = () => {
      raf = 0;
      const h = hero.current, t = truck.current, w = word.current, s = sticker.current, rv = reveal.current;
      if (!h || !t || !w || !s || !rv) return;
      const r = h.getBoundingClientRect();
      if (r.bottom < 0) return;
      const p = clamp(-r.top / (r.height - innerHeight));
      const base = innerWidth <= 640 ? -110 : -62;
      t.style.transform = `translateY(${-p * 6}vh) scale(${1 + p * 0.55})`;
      w.style.transform = `translate(-50%, ${base - p * 30}%) scaleY(${1 + p * 0.9}) scaleX(${1 - p * 0.08})`;
      w.style.opacity = String(1 - clamp((p - 0.45) / 0.3));
      s.style.transform = `rotate(${-10 + p * 40}deg) translateY(${p * -30}vh)`;
      rv.style.clipPath = `circle(${clamp((p - 0.62) / 0.38) * 150}% at 50% 60%)`;
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
    <section ref={hero} aria-label="The Compound Coffee truck" className="relative h-[230vh] bg-[#050409] max-sm:h-[190vh]">
      <div className="sticky top-0 grid h-screen h-[100svh] place-items-center overflow-hidden">
        <div className="stars absolute inset-0 animate-twinkle opacity-80" />
        <div className="absolute -inset-x-[10%] -bottom-[30%] h-[70%] bg-[radial-gradient(closest-side,rgba(90,63,176,.55),transparent)] blur-[10px]" />

        <h1
          ref={word}
          className="absolute left-1/2 top-1/2 z-[1] m-0 whitespace-nowrap font-display text-[clamp(5rem,23vw,24rem)] uppercase leading-[.8] tracking-[-.02em] text-cream will-change-transform [transform:translate(-50%,-62%)] max-sm:text-[25vw] max-sm:[transform:translate(-50%,-110%)]"
        >
          <span className="absolute left-[.06em] top-[-.38em] font-marker text-[.22em] tracking-normal text-sky [transform:rotate(-8deg)]">the</span>
          Compound
          <span className="sr-only"> Coffee — mobile coffee truck in Reno, Nevada</span>
        </h1>

        <div ref={truck} className="truck-mask relative z-[2] mt-[12vh] w-[min(1100px,96vw)] will-change-transform max-sm:mt-0 max-sm:w-[150vw]">
          <Image
            src={truckNight}
            alt="The Compound Coffee truck wrapped in street art, parked at night in front of downtown Reno casinos"
            priority
            placeholder="blur"
            sizes="(max-width: 640px) 150vw, 1100px"
            className="h-auto w-full"
          />
        </div>

        <div
          ref={sticker}
          className="absolute bottom-[14vh] left-[6vw] z-[3] grid aspect-square w-[clamp(110px,14vw,170px)] place-items-center rounded-full border-[3px] border-ink bg-cream text-center font-marker text-[clamp(.85rem,1.3vw,1.15rem)] leading-[1.15] text-ink shadow-[6px_6px_0_var(--color-sky)] [transform:rotate(-10deg)] max-sm:bottom-auto max-sm:left-4 max-sm:top-[16vh] max-sm:w-24 max-sm:text-[.78rem]"
        >
          Coffee
          <br />×<br />
          Culture
        </div>

        <svg viewBox="0 0 160 160" aria-hidden="true" className="absolute right-[6vw] top-[18vh] z-[3] w-[clamp(110px,13vw,160px)] animate-spin-slow max-sm:right-3 max-sm:top-[14vh] max-sm:w-24">
          <defs>
            <path id="hero-circ" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
          </defs>
          <text className="fill-mustard font-sans text-[11.5px] font-extrabold tracking-[2.6px]">
            <textPath href="#hero-circ">WHERE COFFEE IS SUBJECTIVE ✦ RENO NV ✦ </textPath>
          </text>
          <g transform="translate(50 48) scale(.5)" className="bag">
            <BagPaths />
          </g>
        </svg>

        <div className="wrap absolute inset-x-0 bottom-[4vh] z-[4] flex items-end justify-between gap-5 max-sm:bottom-[6vh] max-sm:flex-col max-sm:items-start">
          <p className="m-0 max-w-[420px] leading-[1.55] text-[#dcd6f0] max-sm:text-[.94rem]">
            Reno&apos;s street-art coffee truck. Specialty drinks named after the songs we love, breakfast sandwiches, and a whole lot of culture — parked at a spot near you.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link className="btn" href="/menu">See the Menu</Link>
            <Link className="btn btn-sky" href="/find-us">Find the Truck</Link>
          </div>
        </div>
        <div className="absolute bottom-[2vh] left-1/2 z-[4] -translate-x-1/2 text-[.68rem] uppercase tracking-[.3em] text-[#9b95bd] max-sm:hidden">
          Scroll ↓
        </div>

        <div ref={reveal} className="pointer-events-none absolute inset-0 z-[5] grid place-items-center bg-sky [clip-path:circle(0%_at_50%_60%)]">
          <p className="mega text-center text-[clamp(3.4rem,12vw,11rem)] text-ink" aria-hidden="true">
            Be
            <br />
            <em className="not-italic text-cream [-webkit-text-stroke:3px_var(--color-ink)]">Legendary.</em>
          </p>
        </div>
      </div>
    </section>
  );
}
