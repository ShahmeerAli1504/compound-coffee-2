/* The paper-bag mascot from the truck wrap. */
export function BagPaths() {
  return (
    <>
      <path d="M14 14 L106 14 L110 108 L100 100 L90 110 L80 100 L70 110 L60 100 L50 110 L40 100 L30 110 L20 100 L10 108 Z" fill="#c9935b" stroke="#121016" strokeWidth="5" strokeLinejoin="round" />
      <path d="M14 14 L24 4 L96 4 L106 14" fill="#e0ad73" stroke="#121016" strokeWidth="5" strokeLinejoin="round" />
      <path d="M30 26 L36 92" stroke="#a87443" strokeWidth="3" opacity=".6" />
      <rect x="32" y="52" width="20" height="7" rx="2" fill="#121016" />
      <g className="eye-x">
        <path d="M70 46 L86 64 M86 46 L70 64" stroke="#121016" strokeWidth="7" strokeLinecap="round" />
      </g>
    </>
  );
}

export function Bag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 130" className={`bag ${className}`} aria-hidden="true">
      <BagPaths />
    </svg>
  );
}
