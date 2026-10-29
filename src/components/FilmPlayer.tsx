"use client";

import { useEffect, useRef, useState } from "react";

/* The Compound After Hours film — autoplays muted when on screen. */
export function FilmPlayer() {
  const vid = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current && !reduce) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vid.current!;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };
  const sound = () => {
    const v = vid.current!;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  const btn = "pointer-events-auto whitespace-nowrap border-[3px] border-ink bg-cream px-2.5 py-1.5 text-[.68rem] sm:px-3.5 sm:py-2.5 sm:text-[.78rem] font-extrabold uppercase tracking-[.08em] text-ink shadow-hard-xs";

  return (
    <div className="relative aspect-video overflow-hidden border-[3px] border-cream bg-black shadow-[14px_14px_0_var(--color-purple)]">
      <video
        ref={vid}
        src="/video/after-hours.mp4"
        poster="/video/after-hours-poster.jpg"
        playsInline
        muted
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="size-full object-cover"
        aria-label="The Compound After Hours — late-night coffee under the Reno lights"
      />
      <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 flex sm:inset-x-4 sm:bottom-4 items-center justify-between gap-2.5">
        <span className="whitespace-nowrap bg-black/60 px-2 py-1 font-marker text-[.8rem] text-mustard sm:px-2.5 sm:text-base">
          <span className="mr-2 inline-block size-[9px] animate-blinkdot rounded-full bg-hot" />
          AFTER HOURS
        </span>
        <span className="flex gap-2">
          <button type="button" onClick={toggle} className={btn}>
            {playing ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={sound} className={btn}>
            {muted ? "Sound off" : "Sound on"}
          </button>
        </span>
      </div>
    </div>
  );
}
