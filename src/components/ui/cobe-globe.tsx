"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe, { COBEOptions } from "cobe";

export interface GlobeMarker {
  id: string;
  location: [number, number];
  label: string;
}

export interface GlobeArc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}

interface GlobeProps {
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  className?: string;
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  speed?: number;
  theta?: number;
  diffuse?: number;
  mapSamples?: number;
  opacity?: number;
}

/** cobe types omit onRender; update() is used here instead, which is typed. */
type GlobeInstance = ReturnType<typeof createGlobe>;

/**
 * Interactive COBE globe with anchored city labels.
 *
 * Adapted from the reference implementation for the TELES ADS dark theme:
 * - dark/base/glow retuned for #080808; accent markers and arcs.
 * - Labels restyled to the site's mono `.label` treatment.
 * - Drag listeners attach on pointerdown and detach on release (the reference
 *   keeps window listeners alive for the component's whole life).
 * - Config objects are memo-stable so the effect doesn't tear down and rebuild
 *   the WebGL context on every parent render.
 * - Honors prefers-reduced-motion and pauses when scrolled out of view.
 */
export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [1, 0.36, 0],
  baseColor = [0.11, 0.11, 0.12],
  arcColor = [1, 0.36, 0],
  glowColor = [0.14, 0.14, 0.15],
  dark = 1,
  mapBrightness = 5.2,
  markerSize = 0.03,
  markerElevation = 0.012,
  arcWidth = 0.45,
  arcHeight = 0.35,
  speed = 0.005,
  theta = 0.28,
  diffuse = 1.1,
  mapSamples = 16000,
  opacity = 1,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const inViewRef = useRef(true);
  const reducedRef = useRef(false);

  // keep the latest markers/arcs without retriggering the WebGL effect
  const markersRef = useRef(markers);
  const arcsRef = useRef(arcs);
  markersRef.current = markers;
  arcsRef.current = arcs;

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!pointerInteracting.current) return;
    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: deltaX / 1400, theta: deltaY / 2600 };

    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const max = 0.035;
      velocity.current = {
        phi: Math.max(-max, Math.min(max, ((e.clientX - lastPointer.current.x) / dt) * 0.07)),
        theta: Math.max(-max, Math.min(max, ((e.clientY - lastPointer.current.y) / dt) * 0.02)),
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      pointerInteracting.current = { x: e.clientX, y: e.clientY };
      lastPointer.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
      isPausedRef.current = true;
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
    },
    [handlePointerMove, handlePointerUp],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let globe: GlobeInstance | null = null;
    let animationId = 0;
    let phi = 0;
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    // Built once: rebuilding these per frame made cobe re-upload the marker
    // and arc buffers 60x/sec, which is what made the motion stutter.
    const builtMarkers = markersRef.current.map((m) => ({
      location: m.location,
      size: markerSize,
      id: m.id,
    }));
    const builtArcs = arcsRef.current.map((a) => ({
      from: a.from,
      to: a.to,
      id: a.id,
    }));

    function init() {
      const width = canvas!.offsetWidth;
      if (width === 0 || globe) return;

      const opts: COBEOptions = {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: builtMarkers,
        arcs: builtArcs,
        arcColor,
        arcWidth,
        arcHeight,
        opacity,
      };
      globe = createGlobe(canvas!, opts);

      let lastT = performance.now();

      function animate() {
        const now = performance.now();
        // Normalise to a 60fps step so rotation and momentum decay run at the
        // same rate on 60Hz, 120Hz and 144Hz displays.
        const k = Math.min(3, (now - lastT) / 16.667);
        lastT = now;

        if (!inViewRef.current) {
          animationId = requestAnimationFrame(animate);
          return;
        }
        if (!isPausedRef.current) {
          if (!reducedRef.current) phi += speed * k;

          if (
            Math.abs(velocity.current.phi) > 0.0001 ||
            Math.abs(velocity.current.theta) > 0.0001
          ) {
            phiOffsetRef.current += velocity.current.phi * k;
            thetaOffsetRef.current += velocity.current.theta * k;
            const decay = Math.pow(0.96, k);
            velocity.current.phi *= decay;
            velocity.current.theta *= decay;
          }

          const thetaMin = -0.4;
          const thetaMax = 0.4;
          const pull = 1 - Math.pow(0.9, k);
          if (thetaOffsetRef.current < thetaMin) {
            thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * pull;
          } else if (thetaOffsetRef.current > thetaMax) {
            thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * pull;
          }
        }

        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
          markers: builtMarkers,
          arcs: builtArcs,
        });
        animationId = requestAnimationFrame(animate);
      }

      animate();
      timer = setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      });

      io = new IntersectionObserver(([e]) => {
        inViewRef.current = e.isIntersecting;
      });
      io.observe(canvas!);
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro?.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (timer) clearTimeout(timer);
      ro?.disconnect();
      io?.disconnect();
      globe?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelBase: React.CSSProperties = {
    position: "absolute",
    bottom: "anchor(top)",
    left: "anchor(center)",
    translate: "-50% 0",
    marginBottom: 9,
    padding: "3px 8px",
    borderRadius: 3,
    fontFamily: "var(--font-mono, monospace)",
    fontSize: "0.58rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    pointerEvents: "none",
  };

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          touchAction: "none",
        }}
      />

      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            ...labelBase,
            positionAnchor: `--cobe-${m.id}`,
            background: "#141416",
            border: "1px solid rgba(245,245,243,0.12)",
            color: "#f5f5f3",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 7px))`,
            transition: "opacity 0.8s, filter 0.8s",
          }}
        >
          {m.label}
        </div>
      ))}

      {arcs
        .filter((a) => a.label)
        .map((a) => (
          <div
            key={a.id}
            style={{
              ...labelBase,
                positionAnchor: `--cobe-arc-${a.id}`,
              background: "var(--accent)",
              color: "#1a0b00",
              fontWeight: 600,
              opacity: `var(--cobe-visible-arc-${a.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-arc-${a.id}, 0)) * 7px))`,
              transition: "opacity 0.8s, filter 0.8s",
            }}
          >
            {a.label}
          </div>
        ))}
    </div>
  );
}
