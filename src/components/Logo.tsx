export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <rect width="32" height="32" rx="8" fill="#ffffff" />
      <path d="M7 16.4 24.5 8l-6.1 16.5-3.3-6.2-2.6 4v-5.4L7 16.4Z" fill="#0A0A0A" />
      <path d="M12.5 16.9 24.5 8l-9.4 10.3-2.6-1.4Z" fill="#0A0A0A" opacity="0.55" />
    </svg>
  );
}
