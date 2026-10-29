"use client";

import { useState, type ReactNode } from "react";
import menuPrint from "@/assets/img/menu-print.jpg";
import { Lightbox } from "./Lightbox";

const printed = [{ src: menuPrint, alt: "The Compound Coffee printed menu with basic coffee, cold coffee, non-coffee, specialty drinks and breakfast items" }];

const tab = "border-[3px] border-ink px-[18px] py-2.5 text-[.82rem] font-extrabold uppercase tracking-[.06em] transition";

export function PrintedMenuButton({ className = `${tab} text-ink hover:bg-ink hover:text-mustard` }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <button type="button" onClick={() => setOpen(0)} className={className}>
        Printed Menu ↗
      </button>
      <Lightbox images={printed} index={open} onClose={() => setOpen(null)} />
    </>
  );
}

/* Tabs between the two truck boards, plus the printed menu.
   Boards are passed in so the Setlist can stay a server component. */
export function MenuBoard({ playlist, setlist }: { playlist: ReactNode; setlist: ReactNode }) {
  const [view, setView] = useState<"playlist" | "setlist">("playlist");

  return (
    <>
      <div className="mb-7 flex flex-wrap gap-2.5">
        <div role="tablist" aria-label="Menu boards" className="contents">
          {(["playlist", "setlist"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              id={`tab-${v}`}
              aria-controls={`panel-${v}`}
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`${tab} ${view === v ? "bg-ink text-mustard" : "bg-transparent text-ink hover:bg-ink hover:text-mustard"}`}
            >
              The {v === "playlist" ? "Playlist" : "Setlist"}
            </button>
          ))}
        </div>
        <PrintedMenuButton />
      </div>

      <div role="tabpanel" id="panel-playlist" aria-labelledby="tab-playlist" hidden={view !== "playlist"}>
        {playlist}
      </div>
      <div role="tabpanel" id="panel-setlist" aria-labelledby="tab-setlist" hidden={view !== "setlist"}>
        {setlist}
      </div>
    </>
  );
}
