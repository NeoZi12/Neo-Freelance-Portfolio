import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Avatar geometry — one shared portrait box, two clip masks
const CIRCLE     = 340;                                    // ring diameter (px)
const POP_OUT    = 70;                                     // px of hair crown above the ring
const PORTRAIT_H = Math.round(CIRCLE * (1024 / 768));     // 453px — aspect-correct, FIXED regardless of POP_OUT

export default function HeroSection() {
  return (
    <section
      className={cn(
        "relative h-[100dvh] w-full overflow-hidden",
        "bg-[url('/images/orange-mountains.jpg')] bg-cover bg-center bg-no-repeat",
        montserrat.className,
      )}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/68 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Spacer matching the fixed navbar height */}
        <div className="h-[90px] shrink-0" />

        {/* Content area — increased horizontal padding pulls content toward center */}
        <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[130px] py-4">

          {/*
            grid-cols-[1fr_auto]:
              - Left column (1fr) takes available width
              - Right column (auto) sizes exactly to the avatar wrapper
            This lets padding control how "centered" the content sits,
            without the columns arbitrarily splitting 50/50.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-20 items-center w-full">

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
              {/*
                Container: CIRCLE wide × (CIRCLE + POP_OUT) tall.
                The circle ring occupies the bottom CIRCLE px.
                The top POP_OUT px is the hair pop-out zone.
                No overflow:hidden — lets the glow box-shadow radiate freely.
              */}
              <div
                className="relative"
                style={{ width: CIRCLE, height: CIRCLE + POP_OUT }}
              >
                {/* Glow — radiates from the circle area */}
                <div
                  className="absolute left-0 right-0 bottom-0 rounded-full"
                  style={{
                    height: CIRCLE,
                    boxShadow:
                      "0 0 60px 20px rgba(230,126,34,0.30), 0 0 130px 60px rgba(230,126,34,0.12)",
                  }}
                />

                {/* Dark circle fill */}
                <div
                  className="absolute left-0 right-0 bottom-0 rounded-full bg-[#252421]/70"
                  style={{ height: CIRCLE }}
                />

                {/*
                  Shared portrait box — ONE box, fixed dimensions.
                  Both layers use identical geometry so the image is pixel-aligned.
                  No z-index on the box → no stacking context → Layer A (z-2),
                  ring (z-5), Layer B (z-10) sort correctly in the container stack.
                */}
                <div
                  className="absolute top-0 left-0"
                  style={{ width: CIRCLE, height: PORTRAIT_H }}
                >
                  {/*
                    Layer A: portrait inside the circle.
                    Circle center in portrait coords: cy = POP_OUT + CIRCLE/2
                  */}
                  <div
                    className="absolute inset-0 z-[2]"
                    style={{
                      clipPath: `circle(${CIRCLE / 2}px at 50% ${POP_OUT + CIRCLE / 2}px)`,
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
                    clip-path: path() traces the region above the circle's upper arc:
                      top-left → top-right → down to the circle equator on the right →
                      counterclockwise arc back to the circle equator on the left →
                      up to top-left.
                    The bottom edge of this mask follows the circle curve exactly,
                    so there is no flat rectangular cutoff at the ring boundary.
                    z-10: above the ring (z-5) so hair renders in front.
                  */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      clipPath: `path('M 0 0 L ${CIRCLE} 0 L ${CIRCLE} ${POP_OUT + CIRCLE / 2 + 6} A ${CIRCLE / 2} ${CIRCLE / 2} 0 0 0 0 ${POP_OUT + CIRCLE / 2 + 6} Z')`,
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
                  style={{ height: CIRCLE }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
