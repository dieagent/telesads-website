"use client";

import { useMemo, useState } from "react";
import { links } from "@/lib/content";
import { Reveal } from "./Reveal";

const goals = ["Members", "Leads", "Sales", "Traffic", "Awareness"] as const;

const initial = {
  name: "",
  niche: "",
  destination: "",
  countries: "",
  goal: "Members",
  budget: "",
  duration: "",
  creatives: "need",
  notes: "",
};

export default function Brief() {
  const [form, setForm] = useState(initial);
  const [copied, setCopied] = useState(false);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const summary = useMemo(
    () =>
      [
        "TELES ADS — Campaign Brief",
        "",
        `Name: ${form.name || "—"}`,
        `Niche: ${form.niche || "—"}`,
        `Destination: ${form.destination || "—"}`,
        `Countries: ${form.countries || "—"}`,
        `Objective: ${form.goal}`,
        `Budget: ${form.budget || "—"}`,
        `Duration: ${form.duration || "—"}`,
        `Creatives: ${form.creatives === "have" ? "Client has creatives" : "Creatives required"}`,
        `Notes: ${form.notes || "—"}`,
      ].join("\n"),
    [form],
  );

  const tgHref = `${links.contact}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${links.email}?subject=${encodeURIComponent(
    "TELES ADS — Campaign Brief",
  )}&body=${encodeURIComponent(summary)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  const field =
    "w-full border-0 border-b border-line bg-transparent pb-2.5 pt-1 text-[15px] text-ink placeholder:text-dim/70 transition-colors duration-200 hover:border-ink/25 focus:border-accent focus:outline-none focus:ring-0";

  return (
    <section id="brief" className="noise relative scroll-mt-20 bg-paper px-6 py-28 text-bg lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <div>
            <Reveal>
              <p className="label" style={{ color: "rgba(8,8,8,0.42)" }}>
                <span style={{ color: "var(--accent)" }}>06</span> &nbsp;/&nbsp; Brief
              </p>
              <h2 className="display mt-7 text-[clamp(2.2rem,5.4vw,4.4rem)]">
                Tell us what
                <br />
                you&rsquo;re <span className="serif" style={{ color: "var(--accent)" }}>growing</span>.
              </h2>
              <p className="mt-7 max-w-[42ch] text-[15px] leading-[1.68]" style={{ color: "rgba(8,8,8,0.6)" }}>
                Pricing depends on niche, audience, duration, platforms, creative requirements and
                objective. Share the details and we&rsquo;ll review your requirements and recommend a
                suitable advertising approach.
              </p>
            </Reveal>

            <Reveal delay={90}>
              <dl className="mt-12 space-y-0 text-[14px]">
                {[
                  ["Telegram", "@TeIeAd", links.contact],
                  ["Channel", "@TelesAds", links.channel],
                  ["Email", links.email, `mailto:${links.email}`],
                ].map(([k, v, h]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-t py-3.5"
                    style={{ borderColor: "rgba(8,8,8,0.12)" }}
                  >
                    <dt className="label" style={{ color: "rgba(8,8,8,0.42)" }}>
                      {k}
                    </dt>
                    <dd className="min-w-0">
                      <a
                        href={h}
                        target={h.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="break-words font-mono text-[13.5px] transition-opacity duration-200 hover:opacity-60"
                      >
                        {v}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-9 sm:grid-cols-2">
              {[
                { id: "name", label: "Your Name", ph: "Alex Mercer…", ac: "name", span: false },
                { id: "niche", label: "Niche", ph: "Forex signals…", ac: "off", span: false },
                { id: "destination", label: "Telegram or Destination Link", ph: "https://t.me/yourchannel…", ac: "off", span: true, type: "url" },
                { id: "countries", label: "Target Countries", ph: "India, UAE, UK…", ac: "off", span: false },
              ].map((f) => (
                <div key={f.id} className={f.span ? "sm:col-span-2" : ""}>
                  <label
                    htmlFor={`b-${f.id}`}
                    className="label block"
                    style={{ color: "rgba(8,8,8,0.42)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={`b-${f.id}`}
                    name={f.id}
                    type={f.type ?? "text"}
                    inputMode={f.type === "url" ? "url" : undefined}
                    spellCheck={f.type === "url" ? false : undefined}
                    autoComplete={f.ac}
                    placeholder={f.ph}
                    className={field}
                    style={{ borderColor: "rgba(8,8,8,0.18)", color: "#080808" }}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => set(f.id as keyof typeof form)(e.target.value)}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="b-goal" className="label block" style={{ color: "rgba(8,8,8,0.42)" }}>
                  Objective
                </label>
                <select
                  id="b-goal"
                  name="goal"
                  className={field}
                  style={{ borderColor: "rgba(8,8,8,0.18)", backgroundColor: "transparent", color: "#080808" }}
                  value={form.goal}
                  onChange={(e) => set("goal")(e.target.value)}
                >
                  {goals.map((g) => (
                    <option key={g} value={g} style={{ backgroundColor: "#f5f5f3", color: "#080808" }}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="b-budget" className="label block" style={{ color: "rgba(8,8,8,0.42)" }}>
                  Budget
                </label>
                <input
                  id="b-budget"
                  name="budget"
                  autoComplete="off"
                  placeholder="$500–$1,000…"
                  className={field}
                  style={{ borderColor: "rgba(8,8,8,0.18)", color: "#080808" }}
                  value={form.budget}
                  onChange={(e) => set("budget")(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="b-duration" className="label block" style={{ color: "rgba(8,8,8,0.42)" }}>
                  Duration
                </label>
                <input
                  id="b-duration"
                  name="duration"
                  autoComplete="off"
                  placeholder="2 weeks…"
                  className={field}
                  style={{ borderColor: "rgba(8,8,8,0.18)", color: "#080808" }}
                  value={form.duration}
                  onChange={(e) => set("duration")(e.target.value)}
                />
              </div>

              <div>
                <span className="label block" style={{ color: "rgba(8,8,8,0.42)" }}>
                  Creatives
                </span>
                <div className="mt-2.5 flex gap-2">
                  {[
                    { v: "have", l: "I have them" },
                    { v: "need", l: "I need them" },
                  ].map((o) => (
                    <label
                      key={o.v}
                      className="cursor-pointer rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-200 has-[:checked]:bg-bg has-[:checked]:text-paper"
                      style={{ borderColor: "rgba(8,8,8,0.2)" }}
                    >
                      <input
                        type="radio"
                        name="creatives"
                        value={o.v}
                        checked={form.creatives === o.v}
                        onChange={(e) => set("creatives")(e.target.value)}
                        className="sr-only"
                      />
                      {o.l}
                    </label>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="b-notes" className="label block" style={{ color: "rgba(8,8,8,0.42)" }}>
                  Anything Else
                </label>
                <textarea
                  id="b-notes"
                  name="notes"
                  rows={2}
                  placeholder="Offer, landing page, compliance notes…"
                  className={`${field} resize-y`}
                  style={{ borderColor: "rgba(8,8,8,0.18)", color: "#080808" }}
                  value={form.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={tgHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-bg px-6 py-3 text-[14px] font-medium text-paper transition-transform duration-150 active:scale-[0.97]"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  >
                    Send on Telegram
                  </a>
                  <a
                    href={mailHref}
                    className="rounded-full border px-6 py-3 text-[14px] font-medium transition-colors duration-200"
                    style={{ borderColor: "rgba(8,8,8,0.22)" }}
                  >
                    Send by Email
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-full border px-6 py-3 text-[14px] font-medium transition-colors duration-200"
                    style={{ borderColor: "rgba(8,8,8,0.22)" }}
                  >
                    Copy
                  </button>
                </div>
                <p aria-live="polite" className="mt-4 text-[13px]" style={{ color: "rgba(8,8,8,0.55)" }}>
                  {copied
                    ? "Brief copied to clipboard."
                    : "Opens in Telegram or your email client — nothing is stored on this site."}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
