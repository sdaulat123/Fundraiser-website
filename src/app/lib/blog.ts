import { getLocalBlogPostBySlug, getLocalBlogPosts } from "./blogLocal";

export function getBlogPosts() {
  return Promise.resolve(getLocalBlogPosts());
}

export function getBlogPostBySlug(slug: string) {
  return Promise.resolve(getLocalBlogPostBySlug(slug));
}
