import type { GlobeMarker, GlobeArc } from "@/components/ui/cobe-globe";

/* Module-level so the references stay stable across renders and the
   globe's WebGL context is never torn down and rebuilt. */
export const REACH_MARKERS: GlobeMarker[] = [
  { id: "mumbai", location: [19.076, 72.8777], label: "Mumbai" },
  { id: "surat", location: [21.1702, 72.8311], label: "Surat" },
  { id: "delhi", location: [28.6139, 77.209], label: "Delhi" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "abudhabi", location: [24.4539, 54.3773], label: "Abu Dhabi" },
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "newyork", location: [40.7128, -74.006], label: "New York" },
  { id: "singapore", location: [1.3521, 103.8198], label: "Singapore" },
  { id: "istanbul", location: [41.0082, 28.9784], label: "Istanbul" },
  { id: "kyiv", location: [50.4501, 30.5234], label: "Kyiv" },
  { id: "saopaulo", location: [-23.5505, -46.6333], label: "S\u00e3o Paulo" },
  { id: "lagos", location: [6.5244, 3.3792], label: "Lagos" },
];

export const REACH_ARCS: GlobeArc[] = [
  {
    id: "mumbai-dubai",
    from: [19.076, 72.8777],
    to: [25.2048, 55.2708],
    label: "India \u2192 UAE",
  },
  { id: "dubai-london", from: [25.2048, 55.2708], to: [51.5074, -0.1278] },
  { id: "dubai-singapore", from: [25.2048, 55.2708], to: [1.3521, 103.8198] },
  { id: "london-newyork", from: [51.5074, -0.1278], to: [40.7128, -74.006] },
  { id: "mumbai-istanbul", from: [19.076, 72.8777], to: [41.0082, 28.9784] },
];



/* ── Hero dot-globe: TELES footprint ── */
export const HERO_CITIES = [
  { lat: 19.076, lon: 72.8777, size: 1.25, hot: true },  // Mumbai
  { lat: 21.1702, lon: 72.8311, size: 1.0 },             // Surat
  { lat: 28.6139, lon: 77.209, size: 1.05 },             // Delhi
  { lat: 12.9716, lon: 77.5946, size: 0.85 },            // Bengaluru
  { lat: 25.2048, lon: 55.2708, size: 1.25, hot: true }, // Dubai
  { lat: 24.4539, lon: 54.3773, size: 0.85 },            // Abu Dhabi
  { lat: 24.7136, lon: 46.6753, size: 0.8 },             // Riyadh
  { lat: 51.5074, lon: -0.1278, size: 1.0 },             // London
  { lat: 52.52, lon: 13.405, size: 0.8 },                // Berlin
  { lat: 41.0082, lon: 28.9784, size: 0.9 },             // Istanbul
  { lat: 50.4501, lon: 30.5234, size: 0.8 },             // Kyiv
  { lat: 1.3521, lon: 103.8198, size: 0.9 },             // Singapore
  { lat: 22.3193, lon: 114.1694, size: 0.8 },            // Hong Kong
  { lat: 35.6762, lon: 139.6503, size: 0.8 },            // Tokyo
  { lat: 40.7128, lon: -74.006, size: 1.05 },            // New York
  { lat: 25.7617, lon: -80.1918, size: 0.8 },            // Miami
  { lat: -23.5505, lon: -46.6333, size: 0.9 },           // Sao Paulo
  { lat: 6.5244, lon: 3.3792, size: 0.85 },              // Lagos
];

export const HERO_ROUTES: { from: [number, number]; to: [number, number] }[] = [
  { from: [19.076, 72.8777], to: [25.2048, 55.2708] },   // Mumbai -> Dubai
  { from: [25.2048, 55.2708], to: [51.5074, -0.1278] },  // Dubai -> London
  { from: [25.2048, 55.2708], to: [1.3521, 103.8198] },  // Dubai -> Singapore
  { from: [51.5074, -0.1278], to: [40.7128, -74.006] },  // London -> New York
  { from: [19.076, 72.8777], to: [41.0082, 28.9784] },   // Mumbai -> Istanbul
];
