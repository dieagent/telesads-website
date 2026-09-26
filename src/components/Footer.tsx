import Link from "next/link";
import { brand, links } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 pt-24 lg:px-10"
      style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2" translate="no">
              <span className="text-[15px] font-medium tracking-[0.24em]">TELES</span>
              <span className="text-[15px] font-medium tracking-[0.24em] text-accent">ADS</span>
            </div>
            <p className="mt-6 max-w-[40ch] text-[14px] leading-[1.65] text-muted">
              {brand.shortBio}
            </p>
            <p className="label mt-6">{brand.regions}</p>
          </div>

          <nav aria-label="Advertising services">
            <h2 className="label">Advertising</h2>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {[
                ["/telegram-advertising", "Telegram Advertising"],
                ["/telegram-channel-promotion", "Channel Promotion"],
                ["/trading-ads", "Trading Ads"],
                ["/forex-ads", "Forex Ads"],
                ["/crypto-ads", "Crypto Ads"],
                ["/binary-trading-ads", "Binary Trading Ads"],
                ["/quotex-ads", "Quotex Ads"],
                ["/pocket-option-ads", "Pocket Option Ads"],
                ["/telegram-bot-development", "Bot Development"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="text-muted transition-colors duration-200 hover:text-ink">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sections">
            <h2 className="label">Index</h2>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {[
                ["/services", "Services"],
                ["/sectors", "Sectors"],
                ["/agent", "TELES Agent"],
                ["/work", "Work"],
                ["/blog", "Insights"],
                ["/telegram-ads-cost", "Pricing Guide"],
                ["/how-to-advertise-on-telegram", "How-To Guide"],
                ["/about", "About"],
                ["/contact", "Contact"],
              ].map(([h, l]) => (
                <li key={h}>
                  <Link href={h} className="text-muted transition-colors duration-200 hover:text-ink">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact">
            <h2 className="label">Connect</h2>
            <ul className="mt-5 space-y-2.5 text-[14px]">
              {[
                [links.channel, "Telegram Channel"],
                [links.contact, "Direct Contact"],
                [links.agentBot, "TELES Agent Bot"],
                [links.feedback, "Feedback"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors duration-200 hover:text-ink"
                  >
                    {l}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${links.email}`}
                  className="break-words text-muted transition-colors duration-200 hover:text-ink"
                >
                  {links.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* oversized wordmark */}
        <div className="mt-24 overflow-hidden" aria-hidden="true">
          <p
            className="display select-none whitespace-nowrap text-[clamp(4rem,19vw,17rem)] leading-[0.8]"
            style={{ color: "rgba(245,245,243,0.055)" }}
          >
            TELES ADS
          </p>
        </div>

        <div className="rule mt-10 pt-7">
          <p className="max-w-[80ch] text-[12px] leading-[1.65] text-dim">
            Advertising results depend on niche, offer, creative, audience, budget and platform
            conditions. TELES ADS does not guarantee financial returns, member counts or
            conversions, and does not provide investment advice. Campaigns in regulated categories
            run only where lawful and compliant with platform rules and local advertising policy.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="label tnum">© {year} TELES ADS</p>
            <p className="label" translate="no">
              Automate · Advertise · Achieve
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
