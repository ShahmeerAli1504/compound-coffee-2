import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import { HoursSection, PageHero } from "@/components/Blocks";
import { Reveal } from "@/components/Reveal";
import { WeekSchedule } from "@/components/WeekSchedule";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Find the Truck",
  description:
    "Where The Compound Coffee truck is parked today in Reno and Sparks, NV — daily stops with maps, live open/closed hours, and open dates you can book.",
  path: "/find-us",
  keywords: ["coffee truck near me Reno", "Reno coffee truck schedule"],
});

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function FindUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Find the Truck", path: "/find-us" }])} />
      <PageHero eyebrow="Find the Truck" title="Today" drip="on the road" accent="text-sky">
        Here&apos;s our live schedule for <b>today only</b> — updated automatically every night at midnight, Reno time. Check our stops below to catch us, or follow our Instagram for last-minute pop-ups.
      </PageHero>

      <section id="events" className="bg-sky py-[110px] text-ink">
        <div className="wrap">
          <WeekSchedule />
        </div>
      </section>

      <HoursSection />

      <section className="bg-mustard py-[100px] text-ink">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Last-minute pop-ups",
              d: `Plans change with the weather and the city. ${site.socials.instagramHandle} is always the freshest word on where we are.`,
              a: { href: site.socials.instagram, label: "Follow on Instagram", ext: true },
              s: "shadow-[8px_8px_0_var(--color-hot)]",
            },
            {
              t: "Want us at your spot?",
              d: "Offices, schools, clinics, dealerships and markets — if there are coffee people there, we’ll pull up.",
              a: { href: "/book", label: "Book a stop" },
              s: "shadow-[8px_8px_0_var(--color-purple)]",
            },
            {
              t: "Questions?",
              d: `Call or text ${site.phone} or send a message — we answer personally.`,
              a: { href: "/contact", label: "Contact us" },
              s: "shadow-[8px_8px_0_var(--color-sky)]",
            },
          ].map((c) => (
            <Reveal key={c.t} className={`flex flex-col gap-4 border-[3px] border-ink bg-cream p-7 ${c.s}`}>
              <h2 className="m-0 font-display text-[2rem] font-normal uppercase leading-none tracking-[.02em]">{c.t}</h2>
              <p className="m-0 flex-1 leading-relaxed">{c.d}</p>
              <a href={c.a.href} className="btn btn-ink self-start" {...(c.a.ext ? ext : {})}>
                {c.a.label}
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
