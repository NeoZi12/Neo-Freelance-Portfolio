/**
 * ClockedCode — power-gauge mark.
 *
 * A redlined power gauge: a muted→clay arc with the needle pinned into the
 * redline (~full power). Recreated inline from /public/portal/clockedcode-gauge.svg
 * so the gradient id can be made unique and the mark scales crisply without an
 * extra network request.
 *
 * The brief's thesis: "stock Claude Code at 10% → full power." The needle sits
 * at the redline on purpose.
 */
type ClockedCodeMarkProps = {
  /** Square size in px. Default 32. */
  size?: number;
  className?: string;
  /** Unique gradient id (avoid collisions if rendered more than once). */
  gradientId?: string;
};

export default function ClockedCodeMark({
  size = 32,
  className,
  gradientId = "cc-gauge-track",
}: ClockedCodeMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="ClockedCode"
      className={className}
      style={{ display: "block", flex: "none" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0.08" y1="0" x2="0.92" y2="0">
          <stop offset="0" stopColor="#6f6a62" />
          <stop offset="0.55" stopColor="#c96442" />
          <stop offset="1" stopColor="#d77e5c" />
        </linearGradient>
      </defs>

      {/* gauge arc track: low -> high = muted -> clay redline */}
      <path
        d="M46 349 A210 210 0 0 1 466 349"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="34"
        strokeLinecap="round"
      />

      {/* pixel ticks: low 4 muted, high 3 clay */}
      <rect x="37" y="340" width="18" height="18" fill="#9b958c" />
      <rect x="65" y="235" width="18" height="18" fill="#9b958c" />
      <rect x="142" y="158" width="18" height="18" fill="#9b958c" />
      <rect x="247" y="130" width="18" height="18" fill="#9b958c" />
      <rect x="352" y="158" width="18" height="18" fill="#cf6e4a" />
      <rect x="429" y="235" width="18" height="18" fill="#c96442" />
      <rect x="457" y="340" width="18" height="18" fill="#d77e5c" />

      {/* needle pinned into the redline (~100%) */}
      <polygon points="262.75,365.7 249.25,332.3 423,281.5" fill="#f5f3ec" />
      <circle cx="256" cy="349" r="28" fill="#f5f3ec" />
      <circle cx="256" cy="349" r="12" fill="#c96442" />
    </svg>
  );
}
