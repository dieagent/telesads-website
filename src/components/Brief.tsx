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
    <section id="brief" className="band noise scroll-mt-20 px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <div>
            <Reveal>
              <p className="label" >
                The brief
              </p>
              <h2 className="display mt-6 text-[clamp(1.8rem,4vw,3rem)]">
                Eight fields.
                <br />
                Two <span className="serif text-accent">minutes</span>.
              </h2>
              <p className="mt-6 max-w-[40ch] text-[15px] leading-[1.68]" style={{ color: "var(--muted)" }}>
                These are the same questions we ask in discovery. Fill them in and your brief opens
                pre-written in Telegram or your email client.
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
                    style={{ borderColor: "var(--line)" }}
                  >
                    <dt className="label" >
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
                    style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                    value={form[f.id as keyof typeof form]}
                    onChange={(e) => set(f.id as keyof typeof form)(e.target.value)}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="b-goal" className="label block" >
                  Objective
                </label>
                <select
                  id="b-goal"
                  name="goal"
                  className={field}
                  style={{ borderColor: "var(--line)", backgroundColor: "transparent", color: "var(--ink)" }}
                  value={form.goal}
                  onChange={(e) => set("goal")(e.target.value)}
                >
                  {goals.map((g) => (
                    <option key={g} value={g} style={{ backgroundColor: "#0c0c0d", color: "var(--ink)" }}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="b-budget" className="label block" >
                  Budget
                </label>
                <input
                  id="b-budget"
                  name="budget"
                  autoComplete="off"
                  placeholder="$500–$1,000…"
                  className={field}
                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                  value={form.budget}
                  onChange={(e) => set("budget")(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="b-duration" className="label block" >
                  Duration
                </label>
                <input
                  id="b-duration"
                  name="duration"
                  autoComplete="off"
                  placeholder="2 weeks…"
                  className={field}
                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
                  value={form.duration}
                  onChange={(e) => set("duration")(e.target.value)}
                />
              </div>

              <div>
                <span className="label block" >
                  Creatives
                </span>
                <div className="mt-2.5 flex gap-2">
                  {[
                    { v: "have", l: "I have them" },
                    { v: "need", l: "I need them" },
                  ].map((o) => (
                    <label
                      key={o.v}
                      className="cursor-pointer rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-200 has-[:checked]:border-accent has-[:checked]:bg-accent/15 has-[:checked]:text-ink"
                      style={{ borderColor: "var(--line)" }}
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
                <label htmlFor="b-notes" className="label block" >
                  Anything Else
                </label>
                <textarea
                  id="b-notes"
                  name="notes"
                  rows={2}
                  placeholder="Offer, landing page, compliance notes…"
                  className={`${field} resize-y`}
                  style={{ borderColor: "var(--line)", color: "var(--ink)" }}
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
                    className="rounded-full bg-paper px-6 py-3 text-[14px] font-medium text-bg transition-transform duration-150 active:scale-[0.97]"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  >
                    Send on Telegram
                  </a>
                  <a
                    href={mailHref}
                    className="rounded-full border px-6 py-3 text-[14px] font-medium transition-colors duration-200 hover:border-ink/30"
                    style={{ borderColor: "var(--line)" }}
                  >
                    Send by Email
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="rounded-full border px-6 py-3 text-[14px] font-medium transition-colors duration-200 hover:border-ink/30"
                    style={{ borderColor: "var(--line)" }}
                  >
                    Copy
                  </button>
                </div>
                <p aria-live="polite" className="mt-4 text-[13px]" style={{ color: "var(--muted)" }}>
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
