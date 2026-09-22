import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Shared oversized page masthead used by every inner route. */
export function PageHead({
  index,
  kicker,
  title,
  lede,
  meta,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: string;
  meta?: [string, string][];
}) {
  return (
    <header className="page-in relative overflow-hidden px-6 pb-16 pt-36 lg:px-10 lg:pb-24 lg:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,245,243,0.045) 1px, transparent 1px)",
          backgroundSize: "calc(100% / 6) 100%",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-8%] size-[560px] rounded-full opacity-[0.13] blur-[140px]"
        style={{ background: "var(--accent)" }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <p className="label flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span className="inline-block h-px w-8 bg-line" aria-hidden="true" />
          {kicker}
        </p>

        <h1 className="page-title mt-8 text-[clamp(3rem,11vw,10rem)]">{title}</h1>

        {(lede || meta) && (
          <div className="mt-12 grid gap-10 border-t border-line pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {lede && (
              <p className="max-w-[50ch] text-[16px] leading-[1.65] text-muted">{lede}</p>
            )}
            {meta && (
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 self-start sm:grid-cols-3">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="label">{k}</dt>
                    <dd className="mt-1.5 text-[14px] text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

/** End-of-page CTA band, varied by page. */
export function NextStep({
  label = "Next",
  title,
  href,
  cta,
}: {
  label?: string;
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <Link
            href={href}
            className="idx-row group block rounded-3xl border border-line p-8 transition-colors duration-300 hover:border-ink/25 lg:p-14"
          >
            <p className="label">{label}</p>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
              <h2 className="page-title max-w-[16ch] text-[clamp(1.9rem,5.2vw,4.2rem)]">
                {title}
              </h2>
              <span className="flex items-center gap-3 text-[14px] font-medium">
                {cta}
                <span className="idx-arrow text-accent" aria-hidden="true">
                  →
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
