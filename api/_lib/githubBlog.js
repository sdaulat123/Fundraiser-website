const GITHUB_API_BASE = "https://api.github.com";
const POSTS_DIRECTORY = "src/content/posts";

function encodeRepoPath(path) {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function getRepoConfig() {
  return {
    owner: process.env.GITHUB_OWNER || "sdaulat123",
    repo: process.env.GITHUB_REPO || "Fundraiser-website",
    branch: process.env.GITHUB_BRANCH || "main",
    token: process.env.GITHUB_TOKEN || "",
  };
}

function requireToken() {
  const config = getRepoConfig();

  if (!config.token) {
    const error = new Error("Missing GITHUB_TOKEN in Vercel project settings.");
    error.statusCode = 503;
    throw error;
  }

  return config;
}

function createHeaders(token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "liferesource4you-blog-admin",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function githubRequest(path, init = {}) {
  const { token } = getRepoConfig();
  const response = await fetch(`${GITHUB_API_BASE}${path}`, {
    ...init,
    headers: {
      ...createHeaders(token),
      ...(init.headers ?? {}),
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const error = new Error(payload.message || "GitHub request failed.");
    error.statusCode = response.status;
    throw error;
  }

  return response.json();
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw };
  }

  const closingIndex = raw.indexOf("\n---", 3);
  if (closingIndex === -1) {
    return { data: {}, body: raw };
  }

  const data = {};
  const frontmatterSource = raw.slice(3, closingIndex).trim();
  const body = raw.slice(closingIndex + 4).replace(/^\r?\n/, "");

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

  return { data, body };
}

function decodeGitHubContent(content) {
  return Buffer.from(content, "base64").toString("utf8");
}

function toAdminPost(path, raw) {
  const { data, body } = parseFrontmatter(raw);
  const slug = typeof data.slug === "string" && data.slug.trim() ? data.slug.trim() : path.split("/").pop().replace(/\.md$/, "");

  return {
    title: data.title || slug,
    slug,
    image: data.coverImage || "",
    text: body.trim(),
  };
}

function quoteFrontmatterValue(value) {
  return JSON.stringify(value ?? "");
}

function toMarkdown(post) {
  const lines = [
    "---",
    `title: ${quoteFrontmatterValue(post.title)}`,
    `slug: ${quoteFrontmatterValue(post.slug)}`,
    `publishedAt: ${quoteFrontmatterValue(new Date().toISOString())}`,
  ];

  if (post.image) {
    lines.push(`coverImage: ${quoteFrontmatterValue(post.image)}`);
  }

  lines.push("---", "", post.text.trim(), "");
  return lines.join("\n");
}

async function getContentEntry(path, branch) {
  return githubRequest(
    `/repos/${getRepoConfig().owner}/${getRepoConfig().repo}/contents/${encodeRepoPath(path)}?ref=${encodeURIComponent(branch)}`,
  );
}

export async function listPostsFromGitHub() {
  const { owner, repo, branch } = getRepoConfig();
  const entries = await githubRequest(`/repos/${owner}/${repo}/contents/${encodeRepoPath(POSTS_DIRECTORY)}?ref=${encodeURIComponent(branch)}`);

  const markdownEntries = Array.isArray(entries) ? entries.filter((entry) => entry.type === "file" && entry.name.endsWith(".md")) : [];
  const posts = await Promise.all(
    markdownEntries.map(async (entry) => {
      const file = await githubRequest(`/repos/${owner}/${repo}/contents/${encodeRepoPath(entry.path)}?ref=${encodeURIComponent(branch)}`);
      return toAdminPost(entry.path, decodeGitHubContent(file.content || ""));
    }),
  );

  return posts.sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
}

async function putContent(path, content, message, sha, branch) {
  const { owner, repo } = requireToken();
  return githubRequest(`/repos/${owner}/${repo}/contents/${encodeRepoPath(path)}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

async function deleteContent(path, sha, message, branch) {
  const { owner, repo } = requireToken();
  return githubRequest(`/repos/${owner}/${repo}/contents/${encodeRepoPath(path)}`, {
    method: "DELETE",
    body: JSON.stringify({
      message,
      sha,
      branch,
    }),
  });
}

export async function savePostToGitHub(post, originalSlug) {
  const { branch } = requireToken();
  const slug = slugify(post.slug || post.title);

  if (!slug) {
    const error = new Error("Title or slug is required.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedPost = {
    ...post,
    slug,
    image: post.image || "",
    text: post.text || "",
  };

  const path = `${POSTS_DIRECTORY}/${slug}.md`;
  const existingEntry = await getContentEntry(path, branch);
  const markdown = toMarkdown(normalizedPost);

  await putContent(
    path,
    markdown,
    existingEntry ? `Update blog post: ${normalizedPost.title}` : `Add blog post: ${normalizedPost.title}`,
    existingEntry?.sha,
    branch,
  );

  if (originalSlug && originalSlug !== slug) {
    const previousPath = `${POSTS_DIRECTORY}/${originalSlug}.md`;
    const previousEntry = await getContentEntry(previousPath, branch);

    if (previousEntry?.sha) {
      await deleteContent(previousPath, previousEntry.sha, `Rename blog post: ${originalSlug} -> ${slug}`, branch);
    }
  }

  return normalizedPost;
}
