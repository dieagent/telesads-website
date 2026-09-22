"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setV(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, v };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, v } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-v={v ? "1" : "0"}
      className={`rv ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/** Line-by-line mask reveal for display headings. */
export function MaskLines({
  lines,
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
}) {
  const { ref, v } = useInView<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className={className}>
      {lines.map((l, i) => (
        <span
          key={i}
          className="line-mask"
          data-v={v ? "1" : "0"}
          style={{ transitionDelay: `${delay + i * 90}ms` }}
        >
          <span style={{ transitionDelay: `${delay + i * 90}ms` }}>{l}</span>
        </span>
      ))}
    </h2>
  );
}
