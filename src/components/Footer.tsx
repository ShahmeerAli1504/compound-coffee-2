import Link from "next/link";
import { Brand } from "./Nav";
import { SocialIcons } from "./SocialIcons";
import { Year } from "./Year";
import { site } from "@/lib/site";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Footer() {
  return (
    <footer className="overflow-hidden bg-night pb-8 pt-[90px] text-cream">
      <div
        aria-hidden="true"
        className="mb-[50px] whitespace-nowrap font-display text-[clamp(4rem,19vw,19rem)] uppercase leading-[.8] tracking-[-.01em] text-transparent [-webkit-text-stroke:2px_var(--color-sky)]"
      >
        The Compound
      </div>
      <div className="wrap">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-[320px] leading-relaxed text-lilac">
              Where coffee is subjective. Mobile specialty coffee, catering and vintage culture out of Reno, Nevada.
            </p>
            <SocialIcons className="mt-[18px]" />
          </div>
          <FootCol title="Visit">
            <Link href="/menu">Drinks Menu</Link>
            <Link href="/find-us">Find the Truck</Link>
            <Link href="/find-us#hours">Hours</Link>
            <Link href="/gallery">Gallery &amp; After Hours</Link>
            <a href={site.socials.yelp} {...ext}>Yelp Reviews</a>
          </FootCol>
          <FootCol title="Book">
            <Link href="/book">Book the Truck</Link>
            <a href={site.bookingCalendar} {...ext}>Booking Calendar</a>
            <Link href="/contact">Contact</Link>
            <a href={site.phoneHref}>{site.phone}</a>
          </FootCol>
          <FootCol title="Follow">
            <a href={site.socials.instagram} {...ext}>Instagram — Coffee</a>
            <a href={site.socials.tiktok} {...ext}>TikTok</a>
            <a href={site.socials.vintage} {...ext}>Instagram — Vintage</a>
            <Link href="/about">Our Story</Link>
          </FootCol>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-5 border-t border-[#2c2846] pt-[22px] text-[.82rem] text-[#9b95bd]">
          <span>
            © <Year /> The Compound Coffee • Reno, Nevada
          </span>
          <span>Coffee × Culture × Community — Be legendary.</span>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div>
      <h2 className="mb-3.5 text-[.74rem] font-bold uppercase tracking-[.2em] text-mustard">{title}</h2>
      <ul className="grid gap-[9px] font-semibold [&_a]:no-underline [&_a:hover]:text-sky">
        {items.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}
