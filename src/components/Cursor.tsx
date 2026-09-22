"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only custom cursor: an instant orange dot plus a trailing ring
 * that lags behind and expands over interactive targets.
 *
 * - Fine pointers only (`hover: hover and pointer: fine`) — never on touch.
 * - Native cursor is preserved everywhere; this draws on top, so text
 *   selection, I-beams and link affordances still behave normally.
 * - Disabled entirely under `prefers-reduced-motion`.
 * - Position is written straight to the DOM via rAF (no React state per
 *   frame), so it costs nothing in re-renders.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const INTERACTIVE =
      'a, button, input, select, textarea, label, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

    function onMove(e: PointerEvent) {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        d!.style.opacity = "1";
        r!.style.opacity = "1";
      }

      const el = e.target as Element | null;
      targetScale = el?.closest?.(INTERACTIVE) ? 2.1 : 1;
    }

    function onLeave() {
      visible = false;
      d!.style.opacity = "0";
      r!.style.opacity = "0";
    }

    function onDown() {
      targetScale = Math.min(targetScale, 1.4) * 0.72;
    }

    function onUp(e: PointerEvent) {
      const el = e.target as Element | null;
      targetScale = el?.closest?.(INTERACTIVE) ? 2.1 : 1;
    }

    function frame() {
      // ring trails with easing; dot is 1:1 and instant
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.18;

      d!.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      r!.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-layer">
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
