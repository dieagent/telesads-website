"use client";

import { useEffect, useRef } from "react";
import createGlobe, { COBEOptions, Marker } from "cobe";
import { useMotionValue, useSpring } from "motion/react";

/**
 * COBE globe (hero), adapted for the TELES ADS dark theme.
 *
 * Rotation is driven by a spring (per Magic UI's implementation) rather than
 * exponential easing — a spring settles with a slight overshoot, which is what
 * makes the drag feel physical instead of soft and laggy.
 *
 * Kept on cobe v2 deliberately: the Reach section needs `arcs` and
 * `markerElevation`, which v0.6.4 does not support.
 */

/** cobe accepts onRender at runtime but omits it from its published types. */
type GlobeState = { phi: number; width: number; height: number };
type RenderOpts = COBEOptions & { onRender?: (state: GlobeState) => void };

/** Config minus the size fields we compute at mount. */
type GlobeConfig = Omit<COBEOptions, "width" | "height">;

const MOVEMENT_DAMPING = 1400;

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
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const reducedRef = useRef(false);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => {
      if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const opts: RenderOpts = {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current && !reducedRef.current) {
          phiRef.current += 0.005;
        }
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    };
    const globe = createGlobe(canvasRef.current!, opts);

    const t = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      clearTimeout(t);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div className={`absolute inset-0 mx-auto aspect-square w-full ${className}`}>
      <canvas
        aria-hidden="true"
        className="size-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size] touch-none"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteractionMovement.current = 0;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
