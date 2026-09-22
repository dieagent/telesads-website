"use client";

import { useMemo, useState } from "react";
import { links } from "@/lib/content";

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

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const summary = useMemo(
    () =>
      [
        "TELES ADS — Campaign Brief",
        `Name: ${form.name || "—"}`,
        `Niche: ${form.niche || "—"}`,
        `Destination link: ${form.destination || "—"}`,
        `Target countries: ${form.countries || "—"}`,
        `Objective: ${form.goal}`,
        `Budget: ${form.budget || "—"}`,
        `Duration: ${form.duration || "—"}`,
        `Creatives: ${form.creatives === "have" ? "I have creatives" : "I need creatives"}`,
        `Notes: ${form.notes || "—"}`,
      ].join("\n"),
    [form],
  );

  const telegramHref = `${links.contact}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${links.email}?subject=${encodeURIComponent(
    "TELES ADS — Campaign Brief",
  )}&body=${encodeURIComponent(summary)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-[14.5px] text-fg placeholder:text-muted/50 transition-colors duration-150 hover:border-white/20 focus:border-white/30";

  return (
    <section id="brief" className="scroll-mt-24 border-b border-line py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.22em] text-muted/70">Start a Campaign</p>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
            Tell Us What You&rsquo;re Growing
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Pricing depends on your niche, target audience, campaign duration, platforms, creative
            requirements and growth objective. Share the details below and we&rsquo;ll review your
            requirements and recommend a suitable advertising approach.
          </p>
          <dl className="mt-8 space-y-3 text-[14px]">
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Telegram</dt>
              <dd className="min-w-0">
                <a
                  className="break-words underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-white"
                  href={links.contact}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @TeIeAd
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Channel</dt>
              <dd className="min-w-0">
                <a
                  className="break-words underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-white"
                  href={links.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @TelesAds
                </a>
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-24 shrink-0 text-muted">Email</dt>
              <dd className="min-w-0">
                <a
                  className="break-words underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-white"
                  href={`mailto:${links.email}`}
                >
                  {links.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          className="rounded-2xl border border-line bg-bg-elev p-6 sm:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="b-name" className="text-[13px] text-muted">
                Your Name
              </label>
              <input
                id="b-name"
                name="name"
                autoComplete="name"
                placeholder="Alex Mercer…"
                className={field}
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="b-niche" className="text-[13px] text-muted">
                Business or Channel Niche
              </label>
              <input
                id="b-niche"
                name="niche"
                autoComplete="off"
                placeholder="Forex signals…"
                className={field}
                value={form.niche}
                onChange={(e) => set("niche")(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="b-dest" className="text-[13px] text-muted">
                Telegram or Destination Link
              </label>
              <input
                id="b-dest"
                name="destination"
                type="url"
                inputMode="url"
                spellCheck={false}
                autoComplete="off"
                placeholder="https://t.me/yourchannel…"
                className={field}
                value={form.destination}
                onChange={(e) => set("destination")(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="b-countries" className="text-[13px] text-muted">
                Target Countries
              </label>
              <input
                id="b-countries"
                name="countries"
                autoComplete="off"
                placeholder="India, UAE, UK…"
                className={field}
                value={form.countries}
                onChange={(e) => set("countries")(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="b-goal" className="text-[13px] text-muted">
                Campaign Objective
              </label>
              <select
                id="b-goal"
                name="goal"
                className={field}
                style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
                value={form.goal}
                onChange={(e) => set("goal")(e.target.value)}
              >
                {goals.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="b-budget" className="text-[13px] text-muted">
                Advertising Budget
              </label>
              <input
                id="b-budget"
                name="budget"
                autoComplete="off"
                placeholder="$500–$1,000…"
                className={field}
                value={form.budget}
                onChange={(e) => set("budget")(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="b-duration" className="text-[13px] text-muted">
                Preferred Duration
              </label>
              <input
                id="b-duration"
                name="duration"
                autoComplete="off"
                placeholder="2 weeks…"
                className={field}
                value={form.duration}
                onChange={(e) => set("duration")(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <span className="text-[13px] text-muted">Creatives</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { v: "have", l: "I have creatives" },
                  { v: "need", l: "I need creatives" },
                ].map((o) => (
                  <label
                    key={o.v}
                    className="cursor-pointer rounded-full border border-line px-4 py-2 text-[13.5px] transition-colors duration-150 hover:border-white/25 has-[:checked]:border-white/40 has-[:checked]:bg-white/[0.06]"
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
              <label htmlFor="b-notes" className="text-[13px] text-muted">
                Anything Else
              </label>
              <textarea
                id="b-notes"
                name="notes"
                rows={3}
                placeholder="Offer, landing page, compliance notes…"
                className={`${field} resize-y`}
                value={form.notes}
                onChange={(e) => set("notes")(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-fg px-5 py-2.5 text-[14.5px] font-semibold text-bg transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              Send Brief on Telegram
            </a>
            <a
              href={mailHref}
              className="rounded-full border border-line px-5 py-2.5 text-[14.5px] font-semibold transition-colors duration-150 hover:border-white/25"
            >
              Send by Email
            </a>
            <button
              type="button"
              onClick={copy}
              className="rounded-full border border-line px-5 py-2.5 text-[14.5px] font-semibold transition-colors duration-150 hover:border-white/25"
            >
              Copy Brief
            </button>
            <p aria-live="polite" className="text-[13px] text-muted">
              {copied ? "Brief copied to clipboard." : ""}
            </p>
          </div>

          <p className="mt-5 text-[12.5px] leading-relaxed text-muted/70">
            Your brief opens in Telegram or your email client — nothing is stored on this site. We
            confirm current pricing and deliverables before any campaign begins.
          </p>
        </form>
      </div>
    </section>
  );
}
