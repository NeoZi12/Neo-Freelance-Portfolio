import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ── Server-only content utilities ──────────────────────────────────────────
// Reads `content/blog/*.mdx`, parses frontmatter, and derives the bits the
// list + detail pages need (reading time, headings for the ToC). Nothing
// here touches the client bundle — every caller is a Server Component.

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-07-27"
  tags: string[];
  author: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTime: number; // minutes, rounded up
};

export type Heading = {
  id: string;
  text: string;
};

export type Post = PostMeta & {
  content: string; // raw MDX body (frontmatter stripped)
  headings: Heading[];
};

/** "2026-07-27" -> "Jul 27, 2026" — used by both the list and detail pages. */
export function formatPostDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Turns a heading's text into the same anchor id the H2 renderer assigns. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function readingTimeFor(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Pulls every H2 (`## `) line out of the raw MDX body for the "On this page" ToC. */
function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const lines = content.split("\n");
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^##\s+(.+)$/.exec(line.trim());
    if (match) {
      const text = match[1].trim();
      headings.push({ id: slugifyHeading(text), text });
    }
  }

  return headings;
}

function slugsOnDisk(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** All posts, newest first — used by the list page and the sitemap. */
export function getAllPostsMeta(): PostMeta[] {
  const posts = slugsOnDisk().map((slug) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    return {
      ...fm,
      slug,
      readingTime: readingTimeFor(content),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs(): string[] {
  return slugsOnDisk();
}

/** A single post with its compiled-ready MDX body and derived ToC. */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    ...fm,
    slug,
    readingTime: readingTimeFor(content),
    content,
    headings: extractHeadings(content),
  };
}
