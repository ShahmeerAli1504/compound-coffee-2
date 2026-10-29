import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo-badge.jpg";
import mural from "@/assets/img/i-love-coffee-mural.jpg";
import { FlowText } from "./FlowText";
import { Reveal } from "./Reveal";

const pillars = [
  { t: "Coffee", d: "Espresso, matcha, cold coffee and signature drinks.", s: "shadow-[6px_6px_0_var(--color-mustard)]" },
  { t: "Events", d: "Workplace catering, pop-ups and private bookings.", s: "shadow-[6px_6px_0_var(--color-hot)]" },
  { t: "Vintage", d: "Clothing, shoes and curated finds from Compound Vintage.", s: "shadow-[6px_6px_0_var(--color-purple)]" },
];

export function Story({ teaser = false }: { teaser?: boolean }) {
  return (
    <section id="story" className="bg-sky pb-[120px] pt-10 text-ink">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal className="relative min-h-[440px] lg:min-h-[540px]">
          <Image
            src={logo}
            alt="The Compound Coffee illustrated logo featuring the paper-bag crew and the truck"
            sizes="(max-width: 1024px) 70vw, 400px"
            className="absolute left-0 top-0 w-[72%] -rotate-4 border-[3px] border-ink bg-white p-3 shadow-hard-lg"
          />
          <Image
            src={mural}
            alt="Truck mural of the paper-bag character pouring milk into a coffee"
            sizes="(max-width: 1024px) 52vw, 300px"
            className="absolute bottom-0 right-0 w-[52%] rotate-5 border-[3px] border-ink shadow-[-10px_10px_0_var(--color-hot)]"
          />
          <span className="absolute right-[4%] top-[6%] z-[2] rotate-6 border-[3px] border-ink bg-mustard px-4 py-2.5 font-marker text-[1.05rem]">
            &ldquo;I ♥ coffee&rdquo;
          </span>
        </Reveal>
        <Reveal>
          <span className="eyebrow">The Story</span>
          <h2 className="mega mt-2 text-[clamp(3.4rem,8vw,7.4rem)]">
            <span className="mb-[.12em] block font-drip text-[.72em] text-blue">meet</span>
            <FlowText text="The Compound" />
          </h2>
          <div className="copy mt-6 max-w-[620px] [&_p]:text-[1.12rem]">
            <p>
              <strong>Jaffet</strong> is the founder, barista and vintage seller behind The Compound Coffee. The concept blends specialty drinks, original artwork, mobile coffee service and vintage culture into one recognizable Reno brand.
            </p>
            <p>The truck is built for community. Catch it at local pop-ups or bring The Compound to your office, celebration, market or private event.</p>
          </div>
          <div className="mt-7 grid gap-3.5 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.t} className={`border-[3px] border-ink bg-cream p-[18px] transition duration-250 ease-pop hover:-translate-y-1.5 hover:-rotate-1 ${p.s}`}>
                <strong className="block font-display text-[1.9rem] font-normal tracking-[.02em]">{p.t}</strong>
                <span className="text-[.92rem] leading-normal">{p.d}</span>
              </div>
            ))}
          </div>
          {teaser && (
            <Link href="/about" className="btn btn-ink mt-9">
              Read the full story
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
