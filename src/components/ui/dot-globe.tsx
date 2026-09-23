"use client";

import { useEffect, useRef } from "react";

/**
 * Dot-matrix globe.
 *
 * Geometry only — no map texture. A low-resolution landmass bitmap on a dark
 * base is what made the previous globe read muddy; points and lines stay sharp
 * at any size and any DPR.
 *
 * Composition:
 *   - latitude/longitude dot grid, depth-faded front to back
 *   - orange city markers raised slightly off the surface, with halos
 *   - great-circle arcs carrying travelling pulses
 *   - a single inclined orbit ring for a technical, non-decorative accent
 *   - soft inner horizon glow so the sphere reads as a volume, not a disc
 */

export type City = { lat: number; lon: number; size?: number; hot?: boolean };
export type Route = { from: [number, number]; to: [number, number] };

const DEG = Math.PI / 180;

export function DotGlobe({
  cities = [],
  routes = [],
  className = "",
  accent = "255,92,0",
  ink = "235,238,245",
}: {
  cities?: City[];
  routes?: Route[];
  className?: string;
  accent?: string;
  ink?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, R = 0, raf = 0;
    let yaw = -0.6;
    const pitch = -0.26;
    let vYaw = 0.0016;
    let dragging = false;
    let lastX = 0, lastT = 0;
    let visible = true;
    let time = 0;

    /* ── dot grid: rings of latitude, even arc spacing along each ring ── */
    type P = { x: number; y: number; z: number };
    const dots: P[] = [];
    const ROWS = 46;
    for (let i = 0; i <= ROWS; i++) {
      const phi = (i / ROWS) * Math.PI;          // 0..PI from north pole
      const y = Math.cos(phi);
      const rr = Math.sin(phi);
      // keep spacing roughly constant: fewer dots near the poles
      const count = Math.max(1, Math.round(rr * 108));
      for (let j = 0; j < count; j++) {
        const th = (j / count) * Math.PI * 2;
        dots.push({ x: Math.cos(th) * rr, y, z: Math.sin(th) * rr });
      }
    }

    const toVec = (lat: number, lon: number): P => {
      const p = (90 - lat) * DEG;
      const t = (lon + 180) * DEG;
      return { x: Math.cos(t) * Math.sin(p), y: Math.cos(p), z: Math.sin(t) * Math.sin(p) };
    };

    const cityVecs = cities.map((c) => ({ v: toVec(c.lat, c.lon), size: c.size ?? 1, hot: c.hot }));

    const slerp = (a: P, b: P, t: number): P => {
      let d = a.x * b.x + a.y * b.y + a.z * b.z;
      d = Math.max(-1, Math.min(1, d));
      const om = Math.acos(d);
      if (om < 1e-5) return a;
      const s = Math.sin(om);
      const k0 = Math.sin((1 - t) * om) / s;
      const k1 = Math.sin(t * om) / s;
      return { x: a.x * k0 + b.x * k1, y: a.y * k0 + b.y * k1, z: a.z * k0 + b.z * k1 };
    };

    const routeVecs = routes.map((r) => ({
      a: toVec(r.from[0], r.from[1]),
      b: toVec(r.to[0], r.to[1]),
    }));

    const DIST = 3.2;
    const rot = (p: P) => {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const x1 = p.x * cy - p.z * sy;
      const z1 = p.x * sy + p.z * cy;
      const y2 = p.y * cp - z1 * sp;
      const z2 = p.y * sp + z1 * cp;
      return { x: x1, y: y2, z: z2 };
    };
    const proj = (p: P, lift = 1) => {
      const s = DIST / (DIST - p.z * lift);
      return { X: w / 2 + p.x * lift * R * s, Y: h / 2 + p.y * lift * R * s, s };
    };

    function resize() {
      const rect = cv!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cv!.width = Math.round(w * dpr);
      cv!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.40;
    }

    function draw() {
      time += 0.016;
      if (!dragging) {
        yaw += vYaw;
        vYaw += (0.0016 - vYaw) * 0.03;
      }

      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2, cyc = h / 2;

      /* inner horizon glow — gives the sphere volume */
      const glow = ctx!.createRadialGradient(cx, cyc, R * 0.2, cx, cyc, R * 1.02);
      glow.addColorStop(0, `rgba(${accent},0.045)`);
      glow.addColorStop(0.72, `rgba(${accent},0.02)`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cyc, R * 1.02, 0, 6.283);
      ctx!.fill();

      /* dot grid */
      for (const d of dots) {
        const p = rot(d);
        if (p.z < -0.2) continue;                 // cull deep back face
        const depth = (p.z + 1) / 2;              // 0..1
        const a = Math.pow(depth, 2.1);
        if (a < 0.02) continue;
        const { X, Y, s } = proj(p);
        ctx!.beginPath();
        ctx!.arc(X, Y, 0.55 * s * (0.5 + depth * 0.7), 0, 6.283);
        ctx!.fillStyle = `rgba(${ink},${(a * 0.42).toFixed(3)})`;
        ctx!.fill();
      }

      /* terminator rim — thin bright edge on the lit limb */
      ctx!.beginPath();
      ctx!.arc(cx, cyc, R * 1.005, 0, 6.283);
      ctx!.strokeStyle = `rgba(${ink},0.07)`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      /* inclined orbit ring */
      ctx!.beginPath();
      let started = false;
      for (let i = 0; i <= 160; i++) {
        const t = (i / 160) * Math.PI * 2;
        const base: P = { x: Math.cos(t), y: 0, z: Math.sin(t) };
        const tilt = 0.42;
        const ry = base.y * Math.cos(tilt) - base.z * Math.sin(tilt);
        const rz = base.y * Math.sin(tilt) + base.z * Math.cos(tilt);
        const p = rot({ x: base.x, y: ry, z: rz });
        const { X, Y } = proj(p, 1.28);
        if (p.z < -0.9) { started = false; continue; }
        if (!started) { ctx!.moveTo(X, Y); started = true; } else ctx!.lineTo(X, Y);
      }
      ctx!.strokeStyle = `rgba(${accent},0.2)`;
      ctx!.lineWidth = 1;
      ctx!.stroke();

      /* great-circle arcs */
      for (let ri = 0; ri < routeVecs.length; ri++) {
        const { a, b } = routeVecs[ri];
        ctx!.beginPath();
        let on = false;
        const N = 48;
        for (let i = 0; i <= N; i++) {
          const t = i / N;
          const p = rot(slerp(a, b, t));
          const lift = 1 + Math.sin(t * Math.PI) * 0.13;
          if (p.z * lift < -0.12) { on = false; continue; }
          const { X, Y } = proj(p, lift);
          if (!on) { ctx!.moveTo(X, Y); on = true; } else ctx!.lineTo(X, Y);
        }
        ctx!.strokeStyle = `rgba(${accent},0.34)`;
        ctx!.lineWidth = 1.1;
        ctx!.stroke();

        /* travelling pulse */
        const pt = ((time * 0.16 + ri * 0.23) % 1.35) / 1.0;
        if (pt <= 1) {
          const p = rot(slerp(a, b, pt));
          const lift = 1 + Math.sin(pt * Math.PI) * 0.13;
          if (p.z * lift > -0.1) {
            const { X, Y } = proj(p, lift);
            const g = ctx!.createRadialGradient(X, Y, 0, X, Y, 8);
            g.addColorStop(0, `rgba(${accent},0.85)`);
            g.addColorStop(1, `rgba(${accent},0)`);
            ctx!.fillStyle = g;
            ctx!.beginPath();
            ctx!.arc(X, Y, 8, 0, 6.283);
            ctx!.fill();
            ctx!.beginPath();
            ctx!.arc(X, Y, 1.6, 0, 6.283);
            ctx!.fillStyle = "rgba(255,240,230,0.95)";
            ctx!.fill();
          }
        }
      }

      /* city markers */
      for (const c of cityVecs) {
        const p = rot(c.v);
        if (p.z < -0.05) continue;
        const depth = (p.z + 1) / 2;
        const { X, Y, s } = proj(p, 1.012);
        const base = (c.size ?? 1) * s;

        if (c.hot) {
          const ping = (time * 0.5) % 1;
          ctx!.beginPath();
          ctx!.arc(X, Y, base * (2.2 + ping * 7), 0, 6.283);
          ctx!.strokeStyle = `rgba(${accent},${(0.3 * (1 - ping) * depth).toFixed(3)})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
        const g = ctx!.createRadialGradient(X, Y, 0, X, Y, base * 5);
        g.addColorStop(0, `rgba(${accent},${(0.5 * depth).toFixed(3)})`);
        g.addColorStop(1, `rgba(${accent},0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(X, Y, base * 5, 0, 6.283);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(X, Y, base * 1.5, 0, 6.283);
        ctx!.fillStyle = `rgba(${accent},${(0.55 + depth * 0.45).toFixed(3)})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastT = performance.now();
      cv!.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const dx = e.clientX - lastX;
      yaw += dx * 0.0055;
      vYaw = (dx / dt) * 0.10;
      lastX = e.clientX;
      lastT = now;
    };
    const up = () => { dragging = false; };

    resize();
    window.addEventListener("resize", resize);
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(draw);
      if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(cv);

    if (reduced) draw();
    else raf = requestAnimationFrame(draw);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, [cities, routes, accent, ink]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`size-full cursor-grab touch-none active:cursor-grabbing ${className}`}
    />
  );
}
