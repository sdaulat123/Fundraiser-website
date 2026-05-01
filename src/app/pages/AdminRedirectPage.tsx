import { ShieldCheck } from "lucide-react";
import { sanityStudioUrl } from "../lib/blog";

export function AdminRedirectPage() {
  const isConfigured = Boolean(sanityStudioUrl);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-12">
        <div className="inline-flex rounded-2xl bg-[#1E3A5F] p-4 text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Owner Blog Admin</p>
        <h1 className="mt-4 text-4xl font-bold text-[#1E3A5F]">Sign in to manage blog posts.</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
          This admin flow is Vercel-compatible and uses Sanity Studio for the owner sign-in and publishing workflow.
          There is no public sign-up on the website itself. Access is controlled by invited Sanity users.
        </p>

        {isConfigured ? (
          <a
            href={sanityStudioUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center rounded-full bg-[#1E3A5F] px-6 py-4 text-sm font-semibold text-white"
          >
            Open Sanity Studio
          </a>
        ) : (
          <div className="mt-8 rounded-[1.5rem] border border-[#1E3A5F]/10 bg-[#FFF7ED] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]/55">Setup Needed</p>
            <p className="mt-3 text-base leading-7 text-gray-700">
              Set `VITE_SANITY_STUDIO_URL` in your Vercel project to the deployed Sanity Studio URL. Once that is set,
              this page becomes the owner sign-in entrypoint.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
