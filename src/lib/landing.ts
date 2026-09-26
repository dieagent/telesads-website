/**
 * Commercial landing pages.
 *
 * Each entry targets one distinct search intent with its own copy. Nothing
 * here is spun from a template: the sections, FAQs and angles differ per page
 * because the buyer's question differs per page. A forex channel owner and a
 * Web3 project ask different things before they buy.
 *
 * Compliance rules applied throughout (see knowledge base §14):
 *   - no guaranteed profits, returns, member counts or conversions
 *   - no invented clients, testimonials, screenshots or case data
 *   - no fake urgency or scarcity
 *   - regulated sectors described as lawful-and-compliant only
 */

export type Faq = { q: string; a: string };
export type Section = { h2: string; body: string; bullets?: string[] };

export type Landing = {
  slug: string;
  /** <title> — under 60 chars where possible */
  title: string;
  /** meta description — 140-160 chars */
  description: string;
  /** single H1 */
  h1: string;
  /** small label above the H1 */
  kicker: string;
  /** opening paragraph, carries the primary keyword naturally */
  intro: string;
  /** second paragraph, adds specificity and semantic terms */
  intro2: string;
  sections: Section[];
  faqs: Faq[];
  /** slugs of related landing pages for internal linking */
  related: string[];
  /** stat strip under the H1 */
  meta: [string, string][];
};

