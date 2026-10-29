import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import Link from "next/link";
import { ContactCard, PageHero } from "@/components/Blocks";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Contact The Compound Coffee in Reno, NV — call or text (775) 710-1960, email, Instagram, or send a message for catering, collaborations and questions.",
  path: "/contact",
  keywords: ["contact The Compound Coffee"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <PageHero eyebrow="Founder • Barista • Vintage Seller" title="Say Hi" drip="talk to jaffet" accent="text-sky">
        Questions, catering requests or collaborations? Reach out directly — or send a message below and it lands straight in our inbox.
      </PageHero>

      <section className="bg-cream py-[110px] text-ink">
        <div className="wrap grid items-start gap-[46px] lg:grid-cols-2">
          <Reveal>
            <h2 className="m-0 mb-6 font-display text-[2.6rem] font-normal uppercase leading-none tracking-[.02em]">Send a message</h2>
            <InquiryForm kind="contact" />
            <p className="mt-6 text-[.95rem]">
              Booking the truck for an event?{" "}
              <Link href="/book" className="font-bold underline">
                Use the booking form
              </Link>{" "}
              so we get the date, place and headcount.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="m-0 mb-6 font-display text-[2.6rem] font-normal uppercase leading-none tracking-[.02em]">Reach us directly</h2>
            <ContactCard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
