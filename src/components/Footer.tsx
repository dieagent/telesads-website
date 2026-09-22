import Logo from "./Logo";
import { brand, links } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-16"
      style={{ paddingBottom: "calc(4rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span className="text-[15px] font-semibold tracking-[0.14em]" translate="no">
                TELES&nbsp;ADS
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
              {brand.shortBio}
            </p>
            <p className="mt-4 text-[13px] text-muted/70">{brand.regions}</p>
          </div>

          <nav aria-label="Sections">
            <h2 className="text-[12px] uppercase tracking-[0.2em] text-muted/70">Explore</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {[
                ["#services", "Services"],
                ["#who-we-serve", "Who We Serve"],
                ["#teles-agent", "TELES Agent"],
                ["#process", "Process"],
                ["#work", "Work"],
                ["#brief", "Start a Campaign"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted transition-colors duration-150 hover:text-fg"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contact">
            <h2 className="text-[12px] uppercase tracking-[0.2em] text-muted/70">Connect</h2>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {[
                [links.channel, "Telegram Channel"],
                [links.contact, "Contact on Telegram"],
                [links.agentBot, "TELES Agent Bot"],
                [links.feedback, "Feedback"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors duration-150 hover:text-fg"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${links.email}`}
                  className="break-words text-muted transition-colors duration-150 hover:text-fg"
                >
                  {links.email}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-line pt-6">
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-muted/70">
            Advertising results depend on niche, offer, creative, audience, budget and platform
            conditions. TELES ADS does not guarantee financial returns, member counts or
            conversions, and does not provide investment advice. Campaigns in regulated categories
            run only where lawful and compliant with platform rules and local advertising policy.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-muted/70">
            <p className="tnum">© {year} TELES ADS. All rights reserved.</p>
            <p translate="no">{brand.rhythm}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
