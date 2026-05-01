import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { motion } from "motion/react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link, useParams } from "react-router";
import { getBlogPostBySlug } from "../lib/blog";
import type { BlogPost } from "../types/blog";

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    let isMounted = true;

    getBlogPostBySlug(slug).then((nextPost) => {
      if (isMounted) {
        setPost(nextPost);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_rgba(30,58,95,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Blog</p>
          <h1 className="mt-4 text-4xl font-bold text-[#1E3A5F]">Loading article...</h1>
          <p className="mt-5 text-lg leading-8 text-gray-700">
            The article is loading from the blog content source.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#102840] via-[#1E3A5F] to-[#6BAF92] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[-4%] top-10 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-[-8%] right-[-3%] h-72 w-72 rounded-full bg-[#F59E0B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Blog
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            {post.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/80"
          >
            <CalendarDays className="h-4 w-4" />
            {formatPublishedDate(post.publishedAt)}
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-12">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              className="mb-10 h-auto w-full rounded-[1.5rem] object-cover"
            />
          ) : null}
          {typeof post.body === "string" ? (
            <div
              className="prose prose-lg max-w-none prose-headings:text-[#1E3A5F] prose-p:text-gray-700 prose-a:text-[#1E3A5F] prose-strong:text-[#1E3A5F]"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml ?? "" }}
            />
          ) : (
            <div className="prose prose-lg max-w-none prose-headings:text-[#1E3A5F] prose-p:text-gray-700 prose-a:text-[#1E3A5F] prose-strong:text-[#1E3A5F]">
              <PortableText value={post.body} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
