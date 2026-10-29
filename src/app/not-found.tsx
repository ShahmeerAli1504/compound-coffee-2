import Link from "next/link";
import { Bag } from "@/components/Bag";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-night px-4 pb-20 pt-32 text-center text-cream">
      <div className="stars absolute inset-0 animate-twinkle opacity-70" />
      <div className="relative">
        <Bag className="mx-auto w-28 animate-bob" />
        <p className="mega mt-6 text-[clamp(5rem,22vw,14rem)] text-mustard">404</p>
        <h1 className="m-0 mt-2 font-marker text-[clamp(1.4rem,4vw,2.2rem)] font-normal text-sky">The truck moved. So did this page.</h1>
        <p className="mx-auto mt-4 max-w-[420px] leading-relaxed text-haze">Let&apos;s get you back to the coffee.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/find-us" className="btn btn-sky">
            Find the truck
          </Link>
        </div>
      </div>
    </section>
  );
}
