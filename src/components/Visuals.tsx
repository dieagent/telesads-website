"use client";

import { useEffect, useRef, useState } from "react";

function useSeen<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

/* ------------------------------------------------ scroll progress bar */

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-px bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-accent"
        style={{ transform: `scaleX(${p})`, transition: "transform 90ms linear" }}
      />
    </div>
  );
}

/* --------------------------------------------- funnel / growth chart */

export function GrowthChart() {
  const { ref, seen } = useSeen<HTMLDivElement>();
  const bars = [14, 22, 19, 34, 41, 38, 56, 63, 59, 78, 88, 96];

  return (
    <div ref={ref} className="relative">
      <div className="flex h-[210px] items-end gap-[3px]">
        {bars.map((b, i) => (
          <div key={i} className="group relative flex-1">
            <div
              className="w-full rounded-t-[2px]"
              style={{
                height: seen ? `${(b / 96) * 190}px` : "2px",
                background:
                  i > 8
                    ? "linear-gradient(to top, rgba(255,92,0,0.25), #ff5c00)"
                    : "linear-gradient(to top, rgba(245,245,243,0.06), rgba(245,245,243,0.22))",
                transition: `height 900ms var(--ease-out) ${i * 55}ms`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between border-t border-line pt-3">
        <span className="label">Week 01</span>
        <span className="label">Week 12</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ funnel shape */

export function FunnelViz() {
  const { ref, seen } = useSeen<HTMLDivElement>();
  const stages = [
    { l: "Impressions", w: 100 },
    { l: "Reach", w: 78 },
    { l: "Clicks", w: 52 },
    { l: "Landing visits", w: 34 },
    { l: "Telegram joins", w: 21 },
  ];
  return (
    <div ref={ref} className="space-y-2.5">
      {stages.map((s, i) => (
        <div key={s.l} className="flex items-center gap-4">
          <span className="label w-[112px] shrink-0">{s.l}</span>
          <div className="h-8 flex-1 overflow-hidden rounded-[3px] bg-white/[0.035]">
            <div
              className="h-full rounded-[3px]"
              style={{
                width: seen ? `${s.w}%` : "0%",
                background: `linear-gradient(to right, rgba(255,92,0,${0.28 + i * 0.16}), rgba(255,92,0,${0.55 + i * 0.1}))`,
                transition: `width 1000ms var(--ease-out) ${i * 110}ms`,
              }}
            />
          </div>
        </div>
      ))}
      <p className="pt-2 text-[11.5px] leading-[1.5] text-dim">
        Illustrative funnel structure — the stages we instrument. Not campaign results.
      </p>
    </div>
  );
}

/* ------------------------------------------------------ count-up stat */

export function Stat({
  to,
  suffix = "",
  label,
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const { ref, seen } = useSeen<HTMLDivElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setN(to * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  const shown = to % 1 === 0 ? Math.round(n) : n.toFixed(1);

  return (
    <div ref={ref}>
      <p className="tnum text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-none tracking-[-0.045em]">
        {prefix}
        {shown}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-3 max-w-[22ch] text-[13px] leading-[1.5] text-muted">{label}</p>
    </div>
  );
}

/* ------------------------------------------- marquee-on-scroll heading */

export function ScrollSkew({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const f = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = 1 - (r.top + r.height) / (window.innerHeight + r.height);
      setX(p * 220 - 110);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(f);
    };
    f();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="overflow-hidden">
      <div style={{ transform: `translate3d(${x}px,0,0)`, willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
