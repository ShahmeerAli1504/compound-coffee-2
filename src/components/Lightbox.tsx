"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect } from "react";

export type LightboxImage = { src: StaticImageData; alt: string; caption?: string };

/* Full-screen image viewer. Pass `images` + `index`; arrows/Escape work. */
export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndex?: (i: number) => void;
}) {
  const open = index !== null;
  const many = images.length > 1 && !!onIndex;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (many && e.key === "ArrowRight") onIndex!((index! + 1) % images.length);
      if (many && e.key === "ArrowLeft") onIndex!((index! - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKey);
    };
  }, [open, index, many, images.length, onClose, onIndex]);

  if (!open) return null;
  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[300] grid place-items-center bg-[#050409]/92 p-5"
    >
      <figure className="m-0 grid max-h-full justify-items-center gap-3">
        <Image src={img.src} alt={img.alt} sizes="90vw" className="h-auto max-h-[82vh] w-auto border-[3px] border-cream object-contain" />
        {img.caption && <figcaption className="font-marker text-lg text-cream">{img.caption}</figcaption>}
      </figure>
      <button type="button" onClick={onClose} className="absolute right-[18px] top-[18px] border-[3px] border-ink bg-cream px-3.5 py-2 font-extrabold text-ink" autoFocus>
        Close ×
      </button>
      {many && (
        <>
          <button type="button" aria-label="Previous photo" onClick={() => onIndex!((index - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 border-[3px] border-ink bg-mustard px-3.5 py-2 text-xl font-extrabold text-ink">
            ←
          </button>
          <button type="button" aria-label="Next photo" onClick={() => onIndex!((index + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 border-[3px] border-ink bg-mustard px-3.5 py-2 text-xl font-extrabold text-ink">
            →
          </button>
        </>
      )}
    </div>
  );
}
