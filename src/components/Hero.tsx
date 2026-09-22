import Image from "next/image";
import { links } from "@/lib/content";

const ticker = [
  "Telegram Advertising",
  "Audience Acquisition",
  "Meta & Instagram",
  "Google Ads",
  "Creative Production",
  "Growth Consulting",
  "Bot Development",
  "Automation & AI",
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* full-bleed art */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/brand/converge.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.55]"
          style={{ objectPosition: "70% 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #080808 8%, rgba(8,8,8,0.82) 42%, rgba(8,8,8,0.25) 72%, rgba(8,8,8,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-64"
          style={{ background: "linear-gradient(to top, #080808, transparent)" }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 lg:px-10 lg:pb-16">
        <div className="max-w-[1000px]">
          <p className="label mb-8 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
            Telegram Advertising &amp; Digital Growth
          </p>

          <h1 className="display text-[clamp(3.1rem,11.5vw,10.5rem)]">
            <span className="block">Your gateway</span>
            <span className="block">
              to <span className="serif text-accent">Telegram</span> growth
            </span>
          </h1>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-[46ch] text-[16px] leading-[1.62] text-muted">
            We build targeted advertising and automation for the businesses that live on Telegram —
            trading, crypto, Web3, creator, SaaS and online-commerce communities. Real audience
            research, disciplined creative testing, honest reporting.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#brief"
              className="rounded-full bg-paper px-7 py-3.5 text-[14px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Start a Campaign
            </a>
            <a
              href={links.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-7 py-3.5 text-[14px] font-medium transition-colors duration-200 hover:border-ink/30 hover:bg-white/[0.04]"
            >
              View Channel
            </a>
          </div>
        </div>
      </div>

      {/* ticker */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-line bg-bg/60 py-3.5 backdrop-blur-sm">
        <div className="flex" aria-hidden="true">
          <div className="drift flex shrink-0">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} className="label flex items-center whitespace-nowrap px-6">
                {t}
                <span className="ml-6 text-accent">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
