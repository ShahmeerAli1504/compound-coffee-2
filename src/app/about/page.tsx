import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { Bands } from "@/components/Bands";
import { PageHero, Vintage, YelpCard } from "@/components/Blocks";
import { FlowText } from "@/components/FlowText";
import { Reveal } from "@/components/Reveal";
import { Story } from "@/components/Story";

export const metadata: Metadata = pageMeta({
  title: "Our Story",
  description:
    "The Compound started with family and an idea — coffee inspired by the music, art, and culture we grew up loving. Taking us around Reno and Sparks.",
  path: "/about",
  keywords: ["The Compound Coffee", "Bagman", "The Compound Reno", "Compound Vintage"],
});

const values = [
  {
    n: "01",
    t: "Coffee is subjective",
    d: "everyone has their thing. we’re here to make yours.",
  },
  {
    n: "02",
    t: "Street art",
    d: "from bagman to the stickers you keep, everything is a piece of us. compound is how we put our creativity out there.",
  },
  {
    n: "03",
    t: "4 the streetz",
    d: "we’re from here. being able to pull up to your school, your job, or your neighborhood and be part of your day means something to us.",
  },
  {
    n: "04",
    t: "Love yourz",
    d: "the music we play, the art we’re into, the clothes we wear. it all finds its way into compound. the menu gives you a little of everything.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Our Story", path: "/about" }])} />
      <PageHero eyebrow="Coffee × Culture × Community" title="Our Story" drip="where coffee is subjective" accent="text-sky">
        <div className="space-y-4">
          <p>
            the compound started with family and an idea . we wanted to make something that felt like us, coffee inspired by the music, art, and culture we grew up loving.
          </p>
          <p>
            that idea became a coffee trailer, taking us around reno and sparks and introducing us to the people who keep us going. every stop, every drink, and sticker gives us another way to share a little of ourselves.
          </p>
          <p>
            and we’re still building the compound .
          </p>
        </div>
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
