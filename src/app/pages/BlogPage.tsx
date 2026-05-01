import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CalendarDays, NotebookPen } from "lucide-react";
import { Link } from "react-router";
import { getBlogPosts } from "../lib/blog";
import type { BlogPost } from "../types/blog";

function formatPublishedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    let isMounted = true;

    getBlogPosts().then((nextPosts) => {
      if (isMounted) {
        setPosts(nextPosts);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const [featuredPost, ...recentPosts] = posts;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#102840] via-[#1E3A5F] to-[#6BAF92] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute left-[-4%] top-6 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-4%] h-80 w-80 rounded-full bg-[#F59E0B] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-white/70"
          >
            Blog
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="max-w-5xl text-4xl font-bold leading-tight md:text-6xl"
          >
            Updates, guidance, and practical insight from the work happening across family support, teen services, and shared living.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-4xl text-lg leading-8 text-white/90 md:text-xl"
          >
            Use this page for service updates, intake guidance, educational content, and community-facing articles that help explain how LifeResource4you works.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10"
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]/55">
              <NotebookPen className="h-4 w-4" />
              {featuredPost?.category ?? "Blog"}
            </div>
            <h2 className="mt-5 text-3xl font-bold text-[#1E3A5F] md:text-4xl">
              {featuredPost?.title ?? "Loading latest article..."}
            </h2>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1E3A5F]/60">
              <CalendarDays className="h-4 w-4" />
              {featuredPost ? formatPublishedDate(featuredPost.publishedAt) : "Preparing content"}
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              {featuredPost?.excerpt ??
                "The most recent post will appear here once blog content has loaded."}
            </p>
            <Link
              to={featuredPost ? `/blog/${featuredPost.slug}` : "/blog"}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white"
            >
              Featured Article
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[2rem] border border-[#1E3A5F]/10 bg-[#FFF7ED] p-8 shadow-[0_18px_55px_rgba(30,58,95,0.08)] md:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">How To Use This</p>
            <h3 className="mt-4 text-3xl font-bold text-[#1E3A5F]">A place for ongoing communication, not static brochure copy.</h3>
            <div className="mt-6 space-y-4 text-gray-700">
              <p className="rounded-2xl bg-white px-5 py-4">
                The owner signs in to the private admin to write, edit, and publish posts whenever needed.
              </p>
              <p className="rounded-2xl bg-white px-5 py-4">
                Each publish creates or updates a markdown file in GitHub, then Vercel redeploys the site from `main`.
              </p>
              <p className="rounded-2xl bg-white px-5 py-4">
                Access stays sign-in only because the admin uses a private username and password instead of public registration.
              </p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Recent Posts</p>
            <h2 className="mt-4 text-3xl font-bold text-[#1E3A5F] md:text-4xl">Published articles from the owner blog.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl border border-[#1E3A5F]/10 bg-white p-7 shadow-[0_16px_45px_rgba(30,58,95,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">{post.category}</p>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-[#1E3A5F]">{post.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#1E3A5F]/60">
                  <CalendarDays className="h-4 w-4" />
                  {formatPublishedDate(post.publishedAt)}
                </div>
                <p className="mt-5 leading-7 text-gray-600">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A5F]"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