export const landings: Landing[] = [
  /* ─────────────────────────── TELEGRAM CORE ─────────────────────────── */
  {
    slug: "telegram-advertising",
    title: "Telegram Advertising Agency",
    description:
      "TELES ADS is a Telegram advertising agency running paid Telegram Ads, channel placements and campaign management for trading, crypto and online businesses.",
    h1: "Telegram advertising, run properly",
    kicker: "Telegram Advertising",
    intro:
      "TELES ADS is a Telegram advertising agency. We plan, buy and manage Telegram ad campaigns for channel owners, trading educators, crypto projects, SaaS products and creators who need relevant audiences rather than inflated numbers.",
    intro2:
      "Telegram is not a single ad channel. It is an official self-serve ads platform, a large secondary market of channel placements, and a community layer where the real conversion happens. A campaign that treats all three as one thing wastes budget. We separate them, brief them differently and report them separately.",
    sections: [
      {
        h2: "What Telegram advertising actually includes",
        body: "Most enquiries arrive asking for one thing and needing three. These are the distinct routes to an audience on Telegram, and they behave differently on cost, targeting and speed.",
        bullets: [
          "Telegram Ads — the official sponsored-message platform, priced on CPM and targeted by channel topic, language and geography.",
          "Direct channel placements — negotiated posts inside relevant channels, priced per post and highly dependent on the quality of the host audience.",
          "Creative and landing assets — the copy, banner and destination that decide whether a click becomes a join.",
          "Retention and automation — bots, welcome flows and follow-up that hold the audience once it arrives.",
        ],
      },
      {
        h2: "How we plan a Telegram ad campaign",
        body: "Planning starts with the destination, not the budget. A channel with a weak first-impression sequence will leak members no matter how good the traffic is, so we look at the landing experience before we commit spend.",
        bullets: [
          "Define the objective — members, leads, sales, traffic or awareness. These need different creative and different measurement.",
          "Map the audience — niche, language, target countries and the channels they already read.",
          "Set the creative direction — hook, proof, and a single clear action.",
          "Choose the mix — official Ads, direct placements, or both, with budget split by expected cost per join.",
          "Instrument it — tracked links, join attribution and a reporting cadence agreed before launch.",
        ],
      },
      {
        h2: "Reporting you can act on",
        body: "Every campaign reports on spend, reach, impressions, clicks, CTR, CPC, Telegram joins, cost per join, landing-page visits, geography and creative performance. Where a metric cannot be attributed cleanly, we say so rather than estimating it.",
      },
    ],
    faqs: [
      {
        q: "What is a Telegram advertising agency?",
        a: "An agency that plans, buys and manages paid placement on Telegram on your behalf — covering the official Telegram Ads platform, direct channel placements, creative production and campaign reporting. TELES ADS focuses specifically on Telegram rather than treating it as one service among many.",
      },
      {
        q: "How much does Telegram advertising cost?",
        a: "Cost depends on niche, target countries, objective, competition for the same audience and whether you need creative produced. Official Telegram Ads are priced on CPM; direct channel placements are priced per post and vary widely by channel quality. We quote after a short discovery rather than publishing a blind price.",
      },
      {
        q: "Can you advertise a trading or crypto channel on Telegram?",
        a: "Yes, where the offer is lawful and the messaging is compliant. We do not run campaigns that promise profits or guaranteed returns, and we adjust wording for regulated sectors. That constraint protects the ad account as much as the audience.",
      },
      {
        q: "How long does a Telegram campaign take to launch?",
        a: "A straightforward campaign with existing creative can launch within a few days of the brief being agreed. Campaigns that need creative production, landing pages or bot setup take longer. We confirm a timeline at proposal stage.",
      },
      {
        q: "Do you guarantee a number of subscribers?",
        a: "No. Anyone guaranteeing a member count is either buying fake accounts or guessing. We forecast ranges based on the budget, niche and historical cost per join for comparable campaigns, and we report against that forecast honestly.",
      },
    ],
    related: ["telegram-ads-cost", "telegram-channel-promotion", "trading-ads", "crypto-ads"],
    meta: [
      ["Routes to audience", "3"],
      ["Reported metrics", "14"],
      ["Focus", "Telegram-first"],
    ],
  },

  {
    slug: "telegram-channel-promotion",
    title: "Telegram Channel Promotion & Growth",
    description:
      "Promote and grow a Telegram channel with paid placements, targeted Telegram Ads and retention automation. Real subscribers, transparent cost per join.",
    h1: "Telegram channel promotion that holds",
    kicker: "Channel Promotion",
    intro:
      "Growing a Telegram channel is not the same as advertising a product. The unit of success is a subscriber who stays, reads and eventually acts — which means promotion and retention have to be designed together.",
    intro2:
      "We promote channels through targeted Telegram Ads and negotiated placements inside channels your audience already reads, then instrument the arrival experience so new members understand what the channel is for within the first few messages.",
    sections: [
      {
        h2: "Why most channel promotion leaks",
        body: "Traffic is the easy half. The expensive failure is paying for joins that churn within a week because the channel gave a new member no reason to stay.",
        bullets: [
          "No pinned orientation post, so new members cannot tell what the channel delivers or how often.",
          "Posting cadence that collapses after launch week.",
          "Promotion aimed at the wrong language or country for the content actually being posted.",
          "Placements bought on subscriber count rather than on view rate and engagement.",
        ],
      },
      {
        h2: "How we evaluate a placement channel",
        body: "Subscriber count is the least useful number on a channel's page. We look at view-per-post relative to size, posting frequency, comment behaviour, audience geography and whether previous promotional posts in that channel appear to have performed.",
      },
      {
        h2: "Retention after the join",
        body: "Once a member arrives, automation does the work that manual posting cannot: a welcome sequence that sets expectations, a pinned index of what the channel offers, and optional bot flows that segment members by what they actually want.",
      },
    ],
    faqs: [
      {
        q: "How do I promote my Telegram channel?",
        a: "The two reliable paid routes are the official Telegram Ads platform and direct placements inside relevant channels. Both work better when the channel itself is ready — a clear pinned post, consistent posting and an obvious reason to stay subscribed.",
      },
      {
        q: "Is buying Telegram members a good idea?",
        a: "No. Purchased members are typically inactive or bot accounts. They inflate the subscriber count, damage view rate, and make every future metric harder to read. We do not supply them.",
      },
      {
        q: "What is a realistic cost per join?",
        a: "It varies by niche, country and channel quality — a competitive finance audience in a tier-one country costs materially more than a general-interest audience elsewhere. We estimate a range at proposal stage based on the specific brief.",
      },
      {
        q: "How long before a channel sees growth?",
        a: "Paid placements deliver joins within hours of going live. Building a channel that retains those joins is a longer project, and depends more on your content cadence than on the ad spend.",
      },
      {
        q: "Can you help with the channel content itself?",
        a: "We produce ad creative, landing pages and onboarding sequences. We do not write your ongoing editorial content, though we will advise on posting structure where it affects retention.",
      },
    ],
    related: ["telegram-advertising", "telegram-bot-development", "trading-ads", "telegram-ads-cost"],
    meta: [
      ["Placement signals", "5"],
      ["Retention layer", "Bots + flows"],
      ["Bought members", "Never"],
    ],
  },

  {
    slug: "telegram-bot-development",
    title: "Telegram Bot Development & Automation",
    description:
      "Custom Telegram bot development and marketing automation — lead capture, onboarding flows, support bots and campaign automation built around your funnel.",
    h1: "Telegram bots that do real work",
    kicker: "Bots & Automation",
    intro:
      "A Telegram bot is the cheapest staff member you will ever hire, provided it is built around a real process. We build bots for lead capture, onboarding, support triage, content delivery and campaign automation.",
    intro2:
      "Most bots fail because they are built as a novelty rather than as a step in a funnel. We start from the journey — what the user wants, what you need from them, and where a human still has to be involved — then automate only the parts that genuinely should be automated.",
    sections: [
      {
        h2: "What we build",
        body: "Every build is specified against a process you already run manually. If there is no manual process, we define one first.",
        bullets: [
          "Lead-capture bots that qualify an enquiry before it reaches a human.",
          "Onboarding flows that welcome new channel members and segment them by interest.",
          "Support bots that answer repeated questions and escalate the rest.",
          "Content-delivery bots for gated resources, signals access or course material.",
          "Campaign automation that connects ad clicks to a tracked conversation.",
        ],
      },
      {
        h2: "TELES AGENT",
        body: "TELES AGENT is our own automation layer — an assistant that handles onboarding questions, campaign assistance, support and reporting. It is the same thinking we apply to client builds, applied to our own operation first.",
      },
      {
        h2: "Handover and ownership",
        body: "You own the bot. We deliver the code, the hosting arrangement and the documentation needed for someone else to maintain it. Nothing is locked to us.",
      },
    ],
    faqs: [
      {
        q: "What can a Telegram bot do for marketing?",
        a: "Capture and qualify leads, onboard new subscribers, deliver gated content, answer repeated questions, segment an audience by interest, and connect a paid ad click to a tracked conversation. The useful ones remove a repetitive manual task.",
      },
      {
        q: "How long does a Telegram bot take to build?",
        a: "A focused single-purpose bot is typically a short project. Multi-step flows with integrations, payments or a dashboard take longer. Scope drives the timeline and we confirm it before starting.",
      },
      {
        q: "Do I own the bot you build?",
        a: "Yes. You receive the code, hosting details and documentation. We do not hold your bot hostage to a retainer.",
      },
      {
        q: "Can a bot integrate with my CRM or website?",
        a: "Usually yes, via API or webhook, provided your system exposes one. We confirm feasibility during discovery rather than promising it upfront.",
      },
      {
        q: "Can you fix or take over an existing bot?",
        a: "Often, depending on how it was built and whether the source is available. We will review it and tell you honestly whether repair or rebuild is the better value.",
      },
    ],
    related: ["telegram-advertising", "telegram-channel-promotion", "crypto-ads"],
    meta: [
      ["Build types", "5"],
      ["Code ownership", "Yours"],
      ["Own product", "TELES AGENT"],
    ],
  },

  /* ─────────────────────────── TRADING VERTICALS ─────────────────────────── */
  {
    slug: "trading-ads",
    title: "Trading Ads Agency | Trading Advertising",
    description:
      "Trading advertising agency for signal channels, educators and trading communities. Compliant creative, targeted Telegram campaigns and honest reporting.",
    h1: "Trading advertising without the hype",
    kicker: "Trading Ads",
    intro:
      "TELES ADS is a trading advertising agency. We run campaigns for signal channels, trading educators, prop-firm affiliates and trading communities who need qualified audiences and cannot afford compliance problems.",
    intro2:
      "Trading is the hardest category to advertise well, because the messaging that converts fastest is usually the messaging that gets accounts banned. We build campaigns that perform inside the rules rather than gambling your ad account on a profit claim.",
    sections: [
      {
        h2: "The compliance problem in trading ads",
        body: "Every major ad platform restricts financial promotion, and Telegram placements carry reputational risk of their own. The claims that feel most persuasive are the ones that create the most exposure.",
        bullets: [
          "No guaranteed profits, returns or win rates — in creative, landing pages or channel copy.",
          "No fabricated screenshots of account balances or results.",
          "No fake urgency, countdowns or invented scarcity.",
          "Risk disclosure where the offer warrants it.",
        ],
      },
      {
        h2: "What converts instead",
        body: "Specificity outperforms hype in this category once you filter for audience quality. A clear description of methodology, cadence and who the channel is for attracts fewer clicks and materially better members.",
        bullets: [
          "Concrete description of what the channel posts and how often.",
          "The methodology or market focus, stated plainly.",
          "Who it is not for — a filter that improves retention.",
          "A single clear action, not five competing buttons.",
        ],
      },
      {
        h2: "Sub-verticals we work across",
        body: "Trading is not one audience. Forex, crypto, binary and platform-specific communities each have different cost profiles, different compliance sensitivity and different creative that works. We treat them separately.",
      },
    ],
    faqs: [
      {
        q: "Can you advertise trading signals on Telegram?",
        a: "Yes, where the offer is lawful and the creative avoids profit guarantees. We will not write copy promising returns, and we will push back if a brief requires it — that constraint is what keeps campaigns running.",
      },
      {
        q: "Which platforms can trading offers be advertised on?",
        a: "Telegram Ads and direct channel placements are the primary routes. Meta and Google both restrict financial promotion heavily and often require additional verification, which we assess case by case.",
      },
      {
        q: "Do you work with prop firms and affiliates?",
        a: "Yes, where the underlying offer is lawful and the affiliate relationship is disclosed properly.",
      },
      {
        q: "What results should a trading channel expect?",
        a: "We forecast a cost-per-join range from the brief and comparable campaigns, then report actuals against it. We do not promise subscriber counts or revenue, because neither is within an agency's control.",
      },
      {
        q: "Can you produce the ad creative?",
        a: "Yes — copy, banners, video concepts and landing pages. Creative is usually where trading campaigns are won or lost, so we prefer to produce it rather than inherit it.",
      },
    ],
    related: ["forex-ads", "crypto-ads", "binary-trading-ads", "quotex-ads", "pocket-option-ads"],
    meta: [
      ["Sub-verticals", "5"],
      ["Profit claims", "Never"],
      ["Creative", "In-house"],
    ],
  },

  {
    slug: "forex-ads",
    title: "Forex Ads Agency | Forex Advertising",
    description:
      "Forex advertising agency for signal channels, educators and brokers. Targeted Telegram campaigns, compliant creative and transparent cost-per-join reporting.",
    h1: "Forex advertising, built for real traders",
    kicker: "Forex Ads",
    intro:
      "We run forex advertising campaigns for signal providers, educators, analysts and broker affiliates — primarily on Telegram, where most active forex communities already live.",
    intro2:
      "Forex has the most crowded audience in trading and the most sophisticated one. The same person is subscribed to nine other channels, has seen every variation of the hype creative, and filters it instantly. Standing out means saying something concrete.",
    sections: [
      {
        h2: "Where forex audiences actually are",
        body: "Forex communities cluster tightly by language and session. Targeting is less about broad country selection and more about matching the trading session, the language and the instrument focus of the channel you are promoting.",
        bullets: [
          "Session alignment — London, New York and Asian session communities behave differently.",
          "Language segmentation, which often matters more than country.",
          "Instrument focus — majors, exotics, indices and gold attract different subscribers.",
          "Experience level — beginner education and advanced analysis need separate creative.",
        ],
      },
      {
        h2: "Creative that survives a sceptical audience",
        body: "Experienced forex audiences discount any claim they cannot verify. Creative that describes the analysis method, the posting rhythm and the market focus consistently outperforms creative built on outcome claims.",
      },
      {
        h2: "Broker and affiliate campaigns",
        body: "Broker promotion carries additional regulatory weight depending on jurisdiction. We check the target geography against the offer before committing spend, and we disclose affiliate relationships in the creative where required.",
      },
    ],
    faqs: [
      {
        q: "How do I advertise a forex channel?",
        a: "Targeted Telegram Ads plus direct placements in forex channels whose audience matches your session, language and instrument focus. The channel itself needs a clear pinned post explaining what subscribers receive and how often.",
      },
      {
        q: "Can forex be advertised on Meta or Google?",
        a: "Both restrict financial services heavily and typically require verification or licensing evidence depending on jurisdiction. It is possible for some offers and impossible for others — we assess it per brief rather than assuming.",
      },
      {
        q: "What does forex advertising cost?",
        a: "Forex is among the more competitive audiences, so cost per join usually sits above general-interest niches. The actual figure depends on target countries, language and channel quality. We estimate a range from the brief.",
      },
      {
        q: "Do you advertise forex signals?",
        a: "Yes, provided the creative makes no profit or win-rate guarantees. We describe what the service delivers rather than what the subscriber will earn.",
      },
      {
        q: "Can you target specific countries?",
        a: "Yes. Both Telegram Ads and direct placements allow geographic focus, though placement targeting is approximate and depends on the host channel's actual audience rather than its stated one.",
      },
    ],
    related: ["trading-ads", "binary-trading-ads", "crypto-ads", "telegram-advertising"],
    meta: [
      ["Targeting axes", "4"],
      ["Session-aware", "Yes"],
      ["Profit claims", "Never"],
    ],
  },

  {
    slug: "crypto-ads",
    title: "Crypto Advertising Agency | Web3 Ads",
    description:
      "Crypto and Web3 advertising agency. Telegram campaigns, community growth and creative for tokens, exchanges, DeFi products and NFT projects.",
    h1: "Crypto advertising and Web3 growth",
    kicker: "Crypto & Web3",
    intro:
      "We run crypto advertising for tokens, exchanges, DeFi products, NFT projects and Web3 tools — with Telegram as the primary channel, because Telegram is where crypto communities actually assemble.",
    intro2:
      "Crypto marketing has a credibility problem created by its own history. The projects that grow durably are the ones whose marketing explains the product clearly and resists the temptation to imply price outcomes.",
    sections: [
      {
        h2: "Community is the product",
        body: "For most crypto projects the Telegram group is not a marketing channel, it is the main interface between the project and its holders. Advertising that fills it with the wrong people creates a support burden that outlasts the campaign.",
        bullets: [
          "Targeting by ecosystem and chain rather than by generic crypto interest.",
          "Creative that states what the product does before what it might be worth.",
          "Moderation and anti-scam setup before the traffic arrives, not after.",
          "Onboarding automation that answers the first ten questions without a human.",
        ],
      },
      {
        h2: "Launch versus sustain",
        body: "A token launch and an established protocol need opposite campaigns. Launch campaigns are compressed, high-intensity and reputation-sensitive. Sustain campaigns are slower, cheaper per join, and focused on retention and utility adoption.",
      },
      {
        h2: "What we will not do",
        body: "We do not imply price appreciation, promise returns, manufacture fake community activity, or produce content designed to create artificial urgency around a token sale. These tactics work briefly and damage the project permanently.",
      },
    ],
    faqs: [
      {
        q: "How do you advertise a crypto project?",
        a: "Telegram Ads and placements in relevant crypto channels, supported by creative that explains the product and an onboarding flow that handles the influx. Targeting by chain and ecosystem outperforms broad crypto targeting.",
      },
      {
        q: "Can crypto be advertised on Google or Meta?",
        a: "Both allow certain crypto advertising subject to certification and jurisdiction, and both restrict token sales heavily. Eligibility depends on the specific product and market — we check rather than assume.",
      },
      {
        q: "Do you work with new token launches?",
        a: "Yes, where the project is lawful and the marketing does not depend on price claims. We will decline briefs that require implying investment returns.",
      },
      {
        q: "What about NFT and DeFi projects?",
        a: "Both are within scope. DeFi campaigns tend to focus on utility and TVL-adjacent messaging; NFT campaigns depend far more on creative and community than on media spend.",
      },
      {
        q: "Can you help moderate the community after launch?",
        a: "We build the automation — welcome flows, anti-spam setup, FAQ bots and escalation paths. Ongoing human moderation is usually better handled by your own team, who know the project.",
      },
    ],
    related: ["telegram-advertising", "trading-ads", "telegram-bot-development", "telegram-channel-promotion"],
    meta: [
      ["Project types", "5"],
      ["Price claims", "Never"],
      ["Launch + sustain", "Both"],
    ],
  },

  {
    slug: "binary-trading-ads",
    title: "Binary Trading Ads & Advertising Agency",
    description:
      "Binary trading advertising for signal channels and educators, where lawful. Compliant creative, targeted Telegram placement and transparent reporting.",
    h1: "Binary trading advertising, handled carefully",
    kicker: "Binary Trading",
    intro:
      "We run binary trading advertising for signal channels, educators and platform affiliates — in jurisdictions where the activity is lawful and with creative that does not promise outcomes.",
    intro2:
      "Binary options are restricted or banned for retail clients in several major jurisdictions. Any serious campaign in this category begins with geography, because the wrong target country turns a marketing question into a legal one.",
    sections: [
      {
        h2: "Geography comes first",
        body: "Before creative, before budget, we establish where the offer can lawfully be promoted. This narrows targeting significantly and it is not negotiable.",
        bullets: [
          "Confirm the jurisdictions where the offer is permitted for the intended audience.",
          "Exclude restricted markets at the targeting level rather than relying on disclaimers.",
          "Match language targeting to the permitted geography.",
          "Document the reasoning so the campaign can be defended if questioned.",
        ],
      },
      {
        h2: "Creative constraints",
        body: "Binary creative attracts scrutiny faster than any other trading sub-vertical. We avoid win-rate claims, profit screenshots and income framing entirely, and we include risk language where the offer warrants it.",
      },
      {
        h2: "Where the traffic comes from",
        body: "Telegram placements and Telegram Ads are the practical routes. Mainstream platforms are effectively closed to most binary offers, and we will tell you that at the outset rather than spending budget discovering it.",
      },
    ],
    faqs: [
      {
        q: "Is binary trading advertising allowed?",
        a: "It depends entirely on jurisdiction. Binary options are restricted for retail clients in several major markets. We only run campaigns targeted at geographies where the offer is lawful, and we exclude restricted markets at the targeting level.",
      },
      {
        q: "Can I advertise binary signals on Telegram?",
        a: "Where lawful for the target audience, yes — through channel placements and Telegram Ads, with creative that avoids win-rate and profit claims.",
      },
      {
        q: "Will Meta or Google run binary ads?",
        a: "Generally no. Both restrict binary options heavily and most offers are ineligible. We do not recommend spending discovery budget testing this.",
      },
      {
        q: "What claims can the creative make?",
        a: "It can describe what the channel provides — the market focus, the signal cadence, the education format. It cannot state or imply win rates, profits or income.",
      },
      {
        q: "Do you work with platform affiliates?",
        a: "Yes, where the platform operates lawfully in the target market and the affiliate relationship is disclosed.",
      },
    ],
    related: ["quotex-ads", "pocket-option-ads", "trading-ads", "forex-ads"],
    meta: [
      ["First question", "Jurisdiction"],
      ["Win-rate claims", "Never"],
      ["Primary channel", "Telegram"],
    ],
  },

  {
    slug: "quotex-ads",
    title: "Quotex Ads & Advertising Agency",
    description:
      "Quotex advertising for signal channels, educators and affiliates where lawful. Targeted Telegram campaigns with compliant creative and clear reporting.",
    h1: "Quotex advertising and channel promotion",
    kicker: "Quotex",
    intro:
      "We run advertising for Quotex-focused signal channels, educators and affiliates — promoting the channel or the education, within the jurisdictions where the underlying activity is lawful.",
    intro2:
      "Quotex audiences skew toward newer traders, which changes both the creative and the responsibility. Campaigns aimed at inexperienced audiences need clearer framing about what is being offered and what it is not.",
    sections: [
      {
        h2: "What we promote",
        body: "The subject of the campaign is your channel, your education or your community — not a promise about platform outcomes.",
        bullets: [
          "Signal and analysis channels, described by cadence and market focus.",
          "Educational content and structured courses.",
          "Affiliate offers, with the relationship disclosed.",
          "Community groups, where moderation is already in place.",
        ],
      },
      {
        h2: "Targeting a newer audience responsibly",
        body: "Beginner-heavy audiences respond to clarity rather than sophistication. We use plain description of what the subscriber receives, avoid implying easy income, and include risk framing where appropriate.",
      },
      {
        h2: "Jurisdiction and eligibility",
        body: "As with all binary-adjacent promotion, we establish permitted geographies before planning the campaign, and exclude restricted markets at the targeting level.",
      },
    ],
    faqs: [
      {
        q: "Can I advertise a Quotex channel?",
        a: "Where the activity is lawful for the target audience, yes. We promote the channel, the education or the community, using creative that avoids profit and win-rate claims.",
      },
      {
        q: "Where do Quotex ads run?",
        a: "Primarily Telegram — both the official Ads platform and direct placements in relevant channels. Mainstream ad platforms are largely closed to this category.",
      },
      {
        q: "What does a Quotex campaign cost?",
        a: "It depends on target geography, language and channel quality. Permitted markets for this category are narrower, which affects both reach and price. We estimate from the brief.",
      },
      {
        q: "Can you make the creative?",
        a: "Yes — copy, banners and landing pages, written to describe the offer accurately rather than to imply outcomes.",
      },
      {
        q: "Do you promise subscriber numbers?",
        a: "No. We forecast a cost-per-join range and report actual performance against it.",
      },
    ],
    related: ["pocket-option-ads", "binary-trading-ads", "trading-ads", "telegram-channel-promotion"],
    meta: [
      ["Audience", "Beginner-heavy"],
      ["Framing", "Plain, no income claims"],
      ["Geo screening", "First step"],
    ],
  },

  {
    slug: "pocket-option-ads",
    title: "Pocket Option Ads & Advertising Agency",
    description:
      "Pocket Option advertising for signal channels, educators and affiliates where lawful. Telegram campaign management, compliant creative and honest reporting.",
    h1: "Pocket Option advertising and promotion",
    kicker: "Pocket Option",
    intro:
      "We run campaigns for Pocket Option–focused channels, educators and affiliates, promoting the community and the content within jurisdictions where the underlying activity is permitted.",
    intro2:
      "This category lives almost entirely on Telegram. That concentrates both the opportunity and the risk: the audience is reachable, but placement quality varies enormously and a bad channel buy is money spent on accounts that will never engage.",
    sections: [
      {
        h2: "Placement quality is everything",
        body: "In platform-specific trading niches, a large proportion of channels advertising themselves as relevant audiences are recycled or inflated. Vetting matters more here than in almost any other category.",
        bullets: [
          "View-rate relative to subscriber count, checked over time rather than at one moment.",
          "Comment and reaction patterns that look human.",
          "Audience geography matched against the permitted markets for the offer.",
          "Evidence of how previous promotional posts performed.",
        ],
      },
      {
        h2: "Creative approach",
        body: "Describe the channel, the cadence and the market focus. No income framing, no result screenshots, no urgency mechanics. Campaigns built this way attract fewer clicks and better subscribers.",
      },
      {
        h2: "Reporting",
        body: "Spend, reach, clicks, CTR, cost per join and geography, reported per placement so you can see which channels actually delivered and which did not.",
      },
    ],
    faqs: [
      {
        q: "Can Pocket Option offers be advertised?",
        a: "Within jurisdictions where the activity is lawful for the intended audience, and with creative that makes no profit or win-rate claims. We screen geography before planning.",
      },
      {
        q: "Which channels do you buy placements in?",
        a: "Channels vetted on view rate, engagement authenticity and audience geography — not on subscriber count, which is the easiest metric to inflate.",
      },
      {
        q: "Can you run this on Meta or Google?",
        a: "Almost certainly not. This category is restricted on mainstream platforms and we would not recommend spending budget attempting it.",
      },
      {
        q: "How is performance reported?",
        a: "Per placement, so you can see cost per join channel by channel and stop funding the ones that underperform.",
      },
      {
        q: "Do you guarantee results?",
        a: "No. We forecast ranges and report actuals. Anyone guaranteeing outcomes in this category is not being straight with you.",
      },
    ],
    related: ["quotex-ads", "binary-trading-ads", "trading-ads", "telegram-advertising"],
    meta: [
      ["Vetting signals", "4"],
      ["Reporting", "Per placement"],
      ["Income framing", "Never"],
    ],
  },

  /* ─────────────────────────── INFORMATIONAL ─────────────────────────── */
  {
    slug: "telegram-ads-cost",
    title: "Telegram Advertising Cost & Pricing Explained",
    description:
      "What Telegram advertising actually costs in 2026 — CPM on Telegram Ads, channel placement pricing, and the factors that move cost per subscriber.",
    h1: "What Telegram advertising costs",
    kicker: "Pricing Guide",
    intro:
      "There is no single price for Telegram advertising, and any agency quoting one before hearing your brief is guessing. What follows is how the cost is actually built, so you can judge a quote rather than accept it.",
    intro2:
      "Two mechanisms price differently. The official Telegram Ads platform sells impressions on a CPM basis with a minimum commitment. Direct channel placements sell a post at a negotiated flat fee. Your effective cost per subscriber comes from combining both with your creative's conversion rate.",
    sections: [
      {
        h2: "The five factors that move your cost",
        body: "In rough order of impact on the final number:",
        bullets: [
          "Niche — finance, crypto and trading audiences cost more than general interest because more advertisers compete for them.",
          "Target country — tier-one markets carry materially higher CPMs than emerging markets.",
          "Objective — awareness is cheap, channel joins cost more, qualified leads cost most.",
          "Creative quality — the single biggest lever you control. Weak creative can double your effective cost per join on identical traffic.",
          "Destination readiness — a channel with a confusing first impression loses a share of every subscriber you pay for.",
        ],
      },
      {
        h2: "Official Telegram Ads versus channel placements",
        body: "Official Ads give you cleaner targeting, transparent delivery and platform-level reporting, with a minimum spend that puts it out of reach for very small budgets. Direct placements have a lower entry cost and can deliver excellent results from a well-matched channel, but quality varies enormously and vetting is essential.",
      },
      {
        h2: "How to compare agency quotes honestly",
        body: "Ask what is included beyond media: creative production, landing pages, tracking setup and reporting all cost something, and a quote that excludes them is not cheaper, only less complete. Ask how cost per join is measured and what happens if it comes in above forecast.",
      },
      {
        h2: "What we charge",
        body: "We quote per campaign after a short discovery covering niche, destination, target countries, objective, budget, creative needs, duration and compliance. We do not publish package prices, because a number set without knowing your niche and geography is not a price — it is a guess that one of us has to absorb.",
      },
    ],
    faqs: [
      {
        q: "How much does it cost to advertise on Telegram?",
        a: "Official Telegram Ads price on CPM with a platform minimum; channel placements price per post and range from very small fees to substantial ones depending on the host channel. Effective cost per subscriber depends on niche, geography and creative quality.",
      },
      {
        q: "What is a good cost per Telegram subscriber?",
        a: "It is only meaningful relative to niche and country. A competitive finance audience in a tier-one market costs multiples of a general-interest audience elsewhere. Judge a quote against comparable campaigns, not against a universal benchmark.",
      },
      {
        q: "Is there a minimum budget for Telegram Ads?",
        a: "The official platform sets a minimum commitment that changes over time, which is why smaller budgets often start with direct channel placements instead. We advise on the split based on what you have to spend.",
      },
      {
        q: "Why will you not publish prices?",
        a: "Because a fixed package price has to assume a niche, a country and a creative workload. Published prices are usually either padded to cover the worst case or quietly exclude the work that matters.",
      },
      {
        q: "What does creative production add?",
        a: "It varies with format — copy and static banners are quicker than video concepts or a custom landing page. We scope it explicitly in the proposal rather than folding it into a vague media number.",
      },
    ],
    related: ["telegram-advertising", "how-to-advertise-on-telegram", "telegram-channel-promotion", "trading-ads"],
    meta: [
      ["Pricing models", "2"],
      ["Cost factors", "5"],
      ["Published prices", "None"],
    ],
  },

  {
    slug: "how-to-advertise-on-telegram",
    title: "How to Advertise on Telegram: A Practical Guide",
    description:
      "A step-by-step guide to advertising on Telegram — the official Ads platform, channel placements, targeting, creative and how to measure cost per join.",
    h1: "How to advertise on Telegram",
    kicker: "Guide",
    intro:
      "This is the process we follow internally, written out. You can run it yourself. If you would rather not, that is what we are for — but nothing here is withheld.",
    intro2:
      "Telegram advertising rewards preparation more than budget. Most wasted spend traces back to a decision made before the campaign launched: the wrong destination, an unclear objective, or creative written for the advertiser rather than the reader.",
    sections: [
      {
        h2: "Step 1 — Fix the destination first",
        body: "Before buying any traffic, make the arrival experience obvious. A visitor should understand within one screen what the channel posts, how often, and who it is for.",
        bullets: [
          "A pinned post that explains the channel in plain language.",
          "Consistent recent posting — an empty channel converts badly regardless of traffic quality.",
          "A clear next action for someone who wants more.",
        ],
      },
      {
        h2: "Step 2 — Choose one objective",
        body: "Members, leads, sales, traffic or awareness. Campaigns chasing two objectives at once under-deliver on both, because the creative and the measurement pull in different directions.",
      },
      {
        h2: "Step 3 — Pick the mechanism",
        body: "Official Telegram Ads for clean targeting and reporting at a higher minimum spend; direct channel placements for lower entry cost and access to specific communities, at the price of manual vetting. Many campaigns use both.",
      },
      {
        h2: "Step 4 — Vet placements properly",
        body: "If you are buying direct posts, subscriber count is the weakest signal available. Check view rate relative to size over several posts, look at whether engagement resembles human behaviour, and confirm the audience geography matches your target.",
      },
      {
        h2: "Step 5 — Write creative that filters",
        body: "The goal is not maximum clicks. It is maximum relevant joins. Copy that states plainly who the channel is for — and implicitly who it is not for — produces fewer clicks and better subscribers.",
      },
      {
        h2: "Step 6 — Measure cost per join, not clicks",
        body: "Use tracked links, record joins against each placement, and calculate cost per join per source. Without per-source attribution you cannot tell which placement worked, and you will keep funding the ones that did not.",
      },
    ],
    faqs: [
      {
        q: "How do I start advertising on Telegram?",
        a: "Prepare the destination channel, choose one objective, then pick between the official Telegram Ads platform and direct channel placements based on your budget. Track joins per source from day one.",
      },
      {
        q: "Do I need an agency to advertise on Telegram?",
        a: "No. The process above is runnable in-house. An agency is worth it when you lack time to vet placements, need creative produced, or want per-source attribution set up properly.",
      },
      {
        q: "What is the biggest mistake in Telegram advertising?",
        a: "Buying traffic before the destination is ready. The second biggest is judging placements by subscriber count instead of view rate.",
      },
      {
        q: "How do I know if a channel's audience is real?",
        a: "Compare views per post against subscriber count over several posts, check whether comments and reactions look organic, and be sceptical of channels whose engagement is flat regardless of content.",
      },
      {
        q: "How long should a first campaign run?",
        a: "Long enough to gather meaningful data per placement — typically a short test across several channels before concentrating budget on whichever delivered the best cost per join.",
      },
    ],
    related: ["telegram-ads-cost", "telegram-advertising", "telegram-channel-promotion", "telegram-bot-development"],
    meta: [
      ["Steps", "6"],
      ["Key metric", "Cost per join"],
      ["Withheld", "Nothing"],
    ],
  },
];

export const landingBySlug = new Map(landings.map((l) => [l.slug, l]));
export const landingSlugs = landings.map((l) => l.slug);
