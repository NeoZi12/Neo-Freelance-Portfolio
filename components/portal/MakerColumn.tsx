import Image from "next/image";

/**
 * The maker anchor — the "studio as a person" column (Marc Lou model).
 * Establishes Neo Zino as the hand behind both tools, so the products hang off
 * a credible maker rather than floating on their own.
 */
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.95rem] w-[0.95rem]" fill="currentColor" aria-hidden>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-portal-line bg-portal-raised text-portal-muted transition-colors hover:border-portal-line-strong hover:text-portal-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clock-clay focus-visible:ring-offset-2 focus-visible:ring-offset-portal-canvas"
    >
      {children}
    </a>
  );
}

export default function MakerColumn() {
  return (
    <div className="flex flex-col items-start">
      <div className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-portal-line-strong sm:h-24 sm:w-24">
        <Image
          src="/portal/neo-photo.jpg"
          alt="Neo Zino"
          width={213}
          height={320}
          loading="eager"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-portal-ink sm:text-4xl">
        Neo Zino
      </h1>

      <p className="mt-3 max-w-[34ch] text-pretty text-base italic leading-relaxed text-portal-muted">
        “I live in Claude Code — so I build the tools I wish it shipped with.”
      </p>

      <p className="mt-4 max-w-[36ch] text-pretty text-sm leading-relaxed text-portal-muted">
        Two tools for Claude Code: set it up to full power, then cut what it
        wastes. Pick where your setup is today.
      </p>

      <div className="mt-6 flex items-center gap-2.5">
        <SocialLink href="https://github.com/NeoZi12" label="Neo Zino on GitHub">
          <GitHubIcon />
        </SocialLink>
        <SocialLink href="https://x.com/clockedcode" label="Follow the build on X">
          <XIcon />
        </SocialLink>
      </div>
    </div>
  );
}
