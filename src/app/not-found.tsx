import Link from "next/link";
import type { Metadata } from "next";
import { links } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "That page does not exist. Find your way back to TELES ADS.",
  robots: { index: false, follow: true },
};

const SUGGESTIONS: [string, string, string][] = [
  ["/services", "Services", "Telegram, Meta, Google, creative, bots, automation"],
  ["/agent", "TELES Agent", "The AI assistant and automation layer"],
  ["/work", "Work", "Bots we have shipped and how we report"],
  ["/contact", "Contact", "Start a campaign brief"],
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-28 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[150px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <p className="label">
          <span className="text-accent">404</span> &nbsp;/&nbsp; Not Found
        </p>

        <h1
          className="mt-8 font-medium leading-[0.9] tracking-[-0.04em] text-[clamp(2.6rem,7vw,6rem)]"
          style={{ textWrap: "balance" }}
        >
          This page went
          <br />
          <span className="serif text-accent">off the network.</span>
        </h1>

        <div className="mt-10 h-px w-full max-w-[620px] bg-line" aria-hidden="true" />

        <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.68] text-muted">
          The link may be out of date, or the page may have moved. Everything below is
          still where it should be.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {SUGGESTIONS.map(([href, title, note]) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start justify-between gap-6 bg-[#0c0c0d] p-6 transition-colors duration-200 hover:bg-[#101012]"
            >
              <span>
                <span className="block text-[15px] font-semibold">{title}</span>
                <span className="mt-1.5 block text-[13px] leading-[1.6] text-dim">
                  {note}
                </span>
              </span>
              <span
                className="text-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-bg transition-transform duration-150 active:scale-[0.97]"
          >
            Back to Home
          </Link>
          <a
            href={links.contact}
            target="_blank"
            rel="noopener noreferrer"
            className="label flex items-center gap-2 transition-colors duration-200 hover:text-ink"
          >
            Message Us on Telegram
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}
