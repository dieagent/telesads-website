"use client";

import { useRef, useEffect } from "react";
import createGlobe, { COBEOptions, Marker } from "cobe";
import { useMotionValue, useSpring } from "motion/react";

type GlobeState = { phi: number; width: number; height: number };
type RenderOpts = COBEOptions & { onRender?: (s: GlobeState) => void };
type Cfg = Omit<COBEOptions, "width" | "height">;

const MARKERS: Marker[] = [
  { location: [19.076, 72.8777], size: 0.1 },
  { location: [21.1702, 72.8311], size: 0.08 },
  { location: [28.6139, 77.209], size: 0.07 },
  { location: [25.2048, 55.2708], size: 0.1 },
  { location: [51.5074, -0.1278], size: 0.07 },
  { location: [40.7128, -74.006], size: 0.08 },
  { location: [1.3521, 103.8198], size: 0.06 },
  { location: [41.0082, 28.9784], size: 0.06 },
  { location: [-23.5505, -46.6333], size: 0.07 },
  { location: [6.5244, 3.3792], size: 0.06 },
];

const ORANGE: [number, number, number] = [1, 92 / 255, 0];

/* A — what is live now */
const A: Cfg = {
  devicePixelRatio: 2, phi: 0, theta: 0.28, dark: 1, diffuse: 1.1,
  mapSamples: 16000, mapBrightness: 5.2,
  baseColor: [0.11, 0.11, 0.12], markerColor: ORANGE,
  glowColor: [0.14, 0.14, 0.15], markers: MARKERS,
};

/* B — Magic UI's exact config, untouched */
const B: Cfg = {
  devicePixelRatio: 2, phi: 0, theta: 0.3, dark: 0, diffuse: 0.4,
  mapSamples: 16000, mapBrightness: 1.2,
  baseColor: [1, 1, 1], markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1], markers: MARKERS,
};

/* C — bright landmass, dark sphere: crisp dotted continents, black body */
const C: Cfg = {
  devicePixelRatio: 2, phi: 0, theta: 0.28, dark: 1, diffuse: 0.55,
  mapSamples: 22000, mapBrightness: 12,
  baseColor: [0.05, 0.05, 0.055], markerColor: ORANGE,
  glowColor: [0.5, 0.5, 0.52], markers: MARKERS,
};

/* D — light grey sphere on dark page (Magic UI look, our palette) */
const D: Cfg = {
  devicePixelRatio: 2, phi: 0, theta: 0.28, dark: 0, diffuse: 0.4,
  mapSamples: 16000, mapBrightness: 1.2,
  baseColor: [0.92, 0.92, 0.9], markerColor: ORANGE,
  glowColor: [0.28, 0.28, 0.3], markers: MARKERS,
};

/* E — high-contrast tech: dark body, hot orange rim */
const E: Cfg = {
  devicePixelRatio: 2, phi: 0, theta: 0.25, dark: 1, diffuse: 0.3,
  mapSamples: 24000, mapBrightness: 9,
  baseColor: [0.08, 0.08, 0.09], markerColor: ORANGE,
  glowColor: [0.85, 0.42, 0.12], markers: MARKERS,
};

/* F — near-white globe, maximum crispness */
const F: Cfg = {
  devicePixelRatio: 2, phi: 0, theta: 0.28, dark: 0, diffuse: 1.2,
  mapSamples: 24000, mapBrightness: 2.4,
  baseColor: [1, 1, 1], markerColor: ORANGE,
  glowColor: [0.18, 0.18, 0.2], markers: MARKERS,
};

function One({ cfg, name, note }: { cfg: Cfg; name: string; note: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const wRef = useRef(0);
  const down = useRef<number | null>(null);
  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  useEffect(() => {
    const onResize = () => {
      if (ref.current) wRef.current = ref.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();
    const opts: RenderOpts = {
      ...cfg,
      width: wRef.current * 2,
      height: wRef.current * 2,
      onRender: (s) => {
        if (!down.current) phiRef.current += 0.005;
        s.phi = phiRef.current + rs.get();
        s.width = wRef.current * 2;
        s.height = wRef.current * 2;
      },
    };
    const g = createGlobe(ref.current!, opts);
    const t = setTimeout(() => {
      if (ref.current) ref.current.style.opacity = "1";
    });
    return () => {
      clearTimeout(t);
      g.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [cfg, rs]);

  return (
    <div className="rounded-xl border border-line bg-[#0c0c0d] p-6">
      <div className="mb-1 flex items-baseline gap-3">
        <span className="text-[15px] font-semibold text-accent">{name}</span>
      </div>
      <p className="label mb-5 text-dim">{note}</p>
      <div className="relative aspect-square w-full">
        <canvas
          ref={ref}
          className="size-full cursor-grab opacity-0 transition-opacity duration-500 touch-none"
          onPointerDown={(e) => (down.current = e.clientX)}
          onPointerUp={() => (down.current = null)}
          onPointerOut={() => (down.current = null)}
          onMouseMove={(e) => {
            if (down.current !== null) {
              r.set(r.get() + (e.clientX - down.current) / 1400);
            }
          }}
        />
      </div>
    </div>
  );
}

export default function GlobeLab() {
  return (
    <main className="min-h-screen px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="label">Internal — globe comparison</p>
        <h1 className="display mt-4 text-[clamp(2rem,5vw,3.4rem)]">
          Which globe is right?
        </h1>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.65] text-muted">
          Same spring drag and same markers on every one. Only the rendering config
          differs. Tell me the letter you want and I will put it in the hero.
        </p>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <One cfg={A} name="A — Current (live now)" note="dark 1 · base 0.11 · bright 5.2" />
          <One cfg={B} name="B — Magic UI exact" note="dark 0 · base white · bright 1.2" />
          <One cfg={C} name="C — Crisp dots, black body" note="dark 1 · base 0.05 · bright 12" />
          <One cfg={D} name="D — Light sphere, our accent" note="dark 0 · base 0.92 · bright 1.2" />
          <One cfg={E} name="E — Orange rim glow" note="dark 1 · bright 9 · hot glow" />
          <One cfg={F} name="F — Near-white, max crisp" note="dark 0 · base white · bright 2.4" />
        </div>
      </div>
    </main>
  );
}
