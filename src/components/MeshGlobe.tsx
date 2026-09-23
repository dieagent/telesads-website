"use client";

import { useEffect, useRef } from "react";

/**
 * Dense triangulated network-mesh globe.
 *
 * - Fibonacci point distribution, edges built by radius threshold (organic
 *   valence) rather than fixed-K, so the web looks triangulated not knitted.
 * - Full sphere rendered with depth-fade instead of z-culling: the far side
 *   dissolves into the background rather than being clipped at a hard edge.
 * - Edges depth-sorted back-to-front; line width and alpha both track depth.
 * - Buffers preallocated; nothing is allocated per frame.
 */
export default function MeshGlobe() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, R = 0, raf = 0, running = true;
    let yaw = -0.5, pitch = -0.18;
    let vYaw = 0.0011, vPitch = 0;
    let dragging = false, lastX = 0, lastY = 0, lastT = 0;

    /* ─────────────── node cloud (Fibonacci sphere) ─────────────── */
    const N = 760;
    const px = new Float32Array(N);
    const py = new Float32Array(N);
    const pz = new Float32Array(N);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      px[i] = Math.cos(th) * r;
      py[i] = y;
      pz[i] = Math.sin(th) * r;
    }

    /* ── edges by radius threshold → organic triangulation ──
       mean nearest-neighbour spacing on a unit sphere ≈ sqrt(4π/N).       */
    const spacing = Math.sqrt((4 * Math.PI) / N);
    const maxD2 = Math.pow(spacing * 1.42, 2);

    const ea: number[] = [];
    const eb: number[] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = px[i] - px[j];
        const dy = py[i] - py[j];
        const dz = pz[i] - pz[j];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < maxD2) {
          ea.push(i);
          eb.push(j);
        }
      }
    }
    const E = ea.length;
    const eA = new Uint16Array(ea);
    const eB = new Uint16Array(eb);

    /* hot nodes — hashed, not striped */
    const hot = new Uint8Array(N);
    for (let i = 0; i < N; i++) {
      const v = Math.sin(i * 12.9898) * 43758.5453;
      if (v - Math.floor(v) < 0.1) hot[i] = 1;
    }

    /* preallocated frame buffers */
    const rx = new Float32Array(N);
    const ry = new Float32Array(N);
    const rz = new Float32Array(N);
    const sx = new Float32Array(N);
    const sy = new Float32Array(N);
    const order = new Uint16Array(E);
    for (let i = 0; i < E; i++) order[i] = i;
    const edgeZ = new Float32Array(E);
    const nodeOrder = new Uint16Array(N);
    for (let i = 0; i < N; i++) nodeOrder[i] = i;

    function resize() {
      const rect = cv!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cv!.width = Math.floor(w * dpr);
      cv!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.47;
    }

    const DIST = 3.6;

    let time = 0;

    function frame() {
      time += 0.01;

      if (!dragging) {
        yaw += vYaw;
        pitch += vPitch;
        vPitch *= 0.93;
        // ease residual drag velocity back to the idle drift
        vYaw += (0.0011 - vYaw) * 0.02;
      }
      if (pitch > 0.62) pitch = 0.62;
      if (pitch < -0.62) pitch = -0.62;

      const cy = Math.cos(yaw), sYaw = Math.sin(yaw);
      const cp = Math.cos(pitch), sp = Math.sin(pitch);

      for (let i = 0; i < N; i++) {
        const x0 = px[i], y0 = py[i], z0 = pz[i];
        const x1 = x0 * cy - z0 * sYaw;
        const z1 = x0 * sYaw + z0 * cy;
        const y2 = y0 * cp - z1 * sp;
        const z2 = y0 * sp + z1 * cp;
        rx[i] = x1; ry[i] = y2; rz[i] = z2;
        const s = DIST / (DIST - z2);
        sx[i] = w / 2 + x1 * R * s;
        sy[i] = h / 2 + y2 * R * s;
      }

      ctx!.clearRect(0, 0, w, h);

      /* ── edges, depth sorted back → front ── */
      for (let i = 0; i < E; i++) edgeZ[i] = (rz[eA[i]] + rz[eB[i]]) * 0.5;
      const ordArr = order as unknown as { sort: (f: (a: number, b: number) => number) => void };
      ordArr.sort((a: number, b: number) => edgeZ[a] - edgeZ[b]);

      for (let k = 0; k < E; k++) {
        const i = order[k];
        const a = eA[i], b = eB[i];
        const zm = edgeZ[i];
        const depth = (zm + 1) * 0.5;          // 0 back → 1 front
        const fade = depth * depth;            // quadratic: back dissolves
        if (fade < 0.012) continue;

        const isHot = hot[a] === 1 || hot[b] === 1;
        ctx!.beginPath();
        ctx!.moveTo(sx[a], sy[a]);
        ctx!.lineTo(sx[b], sy[b]);
        ctx!.strokeStyle = isHot
          ? `rgba(255,92,0,${(0.03 + fade * 0.16).toFixed(3)})`
          : `rgba(226,230,240,${(0.016 + fade * 0.075).toFixed(3)})`;
        ctx!.lineWidth = 0.3 + fade * 0.35;
        ctx!.stroke();
      }

      /* ── nodes, depth sorted ── */
      const nOrd = nodeOrder as unknown as { sort: (f: (a: number, b: number) => number) => void };
      nOrd.sort((a: number, b: number) => rz[a] - rz[b]);

      for (let k = 0; k < N; k++) {
        const i = nodeOrder[k];
        const depth = (rz[i] + 1) * 0.5;
        const fade = depth * depth;
        if (fade < 0.015) continue;

        if (hot[i]) {
          const pulse = 0.78 + Math.sin(time * 0.9 + i) * 0.22;
          ctx!.beginPath();
          ctx!.arc(sx[i], sy[i], 0.5 + fade * 0.75, 0, 6.283);
          ctx!.fillStyle = `rgba(255,108,16,${(0.16 + fade * 0.5) * pulse})`;
          ctx!.fill();
        } else {
          ctx!.beginPath();
          ctx!.arc(sx[i], sy[i], 0.32 + fade * 0.58, 0, 6.283);
          ctx!.fillStyle = `rgba(236,239,246,${(0.04 + fade * 0.34).toFixed(3)})`;
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    }

    /* ─────────────── interaction ─────────────── */
    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      cv!.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      yaw += dx * 0.0052;
      pitch += dy * 0.0032;
      vYaw = (dx / dt) * 0.09;
      vPitch = (dy / dt) * 0.05;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    const up = () => { dragging = false; };

    resize();
    window.addEventListener("resize", resize);
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);

    /* pause when offscreen */
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !running) {
              running = true;
              raf = requestAnimationFrame(frame);
            } else if (!e.isIntersecting && running) {
              running = false;
              cancelAnimationFrame(raf);
            }
          })
        : null;
    io?.observe(cv);

    if (reduced) frame();
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", resize);
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
    };
  }, []);

  return <canvas ref={ref} className="size-full touch-none" aria-hidden="true" />;
}
