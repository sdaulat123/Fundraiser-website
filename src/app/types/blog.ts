export type BlogPortableTextBlock = {
  _key?: string;
  _type: string;
  children?: Array<{
    _key?: string;
    _type?: string;
    marks?: string[];
    text?: string;
  }>;
  markDefs?: Array<{
    _key?: string;
    _type: string;
    href?: string;
  }>;
  style?: string;
  listItem?: string;
  level?: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
  coverImageAlt?: string;
  body: string | BlogPortableTextBlock[];
  bodyHtml?: string;
};
