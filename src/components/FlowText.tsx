"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/* Big display words whose letters stretch in a wave as you scroll. */
export function FlowText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>(".ch"));
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > innerHeight + 100) return;
      const vis = clamp(1 - Math.abs((r.top + r.height / 2) / innerHeight - 0.5) * 1.6);
      const t = scrollY * 0.006;
      chars.forEach((c, i) => {
        c.style.transform = `scaleY(${(1 + Math.sin(i * 0.55 + t) * 0.22 * vis).toFixed(3)})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    addEventListener("scroll", onScroll, { passive: true });
    run();
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={`flow ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="wd">
            {Array.from(w).map((c, ci) => (
              <span key={ci} className="ch">
                {c}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
