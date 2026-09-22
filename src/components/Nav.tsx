"use client";

import { useEffect, useState } from "react";
import { links } from "@/lib/content";

const items = [
  ["#services", "Services"],
  ["#sectors", "Sectors"],
  ["#agent", "Agent"],
  ["#method", "Method"],
  ["#work", "Work"],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: solid ? "rgba(8,8,8,0.8)" : "transparent",
        backdropFilter: solid ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${solid ? "var(--line)" : "transparent"}`,
        transition:
          "background-color 300ms var(--ease-out), border-color 300ms var(--ease-out), backdrop-filter 300ms var(--ease-out)",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 lg:px-10"
      >
        <a href="#top" className="flex items-baseline gap-2" translate="no">
          <span className="text-[15px] font-medium tracking-[0.24em]">TELES</span>
          <span className="text-[15px] font-medium tracking-[0.24em] text-accent">ADS</span>
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {items.map(([h, l]) => (
            <li key={h}>
              <a
                href={h}
                className="text-[13px] text-muted transition-colors duration-200 hover:text-ink"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={links.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[13px] text-muted transition-colors duration-200 hover:text-ink sm:block"
          >
            Telegram
          </a>
          <a
            href="#brief"
            className="group hidden items-center gap-2 rounded-full bg-paper px-5 py-2 text-[13px] font-medium text-bg transition-transform duration-150 active:scale-[0.97] sm:inline-flex"
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            Start a Campaign
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center lg:hidden"
          >
            <span className="relative block h-[9px] w-[18px]">
              <span
                className="absolute left-0 block h-px w-full bg-ink transition-transform duration-300"
                style={{
                  top: 0,
                  transformOrigin: "center",
                  transform: open ? "translateY(4px) rotate(45deg)" : "none",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              />
              <span
                className="absolute bottom-0 left-0 block h-px w-full bg-ink transition-transform duration-300"
                style={{
                  transformOrigin: "center",
                  transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                  transitionTimingFunction: "var(--ease-out)",
                }}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mnav"
          className="border-t border-line bg-bg/95 px-6 pb-8 pt-4 backdrop-blur-xl lg:hidden"
          style={{ overscrollBehavior: "contain" }}
        >
          <ul>
            {items.map(([h, l], i) => (
              <li key={h} className="rule">
                <a
                  href={h}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 text-[22px] tracking-[-0.02em]"
                >
                  <span className="label tnum">0{i + 1}</span>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#brief"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-paper py-3 text-center text-[14px] font-medium text-bg"
          >
            Start a Campaign
          </a>
        </div>
      )}
    </header>
  );
}
