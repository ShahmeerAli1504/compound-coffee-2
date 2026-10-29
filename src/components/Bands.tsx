const Track = ({ words, star = "text-cream" }: { words: string[]; star?: string }) => (
  <div className="inline-flex gap-[.5em] pr-[.5em]">
    {[...words, ...words].map((w, i) => (
      <span key={i} className="contents">
        <span>{w}</span>
        <span className={star}>✦</span>
      </span>
    ))}
  </div>
);

const band = "whitespace-nowrap border-y-[3px] border-ink py-[.12em] font-display text-[clamp(2.6rem,7vw,6rem)] uppercase leading-none";

/* Three tilted marquee ribbons. */
export function Bands({ className = "bg-sky" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative overflow-hidden pb-[70px] pt-[60px] ${className}`}>
      <div className={`${band} -rotate-3 scale-105 bg-mustard text-ink`}>
        <div className="inline-block animate-marquee">
          <Track words={["Where coffee is subjective", "Be legendary"]} star="text-purple" />
        </div>
      </div>
      <div className={`${band} -mt-2 rotate-2 scale-105 bg-purple text-cream`}>
        <div className="inline-block animate-marquee-slow">
          <Track words={["Coffee × Culture", "Reno NV"]} />
        </div>
      </div>
      <div className={`${band} -mt-1.5 -rotate-1 scale-105 bg-navy text-sky`}>
        <div className="inline-block animate-marquee">
          <Track words={["I ♥ Coffee", "The Playlist", "The Setlist"]} />
        </div>
      </div>
    </div>
  );
}
