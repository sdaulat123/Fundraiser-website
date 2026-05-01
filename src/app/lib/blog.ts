import { createClient } from "@sanity/client";
import { getLocalBlogPostBySlug, getLocalBlogPosts } from "./blogLocal";
import type { BlogPortableTextBlock, BlogPost } from "../types/blog";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || import.meta.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION || import.meta.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-30";
const useCdn =
  (import.meta.env.VITE_SANITY_USE_CDN || import.meta.env.NEXT_PUBLIC_SANITY_USE_CDN || "true") !== "false";

export const isSanityConfigured = Boolean(projectId && dataset);
export const sanityStudioUrl =
  import.meta.env.VITE_SANITY_STUDIO_URL?.trim() || import.meta.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || "";

const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

const blogPostProjection = `{
  "id": coalesce(_id, slug.current),
  title,
  "slug": slug.current,
  "category": coalesce(category, "General"),
  "excerpt": coalesce(excerpt, ""),
  publishedAt,
  "coverImage": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  body
}`;

const blogPostsQuery = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) ${blogPostProjection}`;
const blogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${blogPostProjection}`;

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
}

function normalizeSanityPost(post: Omit<BlogPost, "body"> & { body?: BlogPortableTextBlock[] | null }) {
  return {
    ...post,
    excerpt: post.excerpt || "",
    body: post.body ?? [],
  } satisfies BlogPost;
}

export async function getBlogPosts() {
  if (!sanityClient) {
    return getLocalBlogPosts();
  }

  try {
    const posts = await sanityClient.fetch<Array<Omit<BlogPost, "body"> & { body?: BlogPortableTextBlock[] | null }>>(
      blogPostsQuery,
    );

    if (!posts.length) {
      return getLocalBlogPosts();
    }

    return sortPosts(posts.map(normalizeSanityPost));
  } catch (error) {
    console.error("Failed to fetch Sanity blog posts", error);
    return getLocalBlogPosts();
  }
}

export async function getBlogPostBySlug(slug: string) {
  if (!sanityClient) {
    return getLocalBlogPostBySlug(slug);
  }

  try {
    const post = await sanityClient.fetch<
      (Omit<BlogPost, "body"> & { body?: BlogPortableTextBlock[] | null }) | null
    >(blogPostBySlugQuery, { slug });

    return post ? normalizeSanityPost(post) : getLocalBlogPostBySlug(slug);
  } catch (error) {
    console.error(`Failed to fetch Sanity blog post: ${slug}`, error);
    return getLocalBlogPostBySlug(slug);
  }
}
