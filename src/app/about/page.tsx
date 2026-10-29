import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import truckService from "@/assets/img/truck-service.jpg";
import truckWindow from "@/assets/img/truck-window.jpg";
import { Bands } from "@/components/Bands";
import { PageHero, Vintage, YelpCard } from "@/components/Blocks";
import { FlowText } from "@/components/FlowText";
import { Reveal } from "@/components/Reveal";
import { Story } from "@/components/Story";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Meet Jaffet and The Compound — a Reno coffee truck blending specialty drinks, original street art, mobile coffee service and vintage culture.",
};

const values = [
  { n: "01", t: "Coffee is subjective", d: "No gatekeeping. Order it how you like it — we'll make it legendary." },
  { n: "02", t: "Art on wheels", d: "The truck wrap, the paper-bag crew, the stickers — all original Compound artwork." },
  { n: "03", t: "Community first", d: "Teachers, nurses, first responders, students — the truck goes where Reno works." },
  { n: "04", t: "Culture in every cup", d: "Drinks named after the songs we love. The menu is literally a Playlist." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Coffee × Culture × Community" title="Our Story" drip="where coffee is subjective" accent="text-sky">
        A street-art coffee truck out of Reno, Nevada — built by a barista who wanted coffee to feel like a block party.
      </PageHero>

      <Story />

      <section className="bg-night py-[110px] text-cream">
        <div className="wrap">
          <Reveal as="h2" className="mega mb-12 text-[clamp(3.4rem,9vw,7.6rem)]">
            <FlowText text="What we're about" />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.n}
                className={`border-[3px] border-cream p-7 ${["bg-purple", "bg-emerald", "bg-hot", "bg-navy"][i]} shadow-[8px_8px_0_var(--color-mustard)]`}
              >
                <span className="font-display text-[1.2rem] text-mustard">{v.n}</span>
                <h3 className="m-0 mt-1 font-display text-[clamp(2rem,4vw,2.8rem)] font-normal uppercase leading-none">{v.t}</h3>
                <p className="m-0 mt-3 text-[1.02rem] leading-relaxed text-cream/85">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-[110px] text-ink">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <span className="eyebrow">Founder • Barista • Vintage Seller</span>
            <h2 className="mega mt-2 text-[clamp(4rem,12vw,10rem)]">
              <FlowText text="Jaffet" />
            </h2>
            <div className="copy mt-6 max-w-[560px]">
              <p>
                Jaffet runs the truck, pours the drinks and curates the racks for Compound Vintage. The Compound brings specialty coffee, original artwork and a whole lot of culture to the places Reno spends its mornings.
              </p>
              <p>Catch the truck at a stop near you, or bring it to your office, party, market or late-night After Hours.</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link href="/book" className="btn">
                Book the truck
              </Link>
              <Link href="/contact" className="btn btn-cream">
                Say hi
              </Link>
            </div>
          </Reveal>
          <Reveal className="relative min-h-[460px]">
            <Image
              src={truckWindow}
              alt="Truck service window with paper-bag character art"
              placeholder="blur"
              sizes="(max-width: 1024px) 60vw, 330px"
              className="absolute right-0 top-0 w-[62%] rotate-3 border-[3px] border-ink shadow-[10px_10px_0_var(--color-purple)]"
            />
            <Image
              src={truckService}
              alt="First responders ordering coffee at the truck"
              placeholder="blur"
              sizes="(max-width: 1024px) 60vw, 330px"
              className="absolute bottom-0 left-0 w-[58%] -rotate-3 border-[3px] border-ink shadow-[10px_10px_0_var(--color-mustard)]"
            />
          </Reveal>
        </div>
      </section>

      <Bands className="bg-cream" />
      <Vintage />

      <section className="bg-navy py-[110px]">
        <div className="wrap">
          <YelpCard />
        </div>
      </section>
    </>
  );
}
