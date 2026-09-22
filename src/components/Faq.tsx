"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { BlurFade } from "./ui/effects";

/**
 * Every answer is drawn from the TELES ADS knowledge base — pricing policy
 * (§8/§9), guarantees (§14), compliance (§14), payments (§13), reporting (§11).
 */
const faqs: { q: string; a: string }[] = [
  {
    q: "What does a campaign cost?",
    a: "Pricing depends on your niche, target audience, campaign duration, platforms, creative requirements and growth objective. We don't publish a rate card because a number quoted before we understand the offer is meaningless. Share your details and we'll prepare the most suitable option, with scope and deliverables written down before anything runs.",
  },
  {
    q: "Can you guarantee a specific number of members?",
    a: "No. Campaign performance depends on the niche, offer, creative quality, audience, budget and platform conditions. We provide strategy and optimization, but no responsible agency can guarantee a specific result in every campaign. Any agency that promises you a fixed member count is telling you what you want to hear.",
  },
  {
    q: "Do you work with trading, crypto or gambling channels?",
    a: "Yes — these are core sectors for us, including forex, crypto and Web3, binary, arbitrage and meme-coin communities. We take them on only where the offer is lawful and compliant with platform rules, jurisdictional restrictions and applicable advertising policy. We won't promise platform approval, and we decline campaigns that are deceptive or misleading.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Eight things: your business or channel niche, your Telegram username or destination link, target countries or audience segments, your objective (members, leads, sales, traffic or awareness), your budget, whether you have creatives or need them produced, your preferred campaign duration, and confirmation the offer complies with platform and local rules.",
  },
  {
    q: "How does the engagement actually run?",
    a: "Eight stages: discovery, qualification, strategy, proposal, payment and setup, launch, reporting, then optimization and closure. You always know which stage you're in. We launch only after your final confirmation, and we never claim a campaign is live until launch status is verified.",
  },
  {
    q: "What will you report back to me?",
    a: "Depending on the platform and campaign: ad spend, reach, impressions, clicks, CTR, CPC, leads, conversions, Telegram joins, cost per join, landing-page visits, campaign duration, audience geography and creative performance. We report only metrics that are genuinely available and verified, and we name attribution gaps rather than filling them with estimates.",
  },
  {
    q: "How do payments work?",
    a: "Through approved business payment methods only, confirmed with our team before anything is sent. We'll confirm the currency, total amount and deliverables, and clarify whether ad spend and service fees are separate. Never send funds to an unverified personal wallet — if anyone claiming to represent us asks you to, stop and contact us directly.",
  },
  {
    q: "Do you only do Telegram?",
    a: "Telegram is the specialization, but it's rarely the whole campaign. We also run Meta and Instagram advertising, Google Ads, creative production, growth consulting, Telegram bot development and marketing automation — chosen based on where your audience actually is and what the objective requires.",
  },
];

export default function Faq() {
  return (
    <section className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BlurFade>
              <p className="label">
                <span className="text-accent">07</span> &nbsp;/&nbsp; Questions
              </p>
              <h2 className="display mt-7 text-[clamp(2rem,4.6vw,3.6rem)]">
                Answers before
                <br />
                you <span className="serif text-accent">ask</span>.
              </h2>
              <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.65] text-muted">
                The questions every prospect asks, answered straight — including the ones where the
                honest answer is &ldquo;no&rdquo;.
              </p>
            </BlurFade>
          </div>

          <Accordion.Root type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <Accordion.Item
                key={f.q}
                value={`i${i}`}
                className="group border-t border-line last:border-b"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-accent">
                    <span className="flex gap-5">
                      <span className="label tnum shrink-0 pt-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[clamp(1rem,2vw,1.28rem)] font-medium leading-[1.35] tracking-[-0.02em]">
                        {f.q}
                      </span>
                    </span>
                    <Plus
                      className="mt-1 size-4 shrink-0 text-accent transition-transform duration-300 group-data-[state=open]:rotate-45"
                      style={{ transitionTimingFunction: "var(--ease-out)" }}
                      aria-hidden="true"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="acc-content overflow-hidden">
                  <p className="max-w-[62ch] pb-7 pl-[3.1rem] text-[14.5px] leading-[1.7] text-muted">
                    {f.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
