import { site } from "@/lib/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const cls =
  "grid size-[46px] place-items-center rounded-full border-2 border-current transition hover:bg-cream hover:text-ink [&_svg]:size-5";

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      <a href={site.socials.instagram} {...ext} aria-label="Instagram" className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
      </a>
      <a href={site.socials.tiktok} {...ext} aria-label="TikTok" className={cls}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.3-1.6Z" /></svg>
      </a>
      <a href={site.socials.yelp} {...ext} aria-label="Yelp" className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z" /></svg>
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email" className={cls}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
      </a>
    </div>
  );
}
