import Link from "next/link";
import { Bands } from "@/components/Bands";
import { BookHero, HoursSection } from "@/components/Blocks";
import { FilmPlayer } from "@/components/FilmPlayer";
import { FlowText } from "@/components/FlowText";
import { GalleryRide } from "@/components/GalleryRide";
import { Hero } from "@/components/Hero";
import { MenuBoard } from "@/components/MenuBoard";
import { Playlist } from "@/components/Playlist";
import { Reveal } from "@/components/Reveal";
import { Setlist } from "@/components/Setlist";
import { Story } from "@/components/Story";
import { WeekSchedule } from "@/components/WeekSchedule";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Bands />
      <Story teaser />

      {/* MENU */}
      <section id="menu" className="overflow-clip bg-mustard pb-[120px] pt-[110px] text-ink">
        <div className="wrap">
          <div className="mb-[46px] flex flex-wrap items-end justify-between gap-[30px]">
            <Reveal as="h2" className="mega text-[clamp(4rem,13vw,12rem)]">
              <span className="block font-drip text-[.4em] leading-none text-blue">what we&apos;re pouring</span>
              <FlowText text="The Menu" />
            </Reveal>
            <Reveal className="max-w-[400px]">
              <p className="m-0 text-[1.05rem] leading-relaxed">
                Two boards on the truck: <b>The Playlist</b> (our signature drinks, all topped off with cold foam) and <b>The Setlist</b> (classics, non-coffee and breakfast). Tap a track to see it in the cup.
              </p>
              <div className="mt-3.5 inline-flex border-[3px] border-ink bg-cream font-extrabold">
                <span className="px-3.5 py-2">Specialty</span>
                <span className="border-l-[3px] border-ink bg-ink px-3.5 py-2 text-mustard">M $7 / L $8</span>
              </div>
            </Reveal>
          </div>
          <MenuBoard playlist={<Playlist />} setlist={<Setlist />} />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link className="btn btn-ink" href="/menu">
              Full menu
            </Link>
            <Link className="btn btn-cream" href="/find-us">
              Where&apos;s the truck today?
            </Link>
            <span className="font-marker">Menu items &amp; prices may change — ask at the window ✌</span>
          </div>
        </div>
      </section>

      {/* AFTER HOURS */}
      <section id="film" className="bg-night py-[120px] text-cream">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-[30px]">
            <Reveal as="h2" className="mega text-[clamp(3.6rem,11vw,10rem)]">
              <FlowText text="The Compound" />
              <br />
              <span className="text-mustard [text-shadow:0_0_22px_rgba(247,197,72,.65),0_0_2px_#fff]">After Hours</span>
            </Reveal>
            <Reveal as="p" className="m-0 max-w-[420px] leading-relaxed text-haze">
              Late-night coffee under the Reno lights. Watch the film, then grab a spot — booking for After Hours is open now.
            </Reveal>
          </div>
          <Reveal>
            <FilmPlayer />
          </Reveal>
        </div>
      </section>

      <GalleryRide />

      {/* THIS WEEK */}
      <section id="events" className="bg-sky py-[120px] text-ink">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-[30px]">
            <Reveal>
              <span className="eyebrow">Find the Truck</span>
              <h2 className="mega mt-2 text-[clamp(3.6rem,11vw,9.4rem)]">
                This <span className="outline-ink">Week</span>
              </h2>
            </Reveal>
            <Reveal as="p" className="m-0 max-w-[440px] text-[1.05rem] leading-relaxed">
              Here&apos;s where we&apos;re pulling up this week — the schedule updates itself every night at midnight. Striped days are still open, so grab one for your office or event. Follow{" "}
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                {site.socials.instagramHandle}
              </a>{" "}
              for last-minute pop-ups and changes.
            </Reveal>
          </div>
          <WeekSchedule />
        </div>
      </section>

      <HoursSection />

      <section className="bg-cream text-ink">
        <BookHero cta="page" />
      </section>
    </>
  );
}
