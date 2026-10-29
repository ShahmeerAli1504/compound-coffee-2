import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { FilmPlayer } from "@/components/FilmPlayer";
import { FlowText } from "@/components/FlowText";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Reveal } from "@/components/Reveal";
import { moreShots, shots } from "@/lib/gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Gallery & After Hours",
  description:
    "Photos of The Compound Coffee truck around Reno and the After Hours film — late-night coffee under the Reno lights.",
  path: "/gallery",
  keywords: ["Reno coffee truck photos", "After Hours Reno"],
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Gallery", path: "/gallery" }])} />
      <PageHero eyebrow="Truck • Drinks • Community" title="Compound St." drip="life on" accent="text-green">
        Morning stops, cold-foam pours, winter runs downtown and late nights under the casino lights.
      </PageHero>

      <section className="bg-emerald py-[110px] text-cream">
        <div className="wrap">
          <GalleryGrid shots={[...shots, ...moreShots]} />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn">
              More on {site.socials.instagramHandle}
            </a>
            <a href={site.socials.tiktok} target="_blank" rel="noopener noreferrer" className="btn btn-cream">
              Watch on TikTok
            </a>
          </div>
        </div>
      </section>

      <section id="film" className="scroll-mt-16 bg-night py-[120px] text-cream">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-[30px]">
            <Reveal as="h2" className="mega text-[clamp(3.6rem,11vw,10rem)]">
              <FlowText text="The Compound" />
              <br />
              <span className="text-mustard [text-shadow:0_0_22px_rgba(247,197,72,.65),0_0_2px_#fff]">After Hours</span>
            </Reveal>
            <Reveal className="max-w-[420px]">
              <p className="m-0 leading-relaxed text-haze">Late-night coffee under the Reno lights. Watch the film, then grab a spot — booking for After Hours is open now.</p>
              <Link href="/book?type=After%20Hours#inquiry" className="btn mt-5">
                Book After Hours
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <FilmPlayer />
          </Reveal>
        </div>
      </section>
    </>
  );
}
