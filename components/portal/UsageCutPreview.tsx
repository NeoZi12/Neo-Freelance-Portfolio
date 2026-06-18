/**
 * UsageCut card preview — a compact, honest "scan result" widget.
 *
 * Mirrors the product's own signature: a C → A+ setup grade and the per-session
 * token savings (~10,700, straight from UsageCut's copy), shown as a before/after
 * trim. Built in the portal's dark/clay treatment so it reads as a set with the
 * ClockedCode dashboard preview rather than a raw screenshot.
 */
const CLAY = "#d9774f";

function Bar({ label, pct, tone }: { label: string; pct: number; tone: "muted" | "clay" }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 flex-none text-[0.7rem] text-portal-faint">{label}</span>
      <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
        <span
          className="absolute inset-y-0 start-0 rounded-full"
          style={{ width: `${pct}%`, background: tone === "clay" ? CLAY : "rgba(255,255,255,0.16)" }}
        />
      </span>
    </div>
  );
}

export default function UsageCutPreview() {
  return (
    <div className="flex h-40 flex-col justify-center gap-3.5 p-4 sm:h-44 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-portal-faint">
          Setup scan
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold">
          <span className="text-portal-faint">C</span>
          <span className="text-portal-faint">→</span>
          <span style={{ color: CLAY }}>A+</span>
        </span>
      </div>

      <div className="text-lg font-semibold text-portal-ink">
        ≈ 10,700{" "}
        <span className="text-sm font-normal text-portal-muted">tokens / session saved</span>
      </div>

      <div className="space-y-2">
        <Bar label="Before" pct={100} tone="muted" />
        <Bar label="After" pct={62} tone="clay" />
      </div>
    </div>
  );
}
