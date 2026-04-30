export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
  coverImageAlt?: string;
  body: string;
  bodyHtml: string;
};
