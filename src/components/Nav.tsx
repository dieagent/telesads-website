"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { links } from "@/lib/content";

const items = [
  { href: "#services", label: "Services" },
  { href: "#who-we-serve", label: "Who We Serve" },
  { href: "#teles-agent", label: "TELES Agent" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200"
      style={{
        transitionTimingFunction: "var(--ease-out)",
        backgroundColor: scrolled ? "rgba(10,10,10,0.72)" : "transparent",
        borderColor: scrolled ? "var(--line)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5"
      >
        <a href="#top" className="flex items-center gap-2.5" translate="no">
          <Logo size={26} />
          <span className="text-[15px] font-semibold tracking-[0.14em]">TELES&nbsp;ADS</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className="text-[13.5px] text-muted transition-colors duration-150 hover:text-fg"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#brief"
            className="hidden rounded-full bg-fg px-4 py-2 text-[13.5px] font-semibold text-bg transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] md:inline-block"
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            Start a Campaign
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
              <path
                d="M0 1h16M0 6h16M0 11h16"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-bg/95 px-5 pb-5 pt-3 backdrop-blur md:hidden"
          style={{ overscrollBehavior: "contain" }}
        >
          <ul className="flex flex-col">
            {items.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-[15px] text-muted transition-colors duration-150 hover:text-fg"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <a
              href="#brief"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-fg px-4 py-2.5 text-center text-sm font-semibold text-bg"
            >
              Start a Campaign
            </a>
            <a
              href={links.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-sm font-semibold"
            >
              Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
