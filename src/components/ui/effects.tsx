"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function useSeen<T extends HTMLElement>(margin = "-60px") {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, seen };
}

/** Count-up number, eased. No animation library. */
export function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const { ref, seen } = useSeen<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(value);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1100);
      setN(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {Math.round(n)}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/** Fade + rise on enter. CSS transition only. */
export function BlurFade({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, seen } = useSeen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateY(14px)",
        transition: `opacity 620ms var(--ease-out) ${delay}s, transform 620ms var(--ease-out) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
