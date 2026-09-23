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

// With incremental deltas, total rotation = total pixels dragged / this value.
// 1400 (Magic UI's figure) assumes their accumulating delta, which inflates
// every event; at true 1:1 tracking it needs to be far lower to feel direct.
const MOVEMENT_DAMPING = 260;

const MARKERS: Marker[] = [
  // India / UAE — home markets, largest
  { location: [19.076, 72.8777], size: 0.11 },   // Mumbai
  { location: [21.1702, 72.8311], size: 0.09 },  // Surat
  { location: [28.6139, 77.209], size: 0.09 },   // Delhi
  { location: [12.9716, 77.5946], size: 0.07 },  // Bengaluru
  { location: [17.385, 78.4867], size: 0.06 },   // Hyderabad
  { location: [22.5726, 88.3639], size: 0.06 },  // Kolkata
  { location: [13.0827, 80.2707], size: 0.06 },  // Chennai
  { location: [25.2048, 55.2708], size: 0.11 },  // Dubai
  { location: [24.4539, 54.3773], size: 0.07 },  // Abu Dhabi
  { location: [25.2854, 51.531], size: 0.06 },   // Doha
  { location: [24.7136, 46.6753], size: 0.06 },  // Riyadh
  { location: [29.3759, 47.9774], size: 0.05 },  // Kuwait City
  // Europe
  { location: [51.5074, -0.1278], size: 0.08 },  // London
  { location: [52.52, 13.405], size: 0.06 },     // Berlin
  { location: [48.8566, 2.3522], size: 0.06 },   // Paris
  { location: [52.3676, 4.9041], size: 0.05 },   // Amsterdam
  { location: [41.0082, 28.9784], size: 0.07 },  // Istanbul
  { location: [50.4501, 30.5234], size: 0.06 },  // Kyiv
  { location: [55.7558, 37.6173], size: 0.06 },  // Moscow
  { location: [46.0569, 14.5058], size: 0.04 },  // Ljubljana
  { location: [47.4979, 19.0402], size: 0.05 },  // Budapest
  // Asia-Pacific
  { location: [1.3521, 103.8198], size: 0.07 },  // Singapore
  { location: [22.3193, 114.1694], size: 0.06 }, // Hong Kong
  { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
  { location: [37.5665, 126.978], size: 0.05 },  // Seoul
  { location: [13.7563, 100.5018], size: 0.06 }, // Bangkok
  { location: [3.139, 101.6869], size: 0.05 },   // Kuala Lumpur
  { location: [14.5995, 120.9842], size: 0.05 }, // Manila
  { location: [-6.2088, 106.8456], size: 0.06 }, // Jakarta
  { location: [-33.8688, 151.2093], size: 0.05 },// Sydney
  // Americas
  { location: [40.7128, -74.006], size: 0.09 },  // New York
  { location: [37.7749, -122.4194], size: 0.06 },// San Francisco
  { location: [25.7617, -80.1918], size: 0.06 }, // Miami
  { location: [43.6532, -79.3832], size: 0.05 }, // Toronto
  { location: [19.4326, -99.1332], size: 0.06 }, // Mexico City
  { location: [-23.5505, -46.6333], size: 0.07 },// Sao Paulo
  { location: [-34.6037, -58.3816], size: 0.05 },// Buenos Aires
  // Africa
  { location: [6.5244, 3.3792], size: 0.07 },    // Lagos
  { location: [30.0444, 31.2357], size: 0.06 },  // Cairo
  { location: [-26.2041, 28.0473], size: 0.05 }, // Johannesburg
  { location: [-1.2921, 36.8219], size: 0.05 },  // Nairobi
];

const GLOBE_CONFIG: GlobeConfig = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.28,
  dark: 1,
  diffuse: 1.1,
  mapSamples: 16000,
  mapBrightness: 5.6,
  baseColor: [0.11, 0.11, 0.12],
  markerColor: [255 / 255, 92 / 255, 0 / 255],
  glowColor: [0.14, 0.14, 0.15],
  markers: MARKERS,
  markerElevation: 0.008,
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
  const rs = useSpring(r, { mass: 1, damping: 34, stiffness: 240 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      // Incremental delta since the last move. Using the delta from the
      // original pointerdown re-applies the whole distance every event,
      // which makes a held drag accelerate away instead of tracking.
      const delta = clientX - pointerInteracting.current;
      pointerInteracting.current = clientX;
      pointerInteractionMovement.current += delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  // Track the pointer on the window so a drag continues when the cursor
  // leaves the canvas, and always releases even if pointerup happens outside.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) updateMovement(e.clientX);
    };
    const onUp = () => updatePointerInteraction(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      />
    </div>
  );
}
