import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/blog";

const BASE_URL = "https://neo-freelance-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();

  const latestPostDate = posts[0] ? new Date(posts[0].date) : new Date("2026-04-04");

  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-04-04"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
