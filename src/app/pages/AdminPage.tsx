import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, LogOut, NotebookPen, Plus, Save } from "lucide-react";

type AdminPost = {
  title: string;
  slug: string;
  image: string;
  text: string;
};

type AdminSession = {
  authenticated: boolean;
  username?: string;
};

const emptyPost: AdminPost = {
  title: "",
  slug: "",
  image: "",
  text: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const payload = (await response.json().catch(() => ({}))) as { error?: string } & T;

  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }

  return payload;
}

export function AdminPage() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("new");
  const [draft, setDraft] = useState<AdminPost>(emptyPost);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [panelError, setPanelError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug) ?? null,
    [posts, selectedSlug],
  );

  useEffect(() => {
    let isMounted = true;

    fetchJson<AdminSession>("/api/admin/session")
      .then((nextSession) => {
        if (isMounted) {
          setSession(nextSession);
        }
      })
      .catch(() => {
        if (isMounted) {
          setSession({ authenticated: false });
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!session?.authenticated) {
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    fetchJson<{ posts: AdminPost[] }>("/api/admin/posts")
      .then((payload) => {
        if (!isMounted) {
          return;
        }

        setPosts(payload.posts);
        setPanelError("");

        if (payload.posts.length > 0) {
          setSelectedSlug((current) => (current === "new" ? payload.posts[0].slug : current));
        }
      })
      .catch((error) => {
        if (isMounted) {
          setPanelError(error instanceof Error ? error.message : "Unable to load blog posts.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [session?.authenticated]);

  useEffect(() => {
    if (selectedPost) {
      setDraft(selectedPost);
      return;
    }

    setDraft(emptyPost);
  }, [selectedPost]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    setStatusMessage("");

    try {
      const nextSession = await fetchJson<AdminSession>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(loginForm),
      });

      setSession(nextSession);
      setLoginForm({ username: "", password: "" });
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Login failed.");
    }
  }

  async function handleLogout() {
    await fetchJson("/api/admin/logout", { method: "POST" });
    setSession({ authenticated: false });
    setPosts([]);
    setSelectedSlug("new");
    setDraft(emptyPost);
    setStatusMessage("");
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setPanelError("");
    setStatusMessage("");

    try {
      const payload = await fetchJson<{ post: AdminPost; posts: AdminPost[]; message: string }>("/api/admin/posts", {
        method: "POST",
        body: JSON.stringify({
          originalSlug: selectedPost?.slug ?? null,
          post: {
            ...draft,
            slug: draft.slug || slugify(draft.title),
            publishedAt: new Date(draft.publishedAt).toISOString(),
          },
        }),
      });

      setPosts(payload.posts);
      setSelectedSlug(payload.post.slug);
      setStatusMessage(payload.message);
    } catch (error) {
      setPanelError(error instanceof Error ? error.message : "Unable to publish this post.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading && !session) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-6 py-24">
        <div className="mx-auto flex max-w-xl items-center justify-center rounded-[2rem] bg-white p-12 shadow-[0_20px_60px_rgba(30,58,95,0.08)]">
          <LoaderCircle className="h-6 w-6 animate-spin text-[#1E3A5F]" />
        </div>
      </div>
    );
  }

  if (!session?.authenticated) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] px-6 py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white p-10 shadow-[0_20px_60px_rgba(30,58,95,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Owner Blog Admin</p>
            <h1 className="mt-4 text-4xl font-bold text-[#1E3A5F]">Sign in to publish blog posts.</h1>
            <p className="mt-5 text-lg leading-8 text-gray-700">
            This admin is intentionally simple: title, one picture, and text. Publishing creates a markdown commit in
            GitHub, and Vercel redeploys from `main`.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Username</span>
              <input
                type="text"
                value={loginForm.username}
                onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                autoComplete="username"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Password</span>
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                autoComplete="current-password"
                required
              />
            </label>

            {loginError ? (
              <p className="rounded-2xl border border-[#B42318]/10 bg-[#FEF3F2] px-4 py-3 text-sm font-medium text-[#B42318]">
                {loginError}
              </p>
            ) : null}

            <button
              type="submit"
              className="inline-flex items-center rounded-full bg-[#1E3A5F] px-6 py-3 text-sm font-semibold text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Owner Blog Admin</p>
            <h1 className="mt-3 text-4xl font-bold text-[#1E3A5F]">Manage blog posts in GitHub.</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-[#1E3A5F]/15 px-5 py-3 text-sm font-semibold text-[#1E3A5F]"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {panelError ? (
          <div className="mb-6 rounded-[1.5rem] border border-[#B42318]/10 bg-[#FEF3F2] px-5 py-4 text-sm font-medium text-[#B42318]">
            {panelError}
          </div>
        ) : null}

        {statusMessage ? (
          <div className="mb-6 rounded-[1.5rem] border border-[#1E3A5F]/10 bg-[#ECFDF3] px-5 py-4 text-sm font-medium text-[#166534]">
            {statusMessage}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(30,58,95,0.08)]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">Posts</p>
              <button
                type="button"
                onClick={() => setSelectedSlug("new")}
                className="inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-4 py-2 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                New
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {posts.map((post) => (
                <button
                  key={post.slug}
                  type="button"
                  onClick={() => setSelectedSlug(post.slug)}
                  className={[
                    "w-full rounded-[1.5rem] border px-4 py-4 text-left transition",
                    selectedSlug === post.slug
                      ? "border-[#1E3A5F] bg-[#1E3A5F] text-white"
                      : "border-[#1E3A5F]/10 bg-[#F9FAFB] text-[#1E3A5F]",
                  ].join(" ")}
                >
                  <p className="text-base font-semibold leading-6">{post.title}</p>
                </button>
              ))}
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">
              <NotebookPen className="h-4 w-4" />
              {selectedPost ? "Edit Post" : "New Post"}
            </div>

            <form className="mt-8 space-y-8" onSubmit={handleSave}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Title</span>
                  <input
                    type="text"
                    value={draft.title}
                    onChange={(event) => {
                      const title = event.target.value;
                      setDraft((current) => ({
                        ...current,
                        title,
                        slug: selectedPost ? current.slug : slugify(title),
                      }));
                    }}
                    className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                    required
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Picture URL</span>
                  <input
                    type="url"
                    value={draft.image}
                    onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))}
                    className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Text</span>
                <textarea
                  value={draft.text}
                  onChange={(event) => setDraft((current) => ({ ...current, text: event.target.value }))}
                  className="min-h-[420px] w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 font-mono text-sm text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                  placeholder="Write the post text here..."
                  required
                />
              </label>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isSaving ? "Publishing..." : "Publish To GitHub"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
