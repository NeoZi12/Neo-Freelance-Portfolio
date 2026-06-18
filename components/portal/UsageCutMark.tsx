/**
 * UsageCut — "Trimmed Stack" mark.
 *
 * Three stacked rounded bars read as token rows being cut down: one kept top
 * row (warm paper) over two shorter clay rows. Recreated from the real product
 * mark (usagecut/src/components/Logo.tsx), dark tone.
 *
 * viewBox is tight around the rows (x 8..56, y 16..48) → 48 wide × 32 tall.
 */
type UsageCutMarkProps = {
  /** Visual height in px; width scales to keep the 48:32 ratio. Default 32. */
  size?: number;
  /** Kept-row color (warm paper on dark). */
  kept?: string;
  /** Clay color for the two trimmed rows. */
  clay?: string;
  className?: string;
};

export default function UsageCutMark({
  size = 32,
  kept = "#f3ede0",
  clay = "#d9774f",
  className,
}: UsageCutMarkProps) {
  const width = Math.round((size * 48) / 32);
  return (
    <svg
      width={width}
      height={size}
      viewBox="8 16 48 32"
      role="img"
      aria-label="UsageCut"
      className={className}
      style={{ display: "block", flex: "none" }}
    >
      <rect x="8" y="16" width="48" height="8" rx="4" fill={kept} />
      <rect x="8" y="28" width="34" height="8" rx="4" fill={clay} />
      <rect x="8" y="40" width="20" height="8" rx="4" fill={clay} />
    </svg>
  );
}
