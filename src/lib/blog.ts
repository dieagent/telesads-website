/**
 * Blog / insights.
 *
 * Supporting informational content that links into the commercial landing
 * pages. Written to answer a real question rather than to host keywords —
 * thin posts hurt topical authority more than they help it.
 *
 * Same compliance rules as everywhere else: no performance guarantees, no
 * invented client data, no fabricated screenshots.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  tag: string;
  blocks: Block[];
  /** landing-page slugs this post supports */
  related: string[];
};

export const posts: Post[] = [
  {
    slug: "telegram-ads-vs-channel-placements",
    title: "Telegram Ads vs Channel Placements: Which to Use",
    description:
      "The official Telegram Ads platform and direct channel placements price differently, target differently and fail differently. How to choose between them.",
    h1: "Telegram Ads vs channel placements",
    date: "2026-09-20",
    readMinutes: 6,
    tag: "Strategy",
    related: ["telegram-advertising", "telegram-ads-cost", "how-to-advertise-on-telegram"],
    blocks: [
      {
        type: "p",
        text: "Almost every Telegram advertising brief eventually reduces to one decision: buy impressions through the official platform, or buy posts inside channels directly. They are not interchangeable, and the wrong choice is usually the more expensive one.",
      },
      { type: "h2", text: "How each one prices" },
      {
        type: "p",
        text: "Official Telegram Ads sell impressions on a CPM basis with a platform minimum commitment. You are buying reach against topic, language and geography filters, and delivery is handled by the platform. Direct placements are negotiated per post with the channel owner — a flat fee for a single appearance in front of that channel's audience.",
      },
      {
        type: "p",
        text: "The practical consequence is that official Ads have a higher floor but more predictable behaviour, while placements have a low floor and enormous variance. A well-matched channel can outperform the platform substantially. A badly chosen one produces nothing.",
      },
      { type: "h2", text: "Where each one fails" },
      {
        type: "ul",
        items: [
          "Official Ads fail when the targeting filters are too coarse for a narrow niche — you pay tier-one CPMs to reach an audience that is only partially relevant.",
          "Placements fail when the host channel's audience is inflated, recycled, or geographically mismatched with your offer.",
          "Both fail when the destination channel is not ready to convert the traffic they deliver.",
        ],
      },
      { type: "h2", text: "A practical rule" },
      {
        type: "p",
        text: "If your audience is definable by topic and language and your budget clears the platform minimum, start with official Ads for clean data. If your audience clusters inside a handful of identifiable communities, placements will usually reach them more cheaply — provided you vet properly.",
      },
      {
        type: "quote",
        text: "Most campaigns end up using both. The question is not which one wins, it is which one you use to learn and which one you use to scale.",
      },
      { type: "h2", text: "Measuring the comparison honestly" },
      {
        type: "p",
        text: "Compare on cost per join, per source, not on clicks or impressions. That requires tracked links and join attribution set up before launch — retrofitting it after the fact is guesswork. Without per-source data you cannot tell which mechanism worked, and the temptation is to credit whichever one you already preferred.",
      },
    ],
  },

  {
    slug: "how-to-vet-a-telegram-channel-before-buying-a-placement",
    title: "How to Vet a Telegram Channel Before Buying a Placement",
    description:
      "Subscriber count is the easiest metric to fake. Six signals that reveal whether a Telegram channel's audience is real before you pay for a post.",
    h1: "How to vet a Telegram channel before you buy",
    date: "2026-09-14",
    readMinutes: 7,
    tag: "Media Buying",
    related: ["telegram-channel-promotion", "how-to-advertise-on-telegram", "pocket-option-ads"],
    blocks: [
      {
        type: "p",
        text: "Subscriber count is the number every channel owner leads with and the one that tells you least. It is cheap to inflate, impossible to verify from outside, and uncorrelated with whether anyone reads the channel. Here is what to look at instead.",
      },
      { type: "h2", text: "1. View rate relative to size" },
      {
        type: "p",
        text: "Telegram shows a view count on each post. Compare it against the subscriber count across the last ten to twenty posts. A healthy channel typically shows a consistent proportion; a channel with a large subscriber count and a tiny, flat view count has bought its audience.",
      },
      { type: "h2", text: "2. Variance across posts" },
      {
        type: "p",
        text: "Real audiences respond unevenly — some posts land, others do not. View counts that are almost identical on every post, regardless of content, suggest automated inflation rather than readers.",
      },
      { type: "h2", text: "3. Engagement that looks human" },
      {
        type: "ul",
        items: [
          "Comments that respond to the specific content rather than generic praise.",
          "Reaction spread across multiple emoji rather than a single one applied uniformly.",
          "Timing that follows a plausible daily rhythm for the stated audience geography.",
        ],
      },
      { type: "h2", text: "4. Audience geography" },
      {
        type: "p",
        text: "Ask the owner directly and cross-check against the language of the comments and the posting schedule. A channel claiming a tier-one audience but posting at hours that suit a different timezone is worth a second look — particularly if your offer is geographically restricted.",
      },
      { type: "h2", text: "5. Promotional post history" },
      {
        type: "p",
        text: "Scroll back and find previous paid posts. If other advertisers have appeared repeatedly over months, the channel is probably delivering for them. If promotional posts appear once and never again from the same advertiser, that is a signal.",
      },
      { type: "h2", text: "6. Growth curve" },
      {
        type: "p",
        text: "Sudden vertical jumps in subscriber count without a corresponding jump in views indicate purchased members. Organic growth is lumpy but proportionate.",
      },
      {
        type: "quote",
        text: "None of these checks is conclusive alone. Together they are usually enough to separate a channel worth paying for from one that will take your money and deliver silence.",
      },
    ],
  },

  {
    slug: "advertising-trading-channels-without-breaking-compliance",
    title: "Advertising Trading Channels Without Breaking Compliance",
    description:
      "Why profit claims get trading ad accounts banned, what you can say instead, and how compliant creative often outperforms hype on subscriber quality.",
    h1: "Advertising trading channels without breaking compliance",
    date: "2026-09-06",
    readMinutes: 6,
    tag: "Compliance",
    related: ["trading-ads", "forex-ads", "binary-trading-ads"],
    blocks: [
      {
        type: "p",
        text: "The fastest-converting creative in trading is almost always the creative that creates the most exposure. Screenshots of account balances, win-rate percentages and income framing all lift click-through — and all invite the outcome nobody wants, which is a dead ad account and a channel with a reputation problem.",
      },
      { type: "h2", text: "What actually triggers problems" },
      {
        type: "ul",
        items: [
          "Stated or implied guaranteed profits, returns or win rates.",
          "Screenshots presented as typical results without context or verification.",
          "Income framing — positioning trading as a reliable replacement for employment.",
          "Manufactured urgency: countdown timers, invented seat limits, fake closing dates.",
          "Targeting jurisdictions where the underlying product is restricted for retail clients.",
        ],
      },
      { type: "h2", text: "What you can say instead" },
      {
        type: "p",
        text: "Describe the service rather than the outcome. What market does the channel cover? How often does it post? What format — analysis, signals, education, live commentary? Who is it built for, and who is it not for? This is duller to write and consistently better for subscriber quality.",
      },
      { type: "h2", text: "Why the boring version often wins" },
      {
        type: "p",
        text: "Hype creative attracts people shopping for a guarantee. When the guarantee does not materialise they leave, complain, or charge back. Specific creative attracts people who want the thing you actually provide. The click-through rate is lower and the cost per join is often higher — but the retention and the downstream conversion are usually better, which is the number that matters.",
      },
      {
        type: "quote",
        text: "Compliance is not a tax on performance in this category. It is a filter that removes the audience you were going to lose anyway.",
      },
      { type: "h2", text: "Geography first, always" },
      {
        type: "p",
        text: "For binary and platform-specific offers especially, establish where the product can lawfully be promoted before planning anything else. Excluding restricted markets at the targeting level is far safer than relying on a disclaimer nobody reads.",
      },
    ],
  },

  {
    slug: "why-your-telegram-channel-loses-members-after-a-campaign",
    title: "Why Your Telegram Channel Loses Members After a Campaign",
    description:
      "Paid campaigns deliver joins; weak onboarding loses them within days. The retention gaps that quietly waste most Telegram advertising budgets.",
    h1: "Why channels lose members after a campaign",
    date: "2026-08-28",
    readMinutes: 5,
    tag: "Retention",
    related: ["telegram-channel-promotion", "telegram-bot-development", "telegram-advertising"],
    blocks: [
      {
        type: "p",
        text: "A campaign delivers two thousand joins. Three weeks later the channel is up four hundred. The advertising worked; the channel did not. This is the most common and least discussed failure in Telegram growth, and it is almost entirely fixable before launch.",
      },
      { type: "h2", text: "The first sixty seconds" },
      {
        type: "p",
        text: "A new member arrives and sees the most recent posts, with no context. If those posts are mid-conversation, unexplained, or three weeks old, there is nothing to hold them. A pinned orientation post that states what the channel delivers, how often, and who it is for does more for retention than any amount of extra ad spend.",
      },
      { type: "h2", text: "Cadence collapse" },
      {
        type: "p",
        text: "Channels post intensively during launch week and then taper. The members acquired in week one experience a channel that appears to be dying. Plan the content calendar for the month after the campaign, not the week of it.",
      },
      { type: "h2", text: "Mismatched expectations" },
      {
        type: "ul",
        items: [
          "Creative promised daily analysis; the channel posts twice a week.",
          "Creative implied beginner education; the content assumes prior knowledge.",
          "Creative targeted one language; the channel posts in another.",
        ],
      },
      {
        type: "p",
        text: "Each of these is an advertising error rather than a content error. The fix is aligning the creative with what the channel genuinely does, which also reduces wasted clicks.",
      },
      { type: "h2", text: "Automation that carries the first week" },
      {
        type: "p",
        text: "A welcome sequence, a pinned index and an optional bot flow that asks a new member what they are interested in will hold a meaningful share of arrivals who would otherwise drift. None of it is expensive to build, and it runs on every future campaign.",
      },
      {
        type: "quote",
        text: "Retention work is the cheapest performance improvement available, because it applies to every subscriber you will ever pay for.",
      },
    ],
  },
];

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));
export const postSlugs = posts.map((p) => p.slug);
