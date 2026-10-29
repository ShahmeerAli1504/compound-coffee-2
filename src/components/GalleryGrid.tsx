"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Shot } from "@/lib/gallery";
import { Lightbox } from "./Lightbox";

const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];
const shadows = ["shadow-[8px_8px_0_var(--color-mustard)]", "shadow-[8px_8px_0_var(--color-hot)]", "shadow-[8px_8px_0_var(--color-sky)]", "shadow-[8px_8px_0_var(--color-purple)]"];

/* Polaroid wall with a lightbox. */
export function GalleryGrid({ shots }: { shots: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  return (
    <>
      <div className="columns-1 gap-7 sm:columns-2 lg:columns-3">
        {shots.map((s, i) => (
          <figure key={s.caption + i} className={`mb-8 break-inside-avoid ${tilts[i % 4]}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`block w-full border-[3px] border-ink bg-cream p-3 pb-3.5 text-left text-ink transition duration-200 hover:rotate-0 hover:-translate-y-1 ${shadows[i % 4]}`}
              aria-label={`Open photo: ${s.caption}`}
            >
              <Image src={s.src} alt={s.alt} placeholder="blur" sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 400px" className="h-auto w-full border-2 border-ink" />
              <figcaption className="mt-2.5 font-marker text-[1.05rem]">{s.caption}</figcaption>
            </button>
          </figure>
        ))}
      </div>
      <Lightbox images={shots} index={index} onClose={close} onIndex={setIndex} />
    </>
  );
}
