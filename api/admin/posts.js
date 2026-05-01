import { readJsonBody, requireSession } from "../_lib/adminAuth.js";
import { listPostsFromGitHub, savePostToGitHub } from "../_lib/githubBlog.js";

export default async function handler(req, res) {
  const session = requireSession(req, res);
  if (!session) {
    return;
  }

  try {
    if (req.method === "GET") {
      const posts = await listPostsFromGitHub();
      res.status(200).json({ posts });
      return;
    }

    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const savedPost = await savePostToGitHub(body.post || {}, body.originalSlug || null);
      const posts = await listPostsFromGitHub();

      res.status(200).json({
        post: savedPost,
        posts,
        message: `Published "${savedPost.title}". GitHub committed the markdown file and Vercel will redeploy from main.`,
      });
      return;
    }

    res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    const statusCode = typeof error?.statusCode === "number" ? error.statusCode : 500;
    const message = error instanceof Error ? error.message : "Unexpected admin error.";
    res.status(statusCode).json({ error: message });
  }
}
