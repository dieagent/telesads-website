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
 * - Great-circle routes with travelling pulses over the hub nodes.
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

    /* hub routes: pick well-separated hot nodes, link with great circles */
    const hubs: number[] = [];
    for (let i = 0; i < N && hubs.length < 7; i += 47) if (hot[i]) hubs.push(i);
    const routes: [number, number][] = [];
    for (let i = 0; i < hubs.length; i++) {
      routes.push([hubs[i], hubs[(i + 2) % hubs.length]]);
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

    function slerpTo(
      ax: number, ay: number, az: number,
      bx: number, by: number, bz: number,
      t: number,
      out: { x: number; y: number; z: number },
    ) {
      let dot = ax * bx + ay * by + az * bz;
      dot = dot < -1 ? -1 : dot > 1 ? 1 : dot;
      const om = Math.acos(dot);
      if (om < 1e-4) {
        out.x = ax; out.y = ay; out.z = az;
        return;
      }
      const s = Math.sin(om);
      const k0 = Math.sin((1 - t) * om) / s;
      const k1 = Math.sin(t * om) / s;
      out.x = ax * k0 + bx * k1;
      out.y = ay * k0 + by * k1;
      out.z = az * k0 + bz * k1;
    }

    const tmp = { x: 0, y: 0, z: 0 };
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

      /* faint atmosphere */
      const atm = ctx!.createRadialGradient(w / 2, h / 2, R * 0.55, w / 2, h / 2, R * 1.08);
      atm.addColorStop(0, "rgba(255,92,0,0.05)");
      atm.addColorStop(1, "rgba(255,92,0,0)");
      ctx!.fillStyle = atm;
      ctx!.beginPath();
      ctx!.arc(w / 2, h / 2, R * 1.08, 0, 6.283);
      ctx!.fill();

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
          ? `rgba(255,104,20,${(0.1 + fade * 0.5).toFixed(3)})`
          : `rgba(238,240,245,${(0.035 + fade * 0.2).toFixed(3)})`;
        ctx!.lineWidth = 0.35 + fade * 0.55;
        ctx!.stroke();
      }

      /* ── great-circle routes + travelling pulses ── */
      for (let r = 0; r < routes.length; r++) {
        const [a, b] = routes[r];
        const ax = px[a], ay = py[a], az = pz[a];
        const bx = px[b], by = py[b], bz = pz[b];

        ctx!.beginPath();
        let started = false;
        const STEPS = 40;
        for (let s = 0; s <= STEPS; s++) {
          slerpTo(ax, ay, az, bx, by, bz, s / STEPS, tmp);
          const lift = 1 + Math.sin((s / STEPS) * Math.PI) * 0.085;
          const X = tmp.x * lift, Y = tmp.y * lift, Z = tmp.z * lift;
          const x1 = X * cy - Z * sYaw;
          const z1 = X * sYaw + Z * cy;
          const y2 = Y * cp - z1 * sp;
          const z2 = Y * sp + z1 * cp;
          if (z2 < -0.1) { started = false; continue; }
          const sc = DIST / (DIST - z2);
          const X2 = w / 2 + x1 * R * sc;
          const Y2 = h / 2 + y2 * R * sc;
          if (!started) { ctx!.moveTo(X2, Y2); started = true; }
          else ctx!.lineTo(X2, Y2);
        }
        ctx!.strokeStyle = "rgba(255,120,40,0.34)";
        ctx!.lineWidth = 1;
        ctx!.stroke();

        /* pulse */
        const pt = (time * 0.13 + r * 0.17) % 1;
        slerpTo(ax, ay, az, bx, by, bz, pt, tmp);
        const lift = 1 + Math.sin(pt * Math.PI) * 0.085;
        const X = tmp.x * lift, Y = tmp.y * lift, Z = tmp.z * lift;
        const x1 = X * cy - Z * sYaw;
        const z1 = X * sYaw + Z * cy;
        const y2 = Y * cp - z1 * sp;
        const z2 = Y * sp + z1 * cp;
        if (z2 > -0.05) {
          const sc = DIST / (DIST - z2);
          const X2 = w / 2 + x1 * R * sc;
          const Y2 = h / 2 + y2 * R * sc;
          const g = ctx!.createRadialGradient(X2, Y2, 0, X2, Y2, 9);
          g.addColorStop(0, "rgba(255,190,140,0.85)");
          g.addColorStop(1, "rgba(255,92,0,0)");
          ctx!.fillStyle = g;
          ctx!.beginPath();
          ctx!.arc(X2, Y2, 9, 0, 6.283);
          ctx!.fill();
          ctx!.beginPath();
          ctx!.arc(X2, Y2, 1.7, 0, 6.283);
          ctx!.fillStyle = "rgba(255,225,200,0.95)";
          ctx!.fill();
        }
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
          const pulse = 0.6 + Math.sin(time * 1.5 + i) * 0.4;
          ctx!.beginPath();
          ctx!.arc(sx[i], sy[i], 1.1 + fade * 1.5, 0, 6.283);
          ctx!.fillStyle = `rgba(255,132,44,${(0.25 + fade * 0.7) * pulse})`;
          ctx!.fill();
        } else {
          ctx!.beginPath();
          ctx!.arc(sx[i], sy[i], 0.45 + fade * 0.85, 0, 6.283);
          ctx!.fillStyle = `rgba(240,242,248,${(0.06 + fade * 0.5).toFixed(3)})`;
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
