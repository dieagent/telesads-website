"use client";

import Link from "next/link";
import { LogoMark } from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links } from "@/lib/content";

export const routes = [
  ["/services", "Services"],
  ["/sectors", "Sectors"],
  ["/agent", "TELES Agent"],
  ["/work", "Work"],
  ["/about", "About"],
] as const;

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: solid && !open ? "rgba(8,8,8,0.8)" : "transparent",
        backdropFilter: solid && !open ? "blur(16px) saturate(1.4)" : "none",
        borderBottom: `1px solid ${solid && !open ? "var(--line)" : "transparent"}`,
        transition:
          "background-color 300ms var(--ease-out), border-color 300ms var(--ease-out)",
      }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-6 lg:px-10"
      >
        <Link href="/" className="flex items-center gap-2.5" translate="no">
          <LogoMark size={28} className="shrink-0 text-ink" />
          <span className="text-[15px] font-semibold tracking-[0.12em]">TELES ADS</span>
          <span className="size-1 rounded-full bg-accent" aria-hidden="true" />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {routes.map(([h, l]) => {
            const active = path === h;
            return (
              <li key={h}>
                <Link
                  href={h}
                  aria-current={active ? "page" : undefined}
                  className="relative font-mono text-[11.5px] uppercase tracking-[0.14em] transition-colors duration-200"
                  style={{ color: active ? "var(--ink)" : "var(--muted)" }}
                >
                  {l}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
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
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-bg transition-transform duration-150 active:scale-[0.97] sm:inline-flex"
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            Start a Campaign
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mnav"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 grid size-9 place-items-center lg:hidden"
          >
            <span className="relative block h-[9px] w-[18px]">
              <span
                className="absolute left-0 top-0 block h-px w-full bg-ink transition-transform duration-300"
                style={{
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
          className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-6 lg:hidden"
          style={{ overscrollBehavior: "contain" }}
        >
          <ul>
            {[...routes, ["/contact", "Contact"] as const].map(([h, l], i) => (
              <li key={h} className="rule overflow-hidden">
                <Link
                  href={h}
                  className="flex items-baseline gap-5 py-4 text-[30px] font-medium tracking-[-0.035em]"
                  style={{
                    animation: `pageIn 480ms var(--ease-out) ${i * 55}ms both`,
                  }}
                >
                  <span className="label tnum">0{i + 1}</span>
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={links.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-10"
          >
            Telegram → @TeIeAd
          </a>
        </div>
      )}
    </header>
  );
}
