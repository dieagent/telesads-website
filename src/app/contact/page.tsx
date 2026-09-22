import type { Metadata } from "next";
import Brief from "@/components/Brief";
import Faq from "@/components/Faq";
import { PageHead } from "@/components/Page";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a campaign brief to TELES ADS. Share your niche, destination link, target countries, objective and budget.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        index="06"
        kicker="Contact"
        title={<>Tell us what<br />you&rsquo;re <span className="serif text-accent">growing</span></>}
        lede="Pricing depends on niche, audience, duration, platforms, creative requirements and objective. Share the details and we'll review your requirements and recommend a suitable advertising approach."
        meta={[
          ["Response", "Via Telegram or email"],
          ["Stage one", "Discovery"],
          ["Stored data", "None"],
        ]}
      />
      <Brief />
      <Faq />
    </>
  );
}
