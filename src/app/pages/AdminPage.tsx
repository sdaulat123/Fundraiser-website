import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, LogOut, NotebookPen, Plus, Save, Search, Trash2 } from "lucide-react";

type AdminPost = {
  title: string;
  slug: string;
  image: string;
  text: string;
};

type PendingImageUpload = {
  dataUrl: string;
  name: string;
  type: string;
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
  const [draft, setDraft] = useState<AdminPost>(emptyPost);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [panelError, setPanelError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [pendingImageUpload, setPendingImageUpload] = useState<PendingImageUpload | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return posts;
    }

    return posts.filter((post) => post.title.toLowerCase().includes(query) || post.slug.toLowerCase().includes(query));
  }, [posts, searchQuery]);

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

  async function handleImageSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPendingImageUpload(null);
      return;
    }

    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => reject(new Error("Unable to read the selected image."));
      reader.readAsDataURL(file);
    });

    setPendingImageUpload({
      dataUrl,
      name: file.name,
      type: file.type,
    });

    setDraft((current) => ({
      ...current,
      image: dataUrl,
    }));
  }

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
    setDraft(emptyPost);
    setStatusMessage("");
    setEditingSlug(null);
  }

  function handleNewPost() {
    setDraft(emptyPost);
    setPendingImageUpload(null);
    setStatusMessage("");
    setPanelError("");
    setEditingSlug(null);
  }

  function handleEditPost(post: AdminPost) {
    setDraft(post);
    setEditingSlug(post.slug);
    setPendingImageUpload(null);
    setStatusMessage("");
    setPanelError("");
  }

  async function handleDeletePost(post: AdminPost) {
    const shouldDelete = window.confirm(`Delete "${post.title}"?`);
    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    setPanelError("");
    setStatusMessage("");

    try {
      const payload = await fetchJson<{ posts: AdminPost[]; message: string }>("/api/admin/posts", {
        method: "DELETE",
        body: JSON.stringify({ post }),
      });

      setPosts(payload.posts);
      setStatusMessage(payload.message);

      if (editingSlug === post.slug) {
        setDraft(emptyPost);
        setEditingSlug(null);
        setPendingImageUpload(null);
      }
    } catch (error) {
      setPanelError(error instanceof Error ? error.message : "Unable to delete this post.");
    } finally {
      setIsDeleting(false);
    }
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
          originalSlug: editingSlug,
          post: {
            ...draft,
            slug: slugify(draft.slug || draft.title),
          },
          imageUpload: pendingImageUpload,
        }),
      });

      setPosts(payload.posts);
      setDraft(payload.post);
      setEditingSlug(payload.post.slug);
      setStatusMessage(payload.message);
      setPendingImageUpload(null);
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
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">
              <Search className="h-4 w-4" />
              Search Posts
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title..."
              className="mt-4 w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
            />

            <div className="mt-5 space-y-3">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.slug} className="rounded-[1.5rem] border border-[#1E3A5F]/10 bg-[#F9FAFB] p-4">
                    <p className="text-base font-semibold leading-6 text-[#1E3A5F]">{post.title}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-[#1E3A5F]/50">{post.slug}</p>
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEditPost(post)}
                        className="rounded-full bg-[#1E3A5F] px-4 py-2 text-sm font-semibold text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-2 rounded-full border border-[#B42318]/15 px-4 py-2 text-sm font-semibold text-[#B42318] disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-[#1E3A5F]/10 bg-[#F9FAFB] p-4 text-sm text-[#1E3A5F]/70">
                  No posts found.
                </div>
              )}
            </div>
          </aside>

          <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(30,58,95,0.08)] md:p-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#1E3A5F]/55">
                <NotebookPen className="h-4 w-4" />
                {editingSlug ? "Edit Post" : "New Post"}
              </div>
              <button
                type="button"
                onClick={handleNewPost}
                className="inline-flex items-center gap-2 rounded-full bg-[#1E3A5F] px-4 py-2 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                New
              </button>
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
                        slug: editingSlug ? current.slug : slugify(title),
                      }));
                    }}
                    className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Slug</span>
                  <input
                    type="text"
                    value={draft.slug}
                    onChange={(event) => setDraft((current) => ({ ...current, slug: slugify(event.target.value) }))}
                    className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                    required
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Picture</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelection}
                    className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#1E3A5F] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white focus:border-[#1E3A5F]"
                  />
                  <p className="mt-2 text-sm text-[#1E3A5F]/65">
                    Upload one image for the post. If you leave this alone, the current image stays as-is.
                  </p>
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-[#1E3A5F]">Or Picture URL</span>
                  <input
                    type="url"
                    value={draft.image}
                    onChange={(event) => setDraft((current) => ({ ...current, image: event.target.value }))}
                    className="w-full rounded-2xl border border-[#1E3A5F]/15 px-4 py-3 text-base text-[#1E3A5F] outline-none transition focus:border-[#1E3A5F]"
                  />
                </label>
              </div>

              {draft.image ? (
                <div className="rounded-[1.5rem] border border-[#1E3A5F]/10 bg-[#F9FAFB] p-4">
                  <p className="mb-3 text-sm font-semibold text-[#1E3A5F]">Image Preview</p>
                  <img src={draft.image} alt={draft.title || "Blog preview"} className="max-h-80 rounded-2xl object-cover" />
                </div>
              ) : null}

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
