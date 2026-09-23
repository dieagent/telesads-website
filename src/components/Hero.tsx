"use client";

import { useEffect, useState } from "react";
import MeshGlobe from "./MeshGlobe";
import { links } from "@/lib/content";

export default function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);

  const t = (d: number) => ({
    opacity: on ? 1 : 0,
    transform: on ? "none" : "translateY(16px)",
    transition: `opacity 800ms var(--ease-out) ${d}ms, transform 800ms var(--ease-out) ${d}ms`,
  });

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* mesh globe — bleeds off the right edge */}
      <div
        className="pointer-events-auto absolute -right-[22%] top-1/2 aspect-square w-[min(1180px,92vw)] -translate-y-1/2 cursor-grab active:cursor-grabbing sm:-right-[14%] lg:-right-[8%] lg:w-[min(1080px,62vw)]"
        style={{
          opacity: on ? 1 : 0,
          transition: "opacity 1400ms var(--ease-out) 200ms",
        }}
      >
        <MeshGlobe />
      </div>

      {/* left-side scrim so type always wins */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, #080808 18%, rgba(8,8,8,0.88) 38%, rgba(8,8,8,0.42) 58%, rgba(8,8,8,0.06) 76%)",
        }}
      />

      <div className="pointer-events-none relative mx-auto w-full max-w-[1400px] px-6 pt-24 lg:px-10">
        <p className="label" style={t(80)}>
          Telegram Advertising &amp; Digital Growth Agency &nbsp;—&nbsp; India · UAE · Worldwide
        </p>

        <h1
          className="mt-8 font-medium leading-[0.92] tracking-[-0.045em] text-[clamp(3rem,8.4vw,7.6rem)]"
          style={t(160)}
        >
          <span className="block">Your gateway to</span>
          <span className="block">
            <span className="text-accent">Telegram</span> growth.
          </span>
        </h1>

        <div
          className="mt-14 h-px w-full max-w-[720px] bg-line"
          style={t(280)}
          aria-hidden="true"
        />

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p
            className="max-w-[46ch] text-[15.5px] leading-[1.68] text-muted"
            style={t(340)}
          >
            We help trading, crypto, Web3, creator, SaaS, and online-business communities acquire
            relevant audiences, improve visibility, and scale through strategic advertising and
            automation.
          </p>

          <div
            className="pointer-events-auto flex flex-wrap items-center gap-5"
            style={t(420)}
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-bg transition-transform duration-150 active:scale-[0.97]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Start a Campaign
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
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

        <p className="sr-only">
          Contact us on Telegram at {links.contact}
        </p>
      </div>
    </section>
  );
}
