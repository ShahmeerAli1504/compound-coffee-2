import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";
import { BookHero } from "@/components/Blocks";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Book the Truck",
  description:
    "Book The Compound Coffee truck for workplace catering, private events, markets, pop-ups and After Hours in Reno and Sparks, NV. Send the details and get a quote.",
  path: "/book",
  keywords: ["coffee truck catering Reno", "book coffee truck Reno", "event coffee Reno"],
});

const faqs = [
  {
    q: "How far out should I book?",
    a: "As early as you can — weekday mornings fill up fast. Check the open (striped) days on Find the Truck, then send the details here.",
  },
  { q: "Where do you travel?", a: "Reno, Sparks and the surrounding area. Further out? Ask — we'll let you know." },
  { q: "What do you need from me?", a: "A date, a rough time window, the address, and how many people you're expecting. A spot to park the truck helps too." },
  { q: "Can guests order off the full menu?", a: "Yes — the full Playlist and Setlist, or a tighter custom menu for big groups so the line keeps moving." },
];

export default function BookPage() {
  return (
    <div className="bg-cream pb-[120px] text-ink">
      <JsonLd data={[breadcrumbSchema([{ name: "Book the Truck", path: "/book" }]), faqSchema(faqs)]} />
      <BookHero top />

      <div className="wrap">
        <div id="inquiry" className="mt-20 grid scroll-mt-24 gap-[46px] lg:grid-cols-[.85fr_1.15fr]">
          <Reveal as="aside" className="self-start border-[3px] border-ink bg-mustard p-8 shadow-[10px_10px_0_var(--color-ink)]">
            <h1 className="m-0 mb-2.5 font-display text-[2.6rem] font-normal uppercase tracking-[.02em]">Book the Truck</h1>
            <p className="m-0 leading-relaxed">Tell us the date, place and headcount and {site.founder} will get back to you with availability and a quote.</p>
            <ul className="my-5 list-disc pl-5 font-semibold leading-[2]">
              <li>Workplace coffee catering</li>
              <li>Private events &amp; celebrations</li>
              <li>Markets &amp; pop-ups</li>
              <li>Late-night After Hours</li>
              <li>Community collaborations</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <a className="btn btn-ink" href={site.bookingCalendar} target="_blank" rel="noopener noreferrer">
                Booking Calendar ↗
              </a>
              <a className="btn btn-cream" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
          </Reveal>
          <Reveal>
            <InquiryForm kind="booking" />
          </Reveal>
        </div>

        <section className="mt-[110px]">
          <Reveal as="h2" className="mega mb-10 text-[clamp(3rem,8vw,6.4rem)]">
            Good to know
          </Reveal>
          <div className="grid items-start gap-5 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal
                key={f.q}
                as="details"
                className={`group border-[3px] border-ink bg-white p-6 ${["shadow-[6px_6px_0_var(--color-sky)]", "shadow-[6px_6px_0_var(--color-hot)]", "shadow-[6px_6px_0_var(--color-mustard)]", "shadow-[6px_6px_0_var(--color-purple)]"][i % 4]}`}
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.6rem] uppercase leading-tight [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="m-0 mt-3 leading-relaxed">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
