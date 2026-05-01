import { defineConfig, Studio } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || import.meta.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const adminConfig = defineConfig({
  name: "default",
  title: "LifeResource4you Studio",
  basePath: "/admin",
  projectId,
  dataset,
  auth: {
    providers: [
      {
        name: "sanity",
        title: "Email / Password",
        url: "https://api.sanity.io/v1/auth/login/sanity",
      },
    ],
  },
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [
      {
        name: "post",
        title: "Post",
        type: "document",
        fields: [
          { name: "title", title: "Title", type: "string" },
          { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 } },
          { name: "publishedAt", title: "Published At", type: "datetime" },
          { name: "category", title: "Category", type: "string" },
          { name: "excerpt", title: "Excerpt", type: "text", rows: 4 },
          {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", title: "Alt Text", type: "string" }],
          },
          {
            name: "body",
            title: "Body",
            type: "array",
            of: [
              {
                type: "block",
                styles: [
                  { title: "Normal", value: "normal" },
                  { title: "Heading 2", value: "h2" },
                  { title: "Heading 3", value: "h3" },
                  { title: "Quote", value: "blockquote" },
                ],
                lists: [{ title: "Bullet", value: "bullet" }],
              },
            ],
          },
        ],
        preview: {
          select: {
            title: "title",
            subtitle: "category",
            media: "coverImage",
          },
        },
      },
    ],
  },
});

export function AdminStudioPage() {
  if (!projectId || !dataset) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_rgba(30,58,95,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Owner Blog Admin</p>
          <h1 className="mt-4 text-4xl font-bold text-[#1E3A5F]">Sanity is not configured yet.</h1>
          <p className="mt-5 text-lg leading-8 text-gray-700">
            Add the Sanity project ID and dataset environment variables to Vercel so the embedded Studio can load here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", maxHeight: "100dvh", overflow: "auto", overscrollBehavior: "none" }}>
      <Studio config={adminConfig} />
    </div>
  );
}
