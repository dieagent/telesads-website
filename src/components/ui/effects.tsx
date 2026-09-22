"use client";

/**
 * Brand-tuned adaptations of Magic UI / Aceternity patterns.
 * Each is rewritten against the TELES ADS token set (#080808 / #F5F5F3 /
 * #FF5C00), with reduced-motion handling added.
 */

import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ───────────────────────────── Border Beam (Magic UI) ─────────────────── */

export function BorderBeam({
  duration = 8,
  delay = 0,
  className,
}: {
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "[border:1px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className,
      )}
    >
      <div
        className="beam-run absolute aspect-square w-[180px] [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_180px)]"
        style={{
          background: "linear-gradient(to left, #ff5c00, #ffb07a, transparent)",
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

/* ───────────────────────────── Magic Card (Magic UI) ──────────────────── */

export function MagicCard({
  children,
  className,
  gradientSize = 320,
}: {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-gradientSize);
  const my = useMotionValue(-gradientSize);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    const leave = () => {
      mx.set(-gradientSize);
      my.set(-gradientSize);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [mx, my, gradientSize]);

  const bg = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(${gradientSize}px circle at ${x}px ${y}px, rgba(255,92,0,0.14), transparent 70%)`,
  );

  return (
    <div ref={ref} className={cn("group relative overflow-hidden", className)}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: bg }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ──────────────────────── Number Ticker (Magic UI) ────────────────────── */

export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 42, stiffness: 90 });
  const [txt, setTxt] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(
    () =>
      spring.on("change", (v) =>
        setTxt(
          Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(Number(v)),
        ),
      ),
    [spring, decimals],
  );

  return (
    <span ref={ref} className={cn("tnum inline-block tabular-nums", className)}>
      {prefix}
      {txt}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/* ─────────────────── Animated Shiny Text (Magic UI) ───────────────────── */

export function ShinyText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("shiny inline-block", className)}>{children}</span>
  );
}

/* ─────────────────────── Text Reveal on scroll (Magic UI) ─────────────── */

export function ScrollReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <p className="flex flex-wrap" aria-label={text}>
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {w}
            </Word>
          );
        })}
      </p>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block" aria-hidden="true">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/* ──────────────────────────── Meteors (Magic UI) ──────────────────────── */

export function Meteors({ number = 14 }: { number?: number }) {
  const [items, setItems] = useState<{ left: string; delay: string; dur: string }[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: number }, (_, i) => ({
        left: `${(i / number) * 100 + Math.random() * 6}%`,
        delay: `${Math.random() * 4}s`,
        dur: `${4 + Math.random() * 4}s`,
      })),
    );
  }, [number]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((m, i) => (
        <span
          key={i}
          className="meteor absolute top-0 size-0.5 rounded-full bg-accent"
          style={{ left: m.left, animationDelay: m.delay, animationDuration: m.dur }}
        />
      ))}
    </div>
  );
}

/* ───────────────────── Blur Fade in-view wrapper (Magic UI) ───────────── */

export function BlurFade({
  children,
  delay = 0,
  className,
  y = 14,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(7px)", transform: `translateY(${y}px)` }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }
          : undefined
      }
      transition={{ delay, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
