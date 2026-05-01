import crypto from "node:crypto";
import { getExpectedCredentials, readJsonBody, setSessionCookie } from "../_lib/adminAuth.js";

function secureCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const body = await readJsonBody(req);
  const { username, password } = getExpectedCredentials();

  if (!secureCompare(body.username || "", username) || !secureCompare(body.password || "", password)) {
    res.status(401).json({ error: "Invalid username or password." });
    return;
  }

  setSessionCookie(res, username);
  res.status(200).json({ authenticated: true, username });
}
