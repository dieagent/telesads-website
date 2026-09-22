import { Reveal, MaskLines } from "./Reveal";
import { audiences } from "@/lib/content";

/* ============================================ STATEMENT (paper inversion) */

export function Statement() {
  return (
    <section className="noise relative bg-paper px-6 py-28 text-bg lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p
            className="label"
            style={{ color: "rgba(8,8,8,0.42)" }}
          >
            What we do
          </p>
        </Reveal>
        <MaskLines
          className="display mt-10 max-w-[19ch] text-[clamp(2.2rem,6.4vw,5.6rem)]"
          lines={[
            <>We don&rsquo;t buy</>,
            <>attention. We buy</>,
            <>
              the <span className="serif">right</span> attention.
            </>,
          ]}
        />
        <div className="mt-16 grid gap-10 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "rgba(8,8,8,0.12)" }}>
          {[
            ["Specialists, not generalists", "Telegram is the core discipline — not a line item bolted onto a social media retainer."],
            ["Research before spend", "Channel discovery, audience and competitor research decide placement. Nothing runs on a guess."],
            ["Compliance is the filter", "We work in regulated niches, which means we read the rules before we write the ad."],
            ["Honest measurement", "We report what is verifiable and name the attribution gaps out loud."],
          ].map(([h, b], i) => (
            <Reveal key={h} delay={i * 70}>
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{h}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.6]" style={{ color: "rgba(8,8,8,0.55)" }}>
                {b}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================= SECTORS (drift field) */

export function Sectors() {
  const half = Math.ceil(audiences.length / 2);
  const rows = [audiences.slice(0, half), audiences.slice(half)];

  return (
    <section id="sectors" className="scroll-mt-20 overflow-hidden py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="label">
              <span className="text-accent">02</span> &nbsp;/&nbsp; Sectors
            </p>
            <h2 className="display mt-7 text-[clamp(2.2rem,5.6vw,4.4rem)]">
              Niches most
              <br />
              agencies <span className="serif text-accent">decline</span>.
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[44ch] text-[15px] leading-[1.65] text-muted lg:pb-3">
              Trading, crypto, arbitrage and speculative communities are hard to advertise well and
              easy to advertise badly. We take them on — only where the offer is lawful and
              compliant with platform rules and local advertising policy.
            </p>
          </Reveal>
        </div>
      </div>

      {/* two drifting rows of sector cards */}
      <div className="mt-16 space-y-4 lg:mt-24">
        {rows.map((row, ri) => (
          <div key={ri} className="flex overflow-hidden" aria-hidden={ri === 1 ? "true" : undefined}>
            <div className={`${ri === 0 ? "drift" : "drift-rev"} flex shrink-0 gap-4 pr-4`}>
              {[...row, ...row].map((a, i) => (
                <article
                  key={`${a.title}-${i}`}
                  className="w-[330px] shrink-0 rounded-2xl border border-line bg-white/[0.015] p-6 transition-colors duration-300 hover:border-ink/20 hover:bg-white/[0.04]"
                >
                  <h3 className="text-[16px] font-medium tracking-[-0.01em]">{a.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-[1.6] text-muted">
                    {a.items.join(" · ")}
                  </p>
                  {"note" in a && a.note ? (
                    <p className="mt-4 flex gap-2 border-t border-line pt-3 text-[12px] leading-[1.55] text-dim">
                      <span className="text-accent" aria-hidden="true">
                        ⚑
                      </span>
                      {a.note}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-[1400px] px-6 lg:px-10">
        <p className="text-[13px] text-dim">
          Sector list is illustrative of past and current engagements — not a guarantee of
          acceptance. Every prospect passes qualification first.
        </p>
      </div>
    </section>
  );
}
