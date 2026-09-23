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

