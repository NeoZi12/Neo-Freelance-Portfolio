import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ── Photo frame helper ────────────────────────────────────────────────────────
// Geometry is pixel-based (matching Figma exactly), so we accept explicit
// dimensions as props and render two sizes via lg:hidden / hidden lg:block.
//
// Spatial relationship from Figma:
//   photo  → top-right  (z above)
//   frame  → bottom-left (z behind), offset from photo by offsetX / offsetY
//
// Photo: /images/about-pic.jpeg

function PhotoFrame({
  photoW,
  photoH,
  frameW,
  frameH,
  offsetX,
  offsetY,
}: {
  photoW: number;
  photoH: number;
  frameW: number;
  frameH: number;
  offsetX: number;
  offsetY: number;
}) {
  return (
    <div
      className="relative"
      style={{ width: photoW + offsetX, height: photoH + offsetY }}
    >
      {/* Orange decorative border — bottom-left, behind the photo */}
      <div
        className="absolute bottom-0 left-0 border-[16px] border-[#E67E22] rounded-[24px] z-[1]"
        style={{ width: frameW, height: frameH }}
      />

      {/* Photo — top-right, in front of the orange frame */}
      <div
        className="absolute top-0 right-0 rounded-[24px] overflow-hidden z-[2]"
        style={{ width: photoW, height: photoH }}
      >
        <Image
          src="/images/about-pic.jpeg"
          alt="Neo Zino – Freelance Web Developer"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section
      id="about"
      className={cn(
        "w-full min-h-screen lg:h-screen flex flex-col",
        "bg-gradient-to-b from-about-dark to-about-warm",
        montserrat.className,
      )}
    >
      {/* Spacer matching fixed navbar height — pushes content below navbar on desktop */}
      <div className="hidden lg:block h-[90px] shrink-0" />

      {/* flex-1 fills the remaining height; items-center centers within that space */}
      <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[130px] py-16 lg:py-0">
        {/*
          Two-column grid:
          - Mobile (single col): text first (order-1), photo second (order-2)
          - Desktop (two col):   photo left  (order-1), text right (order-2)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-center w-full">
          {/* ── Left on desktop (photo) — below text on mobile ── */}
          <div className="flex items-center justify-center order-2 lg:order-1">
            {/* Mobile: scaled to fit narrow screens (344px+) */}
            <div className="lg:hidden">
              <PhotoFrame
                photoW={310}
                photoH={430}
                frameW={307}
                frameH={428}
                offsetX={29}
                offsetY={30}
              />
            </div>
            {/* Desktop: ~45% smaller than Figma width, taller height */}
            <div className="hidden lg:block">
              <PhotoFrame
                photoW={310}
                photoH={430}
                frameW={307}
                frameH={428}
                offsetX={29}
                offsetY={29}
              />
            </div>
          </div>

          {/* ── Right on desktop (text) — above photo on mobile ── */}
          <div className="flex flex-col gap-5 order-1 lg:order-2 lg:p-[50px] [filter:drop-shadow(0px_4px_4px_rgba(0,0,0,0.25))]">
            <h2 className="text-[48px] font-semibold text-white leading-tight">
              About <span className="text-[#E67E22]">Me</span>
            </h2>

            <p className="text-xl font-semibold text-white leading-[26px] max-w-[484px]">
              I design and build clean, responsive{" "}
              <span className="text-[#E67E22]">websites</span> for businesses,
              brands, and personal projects, creating digital experiences that
              are clear, modern, and easy to use.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center justify-center self-start border-2 border-[#E67E22] text-white font-semibold text-lg rounded-[18px] px-[30px] py-[14px] whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
