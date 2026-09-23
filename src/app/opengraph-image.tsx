import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TELES ADS — Telegram Advertising & Digital Growth Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card. Rendered at build time so every Telegram, WhatsApp,
 * X and LinkedIn share of the domain shows real branding instead of a
 * blank rectangle.
 *
 * Drawn with plain divs — next/og supports a flexbox subset only, no
 * external fonts or images, which keeps it dependency-free.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          padding: "68px 72px",
          position: "relative",
        }}
      >
        {/* accent bloom */}
        <div
          style={{
            position: "absolute",
            top: 190,
            right: -150,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: "#ff5c00",
            opacity: 0.16,
            filter: "blur(150px)",
            display: "flex",
          }}
        />

        {/* top row: mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 11,
              background: "#f5f5f3",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#f5f5f3",
              letterSpacing: 4,
              display: "flex",
            }}
          >
            TELES ADS
          </div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              background: "#ff5c00",
              display: "flex",
            }}
          />
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 600,
              color: "#f5f5f3",
              letterSpacing: -3,
              lineHeight: 1.04,
              display: "flex",
            }}
          >
            Your gateway to
          </div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 600, letterSpacing: -3 }}>
            <span style={{ color: "#ff5c00" }}>Telegram</span>
            <span style={{ color: "#f5f5f3" }}>&nbsp;growth.</span>
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(245,245,243,0.14)",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#8a8a85",
              letterSpacing: 2,
              display: "flex",
            }}
          >
            TELEGRAM · META · GOOGLE · AUTOMATION
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#f5f5f3",
              letterSpacing: 2,
              display: "flex",
            }}
          >
            telesads.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
