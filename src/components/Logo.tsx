/**
 * TELES ADS advisory mark.
 *
 * Rebuilt as vector from the supplied 640x640 raster so it stays sharp at any
 * size, carries no baked-in black background, and inherits page colour via
 * `currentColor`.
 *
 * Proportions follow the source: a wide letter-spaced "TELESADS" over a heavy
 * condensed "ADVISORY", with a condensed "EXPLICIT CONTENT" rule beneath.
 */

export function LogoMark({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect width="64" height="64" rx="9" fill="currentColor" />
      <g fill="#0A0A0A">
        <text
          x="32"
          y="24.5"
          textAnchor="middle"
          fontFamily="Arial Narrow, Helvetica Neue, Arial, sans-serif"
          fontSize="9.4"
          fontWeight="700"
          letterSpacing="1.5"
        >
          TELESADS
        </text>
        <text
          x="32"
          y="41"
          textAnchor="middle"
          fontFamily="Arial Narrow, Helvetica Neue, Arial, sans-serif"
          fontSize="16.5"
          fontWeight="900"
          letterSpacing="0.2"
          textLength="50"
          lengthAdjust="spacingAndGlyphs"
        >
          ADVISORY
        </text>
        <text
          x="32"
          y="52.5"
          textAnchor="middle"
          fontFamily="Arial Narrow, Helvetica Neue, Arial, sans-serif"
          fontSize="7.6"
          fontWeight="700"
          letterSpacing="0.1"
          textLength="46"
          lengthAdjust="spacingAndGlyphs"
        >
          EXPLICIT CONTENT
        </text>
      </g>
    </svg>
  );
}

/**
 * Full lock-up for the footer and anywhere the mark can breathe.
 * Uses currentColor so it sits on any background.
 */
export function LogoLockup({
  width = 200,
  className = "",
  style,
}: {
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      viewBox="0 0 200 92"
      fill="none"
      role="img"
      aria-label="TELES ADS — Advisory, Explicit Content"
      className={className}
      style={style}
    >
      <g fill="currentColor">
        <text
          x="100"
          y="26"
          textAnchor="middle"
          fontFamily="Arial Narrow, Helvetica Neue, Arial, sans-serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="9"
        >
          TELESADS
        </text>
        <text
          x="100"
          y="58"
          textAnchor="middle"
          fontFamily="Arial Narrow, Helvetica Neue, Arial, sans-serif"
          fontSize="34"
          fontWeight="900"
          letterSpacing="0.5"
          textLength="168"
          lengthAdjust="spacingAndGlyphs"
        >
          ADVISORY
        </text>
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fontFamily="Arial Narrow, Helvetica Neue, Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="0.4"
          textLength="150"
          lengthAdjust="spacingAndGlyphs"
        >
          EXPLICIT CONTENT
        </text>
      </g>
    </svg>
  );
}

export default LogoMark;
