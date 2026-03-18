import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// ── Avatar helper ─────────────────────────────────────────────────────────────
// All geometry is pixel-based; accepting circle + popOut as props lets us
// render a proportionally-correct circle at any size without scale hacks.

function AvatarCircle({ circle, popOut }: { circle: number; popOut: number }) {
  const portraitH = Math.round(circle * (1024 / 768));

  return (
    <div className="relative" style={{ width: circle, height: circle + popOut }}>
      {/* Glow — radiates from the circle area */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-full"
        style={{
          height: circle,
          boxShadow:
            "0 0 60px 20px rgba(230,126,34,0.30), 0 0 130px 60px rgba(230,126,34,0.12)",
        }}
      />

      {/* Dark circle fill */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-full bg-[#252421]/70"
        style={{ height: circle }}
      />

      {/*
        Shared portrait box — ONE box, fixed dimensions.
        Both layers use identical geometry so the image is pixel-aligned.
        No z-index on the box → no stacking context → Layer A (z-2),
        ring (z-5), Layer B (z-10) sort correctly in the container stack.
      */}
      <div
        className="absolute top-0 left-0"
        style={{ width: circle, height: portraitH }}
      >
        {/*
          Layer A: portrait inside the circle.
          Circle center in portrait coords: cy = popOut + circle/2
        */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            clipPath: `circle(${circle / 2}px at 50% ${popOut + circle / 2}px)`,
          }}
        >
          <Image
            src="/images/neo2d.png"
            alt="Neo Zino – Freelance Web Developer"
            fill
            className="object-contain object-top"
            priority
          />
        </div>

        {/*
          Layer B: portrait OUTSIDE the circle — hair pop-out.
          clip-path: path() traces the region above the circle's upper arc.
          z-10: above the ring (z-5) so hair renders in front.
        */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            clipPath: `path('M 0 0 L ${circle} 0 L ${circle} ${popOut + circle / 2 + 6} A ${circle / 2} ${circle / 2} 0 0 0 0 ${popOut + circle / 2 + 6} Z')`,
          }}
        >
          <Image
            src="/images/neo2d.png"
            alt=""
            fill
            className="object-contain object-top"
            aria-hidden
          />
        </div>
      </div>

      {/*
        Orange border ring.
        z-[5]: above Layer A body (z-2), below Layer B hair (z-10).
      */}
      <div
        className="absolute left-0 right-0 bottom-0 rounded-full border-4 border-[#E67E22] pointer-events-none z-[5]"
        style={{ height: circle }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="home"
      className={cn(
        "relative min-h-[100dvh] lg:h-[100dvh] w-full lg:overflow-hidden",
        "bg-[url('/images/orange-mountains.jpg')] bg-cover bg-center bg-no-repeat",
        montserrat.className,
      )}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/68 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Spacer matching the fixed navbar height */}
        <div className="h-[64px] lg:h-[90px] shrink-0" />

        {/* Content area */}
        <div className="flex-1 flex items-start lg:items-center px-6 sm:px-10 lg:px-[60px] xl:px-[130px] py-4">

          {/*
            grid-cols-[1fr_auto]:
              - Left column (1fr) takes available width
              - Right column (auto) sizes exactly to the avatar wrapper
            This lets padding control how "centered" the content sits,
            without the columns arbitrarily splitting 50/50.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_480px] gap-4 lg:gap-14 xl:gap-20 items-center w-full">

            {/* ── Left column: Text ── */}
            <div className="flex flex-col gap-5">
              <p className="text-2xl lg:text-[28px] font-semibold text-white leading-snug">
                Hi, i&apos;m <span className="text-[#E67E22]">Neo</span>
              </p>

              <h1 className="text-4xl lg:text-[50px] font-semibold text-white leading-tight">
                Freelance{" "}
                <span className="text-[#E67E22]">
                  Web
                  <br />
                  Developer
                </span>
              </h1>

              <p className="text-sm lg:text-[15px] font-medium text-white/90 max-w-[420px] leading-relaxed">
                I design and build clean, responsive{" "}
                <span className="text-[#E67E22]">websites</span> for businesses,
                brands, and personal projects, creating digital experiences that
                are clear, modern, and easy to use.
              </p>

              <div className="flex flex-row flex-wrap gap-5 mt-2">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center bg-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3.5 text-sm whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  My Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center border-2 border-[#E67E22] text-white font-semibold rounded-[18px] px-7 py-3.5 text-sm whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* ── Right column: Avatar ── */}
            <div className="flex items-center justify-center">
              {/* Mobile (< lg): 280px circle fits all phones ≥ 344px */}
              <div className="lg:hidden">
                <AvatarCircle circle={280} popOut={58} />
              </div>
              {/* Desktop (lg+): original 340px — unchanged */}
              <div className="hidden lg:block">
                <AvatarCircle circle={340} popOut={70} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
