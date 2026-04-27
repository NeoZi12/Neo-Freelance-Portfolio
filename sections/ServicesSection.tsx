"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Icon } from "@iconify/react";
import type { IconifyIcon } from "@iconify/react";
import check from "@iconify-icons/lucide/check";
import arrowRight from "@iconify-icons/lucide/arrow-right";
import siNextdotjs from "@iconify-icons/simple-icons/nextdotjs";
import siTypescript from "@iconify-icons/simple-icons/typescript";
import siTailwindcss from "@iconify-icons/simple-icons/tailwindcss";
import siFramer from "@iconify-icons/simple-icons/framer";
import siVercel from "@iconify-icons/simple-icons/vercel";
import siSupabase from "@iconify-icons/simple-icons/supabase";
import siPostgresql from "@iconify-icons/simple-icons/postgresql";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { EASE, DUR, viewport } from "@/lib/motion";
import { montserrat, jakarta, inter } from "@/lib/fonts";

// ── Tech list (universal — not localized) ─────────────────────────────────────
type TechItem = { name: string; icon: IconifyIcon; color: string };

const TECH_ROW1: TechItem[] = [
  { name: "Next.js",       icon: siNextdotjs,   color: "#FFFFFF" },
  { name: "TypeScript",    icon: siTypescript,  color: "#3178C6" },
  { name: "Tailwind",      icon: siTailwindcss, color: "#38BDF8" },
  { name: "Framer Motion", icon: siFramer,      color: "#FFFFFF" },
  { name: "Vercel",        icon: siVercel,      color: "#FFFFFF" },
];

const TECH_ROW2: TechItem[] = [
  { name: "Next.js",    icon: siNextdotjs,   color: "#FFFFFF" },
  { name: "TypeScript", icon: siTypescript,  color: "#3178C6" },
  { name: "Tailwind",   icon: siTailwindcss, color: "#38BDF8" },
  { name: "Supabase",   icon: siSupabase,    color: "#3FCF8E" },
  { name: "PostgreSQL", icon: siPostgresql,  color: "#4FA8E0" },
];

// ── Motion variants (row stagger) ─────────────────────────────────────────────
const rowFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

const rowsStagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Device chrome — pure JSX/Tailwind. No SVG, no images.
// ─────────────────────────────────────────────────────────────────────────────

function Laptop({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* screen */}
      <div className="rounded-t-[10px] rounded-b-[4px] border border-white/10 bg-[#0d0a08] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/[0.05] bg-[linear-gradient(160deg,#14100c_0%,#0b0807_100%)]">
          {children}
        </div>
      </div>
      {/* base */}
      <div className="relative -mt-px h-2 rounded-b-[14px] bg-[linear-gradient(180deg,#1a1614_0%,#0b0807_100%)] shadow-[0_6px_14px_rgba(0,0,0,0.5)]">
        <div className="absolute left-1/2 top-0 h-[3px] w-[22%] -translate-x-1/2 rounded-b-md bg-black/50" />
      </div>
    </div>
  );
}

function Tablet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "aspect-[4/3] rounded-[14px] border border-white/10 bg-[#0d0a08] p-[7px] shadow-[0_24px_48px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[9px] border border-white/[0.05] bg-[linear-gradient(160deg,#14100c_0%,#0b0807_100%)]">
        {children}
      </div>
    </div>
  );
}

function Phone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "aspect-[9/19] rounded-[18px] border border-white/[0.12] bg-[#0d0a08] p-[5px] shadow-[0_20px_40px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[14px] border border-white/[0.05] bg-[linear-gradient(160deg,#14100c_0%,#0b0807_100%)]">
        {/* notch */}
        <div className="absolute left-1/2 top-1 z-[2] h-[7px] w-[32%] -translate-x-1/2 rounded bg-[#0b0807]" />
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stylized UIs — pure divs only. Static (no internal animation).
// ─────────────────────────────────────────────────────────────────────────────

