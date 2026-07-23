import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import { isValidElement } from "react";
import { slugify } from "@/lib/blog";

/**
 * MDX → React element map for blog articles. Server-rendered (RSC) so no MDX
 * runtime ships to the client. Long-form reading typography: warm portal ink on
 * the canvas, a comfortable measure set on the article wrapper (~68ch), and
 * clay-accented links. H2/H3 get slugified ids + scroll-margin so the "On this
 * page" rail anchors land clear of the fixed navbar.
 */

/** Flatten a heading's React children down to plain text for slug generation. */
function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/** Scroll-margin clears the fixed navbar (64px mobile / 90px desktop) + air. */
const headingAnchor = "scroll-mt-24 lg:scroll-mt-28";

function H2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const id = slugify(textOf(children));
  return (
    <h2
      id={id}
      className={`${headingAnchor} group mt-14 mb-4 text-2xl font-bold tracking-tight text-portal-ink sm:text-[1.7rem]`}
      {...props}
    >
      <a
        href={`#${id}`}
        className="no-underline"
        aria-label={`${textOf(children)} — permalink`}
      >
        <span className="me-2 select-none text-brand-orange/0 transition-colors group-hover:text-brand-orange">
          #
        </span>
        {children}
      </a>
    </h2>
  );
}

function H3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const id = slugify(textOf(children));
  return (
    <h3
      id={id}
      className={`${headingAnchor} mt-10 mb-3 text-xl font-semibold tracking-tight text-portal-ink`}
      {...props}
    >
      {children}
    </h3>
  );
}

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    // Articles supply their <h1> from the page header, so an in-body h1 is rare.
    <h1
      className="mt-12 mb-5 text-3xl font-bold tracking-tight text-portal-ink"
      {...props}
    />
  ),
  h2: H2,
  h3: H3,
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={`${headingAnchor} mt-8 mb-2 text-lg font-semibold text-portal-ink`}
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-5 text-[1.05rem] leading-[1.85] text-portal-muted" {...props} />
  ),
  a: ({ href = "#", ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-medium text-brand-orange underline decoration-brand-orange/30 decoration-1 underline-offset-[3px] transition-colors hover:decoration-brand-orange"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-5 space-y-2.5 ps-5 text-[1.05rem] leading-[1.8] text-portal-muted marker:text-brand-orange/70 [list-style-type:disc]"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="my-5 space-y-2.5 ps-5 text-[1.05rem] leading-[1.8] text-portal-muted marker:font-semibold marker:text-brand-orange/70 [list-style-type:decimal]"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="ps-1.5 [&>ul]:my-2.5 [&>ol]:my-2.5" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-7 border-s-2 border-brand-orange/60 bg-portal-raised/60 py-2 pe-4 ps-5 text-[1.05rem] italic leading-relaxed text-portal-ink/90 [&>p]:my-1 [&>p]:text-portal-ink/90"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-12 border-0 border-t border-portal-line" />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    // Inline code only — fenced blocks arrive wrapped in <pre> and this <code>
    // inside it inherits pre styling, so keep this chip lightweight.
    <code
      className="rounded-md border border-portal-line bg-portal-inset px-1.5 py-0.5 font-mono text-[0.85em] text-portal-ink [pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-inherit"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-7 overflow-x-auto rounded-2xl border border-portal-line bg-portal-raised p-4 font-mono text-[0.85rem] leading-relaxed text-portal-ink/90 sm:p-5"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-7 overflow-x-auto rounded-2xl border border-portal-line">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead className="bg-portal-raised" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-portal-line px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-portal-faint"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-b border-portal-line px-4 py-3 align-top text-portal-muted"
      {...props}
    />
  ),
  img: ({ src, alt = "" }: ComponentPropsWithoutRef<"img">) => {
    // Markdown images carry no intrinsic dimensions, so we render at a 16:9 box
    // scaled to the column width (sizes hints the responsive source). Authors
    // needing an exact ratio should use next/image directly in the MDX.
    if (!src || typeof src !== "string") return null;
    return (
      <figure className="my-8">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="(min-width: 1024px) 680px, 100vw"
          className="h-auto w-full rounded-2xl border border-portal-line"
        />
        {alt ? (
          <figcaption className="mt-3 text-center text-xs text-portal-faint">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-portal-ink" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),
};
