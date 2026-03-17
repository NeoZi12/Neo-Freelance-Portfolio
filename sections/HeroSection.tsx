import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Avatar geometry — tweak OVERHANG to control how far the head pops above the circle
const CIRCLE = 300;                   // circle diameter in px
const OVERHANG = 60;                  // px the head extends above the circle's top edge
const WRAP_H = CIRCLE + OVERHANG;     // total avatar wrapper height (360px)

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
        <div className="h-[116px] shrink-0" />

        {/* Content area — increased horizontal padding pulls content toward center */}
        <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[130px] py-4">

          {/*
            grid-cols-[1fr_auto]:
              - Left column (1fr) takes available width
              - Right column (auto) sizes exactly to the avatar wrapper
            This lets padding control how "centered" the content sits,
            without the columns arbitrarily splitting 50/50.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center w-full">

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

              <p className="text-sm lg:text-[15px] font-medium text-white/90 max-w-[310px] leading-relaxed">
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
                Wrapper is TALLER than the circle by OVERHANG px.
                This space at the top is where the head "pops out".
                NO overflow:hidden here — that would clip both the head and the glow.
              */}
              <div
                className="relative"
                style={{ width: CIRCLE, height: WRAP_H }}
              >
                {/*
                  Layer 1: Orange glow ring.
                  Positioned at the BOTTOM of the wrapper (the circle area).
                  box-shadow radiates outward — visible because no parent clips it.
                */}
                <div
                  className="absolute left-0 right-0 bottom-0 rounded-full border-4 border-[#E67E22]"
                  style={{
                    height: CIRCLE,
                    boxShadow:
                      "0 0 30px 8px rgba(230,126,34,0.55), 0 0 70px 24px rgba(230,126,34,0.25)",
                  }}
                />

                {/*
                  Layer 2: Dark circle background fill.
                  Sits behind the image, gives the circle its dark interior.
                */}
                <div
                  className="absolute left-0 right-0 bottom-0 rounded-full bg-[#252421]/80"
                  style={{ height: CIRCLE }}
                />

                {/*
                  Layer 3: Body image — clipped to the circle via clip-path.
                  clip-path: circle(R at cx cy) where:
                    R  = CIRCLE/2 = 150px (radius)
                    cx = 50% = 150px (horizontally centered)
                    cy = WRAP_H - CIRCLE/2 = 360 - 150 = 210px (circle center vertically)
                  Result: a perfect 300px circle in the BOTTOM 300px of the wrapper.
                  Image uses fill + object-bottom → figure anchored to wrapper bottom.
                */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `circle(${CIRCLE / 2}px at 50% ${WRAP_H - CIRCLE / 2}px)`,
                  }}
                >
                  <Image
                    src="/images/neo2d.png"
                    alt="Neo Zino – Freelance Web Developer"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>

                {/*
                  Layer 4: Head pop-out — same image, same position, z-10.
                  clip-path: inset(0 0 Xpx 0) where X = CIRCLE.
                  This shows ONLY the top OVERHANG px of the wrapper (the head area above the circle).
                  The two clip-paths meet exactly at the circle's top edge:
                    Body visible: y = OVERHANG → WRAP_H  (inside circle)
                    Head visible: y = 0         → OVERHANG (above circle)
                */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ clipPath: `inset(0 0 ${CIRCLE}px 0)` }}
                >
                  <Image
                    src="/images/neo2d.png"
                    alt=""
                    fill
                    className="object-contain object-bottom"
                    aria-hidden={true}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
