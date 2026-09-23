"use client";

import createGlobe, { COBEOptions, Marker } from "cobe";
import { useCallback, useEffect, useRef } from "react";

/**
 * COBE globe, adapted for the TELES ADS dark theme.
 *
 * Differences from the reference implementation:
 * - dark: 1 and a near-black baseColor, so the sphere reads as a dark object
 *   lit from within rather than a white ball on a white page.
 * - markerColor is the TELES accent (#ff5c00); glowColor is dimmed hard so the
 *   globe stays background texture and never competes with the headline.
 * - phi/width live in refs, not render-scoped `let`s (the original resets them
 *   on every re-render, which snaps rotation back mid-drag).
 * - Spring-damped drag with momentum instead of an absolute delta.
 * - Honors prefers-reduced-motion: renders static, no auto-rotation.
 */

/** cobe accepts onRender at runtime but omits it from its published types. */
type GlobeState = { phi: number; width: number; height: number };
type RenderOpts = COBEOptions & { onRender?: (state: GlobeState) => void };

/** Config minus the size/render fields we compute at mount. */
type GlobeConfig = Omit<COBEOptions, "width" | "height">;

const MARKERS: Marker[] = [
  { location: [19.076, 72.8777], size: 0.1 },    // Mumbai
  { location: [21.1702, 72.8311], size: 0.08 },  // Surat
  { location: [28.6139, 77.209], size: 0.07 },   // Delhi
  { location: [25.2048, 55.2708], size: 0.1 },   // Dubai
  { location: [24.4539, 54.3773], size: 0.06 },  // Abu Dhabi
  { location: [51.5074, -0.1278], size: 0.07 },  // London
  { location: [40.7128, -74.006], size: 0.08 },  // New York
  { location: [1.3521, 103.8198], size: 0.06 },  // Singapore
  { location: [50.4501, 30.5234], size: 0.05 },  // Kyiv
  { location: [41.0082, 28.9784], size: 0.06 },  // Istanbul
  { location: [-23.5505, -46.6333], size: 0.07 },// Sao Paulo
  { location: [6.5244, 3.3792], size: 0.06 },    // Lagos
];

const GLOBE_CONFIG: GlobeConfig = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 1,
  diffuse: 1.1,
  mapSamples: 16000,
  mapBrightness: 5.2,
  baseColor: [0.11, 0.11, 0.12],
  markerColor: [255 / 255, 92 / 255, 0 / 255],
  glowColor: [0.14, 0.14, 0.15],
  markers: MARKERS,
};

export function Globe({
  className = "",
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: GlobeConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const rRef = useRef(0);          // current rotation offset
  const targetR = useRef(0);       // drag target, eased toward
  const pointerDownX = useRef<number | null>(null);
  const movement = useRef(0);
  const reduced = useRef(false);

  const updatePointerInteraction = (value: number | null) => {
    pointerDownX.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerDownX.current !== null) {
      const delta = clientX - pointerDownX.current;
      movement.current = delta;
      targetR.current = delta / 180;
    }
  };

  const onRender = useCallback((state: GlobeState) => {
    if (!reduced.current && pointerDownX.current === null) {
      phiRef.current += 0.0034;
    }
    // ease the drag offset so releasing carries momentum instead of snapping
    rRef.current += (targetR.current - rRef.current) * 0.08;
    state.phi = phiRef.current + rRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const opts: RenderOpts = {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    };
    const globe = createGlobe(canvasRef.current!, opts);

    const t = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [config, onRender]);

  return (
    <div className={`absolute inset-0 mx-auto aspect-[1/1] w-full ${className}`}>
      <canvas
        aria-hidden="true"
        className="size-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size] touch-none"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - movement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
