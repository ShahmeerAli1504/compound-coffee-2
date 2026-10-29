"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import wordmark from "@/assets/img/compound-wordmark.png";
import { nav } from "@/lib/site";

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center no-underline" aria-label="The Compound Coffee home">
      <Image src={wordmark} alt="The Compound" sizes="140px" className="h-[52px] w-auto -rotate-2" priority />
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 500);
      lastY.current = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  // close the overlay after navigating
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed inset-x-0 top-0 z-[100] py-3.5 transition-[transform,background-color] duration-400 ease-pop ${
          scrolled ? "bg-night/85 backdrop-blur-md" : ""
        } ${hidden && !open ? "-translate-y-[110%]" : ""}`}
      >
        <div className="wrap flex items-center justify-between gap-4">
          <Brand />
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-[.82rem] font-bold uppercase tracking-[.08em] no-underline transition hover:bg-cream hover:text-ink ${
                  isActive(l.href) ? "bg-cream text-ink" : "text-cream"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/book" className="btn btn-sm ml-2 [--s:var(--color-sky)]">
              Book Us
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full bg-cream px-4 py-2.5 text-[.8rem] font-extrabold uppercase tracking-[.08em] text-ink lg:hidden"
          >
            Menu +
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[200] flex flex-col justify-center bg-mustard p-6 text-ink transition-[clip-path] duration-600 ease-pop ${
          open ? "[clip-path:circle(150%_at_92%_4%)]" : "[clip-path:circle(0%_at_92%_4%)]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-[18px] rounded-full bg-ink px-4 py-2.5 font-extrabold text-mustard"
        >
          Close ×
        </button>
        {[{ href: "/", label: "Home" }, ...nav, { href: "/book", label: "Book Us" }].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`font-display text-[clamp(2.6rem,12vw,4rem)] uppercase leading-[1.05] no-underline ${
              pathname === l.href ? "text-hot" : ""
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
