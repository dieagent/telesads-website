import ParticleField from "./Canvas";
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
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* live canvas */}
      <div className="pointer-events-auto absolute inset-0">
        <ParticleField />
      </div>

      {/* structure + scrim */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,245,243,0.05) 1px, transparent 1px)",
            backgroundSize: "calc(100% / 6) 100%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(115% 85% at 4% 45%, #080808 30%, rgba(8,8,8,0.9) 52%, rgba(8,8,8,0.35) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pb-24 pt-32 lg:px-10">
        <p className="label mb-9 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Telegram Advertising &amp; Digital Growth
        </p>

        <h1 className="display text-[clamp(2.9rem,9.6vw,9rem)]">
          <span className="block">Your gateway</span>
          <span className="block">
            to <span className="serif text-accent">Telegram</span> growth
          </span>
        </h1>

        <div className="mt-14 grid gap-10 border-t border-line pt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <p className="max-w-[44ch] text-[15.5px] leading-[1.65] text-muted">
            We build targeted advertising and automation for the businesses that live on Telegram —
            trading, crypto, Web3, creator, SaaS and online-commerce communities. Real audience
            research, disciplined creative testing, honest reporting.
          </p>

          <div className="pointer-events-auto flex flex-wrap items-center gap-3">
            <a
              href="/contact"
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

      <div className="relative overflow-hidden border-t border-line py-3.5">
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
