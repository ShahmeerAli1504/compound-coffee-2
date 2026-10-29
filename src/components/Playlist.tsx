"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/img/logo-badge.jpg";
import { playlist, SPECIALTY_PRICE } from "@/lib/menu";

/* "The Playlist" — tap a track and the cup pours that drink. */
export function Playlist() {
  const [current, setCurrent] = useState(0);
  const [picked, setPicked] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const cup = useRef<SVGSVGElement>(null);
  const reduce = useRef(false);

  const pour = (i: number, byUser = true) => {
    setCurrent(i);
    if (byUser) setPicked(true);
    if (!reduce.current)
      cup.current?.animate(
        [{ transform: "rotate(-8deg) scale(.96)" }, { transform: "rotate(4deg) scale(1.03)" }, { transform: "none" }],
        { duration: 600, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
  };

  // auto-play through the tracks while visible, until someone picks one
  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current || picked || !wrap.current) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 });
    io.observe(wrap.current);
    const id = setInterval(() => visible && pour((current + 1) % playlist.length, false), 2600);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [current, picked]);

  // gentle float while scrolling past
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const el = wrap.current, c = cup.current;
      if (!el || !c) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      c.style.transform = `rotate(${Math.sin(p * Math.PI * 3) * 7}deg) translateY(${Math.sin(p * Math.PI * 2) * 10}px)`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    addEventListener("scroll", on, { passive: true });
    return () => {
      removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const track = playlist[current];

  return (
    <div ref={wrap} className="grid items-start gap-10 lg:grid-cols-[1.25fr_.75fr]">
      <div className="border-[3px] border-ink bg-ink text-cream shadow-[12px_12px_0_var(--color-hot)] max-lg:order-2">
        <div className="flex items-center gap-[18px] border-b-2 border-dashed border-[#3a3546] px-4 py-[18px] sm:px-6 sm:py-[22px]">
          <Image src={logo} alt="Compound Coffee cover art" sizes="84px" className="size-[60px] flex-none border-[3px] border-cream bg-sky object-cover sm:size-[84px]" />
          <div>
            <h3 className="m-0 font-drip text-[clamp(1.8rem,4vw,2.8rem)] font-normal leading-none text-sky">The Playlist</h3>
            <p className="m-0 mt-1.5 text-[.86rem] tracking-[.05em] text-lilac">SPECIALTY DRINKS • {playlist.length} TRACKS • MEDIUM $7 / LARGE $8</p>
          </div>
        </div>
        <ol className="m-0 list-none py-2">
          {playlist.map((t, i) => {
            const active = i === current;
            return (
              <li key={t.name}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => pour(i)}
                  onMouseEnter={() => matchMedia("(hover: hover)").matches && i !== current && pour(i)}
                  className={`grid w-full grid-cols-[30px_1fr_auto] items-center gap-3 px-4 py-3 text-left transition-colors sm:grid-cols-[42px_1fr_auto] sm:px-6 sm:py-[13px] ${
                    active ? "bg-[#221e2e]" : "hover:bg-[#221e2e]"
                  }`}
                >
                  <span className={`font-display text-[1.15rem] ${active ? "text-mustard" : "text-[#6d6684]"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] uppercase leading-none tracking-[.02em]">
                    {t.name}
                    <span className="mt-1 block font-sans text-[.82rem] normal-case tracking-normal text-lilac">feat. {t.feat.toLowerCase()}</span>
                  </span>
                  <span className="flex items-center whitespace-nowrap text-[.9rem] font-bold text-mustard">
                    {SPECIALTY_PRICE}
                    {active && (
                      <span className="eq ml-2 inline-flex h-3.5 items-end gap-0.5" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid justify-items-center gap-3.5 max-lg:order-1 max-lg:grid-cols-[auto_1fr] max-lg:items-center max-lg:justify-items-start lg:sticky lg:top-[110px]">
        <Cup ref={cup} top={track.top} bottom={track.bottom} />
        <div aria-live="polite" className="border-[3px] border-ink bg-cream px-[18px] py-3 text-ink shadow-hard-sm max-lg:text-left lg:min-w-[240px] lg:text-center">
          <small className="block text-[.66rem] font-extrabold uppercase tracking-[.24em] opacity-60">Now pouring</small>
          <b className="font-display text-[1.7rem] font-normal uppercase tracking-[.03em]">{track.name}</b>
          <span className="block text-[.85rem]">{track.feat}</span>
        </div>
      </div>
    </div>
  );
}

function Cup({ ref, top, bottom }: { ref: React.Ref<SVGSVGElement>; top: string; bottom: string }) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 300"
      role="img"
      aria-label="Illustrated Compound iced drink that changes with the selected menu item"
      className="cup w-[150px] origin-[50%_90%] drop-shadow-[14px_18px_0_rgba(18,16,22,.9)] will-change-transform lg:w-[min(300px,70vw)]"
    >
      <defs>
        <clipPath id="cupClip">
          <path d="M34 78 L166 78 L150 286 Q100 294 50 286 Z" />
        </clipPath>
        <linearGradient id="cupShine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".2" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".32" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="112" y="0" width="12" height="150" rx="4" fill="#9e1b34" stroke="#121016" strokeWidth="4" transform="rotate(10 118 75)" />
      <g clipPath="url(#cupClip)">
        <rect x="20" y="78" width="160" height="220" fill="#fffaf0" />
        <rect className="liquid" x="20" y="150" width="160" height="150" fill={bottom} />
        <path className="liquid" d="M20 112 Q60 100 100 114 T180 110 L180 160 Q140 172 100 156 T20 162 Z" fill={top} />
        <rect x="20" y="78" width="160" height="34" fill="#fffaf0" />
        <rect className="ice" x="52" y="120" width="34" height="30" rx="6" fill="#fff" fillOpacity=".55" stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
        <rect className="ice" x="96" y="136" width="30" height="28" rx="6" fill="#fff" fillOpacity=".5" stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
        <rect className="ice" x="70" y="164" width="30" height="26" rx="6" fill="#fff" fillOpacity=".45" stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
        <rect x="20" y="78" width="160" height="220" fill="url(#cupShine)" />
      </g>
      <path d="M34 78 L166 78 L150 286 Q100 294 50 286 Z" fill="none" stroke="#121016" strokeWidth="5" strokeLinejoin="round" />
      <path d="M26 78 Q100 40 174 78 Z" fill="#ffffff" fillOpacity=".55" stroke="#121016" strokeWidth="5" strokeLinejoin="round" />
      <rect x="20" y="72" width="160" height="12" rx="6" fill="#fffaf0" stroke="#121016" strokeWidth="5" />
      <g transform="rotate(-6 100 210)">
        <path d="M44 196 Q60 180 100 186 Q144 178 158 198 Q164 222 140 228 Q100 236 58 230 Q38 222 44 196 Z" fill="#fffaf0" stroke="#121016" strokeWidth="3" />
        <text x="70" y="196" fontSize="11" fill="#4a86e8" style={{ fontFamily: "var(--font-permanent-marker)" }}>
          the
        </text>
        <text x="100" y="220" textAnchor="middle" fontSize="24" fill="#4a86e8" style={{ fontFamily: "var(--font-wet-paint), var(--font-permanent-marker)" }}>
          COMPOUND
        </text>
      </g>
    </svg>
  );
}
