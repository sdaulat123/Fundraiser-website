import type { BlogPost } from "../types/blog";

const markdownModules = import.meta.glob("../../content/posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

type Frontmatter = Record<string, string>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const closingIndex = raw.indexOf("\n---", 3);
  if (closingIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatterSource = raw.slice(3, closingIndex).trim();
  const content = raw.slice(closingIndex + 4).replace(/^\r?\n/, "");
  const data: Frontmatter = {};

  for (const line of frontmatterSource.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key) {
      data[key] = value;
    }
  }

  return { data, content };
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    html.push(`<p>${renderInlineMarkdown(paragraphBuffer.join(" "))}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (listBuffer.length === 0) {
      return;
    }

    html.push(`<ul>${listBuffer.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join("")}</ul>`);
    listBuffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h2>${renderInlineMarkdown(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h3>${renderInlineMarkdown(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(trimmed.slice(2));
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();

  return html.join("");
}

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
  const { data, content } = parseFrontmatter(raw);
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
    bodyHtml: markdownToHtml(content),
  } satisfies BlogPost;
}

const allLocalPosts = Object.entries(markdownModules)
  .map(parsePost)
  .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());

export function getLocalBlogPosts() {
  return allLocalPosts;
}

export function getLocalBlogPostBySlug(slug: string) {
  return allLocalPosts.find((post) => post.slug === slug) ?? null;
}
