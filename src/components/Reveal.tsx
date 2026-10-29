"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType } from "react";

/* One shared observer for every <Reveal>. Adds .in when the element scrolls into view. */
let io: IntersectionObserver | null = null;
function observer() {
  io ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io?.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  return io;
}

type Props<T extends ElementType> = { as?: T; className?: string } & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Reveal<T extends ElementType = "div">({ as, className = "", ...rest }: Props<T>) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = observer();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  return <Tag ref={ref} className={`rv ${className}`} {...rest} />;
}
