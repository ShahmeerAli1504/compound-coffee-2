import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, menuSchema, pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import icedLattePour from "@/assets/img/iced-latte-pour.jpg";
import menuBoards from "@/assets/img/menu-boards.jpg";
import { PageHero } from "@/components/Blocks";
import { FlowText } from "@/components/FlowText";
import { PrintedMenuButton } from "@/components/MenuBoard";
import { Playlist } from "@/components/Playlist";
import { Reveal } from "@/components/Reveal";
import { Setlist } from "@/components/Setlist";

export const metadata: Metadata = pageMeta({
  title: "Menu",
  description:
    "The Compound Coffee menu in Reno, NV — The Playlist: 11 signature drinks topped with cold foam ($7 / $8), plus classic espresso, cold brew, non-coffee drinks and breakfast sandwiches.",
  path: "/menu",
  keywords: ["coffee menu Reno", "specialty drinks Reno", "breakfast sandwiches Reno"],
});

export default function MenuPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Menu", path: "/menu" }]), menuSchema]} />
      <PageHero eyebrow="The Playlist • The Setlist" title="The Menu" drip="what we're pouring">
        Every signature drink is named after a song we love and topped off with cold foam. Classics, non-coffee and breakfast sandwiches round out the board.
      </PageHero>

      <section className="overflow-clip bg-mustard py-[110px] text-ink">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <span className="eyebrow">Signature drinks</span>
              <h2 className="mega mt-2 text-[clamp(3.4rem,10vw,8rem)]">
                <FlowText text="The Playlist" />
              </h2>
            </Reveal>
            <Reveal className="max-w-[420px]">
              <p className="m-0 text-[1.05rem] leading-relaxed">Tap a track to see it in the cup. Every Playlist drink comes medium or large and gets the cold-foam treatment.</p>
              <div className="mt-3.5 inline-flex border-[3px] border-ink bg-cream font-extrabold">
                <span className="px-3.5 py-2">Medium $7</span>
                <span className="border-l-[3px] border-ink bg-ink px-3.5 py-2 text-mustard">Large $8</span>
              </div>
            </Reveal>
          </div>
          <Playlist />
        </div>
      </section>

      <section className="bg-sky py-[110px] text-ink">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <span className="eyebrow">Classics • Non-coffee • Food</span>
              <h2 className="mega mt-2 text-[clamp(3.4rem,10vw,8rem)]">
                <FlowText text="The Setlist" />
              </h2>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3">
              <PrintedMenuButton className="btn btn-cream" />
            </Reveal>
          </div>
          <Setlist />
          <p className="mt-10 font-marker text-lg">Menu items &amp; prices may change — ask at the window ✌</p>
        </div>
      </section>

      <section className="bg-night py-[110px] text-cream">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative min-h-[420px]">
            <Image
              src={menuBoards}
              alt="The Setlist and The Playlist menu boards beside the truck"
              placeholder="blur"
              sizes="(max-width: 1024px) 70vw, 420px"
              className="absolute left-0 top-0 w-[68%] -rotate-3 border-[3px] border-cream shadow-[10px_10px_0_var(--color-mustard)]"
            />
            <Image
              src={icedLattePour}
              alt="Cold foam pouring into a Compound iced latte"
              placeholder="blur"
              sizes="(max-width: 1024px) 50vw, 300px"
              className="absolute bottom-0 right-0 w-[46%] rotate-3 border-[3px] border-cream shadow-[10px_10px_0_var(--color-hot)]"
            />
          </Reveal>
          <Reveal>
            <span className="eyebrow text-mustard">Feeding a crowd?</span>
            <h2 className="mega mt-2 text-[clamp(3rem,7vw,6rem)]">
              Bring the whole
              <br />
              <span className="text-sky">menu to you.</span>
            </h2>
            <p className="mt-5 max-w-[480px] text-[1.08rem] leading-relaxed text-haze">
              Workplace mornings, celebrations, markets and late-night After Hours — we pull up with the full Playlist and Setlist. Tell us the date and headcount and we&apos;ll send a quote.
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Link href="/book" className="btn">
                Book the truck
              </Link>
              <Link href="/find-us" className="btn btn-sky">
                Find us today
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
