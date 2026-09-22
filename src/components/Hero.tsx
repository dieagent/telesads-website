import Reveal from "./Reveal";
import { brand, links } from "@/lib/content";

const marks = [
  "Telegram Advertising",
  "Meta & Instagram Ads",
  "Google Ads",
  "Creative Production",
  "Growth Consulting",
  "Bot Development",
  "Automation & AI",
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[820px] max-w-[130vw] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <p
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-muted"
            translate="no"
          >
            <span className="size-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            {brand.rhythm}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
            Your Gateway to
            <br />
            <span className="text-muted">Telegram Growth.</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
            A specialized Telegram advertising and digital growth agency. We help trading, crypto,
            Web3, creator, SaaS and online-business communities acquire relevant audiences,
            improve visibility and scale through strategic advertising and automation.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#brief"
              className="rounded-full bg-fg px-6 py-3 text-[15px] font-semibold text-bg transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Start a Campaign
            </a>
            <a
              href={links.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-6 py-3 text-[15px] font-semibold text-fg transition-[background-color,border-color] duration-150 hover:border-white/25 hover:bg-white/[0.04]"
            >
              View Telegram Channel
            </a>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 text-[13px] text-muted/80">{brand.regions}</p>
        </Reveal>
      </div>

      {/* Marquee — constant motion, linear, pauses on hover, off under reduced motion */}
      <div
        className="marquee relative mt-16 flex overflow-hidden border-y border-line py-4"
        aria-hidden="true"
      >
        <div className="marquee-track flex shrink-0 gap-10 pr-10">
          {[...marks, ...marks].map((m, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[13px] uppercase tracking-[0.2em] text-muted/70"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