function MockLanding() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  // Cursor click loop (5s total). Phases (s):
  //   fadeIn 0.4 → travel 1.8 → click 0.3 → hold 0.5 → fadeOut 0.4 → invisible reset → wait 1.5
  // Both the cursor's keyframes and the CTA's "click press" wrapper share
  // these times so the press lands exactly on the cursor's tap. The CTA's
  // existing pulse runs on its own 2.5s loop in an inner motion.div; the two
  // scales compose via the transform matrix, so the press momentarily layers
  // on top of the pulse and the pulse continues uninterrupted.
  // Coordinates are in the laptop's zoom=1 reference frame (~320×200 screen);
  // CSS `zoom` on parents scales the cursor's translate values automatically.
  const CURSOR_TIMES = [0, 0.08, 0.44, 0.47, 0.5, 0.6, 0.68, 0.685, 1] as const;
  const CURSOR_START_X = 235;
  const CURSOR_START_Y = 30;
  const CURSOR_CTA_X = 46;
  const CURSOR_CTA_Y = 137;

  return (
    <div className="relative flex h-full flex-col gap-2.5 p-3.5">
      {/* nav */}
      <div className="flex items-center justify-between">
        <div className="h-[7px] w-[22px] rounded-[2px] bg-[rgba(230,126,34,0.85)]" />
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-1 w-3.5 rounded-[2px] bg-white/[0.18]" />
          ))}
        </div>
        <div className="h-[9px] w-[26px] rounded-[3px] bg-white/[0.12]" />
      </div>

      {/* hero */}
      <div className="mt-3 flex flex-col gap-1.5 pl-1">
        <div className="h-[5px] w-[30%] rounded-[2px] bg-[rgba(230,126,34,0.6)]" />
        <div className="h-3.5 w-[85%] rounded-[3px] bg-white/85" />
        <div className="h-3.5 w-[72%] rounded-[3px] bg-white/85" />
        <div className="mt-1.5 flex flex-col gap-[3px]">
          <div className="h-[3px] w-[78%] rounded-[2px] bg-white/[0.22]" />
          <div className="h-[3px] w-[70%] rounded-[2px] bg-white/[0.22]" />
          <div className="h-[3px] w-[62%] rounded-[2px] bg-white/[0.22]" />
        </div>
        <div className="mt-2 flex gap-1.5">
          {prefersReducedMotion ? (
            <div className="h-4 w-[60px] rounded-md bg-[#E67E22] shadow-[0_6px_14px_rgba(230,126,34,0.35)]" />
          ) : (
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: [1, 1, 1, 0.95, 1, 1, 1, 1, 1] }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 5,
                times: [...CURSOR_TIMES],
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <motion.div
                className="h-4 w-[60px] rounded-md bg-[#E67E22] shadow-[0_6px_14px_rgba(230,126,34,0.35)] [transform:translateZ(0)] will-change-transform"
                initial={{ scale: 1 }}
                whileInView={{ scale: [1, 1.04, 1] }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
          <div className="h-4 w-[50px] rounded-md border border-white/[0.18] bg-transparent" />
        </div>
      </div>

      {/* feature row at bottom — orange icons cycle opacity in a staggered
          wave (0.6s offset) for a continuous, viewport-gated loop. */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-[3px] rounded-[4px] border border-white/[0.05] bg-white/[0.02] p-1.5"
          >
            {prefersReducedMotion ? (
              <div className="h-[9px] w-[9px] rounded-[2px] bg-[rgba(230,126,34,0.7)]" />
            ) : (
              <motion.div
                className="h-[9px] w-[9px] rounded-[2px] bg-[#E67E22]"
                initial={{ opacity: 0.45 }}
                whileInView={{ opacity: [0.45, 1, 0.45] }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 2.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
              />
            )}
            <div className="h-[3px] w-[85%] rounded-[2px] bg-white/40" />
            <div className="h-[3px] w-[60%] rounded-[2px] bg-white/[0.18]" />
          </div>
        ))}
      </div>

      {/* Cursor — travels from upper-right to the CTA, "clicks", fades, loops.
          Skipped entirely under prefers-reduced-motion. */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 origin-top-left"
          initial={{
            opacity: 0,
            x: CURSOR_START_X,
            y: CURSOR_START_Y,
            scale: 1,
          }}
          whileInView={{
            opacity: [0, 1, 1, 1, 1, 1, 0, 0, 0],
            x: [
              CURSOR_START_X,
              CURSOR_START_X,
              CURSOR_CTA_X,
              CURSOR_CTA_X,
              CURSOR_CTA_X,
              CURSOR_CTA_X,
              CURSOR_CTA_X,
              CURSOR_START_X,
              CURSOR_START_X,
            ],
            y: [
              CURSOR_START_Y,
              CURSOR_START_Y,
              CURSOR_CTA_Y,
              CURSOR_CTA_Y,
              CURSOR_CTA_Y,
              CURSOR_CTA_Y,
              CURSOR_CTA_Y,
              CURSOR_START_Y,
              CURSOR_START_Y,
            ],
            scale: [1, 1, 1, 0.9, 1, 1, 1, 1, 1],
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 5,
            times: [...CURSOR_TIMES],
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4 L 11.07 21 L 13.58 13.61 L 21 11.07 Z"
              fill="white"
              stroke="rgba(0,0,0,0.6)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

function MockLandingMobile() {
  return (
    <div className="flex h-full flex-col gap-[7px] px-2 pb-2 pt-4">
      <div className="flex items-center justify-between pt-1">
        <div className="h-1 w-3.5 rounded-[2px] bg-[rgba(230,126,34,0.85)]" />
        <div className="h-2 w-3 rounded-[2px] bg-white/[0.15]" />
      </div>
      <div className="mt-1.5 flex flex-col gap-1">
        <div className="h-[3px] w-[55%] rounded-[2px] bg-[rgba(230,126,34,0.6)]" />
        <div className="h-2 w-[92%] rounded-[2px] bg-white/85" />
        <div className="h-2 w-[82%] rounded-[2px] bg-white/85" />
      </div>
      <div className="mt-1 flex flex-col gap-[2.5px]">
        <div className="h-[2.5px] w-[85%] rounded-[2px] bg-white/[0.22]" />
        <div className="h-[2.5px] w-[78%] rounded-[2px] bg-white/[0.22]" />
      </div>
      <div className="mt-1 h-3 w-[75%] rounded bg-[#E67E22] shadow-[0_4px_10px_rgba(230,126,34,0.4)]" />
      <div className="mt-1 h-2.5 w-[60%] rounded border border-white/[0.18]" />

      {/* image card */}
      <div className="mt-2 h-[50px] rounded-md border border-white/[0.06] bg-[linear-gradient(135deg,rgba(230,126,34,0.18),rgba(255,255,255,0.04))]" />
      <div className="mt-1 flex flex-col gap-0.5">
        <div className="h-[2.5px] w-[75%] rounded-[2px] bg-white/30" />
        <div className="h-[2.5px] w-[60%] rounded-[2px] bg-white/[0.18]" />
      </div>
    </div>
  );
}

// Tiny pure-div column-chart used in the dashboard mocks (no SVG).
function BarChart({ heights, accentIndex }: { heights: number[]; accentIndex: number }) {
  return (
    <div className="flex h-full items-end gap-[3px]">
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn(
            "flex-1 rounded-t-[2px]",
            i === accentIndex ? "bg-[#E67E22]" : "bg-white/30",
          )}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

// SVG line-chart for the laptop dashboard. Animates a clipPath rectangle
// that masks the (always-fully-drawn) line, mirroring 0↔W on a 1.5s
// easeInOut loop while in view. Pauses when offscreen (`once: false`).
// Static when prefers-reduced-motion: reduce.
//
// Clip-mask instead of stroke-dasharray because the latter leaves
// subpixel residue at both path endpoints under the section's CSS `zoom`
// transform — the round dots / micro-segments seen at the path's start
// and end during the unwind phase. Clipping a rect has no dash boundaries
// so there is no residue to leak.
function LineChart({ heights }: { heights: number[] }) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const W = 100;
  const H = 40;
  const step = heights.length > 1 ? W / (heights.length - 1) : 0;
  const d = heights
    .map((p, i) => {
      const x = (i * step).toFixed(2);
      const y = (H - (p / 100) * H).toFixed(2);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const clipId = "services-linechart-clip";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      {!prefersReducedMotion && (
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              x={0}
              y={0}
              height={H}
              initial={{ width: 0 }}
              whileInView={{ width: W }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />
          </clipPath>
        </defs>
      )}
      <path
        d={d}
        fill="none"
        stroke="#E67E22"
        strokeWidth={1.5}
        strokeLinecap="butt"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        clipPath={prefersReducedMotion ? undefined : `url(#${clipId})`}
      />
    </svg>
  );
}

function MockDashboard({ chart = "bar" }: { chart?: "bar" | "line" } = {}) {
  const sidebarItems = [0, 1, 2, 3, 4];
  const stats = [
    { v: "60%", c: "bg-[rgba(230,126,34,0.85)]" },
    { v: "78%", c: "bg-white/70" },
    { v: "44%", c: "bg-white/70" },
  ];
  return (
    <div className="grid h-full grid-cols-[60px_1fr]">
      {/* sidebar */}
      <div className="flex flex-col gap-2 border-r border-white/[0.06] bg-black/35 p-2.5">
        <div className="h-1.5 w-4 rounded-[2px] bg-[rgba(230,126,34,0.85)]" />
        <div className="mt-1.5 flex flex-col gap-[5px]">
          {sidebarItems.map((i) => {
            const active = i === 1;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-1 rounded-[3px] px-1 py-[3px]",
                  active ? "bg-[rgba(230,126,34,0.12)]" : "bg-transparent",
                )}
              >
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-[1px]",
                    active ? "bg-[rgba(230,126,34,0.85)]" : "bg-white/25",
                  )}
                />
                <div
                  className={cn(
                    "h-[3px] w-[22px] rounded-[2px]",
                    active ? "bg-[rgba(230,126,34,0.55)]" : "bg-white/[0.18]",
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* main */}
      <div className="flex flex-col gap-2.5 p-3">
        {/* topbar */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="h-[3px] w-[60px] rounded-[2px] bg-white/25" />
            <div className="h-[7px] w-[86px] rounded-[2px] bg-white/85" />
          </div>
          <div className="flex gap-1">
            <div className="h-3.5 w-3.5 rounded bg-white/[0.08]" />
            <div className="h-3.5 w-3.5 rounded-full bg-[rgba(230,126,34,0.65)]" />
          </div>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-[5px] border border-white/[0.06] bg-white/[0.025] p-2"
            >
              <div className="h-[2.5px] w-[40%] rounded-[2px] bg-white/25" />
              <div className={cn("h-2 rounded-[2px]", s.c)} style={{ width: s.v }} />
              <div className="h-0.5 w-[30%] rounded-[1px] bg-white/15" />
            </div>
          ))}
        </div>

        {/* main chart — laptop instance renders an animated SVG line; tablet keeps bars */}
        <div className="rounded-[5px] border border-white/[0.06] bg-white/[0.025] p-2">
          <div className="h-9">
            {chart === "line" ? (
              <LineChart
                heights={[28, 36, 32, 52, 44, 68, 60, 82, 74, 92, 80, 96]}
              />
            ) : (
              <BarChart
                heights={[28, 36, 32, 52, 44, 68, 60, 82, 74, 92, 80, 96]}
                accentIndex={11}
              />
            )}
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-[5px] border border-white/[0.06] bg-white/[0.02]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "grid grid-cols-[1fr_50px_30px] items-center gap-1.5 px-2 py-[5px]",
                i !== 0 && "border-t border-white/[0.04]",
              )}
            >
              <div className="h-[3px] w-[70%] rounded-[2px] bg-white/30" />
              <div className="h-[3px] w-full rounded-[2px] bg-white/[0.18]" />
              <div
                className={cn(
                  "h-1.5 w-[18px] rounded-[2px]",
                  i === 0 ? "bg-[rgba(230,126,34,0.55)]" : "bg-white/[0.12]",
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockDashboardMobile() {
  return (
    <div className="flex h-full flex-col gap-1.5 px-2 pb-2 pt-4">
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col gap-0.5">
          <div className="h-[2.5px] w-7 rounded-[2px] bg-white/25" />
          <div className="h-1 w-[38px] rounded-[2px] bg-white/85" />
        </div>
        <div className="h-2.5 w-2.5 rounded-full bg-[rgba(230,126,34,0.65)]" />
      </div>

      <div className="mt-1 flex flex-col gap-[3px] rounded-[5px] border border-[rgba(230,126,34,0.25)] bg-[linear-gradient(135deg,rgba(230,126,34,0.18),rgba(230,126,34,0.04))] p-2">
        <div className="h-[2.5px] w-[40%] rounded-[2px] bg-white/40" />
        <div className="h-2 w-[65%] rounded-[2px] bg-[#E67E22]" />
        <div className="h-0.5 w-[30%] rounded-[1px] bg-white/30" />
      </div>

      <div className="mt-0.5 grid grid-cols-2 gap-1">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-0.5 rounded-[4px] border border-white/[0.05] bg-white/[0.025] p-1.5"
          >
            <div className="h-0.5 w-[60%] rounded-[1px] bg-white/[0.22]" />
            <div className="h-1.5 w-[75%] rounded-[2px] bg-white/70" />
          </div>
        ))}
      </div>

      {/* mini bar chart row */}
      <div className="mt-1 rounded-[4px] border border-white/[0.05] bg-white/[0.02] p-1.5">
        <div className="h-6">
          <BarChart
            heights={[22, 30, 26, 44, 36, 58, 50, 72, 88]}
            accentIndex={8}
          />
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-[3px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_16px] items-center gap-1 rounded-[3px] bg-white/[0.02] px-1 py-[3px]"
          >
            <div className="h-[2.5px] w-[70%] rounded-[2px] bg-white/30" />
            <div
              className={cn(
                "h-[5px] w-3 rounded-[1.5px]",
                i === 0 ? "bg-[rgba(230,126,34,0.55)]" : "bg-white/15",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mockup compositions per row
// ─────────────────────────────────────────────────────────────────────────────

// Each device is built once at a single "xl design" reference size so the
// inner mock contents (bars, paragraphs, buttons, charts) sit in known
// proportions to the frame. CSS `zoom` on the inner wrapper scales the
// entire composition — frames AND contents — proportionally at smaller
// breakpoints, so nothing inside a phone/laptop screen ever overflows.
//
// Padding is on the OUTER (un-zoomed) container so the breathing room
// between the composition and the card edge stays constant in real px
// regardless of zoom factor.
const MOCKUP_ZOOM =
  "[zoom:0.42] sm:[zoom:0.95] md:[zoom:0.6] lg:[zoom:0.8] xl:[zoom:1]";

function MockupRow1() {
  return (
    // Outer: padding stays in real px so card-edge breathing is constant.
    // py keeps the laptop base + drop-shadow inside the card boundary.
    <div className="flex h-full items-center justify-center px-4 py-8 md:py-10">
      <div className={cn("flex items-center gap-12 sm:gap-3", MOCKUP_ZOOM)}>
        {/* Laptop — hero device. Reduced from 460→320 ref so the phone
            (Fix 1) reads as clearly secondary at every breakpoint. */}
        <Laptop className="w-[320px]">
          <MockLanding />
        </Laptop>
        {/* Phone — Fix 1: 172 → 132 ref, ~23% shorter. Slight overlap
            via z-lift + drop-shadow keeps the depth read intact. */}
        <div
          className="relative z-[2]"
          style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.55))" }}
        >
          <Phone className="w-[132px]">
            <MockLandingMobile />
          </Phone>
        </div>
      </div>
    </div>
  );
}

function MockupRow2() {
  return (
    // Fix 2: outer px-4 + zoom-fit ref leaves ≥20px of real-px breathing
    // between the outermost devices and the card's left/right edges at
    // every breakpoint. Same relative tablet:laptop:phone proportions as
    // before; all three scaled down in lockstep.
    <div className="flex h-full items-center justify-center px-4 py-8 md:py-10">
      <div className={cn("flex items-center gap-12 sm:gap-3", MOCKUP_ZOOM)}>
        {/* Tablet — recessed for depth. Always rendered now; zoom keeps
            the three-device composition fitting at every breakpoint. */}
        <div
          className="relative z-[1] mt-6"
          style={{ filter: "drop-shadow(0 18px 32px rgba(0,0,0,0.5))" }}
        >
          <Tablet className="w-[120px]">
            <MockDashboard />
          </Tablet>
        </div>
        {/* Laptop — main subject. Animated SVG line chart in main panel. */}
        <Laptop className="relative z-[2] w-[240px]">
          <MockDashboard chart="line" />
        </Laptop>
        {/* Phone — slightly lifted */}
        <div
          className="relative z-[2]"
          style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.55))" }}
        >
          <Phone className="w-[90px]">
            <MockDashboardMobile />
          </Phone>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tech strip ("Built with …")
// ─────────────────────────────────────────────────────────────────────────────

function TechStrip({
  items,
  label,
  isHe,
}: {
  items: TechItem[];
  label: string;
  isHe: boolean;
}) {
  return (
    <div className="mt-1.5 flex flex-col gap-3 border-t border-white/[0.08] pt-4">
      <span
        dir={isHe ? "rtl" : "ltr"}
        className={cn(
          "text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40",
          inter.className,
        )}
      >
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {items.map((t) => (
          <span
            key={t.name}
            className={cn(
              "inline-flex items-center gap-[7px] text-[12px] font-medium text-white/55",
              inter.className,
            )}
          >
            <Icon
              icon={t.icon}
              width={15}
              height={15}
              style={{ color: t.color, opacity: 0.7 }}
            />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Service row card
// ─────────────────────────────────────────────────────────────────────────────

type RowProps = {
  mockSide: "left" | "right";
  eyebrow: string;
  title: string;
  tagline: string;
  features: string[];
  tech: TechItem[];
  ctaLabel: string;
  ctaStyle: "outline" | "filled";
  builtWithLabel: string;
  isHe: boolean;
  Mockup: () => React.JSX.Element;
};

function ServiceRow({
  mockSide,
  eyebrow,
  title,
  tagline,
  features,
  tech,
  ctaLabel,
  ctaStyle,
  builtWithLabel,
  isHe,
  Mockup,
}: RowProps) {
  const prefersReducedMotion = useReducedMotion();
  const reverse = mockSide === "right";

  // Hover scale on CTA — refined, not dramatic. Disabled for reduced motion.
  const hoverScale = prefersReducedMotion ? undefined : { scale: 1.02 };

  return (
    <motion.article
      variants={rowFadeUp}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              boxShadow:
                "0 28px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(230,126,34,0.16)",
            }
      }
      transition={{ duration: 0.35, ease: EASE }}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.018] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <div
        className={cn(
          "flex flex-col md:grid md:min-h-[440px]",
          // Mockup goes first (top) on mobile.
          // At md+, alternate columns based on mockSide.
          reverse
            ? "md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
            : "md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]",
        )}
      >
        {/* ── Mockup pane ── */}
        <div
          className={cn(
            "relative overflow-hidden bg-[linear-gradient(140deg,rgba(230,126,34,0.06)_0%,rgba(255,255,255,0)_60%)]",
            reverse
              ? "md:order-2 md:border-l md:border-white/[0.06]"
              : "md:order-1 md:border-r md:border-white/[0.06]",
          )}
        >
          {/* corner radial glow */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -top-[30%] h-[90%] w-[70%] rounded-full blur-[28px]",
              reverse ? "-right-[15%]" : "-left-[15%]",
            )}
            style={{
              background:
                "radial-gradient(closest-side, rgba(230,126,34,0.18), transparent 70%)",
            }}
          />
          {/* faint dot grid (CSS, not SVG) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
          <div className="relative h-full">
            <Mockup />
          </div>
        </div>

        {/* ── Content pane ── */}
        <div
          dir={isHe ? "rtl" : "ltr"}
          className={cn(
            "flex min-w-0 flex-col gap-4 p-6 sm:p-8 md:gap-[18px] md:p-10 lg:p-11",
            reverse ? "md:order-1" : "md:order-2",
          )}
        >
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E67E22]",
              inter.className,
            )}
          >
            {eyebrow}
          </span>

          <h3
            className={cn(
              "m-0 text-[28px] font-bold leading-[1.08] tracking-[-0.02em] text-white text-balance md:text-[32px]",
              montserrat.className,
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "m-0 max-w-[460px] text-[15px] font-medium leading-[1.55] text-white/70 md:text-[15.5px]",
              inter.className,
            )}
          >
            {tagline}
          </p>

          <ul className="mt-1.5 grid list-none grid-cols-1 gap-x-[18px] gap-y-2.5 p-0 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f}
                className={cn(
                  "flex items-center gap-2.5 text-[13.5px] font-medium text-white/[0.86]",
                  jakarta.className,
                )}
              >
                <Icon
                  icon={check}
                  width={14}
                  height={14}
                  className="shrink-0 text-[#E67E22]"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <TechStrip items={tech} label={builtWithLabel} isHe={isHe} />

          <div className="mt-1 flex flex-wrap items-center gap-x-[18px] gap-y-3">
            <motion.a
              href="#contact"
              whileHover={hoverScale}
              transition={{ duration: 0.2, ease: EASE }}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap rounded-[14px] px-[22px] py-3 text-[13.5px] font-semibold no-underline transition-shadow duration-200",
                montserrat.className,
                ctaStyle === "outline"
                  ? "border border-[#E67E22] bg-transparent text-[#E67E22] hover:bg-[rgba(230,126,34,0.08)]"
                  : "bg-[#E67E22] text-white shadow-[0_8px_20px_rgba(230,126,34,0.32)] hover:shadow-[0_12px_28px_rgba(230,126,34,0.5)]",
              )}
            >
              {ctaLabel}
              <Icon
                icon={arrowRight}
                width={15}
                height={15}
                className={cn(isHe && "-scale-x-100")}
              />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

// Note on viewport sizing:
// The section uses `min-h-[100dvh]` so it's at least one viewport tall, but
// with two stacked rows of full mockups + content the natural height exceeds
// 100vh on most desktops. Per the design brief's escape hatch, breathing room
// (mockups legible, gap ≥ 28px, full type hierarchy) wins over a strict 100vh.
export default function ServicesSection() {
  const { locale, t } = useLanguage();
  const isHe = locale === "he";
  const s = t.services;

  return (
    <section
      id="services"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#0B0907] scroll-mt-16 lg:scroll-mt-0"
    >
      {/* ── Navbar spacer ── */}
      <div className="hidden h-[90px] shrink-0 lg:block" />

      {/* ── Warm wash ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-[-10%] h-[520px] w-[120%] blur-[40px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 50%, rgba(230,126,34,0.10), transparent 70%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-6 pt-8 pb-16 sm:px-10 md:pt-10 md:pb-20 lg:px-[72px] lg:pt-12 lg:pb-24"
      >
        {/* ── Header ── */}
        <motion.div
          variants={rowFadeUp}
          dir={isHe ? "rtl" : "ltr"}
          className="mb-12 flex flex-col items-center gap-3 text-center md:mb-16"
        >
          <span
            className={cn(
              "text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E67E22]",
              inter.className,
            )}
          >
            {s.eyebrow}
          </span>
          <h2
            className={cn(
              "m-0 text-[40px] font-bold leading-[1.02] tracking-[-0.025em] text-white sm:text-[48px] md:text-[56px] lg:text-[60px]",
              montserrat.className,
            )}
          >
            {s.heading}
          </h2>
        </motion.div>

        {/* ── Two rows ── */}
        <motion.div variants={rowsStagger} className="flex flex-col gap-7">
          <ServiceRow
            mockSide="left"
            eyebrow={s.left.whoAnswer}
            title={`${s.left.titleA.trim()} ${s.left.titleB.trim()}`}
            tagline={s.left.description}
            features={[...s.left.items]}
            tech={TECH_ROW1}
            ctaLabel={s.left.cta}
            ctaStyle="outline"
            builtWithLabel={s.builtWith}
            isHe={isHe}
            Mockup={MockupRow1}
          />
          <ServiceRow
            mockSide="right"
            eyebrow={s.right.whoAnswer}
            title={`${s.right.titleA.trim()} ${s.right.titleB.trim()}`}
            tagline={s.right.description}
            features={[...s.right.items]}
            tech={TECH_ROW2}
            ctaLabel={s.right.cta}
            ctaStyle="filled"
            builtWithLabel={s.builtWith}
            isHe={isHe}
            Mockup={MockupRow2}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
