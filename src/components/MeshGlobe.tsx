"use client";

import { useEffect, useRef } from "react";

/**
 * Dense triangulated network-mesh globe.
 * Fibonacci-distributed nodes, each linked to its k nearest neighbours to form
 * a web (not lat/long rings). Depth-faded, slow auto-rotation, drag to spin.
 */
export default function MeshGlobe() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, R = 0, raf = 0;
    let yaw = -0.5, pitch = -0.2;
    let vYaw = 0.0013;
    let dragging = false, lastX = 0, lastY = 0;

    type V = { x: number; y: number; z: number };

    // ---- node cloud ----
    const N = 620;
    const pts: V[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }

    // ---- build edges: connect each node to nearest neighbours ----
    const edges: [number, number][] = [];
    const seen = new Set<string>();
    const K = 3;
    for (let i = 0; i < N; i++) {
      const d: { j: number; d2: number }[] = [];
      for (let j = 0; j < N; j++) {
        if (i === j) continue;
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dz = pts[i].z - pts[j].z;
        d.push({ j, d2: dx * dx + dy * dy + dz * dz });
      }
      d.sort((a, b) => a.d2 - b.d2);
      for (let k = 0; k < K; k++) {
        const j = d[k].j;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push([i, j]);
      }
    }

    // a sparse set of nodes glow orange
    const hot = new Set<number>();
    for (let i = 0; i < N; i += 9) hot.add(i);

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
      const d = 3.4;
      const s = d / (d - p.z);
      return { x: w / 2 + p.x * R * s, y: h / 2 + p.y * R * s };
    }

    function resize() {
      const rect = cv!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      cv!.width = Math.floor(w * dpr);
      cv!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.5;
    }

    let t = 0;
    function frame() {
      t += 0.01;
      if (!dragging) yaw += vYaw;
      pitch = Math.max(-0.7, Math.min(0.7, pitch));

      ctx!.clearRect(0, 0, w, h);

      const rp = pts.map(rot);
      const pp = rp.map(proj);

      // ---- edges ----
      for (const [a, b] of edges) {
        const za = rp[a].z, zb = rp[b].z;
        const zm = (za + zb) / 2;
        if (zm < -0.55) continue;
        const depth = (zm + 1) / 2;
        const isHot = hot.has(a) || hot.has(b);
        ctx!.beginPath();
        ctx!.moveTo(pp[a].x, pp[a].y);
        ctx!.lineTo(pp[b].x, pp[b].y);
        ctx!.strokeStyle = isHot
          ? `rgba(255,92,0,${0.05 + depth * 0.4})`
          : `rgba(245,245,243,${0.02 + depth * 0.14})`;
        ctx!.lineWidth = 0.6;
        ctx!.stroke();
      }

      // ---- nodes ----
      for (let i = 0; i < N; i++) {
        const z = rp[i].z;
        if (z < -0.5) continue;
        const depth = (z + 1) / 2;
        const isHot = hot.has(i);
        const pulse = isHot ? 0.65 + Math.sin(t * 1.6 + i) * 0.35 : 1;
        ctx!.beginPath();
        ctx!.arc(pp[i].x, pp[i].y, (isHot ? 1.5 : 0.85) * (0.55 + depth * 0.7), 0, 6.283);
        ctx!.fillStyle = isHot
          ? `rgba(255,140,60,${(0.25 + depth * 0.7) * pulse})`
          : `rgba(245,245,243,${0.08 + depth * 0.45})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      cv!.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      yaw += (e.clientX - lastX) * 0.005;
      pitch += (e.clientY - lastY) * 0.003;
      vYaw = (e.clientX - lastX) * 0.0005 || 0.0013;
      lastX = e.clientX; lastY = e.clientY;
    };
    const up = () => { dragging = false; if (Math.abs(vYaw) < 0.0004) vYaw = 0.0013; };

    resize();
    window.addEventListener("resize", resize);
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);

    if (reduced) frame();
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
