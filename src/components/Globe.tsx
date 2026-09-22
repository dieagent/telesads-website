"use client";

import { useEffect, useRef } from "react";

/**
 * Real 3D wireframe globe — perspective-projected point cloud with great-circle
 * connection arcs, rendered to canvas with painter's-algorithm depth sorting.
 * No WebGL, no dependencies: pure 3×3 rotation matrices + perspective divide.
 *
 * Represents international audience reach. Drag to spin; it has inertia.
 */
export default function Globe() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, R = 0;
    let yaw = -0.6, pitch = -0.28;
    let vYaw = 0.0022, vPitch = 0;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let raf = 0;

    type V = { x: number; y: number; z: number };

    // --- fibonacci sphere point cloud ---
    const N = 420;
    const pts: V[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }

    // --- hub cities (lat, lon) → unit vectors ---
    const hubs: { name: string; lat: number; lon: number }[] = [
      { name: "IN", lat: 21.2, lon: 72.8 },   // Surat
      { name: "AE", lat: 25.2, lon: 55.3 },   // Dubai
      { name: "GB", lat: 51.5, lon: -0.13 },
      { name: "SG", lat: 1.35, lon: 103.8 },
      { name: "US", lat: 40.7, lon: -74.0 },
      { name: "BR", lat: -23.5, lon: -46.6 },
      { name: "NG", lat: 6.5, lon: 3.4 },
      { name: "ID", lat: -6.2, lon: 106.8 },
    ];
    const toVec = (lat: number, lon: number): V => {
      const a = (lat * Math.PI) / 180;
      const b = (lon * Math.PI) / 180;
      return { x: Math.cos(a) * Math.sin(b), y: Math.sin(a), z: Math.cos(a) * Math.cos(b) };
    };
    const hubV = hubs.map((c) => toVec(c.lat, c.lon));

    // arcs from India hub outward
    const arcs: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [1, 2], [1, 4], [2, 4], [3, 7], [1, 6], [4, 5],
    ];

    function rot(p: V): V {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const x1 = p.x * cy - p.z * sy;
      const z1 = p.x * sy + p.z * cy;
      const y2 = p.y * cp - z1 * sp;
      const z2 = p.y * sp + z1 * cp;
      return { x: x1, y: y2, z: z2 };
    }

    function proj(p: V) {
      const d = 3.2;
      const s = d / (d - p.z);
      return { x: w / 2 + p.x * R * s, y: h / 2 + p.y * R * s, s, z: p.z };
    }

    function slerp(a: V, b: V, t: number): V {
      const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
      const om = Math.acos(dot);
      if (om < 1e-4) return a;
      const s = Math.sin(om);
      const k0 = Math.sin((1 - t) * om) / s;
      const k1 = Math.sin(t * om) / s;
      return { x: a.x * k0 + b.x * k1, y: a.y * k0 + b.y * k1, z: a.z * k0 + b.z * k1 };
    }

    function resize() {
      const rect = cv!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      cv!.width = Math.floor(w * dpr);
      cv!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.38;
    }

    let t = 0;
    function frame() {
      t += 0.016;
      if (!dragging) { yaw += vYaw; pitch += vPitch; vPitch *= 0.94; }
      pitch = Math.max(-0.75, Math.min(0.75, pitch));

      ctx!.clearRect(0, 0, w, h);

      // ---- latitude/longitude wire rings ----
      ctx!.lineWidth = 1;
      for (let i = 1; i < 6; i++) {
        const lat = -Math.PI / 2 + (i * Math.PI) / 6;
        ctx!.beginPath();
        let started = false;
        for (let j = 0; j <= 72; j++) {
          const lon = (j / 72) * Math.PI * 2;
          const p = rot({
            x: Math.cos(lat) * Math.sin(lon),
            y: Math.sin(lat),
            z: Math.cos(lat) * Math.cos(lon),
          });
          const q = proj(p);
          if (p.z < -0.15) { started = false; continue; }
          if (!started) { ctx!.moveTo(q.x, q.y); started = true; }
          else ctx!.lineTo(q.x, q.y);
        }
        ctx!.strokeStyle = "rgba(245,245,243,0.075)";
        ctx!.stroke();
      }
      for (let i = 0; i < 12; i++) {
        const lon = (i / 12) * Math.PI * 2;
        ctx!.beginPath();
        let started = false;
        for (let j = 0; j <= 48; j++) {
          const lat = -Math.PI / 2 + (j / 48) * Math.PI;
          const p = rot({
            x: Math.cos(lat) * Math.sin(lon),
            y: Math.sin(lat),
            z: Math.cos(lat) * Math.cos(lon),
          });
          const q = proj(p);
          if (p.z < -0.15) { started = false; continue; }
          if (!started) { ctx!.moveTo(q.x, q.y); started = true; }
          else ctx!.lineTo(q.x, q.y);
        }
        ctx!.strokeStyle = "rgba(245,245,243,0.055)";
        ctx!.stroke();
      }

      // ---- point cloud, depth sorted ----
      const drawn = pts
        .map((p) => { const r = rot(p); return { r, q: proj(r) }; })
        .sort((a, b) => a.r.z - b.r.z);

      for (const { r, q } of drawn) {
        if (r.z < -0.2) continue;
        const depth = (r.z + 1) / 2;
        ctx!.beginPath();
        ctx!.arc(q.x, q.y, 0.7 + depth * 1.05, 0, 6.283);
        ctx!.fillStyle = `rgba(245,245,243,${0.06 + depth * 0.4})`;
        ctx!.fill();
      }

      // ---- great-circle arcs ----
      for (const [a, b] of arcs) {
        const A = hubV[a], B = hubV[b];
        ctx!.beginPath();
        let started = false;
        const STEPS = 44;
        for (let i = 0; i <= STEPS; i++) {
          const tt = i / STEPS;
          const m = slerp(A, B, tt);
          const lift = 1 + Math.sin(tt * Math.PI) * 0.19;
          const p = rot({ x: m.x * lift, y: m.y * lift, z: m.z * lift });
          const q = proj(p);
          if (p.z < -0.1) { started = false; continue; }
          if (!started) { ctx!.moveTo(q.x, q.y); started = true; }
          else ctx!.lineTo(q.x, q.y);
        }
        ctx!.strokeStyle = "rgba(255,92,0,0.42)";
        ctx!.lineWidth = 1.1;
        ctx!.stroke();

        // travelling pulse
        const pt = (t * 0.22 + a * 0.13 + b * 0.07) % 1;
        const m = slerp(A, B, pt);
        const lift = 1 + Math.sin(pt * Math.PI) * 0.19;
        const p = rot({ x: m.x * lift, y: m.y * lift, z: m.z * lift });
        if (p.z > -0.1) {
          const q = proj(p);
          ctx!.beginPath();
          ctx!.arc(q.x, q.y, 2.1, 0, 6.283);
          ctx!.fillStyle = "rgba(255,190,140,0.95)";
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(q.x, q.y, 7, 0, 6.283);
          ctx!.fillStyle = "rgba(255,92,0,0.15)";
          ctx!.fill();
        }
      }

      // ---- hub markers ----
      hubV.forEach((v) => {
        const p = rot(v);
        if (p.z < -0.05) return;
        const q = proj(p);
        const pulse = 3 + Math.sin(t * 2.2) * 0.7;
        ctx!.beginPath();
        ctx!.arc(q.x, q.y, pulse + 5, 0, 6.283);
        ctx!.fillStyle = "rgba(255,92,0,0.13)";
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(q.x, q.y, 2.6, 0, 6.283);
        ctx!.fillStyle = "#ff5c00";
        ctx!.fill();
      });

      raf = requestAnimationFrame(frame);
    }

    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      cv!.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      yaw += dx * 0.006; pitch += dy * 0.004;
      vYaw = dx * 0.0006 || 0.0022; vPitch = dy * 0.0004;
      lastX = e.clientX; lastY = e.clientY;
    };
    const up = () => { dragging = false; if (Math.abs(vYaw) < 0.0005) vYaw = 0.0022; };

    resize();
    window.addEventListener("resize", resize);
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);

    if (reduced) { frame(); cancelAnimationFrame(raf); }
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, []);

  return <canvas ref={ref} className="size-full touch-none" aria-hidden="true" />;
}
