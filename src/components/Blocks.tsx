import Image from "next/image";
import Link from "next/link";
import graffiti from "@/assets/img/compound-graffiti.jpg";
import { site } from "@/lib/site";
import { Bag } from "./Bag";
import { FlowText } from "./FlowText";
import { Hours } from "./Hours";
import { Reveal } from "./Reveal";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/* Dark page header used on every inner page. */
export function PageHero({
  eyebrow,
  title,
  drip,
  children,
  accent = "text-mustard",
}: {
  eyebrow: string;
  title: string;
  drip?: string;
  children?: React.ReactNode;
  accent?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-night pb-20 pt-40 text-cream max-sm:pb-14 max-sm:pt-32">
      <div className="stars absolute inset-0 animate-twinkle opacity-70" />
      <div className="absolute -inset-x-[10%] -bottom-[40%] h-[80%] bg-[radial-gradient(closest-side,rgba(90,63,176,.5),transparent)] blur-[10px]" />
      <Bag className="absolute -bottom-6 right-[4vw] w-[clamp(90px,12vw,170px)] rotate-12 opacity-90" />
      <div className="wrap relative">
        <span className={`eyebrow ${accent}`}>{eyebrow}</span>
        <h1 className="mega mt-3 text-[clamp(3.6rem,12vw,10.5rem)]">
          {drip && <span className="mb-[.15em] block font-drip text-[.38em] leading-none text-sky">{drip}</span>}
          <FlowText text={title} />
        </h1>
        {children && <div className="mt-6 max-w-[620px] text-[1.1rem] leading-relaxed text-haze">{children}</div>}
      </div>
    </section>
  );
}

export function HoursSection() {
  return (
    <section id="hours" className="scroll-mt-20 bg-navy py-[110px] text-cream">
      <div className="wrap grid items-stretch gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow text-mustard">Open Every Day</span>
          <h2 className="mega mt-2 text-[clamp(3.4rem,9vw,7.6rem)]">
            <FlowText text="Hours" />
          </h2>
          <Hours />
        </Reveal>
        <YelpCard />
      </div>
    </section>
  );
}

export function YelpCard() {
  return (
    <Reveal className="relative flex flex-col justify-between gap-6 overflow-hidden border-[3px] border-cream bg-hot p-[26px] text-cream shadow-[12px_12px_0_var(--color-sky)] sm:p-9">
      <div>
        <span className="eyebrow">Reviews</span>
        <h3 className="mega mt-2 text-[clamp(3rem,6vw,5.2rem)]">
          Tell Reno
          <br />
          what you sipped.
        </h3>
        <p className="mt-4 max-w-[420px] text-[1.05rem] leading-relaxed">
          Loved your Love Galore? Had a legendary Illmatic? Read what people are saying or leave us a review on Yelp — it helps the truck more than you know.
        </p>
      </div>
      <div className="relative z-[1] flex flex-wrap gap-3">
        <a className="btn btn-ink" href={site.socials.yelp} {...ext}>
          Read our Yelp reviews
        </a>
        <a className="btn btn-cream" href={site.socials.yelpReview} {...ext}>
          Write a review
        </a>
      </div>
      <Bag className="absolute -bottom-6 -right-5 w-[120px] -rotate-12 sm:w-[190px]" />
    </Reveal>
  );
}

export function Vintage() {
  return (
    <section id="vintage" className="grid min-h-[560px] bg-kraft text-ink lg:grid-cols-2">
      <div className="relative min-h-[420px] border-ink max-lg:border-b-[3px] lg:border-r-[3px]">
        <Image src={graffiti} alt="The Compound graffiti lettering on the truck" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
      <Reveal className="flex flex-col justify-center px-[max(5vw,24px)] py-20">
        <span className="eyebrow">More Than Coffee</span>
        <h2 className="mega mt-2 text-[clamp(3.4rem,8vw,7rem)]">
          <FlowText text="Compound" />
          <br />
          Vintage
        </h2>
        <p className="mt-5 max-w-[520px] text-[1.08rem] leading-[1.75]">
          The Compound also has a vintage side featuring clothing, shoes and curated finds. Follow the dedicated vintage page to see current pieces, drops and updates.
        </p>
        <p className="mt-6">
          <a className="btn btn-ink" href={site.socials.vintage} {...ext}>
            Shop {site.socials.vintageHandle}
          </a>
        </p>
      </Reveal>
    </section>
  );
}

/* Big video band: "bring the Compound to you" */
export function BookHero({ cta = "form", top = false }: { cta?: "form" | "page"; top?: boolean }) {
  return (
    <div className={`relative grid place-items-center ${top ? "min-h-[min(82vh,720px)] pb-16 pt-32" : "h-[min(70vh,620px)] min-h-[460px]"} overflow-hidden border-b-[3px] border-ink text-center text-cream`}>
      <video
        src="/video/night-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover brightness-[.55] saturate-[1.2]"
      />
      <Reveal className="relative z-[1] px-4">
        <span className="eyebrow">Private Events • Workplace Catering • Pop-Ups</span>
        <h2 className="mega mt-3 text-[clamp(3.6rem,12vw,11rem)]">
          <span className="block font-drip text-[.42em] text-sky">bring the</span>
          <FlowText text="Compound" />
          <br />
          to you
        </h2>
        <p className="mx-auto mb-[26px] mt-3.5 max-w-[560px] text-[1.1rem] leading-relaxed">
          Company mornings, birthdays, markets, late-night After Hours — we pull up, set up and pour.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          {cta === "page" ? (
            <Link className="btn" href="/book">
              Book the truck
            </Link>
          ) : (
            <a className="btn" href="#inquiry">
              Send the details
            </a>
          )}
          <a className="btn btn-sky" href={site.bookingCalendar} {...ext}>
            Booking calendar ↗
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export function ContactCard() {
  const rows: [string, React.ReactNode][] = [
    ["Phone", <a key="p" href={site.phoneHref}>{site.phone}</a>],
    ["Email", <a key="e" href={`mailto:${site.email}`}>{site.email}</a>],
    ["Coffee Instagram", <a key="i" href={site.socials.instagram} {...ext}>{site.socials.instagramHandle}</a>],
    ["TikTok", <a key="t" href={site.socials.tiktok} {...ext}>@_thecompoundcoffee</a>],
    ["Vintage Instagram", <a key="v" href={site.socials.vintage} {...ext}>{site.socials.vintageHandle}</a>],
    ["Reviews", <a key="y" href={site.socials.yelp} {...ext}>The Compound Coffee on Yelp</a>],
    ["Service", "Reno, Nevada • On-site workplace catering available"],
  ];
  return (
    <dl className="m-0 border-[3px] border-ink bg-white text-ink shadow-[12px_12px_0_var(--color-purple)]">
      {rows.map(([k, v]) => (
        <div key={k} className="grid gap-1 border-b-2 border-dashed border-ink/25 px-[22px] py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-3">
          <dt className="pt-[3px] text-[.72rem] font-extrabold uppercase tracking-[.14em] opacity-60">{k}</dt>
          <dd className="m-0 break-words font-bold [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-[3px] [&_a:hover]:text-hot">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
