import { getSession } from "../_lib/adminAuth.js";

export default async function handler(req, res) {
  const session = getSession(req);

  if (!session) {
    res.status(200).json({ authenticated: false });
    return;
  }

  res.status(200).json({ authenticated: true, username: session.username });
}
