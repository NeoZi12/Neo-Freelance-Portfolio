import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog content system. The SEO guide pipeline drops `.mdx` files into
 * `content/blog/` and this module is the single source of truth for reading
 * them. Slug = filename without the `.mdx` extension.
 *
 * ── Frontmatter contract (every post MUST satisfy this) ────────────────────
 *   title       string    required   — post headline / <h1> / <title>
 *   description string    required   — meta description, keep ≤ 160 chars
 *   date        string    required   — ISO date, e.g. "2026-07-20"
 *   author      string    optional   — defaults to "Neo Zino"
 *   cover       string    optional   — path under /blog/covers, e.g.
 *                                       "/blog/covers/foo.jpg"
 *   tags        string[]  optional   — topic chips
 *   draft       boolean   optional   — when true, excluded from the list,
 *                                       static params, and the sitemap
 *
 * Reading time is derived from the MDX body at ~200 wpm.
 * ───────────────────────────────────────────────────────────────────────────
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  cover?: string;
  tags: string[];
  draft: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: number; // whole minutes, floor 1
};

export type Post = PostMeta & {
  /** Raw MDX body (frontmatter stripped) — pass to <MDXRemote source={…} />. */
  content: string;
};

export type Heading = {
  level: 2 | 3;
  text: string;
  id: string;
};

/**
 * Slugify heading text into a stable anchor id. Used by BOTH the ToC builder
 * and the MDX h2/h3 renderers, so the anchors and the links always agree.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // drop punctuation
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/-+/g, "-") // collapse repeats
    .replace(/^-|-$/g, ""); // trim edge dashes
}

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Coerce raw gray-matter data into the strict frontmatter contract. */
function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Neo Zino"),
    cover: data.cover ? String(data.cover) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft ?? false),
  };
}

function fileExists(): boolean {
  return fs.existsSync(BLOG_DIR);
}

function readRawPost(slug: string): Post | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = normalizeFrontmatter(data);

  return {
    ...frontmatter,
    slug,
    readingTime: readingTime(content),
    content,
  };
}

/** All non-draft posts, newest first. */
export function getAllPosts(): PostMeta[] {
  if (!fileExists()) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => readRawPost(name.replace(/\.mdx$/, "")))
    .filter((post): post is Post => post !== null && !post.draft)
    .map((post): PostMeta => {
      const { content, ...meta } = post;
      void content; // drop the body from list metadata
      return meta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** Slugs of every non-draft post — for generateStaticParams. */
export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/** A single post by slug, including its MDX body. Drafts are still returned
 *  here (so previews work); the list/sitemap/static-params filter them out. */
export function getPostBySlug(slug: string): Post | null {
  return readRawPost(slug);
}

/**
 * Extract the H2/H3 headings from an MDX body for the "On this page" rail.
 * Skips fenced code blocks so a `## comment` inside a snippet never leaks in.
 */
export function getHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    // Strip inline markdown (links, emphasis, code) down to plain text.
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    headings.push({ level, text, id: slugify(text) });
  }

  return headings;
}
