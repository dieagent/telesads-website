"use client";

import { useEffect, useRef } from "react";

/**
 * Hero particle field: a live audience-convergence simulation.
 * Nodes drift in from the left as a dispersed cloud, get pulled toward a
 * focal axis, accelerate through it, and recycle. Pointer adds local
 * attraction. Pauses when offscreen; disabled under reduced motion.
 */
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;

    type P = { x: number; y: number; vx: number; vy: number; r: number; life: number; seed: number };
    let ps: P[] = [];
    const pointer = { x: -9999, y: -9999, on: false };

    function resize() {
      if (!cv) return;
      const rect = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round(Math.min(280, Math.max(90, (w * h) / 5200)));
      ps = Array.from({ length: target }, () => spawn(true));
    }

    function spawn(anywhere = false): P {
      const t = anywhere ? Math.random() : Math.random() * 0.18;
      return {
        x: t * w,
        y: h * 0.5 + (Math.random() - 0.5) * h * (0.95 - t * 0.7),
        vx: 0.18 + Math.random() * 0.5,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.5 + Math.random() * 1.5,
        life: Math.random(),
        seed: Math.random() * 6.283,
      };
    }

    let raf = 0;
    let t = 0;
    let running = true;

    function frame() {
      t += 0.0055;
      ctx!.clearRect(0, 0, w, h);

      const axis = h * 0.5;

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const prog = p.x / w;

        // converge toward the axis, harder as they travel right
        const pull = (axis - p.y) * (0.0022 + prog * 0.02);
        p.vy += pull;

        // organic drift
        p.vy += Math.sin(t * 2.1 + p.seed + p.x * 0.006) * 0.008 * (1 - prog);
        p.vx += 0.0055 * prog;

        // pointer attraction
        if (pointer.on) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 30000 && d2 > 1) {
            const f = 42 / d2;
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        p.vy *= 0.955;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > w + 20) Object.assign(p, spawn());

        const focus = Math.pow(prog, 1.7);
        const alpha = Math.min(1, 0.1 + focus * 0.95) * (0.35 + p.life * 0.65);
        const rad = p.r * (0.7 + focus * 0.9);

        // hot core near the axis on the right
        const near = 1 - Math.min(1, Math.abs(p.y - axis) / (h * 0.06));
        const hot = focus * near;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, rad, 0, 6.283);
        ctx!.fillStyle =
          hot > 0.55
            ? `rgba(255,190,140,${alpha})`
            : `rgba(255,92,0,${alpha * 0.92})`;
        ctx!.fill();

        if (focus > 0.55 && p.r > 1.1) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, rad * 5.5, 0, 6.283);
          ctx!.fillStyle = `rgba(255,92,0,${0.035 * focus})`;
          ctx!.fill();
        }
      }

      // focused beam
      const g = ctx!.createLinearGradient(w * 0.55, 0, w, 0);
      g.addColorStop(0, "rgba(255,92,0,0)");
      g.addColorStop(0.7, "rgba(255,92,0,0.32)");
      g.addColorStop(1, "rgba(255,190,140,0.75)");
      ctx!.fillStyle = g;
      ctx!.fillRect(w * 0.55, axis - 0.6, w * 0.45, 1.2);

      raf = requestAnimationFrame(frame);
    }

    function draw_static() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of ps) {
        const prog = p.x / w;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, 6.283);
        ctx!.fillStyle = `rgba(255,92,0,${0.12 + prog * 0.6})`;
        ctx!.fill();
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.on = true;
    };
    const onLeave = () => (pointer.on = false);

    resize();
    window.addEventListener("resize", resize);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);

    if (reduced) {
      draw_static();
    } else {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      io.observe(cv);
      raf = requestAnimationFrame(frame);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
        cv.removeEventListener("pointermove", onMove);
        cv.removeEventListener("pointerleave", onLeave);
      };
    }

    return () => {
      window.removeEventListener("resize", resize);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="size-full" />;
}
