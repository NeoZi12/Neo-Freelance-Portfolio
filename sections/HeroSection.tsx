import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function HeroSection() {
  return (
    <section
      className={cn(
        "relative min-h-screen w-full",
        "bg-[url('/images/orange-mountains.jpg')] bg-cover bg-center bg-no-repeat",
        montserrat.className,
      )}
    >
      {/* Dark overlay — keeps background mountains subtly visible */}
      <div className="absolute inset-0 bg-black/78 pointer-events-none" />

      {/* Layout wrapper: flex column so spacer + content fill the screen */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar height spacer — pushes content below the fixed navbar */}
        <div className="h-[70px] shrink-0" />

        {/* Content area: fills remaining height, centers grid vertically */}
        <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-[70px] py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
            {/* ── Left column: Text content ── */}
            <div className="flex flex-col gap-5">
              {/* Greeting */}
              <p className="text-3xl lg:text-4xl font-semibold text-white">
                Hi, i&apos;m <span className="text-[#E67E22]">Neo</span>
              </p>

              {/* Headline */}
              <h1 className="text-5xl lg:text-6xl font-semibold text-white leading-tight">
                Freelance{" "}
                <span className="text-[#E67E22]">
                  Web
                  <br />
                  Developer
                </span>
              </h1>

              {/* Paragraph */}
              <p className="text-base lg:text-lg font-medium text-white/90 max-w-lg leading-relaxed">
                I design and build clean, responsive{" "}
                <span className="text-[#E67E22]">websites</span> for businesses,
                brands, and personal projects, creating digital experiences that
                are clear, modern, and easy to use.
              </p>

              {/* Buttons */}
              <div className="flex flex-row flex-wrap gap-6 mt-3">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center bg-[#E67E22] text-white font-semibold rounded-[18px] px-8 py-4 text-base whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  My Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center border-2 border-[#E67E22] text-white font-semibold rounded-[18px] px-8 py-4 text-base whitespace-nowrap shadow-[0px_10px_24px_rgba(230,126,34,0.4)] hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)] transition-shadow duration-200"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* ── Right column: Avatar with pop-out effect ── */}
            <div className="flex items-center justify-center">
              {/*
                Wrapper is ~30% taller than the circle.
                Circle is anchored bottom-0 inside the wrapper.
                Image fills the full wrapper height with object-bottom —
                subject's base stays at the circle bottom while the
                head/shoulders overflow above the circle's top edge.
              */}
              <div
                className="relative"
                style={{
                  width: "clamp(260px, 28vw, 380px)",
                  height: "clamp(340px, 37vw, 500px)",
                }}
              >
                {/* Orange glow — same footprint as the circle, sits behind it */}
                <div
                  className="absolute inset-x-0 bottom-0 rounded-full bg-[#E67E22]/10 blur-3xl"
                  style={{ height: "clamp(260px, 28vw, 380px)" }}
                />

                {/* Circle frame — NO overflow-hidden so the portrait breaks out above */}
                <div
                  className="absolute inset-x-0 bottom-0 rounded-full bg-[#252421]/70 border-4 border-[#E67E22]"
                  style={{ height: "clamp(260px, 28vw, 380px)" }}
                />

                {/* Portrait — fills wrapper height, bottom-anchored so head pops above circle */}
                <Image
                  src="/images/neo2d.jpeg"
                  alt="Neo Zino – Freelance Web Developer"
                  fill
                  className="object-contain object-bottom z-10"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
