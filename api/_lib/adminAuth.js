import crypto from "node:crypto";

const SESSION_COOKIE = "owner_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "replace-me-in-vercel";
}

function getCookieMap(req) {
  const rawCookie = req.headers.cookie || "";

  return Object.fromEntries(
    rawCookie
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const separatorIndex = part.indexOf("=");
        if (separatorIndex === -1) {
          return [part, ""];
        }

        return [part.slice(0, separatorIndex), decodeURIComponent(part.slice(separatorIndex + 1))];
      }),
  );
}

function signPayload(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function createSessionValue(username) {
  const payload = JSON.stringify({
    username,
    exp: Date.now() + SESSION_TTL_MS,
  });

  const encodedPayload = toBase64Url(payload);
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

function readSessionValue(value) {
  if (!value || !value.includes(".")) {
    return null;
  }

  const [encodedPayload, signature] = value.split(".");
  const expectedSignature = signPayload(encodedPayload);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  const payload = JSON.parse(fromBase64Url(encodedPayload));

  if (!payload?.username || !payload?.exp || payload.exp < Date.now()) {
    return null;
  }

  return payload;
}

export function getExpectedCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "change-me",
  };
}

export async function readJsonBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function setSessionCookie(res, username) {
  const value = createSessionValue(username);
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}; Secure`,
  );
}

export function clearSessionCookie(res) {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`);
}

export function getSession(req) {
  const cookies = getCookieMap(req);
  return readSessionValue(cookies[SESSION_COOKIE] || "");
}

export function requireSession(req, res) {
  const session = getSession(req);

  if (!session) {
    res.status(401).json({ error: "Unauthorized." });
    return null;
  }

  return session;
}
