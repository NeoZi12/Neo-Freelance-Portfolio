import Link from "next/link";
import { cn } from "@/lib/utils";
import { montserrat } from "@/lib/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PostNotFound() {
  return (
    <>
      <Navbar />
      <main
        className={cn(
          "flex min-h-[100dvh] flex-col bg-gradient-to-b from-blog-dark to-blog-warm",
          montserrat.className,
        )}
      >
        <div className="h-[64px] lg:h-[90px] shrink-0" />

        <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">404</p>
          <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            That post doesn&apos;t exist.
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            It may have been renamed or removed. Head back to the full list of articles.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center justify-center rounded-[18px] bg-brand-orange px-7 py-3.5 text-sm font-semibold text-white shadow-[0px_10px_24px_rgba(230,126,34,0.4)] transition-shadow duration-200 hover:shadow-[0px_14px_30px_rgba(230,126,34,0.6)]"
          >
            All articles
          </Link>
        </div>

        <Footer />
      </main>
    </>
  );
}
