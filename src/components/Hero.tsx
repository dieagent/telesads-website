"use client";

import { useEffect, useRef, useState } from "react";
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

const LINES = [
  ["Your", "gateway"],
  ["to", "Telegram", "growth"],
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const wrap = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  /* scroll-linked depth: headline recedes into Z as you leave */
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const p = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
      el.style.transform = `translate3d(0, ${p * 70}px, 0) scale(${1 - p * 0.07})`;
      el.style.opacity = `${1 - p * 1.15}`;
    };
    const s = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", s, { passive: true });
    return () => { window.removeEventListener("scroll", s); cancelAnimationFrame(raf); };
  }, []);

  let idx = 0;

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0">
        <ParticleField />
      </div>

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
              "radial-gradient(115% 85% at 4% 45%, #080808 28%, rgba(8,8,8,0.9) 52%, rgba(8,8,8,0.3) 100%)",
          }}
        />
      </div>

      <div
        ref={wrap}
        className="pointer-events-none relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pb-24 pt-32 lg:px-10"
        style={{ willChange: "transform, opacity" }}
      >
        <p
          className="label mb-9 flex items-center gap-3"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(10px)",
            transition: "opacity 700ms var(--ease-out), transform 700ms var(--ease-out)",
          }}
        >
          <span className="inline-block h-px w-10 bg-accent" aria-hidden="true" />
          Telegram Advertising &amp; Digital Growth
        </p>

        {/* 3D word-by-word entrance */}
        <h1
          className="display text-[clamp(2.9rem,9.6vw,9rem)]"
          style={{ perspective: "1000px" }}
          aria-label="Your gateway to Telegram growth"
        >
          {LINES.map((line, li) => (
            <span key={li} className="block" style={{ transformStyle: "preserve-3d" }}>
              {line.map((word) => {
                const i = idx++;
                const isBrand = word === "Telegram";
                return (
                  <span
                    key={word + i}
                    aria-hidden="true"
                    className={`inline-block ${isBrand ? "serif text-accent" : ""}`}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted
                        ? "none"
                        : "translateY(0.5em) translateZ(-90px) rotateX(-42deg)",
                      transition: `opacity 900ms var(--ease-out) ${120 + i * 95}ms, transform 1000ms var(--ease-out) ${120 + i * 95}ms`,
                    }}
                  >
                    {word}
                    {word !== line[line.length - 1] && <span>&nbsp;</span>}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div
          className="mt-14 grid gap-10 border-t border-line pt-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateY(14px)",
            transition:
              "opacity 800ms var(--ease-out) 620ms, transform 800ms var(--ease-out) 620ms",
          }}
        >
          <p className="max-w-[44ch] text-[15.5px] leading-[1.65] text-muted">
            We build targeted advertising and automation for the businesses that live on Telegram —
            trading, crypto, Web3, creator, SaaS and online-commerce communities. Real audience
            research, disciplined creative testing, honest reporting.
          </p>

          <div className="pointer-events-auto flex flex-wrap items-center gap-3">
            <a
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-paper px-7 py-3.5 text-[14px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
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

      {/* scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-1/2 hidden -translate-x-1/2 lg:block"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 900ms var(--ease-out) 1200ms",
        }}
      >
        <span className="scroll-cue block h-10 w-px bg-gradient-to-b from-accent to-transparent" />
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
