import PortalChooser from "@/components/portal/PortalChooser";
import PortfolioHome from "@/components/PortfolioHome";

/**
 * Developer products portal — a maker-hub (Marc Lou model, dark) that routes a
 * visitor to one of Neo Zino's Claude Code tools. Replaces the freelance
 * homepage on the `dev-products-portal` branch (old site preserved via the
 * `portfolio-v1` tag and untouched `main`).
 *
 * A `?lang=` param swaps the homepage back to the old freelance portfolio
 * (the pre-portal site): `?lang=he` Hebrew, `?lang=en` English. Plain `/`
 * (no param) keeps the dev-tools portal. Reading searchParams opts `/` into
 * dynamic rendering — acceptable for a personal hub.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  if (lang === "he" || lang === "en") return <PortfolioHome />;

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-portal-canvas">
      {/* Ambient: one faint warm bloom anchored top-center. Depth comes from the
          surface ladder; this only warms the void. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh]"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 0%, rgb(201 100 66 / 0.10), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full flex-col px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
        <PortalChooser />

        <footer className="mx-auto mt-16 w-full max-w-6xl">
          <p className="text-xs text-portal-faint">
            Built by a developer who lives in Claude Code.
          </p>
        </footer>
      </div>
    </main>
  );
}
