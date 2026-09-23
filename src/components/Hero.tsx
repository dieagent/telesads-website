"use client";

import { useEffect, useState } from "react";
import { Globe } from "./ui/globe";
import { links } from "@/lib/content";

export default function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);

  const t = (d: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(18px)",
    transition: `opacity 900ms var(--ease-out) ${d}ms, transform 900ms var(--ease-out) ${d}ms`,
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      {/* ── globe: centered, low, mostly below the fold line ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-[52%] w-[min(1500px,168vw)] -translate-x-1/2 md:w-[min(1180px,118vw)] lg:w-[min(1020px,82vw)]"
        style={{
          opacity: on ? 1 : 0,
          transition: "opacity 1600ms var(--ease-out) 250ms",
        }}
      >
        <div className="pointer-events-auto relative aspect-square">
          <Globe className="max-w-none" />
        </div>
      </div>

      {/* vignette: darkens the globe's outer edge into the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 62%, rgba(8,8,8,0) 52%, rgba(8,8,8,0.35) 74%, rgba(8,8,8,0.92) 94%)",
        }}
      />
      {/* top fade: keeps the headline clear of the sphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[58%]"
        style={{
          background:
            "linear-gradient(180deg, #080808 20%, rgba(8,8,8,0.72) 52%, rgba(8,8,8,0) 92%)",
        }}
      />

      {/* ── content ── */}
      <div className="pointer-events-none relative mx-auto w-full max-w-[1400px] px-6 pt-28 lg:px-10">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="label" style={t(80)}>
            Telegram Advertising &amp; Digital Growth Agency &nbsp;—&nbsp; India · UAE ·
            Worldwide
          </p>

          <h1
            className="mt-9 font-medium leading-[0.9] tracking-[-0.045em] text-[clamp(2.9rem,8.6vw,7.4rem)]"
            style={{ ...t(170), textWrap: "balance" }}
          >
            <span className="block">Your gateway to</span>
            <span className="block">
              <span className="text-accent">Telegram</span> growth.
            </span>
          </h1>

          <p
            className="mx-auto mt-9 max-w-[58ch] text-[15.5px] leading-[1.7] text-muted"
            style={t(300)}
          >
            We help trading, crypto, Web3, creator, SaaS, and online-business communities
            acquire relevant audiences, improve visibility, and scale through strategic
            advertising and automation.
          </p>

          <div
            className="pointer-events-auto mt-11 flex flex-wrap items-center justify-center gap-5"
            style={t(400)}
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-bg transition-transform duration-150 active:scale-[0.97]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Start a Campaign
              <span
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
            <a
              href="#services"
              className="label flex items-center gap-2 transition-colors duration-200 hover:text-ink"
            >
              Explore Services
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <p className="sr-only">Contact us on Telegram at {links.contact}</p>
      </div>

      {/* hairline + drag hint sit over the globe's upper curve */}
      <div
        className="pointer-events-none relative mx-auto mt-16 w-full max-w-[1400px] px-6 lg:px-10"
        style={t(520)}
      >
        <div className="mx-auto h-px w-full max-w-[560px] bg-line" aria-hidden="true" />
        <p className="label mt-5 text-center text-dim">Drag the globe to spin it</p>
      </div>
    </section>
  );
}
