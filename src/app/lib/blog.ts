import matter from "gray-matter";
import { marked } from "marked";
import type { BlogPost } from "../types/blog";

const markdownModules = import.meta.glob("../../content/posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

marked.setOptions({
  breaks: true,
  gfm: true,
});

function normalizeExcerpt(excerpt: unknown, body: string) {
  if (typeof excerpt === "string" && excerpt.trim().length > 0) {
    return excerpt.trim();
  }

  return body
    .replace(/[#>*_`-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function normalizeSlug(filename: string, frontmatterSlug: unknown) {
  if (typeof frontmatterSlug === "string" && frontmatterSlug.trim().length > 0) {
    return frontmatterSlug.trim();
  }

  return filename.replace(/^.*[\\/]/, "").replace(/\.md$/, "");
}

function parsePost([filename, source]: [string, unknown]) {
  const raw = typeof source === "string" ? source : "";
  const { data, content } = matter(raw);
  const slug = normalizeSlug(filename, data.slug);
  const title = typeof data.title === "string" && data.title.trim().length > 0 ? data.title.trim() : slug;
  const category =
    typeof data.category === "string" && data.category.trim().length > 0 ? data.category.trim() : "General";
  const publishedAt =
    typeof data.publishedAt === "string" && data.publishedAt.trim().length > 0
      ? data.publishedAt
      : new Date().toISOString();
  const excerpt = normalizeExcerpt(data.excerpt, content);
  const coverImage = typeof data.coverImage === "string" ? data.coverImage : undefined;
  const coverImageAlt = typeof data.coverImageAlt === "string" ? data.coverImageAlt : undefined;

  return {
    id: slug,
    title,
    slug,
    category,
    excerpt,
    publishedAt,
    coverImage,
    coverImageAlt,
    body: content,
    bodyHtml: marked.parse(content) as string,
  } satisfies BlogPost;
}

const allPosts = Object.entries(markdownModules)
  .map(parsePost)
  .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

export function getBlogPosts() {
  return allPosts;
}

export function getBlogPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug) ?? null;
}
