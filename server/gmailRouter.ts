// gmailRouter.ts
// ─────────────────────────────────────────────────────────────────────────────
// Gmail API integration for the CS Dashboard email digest widget.
// Uses Google OAuth 2.0 with offline access to fetch Pedro's inbox.
// Tokens are stored in the database (storage table) per user.
// ─────────────────────────────────────────────────────────────────────────────

import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import * as storage from "./storage";

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID ?? "";
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET ?? "";
const GMAIL_REDIRECT_URI = process.env.GMAIL_REDIRECT_URI ?? "";

const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
].join(" ");

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: GMAIL_CLIENT_ID,
    redirect_uri: GMAIL_REDIRECT_URI,
    response_type: "code",
    scope: GMAIL_SCOPES,
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GMAIL_CLIENT_ID,
      client_secret: GMAIL_CLIENT_SECRET,
      redirect_uri: GMAIL_REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token exchange failed: ${err}`);
  }
  return res.json();
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GMAIL_CLIENT_ID,
      client_secret: GMAIL_CLIENT_SECRET,
      grant_type: "refresh_token",
    }).toString(),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Token refresh failed: ${err}`);
  }
  const data: any = await res.json();
  return data.access_token;
}

async function getValidAccessToken(userId: string): Promise<string | null> {
  const stored = await storage.getGmailTokens(userId);
  if (!stored) return null;

  const { accessToken, refreshToken, expiresAt } = stored;
  const now = Date.now();

  // If token expires in less than 5 minutes, refresh it
  if (expiresAt && expiresAt - now < 5 * 60 * 1000) {
    if (!refreshToken) return null;
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      await storage.saveGmailTokens(userId, {
        accessToken: newAccessToken,
        refreshToken,
        expiresAt: now + 3600 * 1000,
      });
      return newAccessToken;
    } catch {
      return null;
    }
  }

  return accessToken;
}

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  from: string;
  subject: string;
  date: string;
  isUnread: boolean;
  isClientEmail: boolean;
}

const CLIENT_KEYWORDS = ["magalu", "magazine luiza", "amazon", "samsung", "netshoes", "whatsapp cpg", "abi", "ambev"];

function isClientEmail(from: string, subject: string): boolean {
  const combined = `${from} ${subject}`.toLowerCase();
  return CLIENT_KEYWORDS.some(kw => combined.includes(kw));
}

function extractHeader(headers: Array<{ name: string; value: string }>, name: string): string {
  return headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";
}

async function fetchEmailDigest(accessToken: string): Promise<{
  unreadCount: number;
  messages: GmailMessage[];
  fetchedAt: string;
}> {
  // Get unread count
  const countRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=1",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const countData: any = await countRes.json();
  const unreadCount: number = countData.resultSizeEstimate ?? 0;

  // Get top 10 most recent messages (unread first, then recent)
  const listRes = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=in:inbox&maxResults=10",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const listData: any = await listRes.json();
  const messageIds: string[] = (listData.messages ?? []).map((m: any) => m.id);

  // Fetch each message's metadata
  const messages: GmailMessage[] = [];
  for (const msgId of messageIds.slice(0, 8)) {
    try {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msgId}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const msg: any = await msgRes.json();
      const headers: Array<{ name: string; value: string }> = msg.payload?.headers ?? [];
      const from = extractHeader(headers, "From");
      const subject = extractHeader(headers, "Subject");
      const date = extractHeader(headers, "Date");
      const isUnread = (msg.labelIds ?? []).includes("UNREAD");

      messages.push({
        id: msgId,
        threadId: msg.threadId,
        snippet: msg.snippet ?? "",
        from,
        subject,
        date,
        isUnread,
        isClientEmail: isClientEmail(from, subject),
      });
    } catch {
      // skip failed messages
    }
  }

  return {
    unreadCount,
    messages,
    fetchedAt: new Date().toISOString(),
  };
}

// ── Router ────────────────────────────────────────────────────────────────────

export const gmailRouter = router({
  // Returns the Google OAuth URL for the user to authorize Gmail access
  getAuthUrl: publicProcedure.query(({ ctx }) => {
    if (!GMAIL_CLIENT_ID || !GMAIL_REDIRECT_URI) {
      return { url: null, configured: false };
    }
    const userId = ctx.user?.openId ?? "anonymous";
    const state = Buffer.from(JSON.stringify({ userId, ts: Date.now() })).toString("base64url");
    return { url: buildAuthUrl(state), configured: true };
  }),

  // Returns whether Gmail is connected for this user
  getStatus: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.openId ?? "anonymous";
    const stored = await storage.getGmailTokens(userId);
    return {
      connected: !!stored?.accessToken,
      email: stored?.email ?? null,
    };
  }),

  // Fetch the email digest (requires connected Gmail)
  getDigest: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.user?.openId ?? "anonymous";
    const accessToken = await getValidAccessToken(userId);
    if (!accessToken) {
      return { connected: false, unreadCount: 0, messages: [], fetchedAt: null };
    }
    try {
      const digest = await fetchEmailDigest(accessToken);
      return { connected: true, ...digest };
    } catch (err: any) {
      console.error("[Gmail] Digest fetch failed:", err.message);
      return { connected: false, unreadCount: 0, messages: [], fetchedAt: null, error: err.message };
    }
  }),

  // Handle OAuth callback (called from the Express route)
  handleCallback: publicProcedure
    .input(z.object({ code: z.string(), state: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const tokens = await exchangeCodeForTokens(input.code);
      let userId = "anonymous";
      try {
        const decoded = JSON.parse(Buffer.from(input.state, "base64url").toString());
        userId = decoded.userId ?? "anonymous";
      } catch {}

      // Get user email from Google
      let email = "";
      try {
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        const userInfo: any = await userRes.json();
        email = userInfo.email ?? "";
      } catch {}

      await storage.saveGmailTokens(userId, {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ?? null,
        expiresAt: Date.now() + tokens.expires_in * 1000,
        email,
      });

      return { success: true, email };
    }),

  // Disconnect Gmail
  disconnect: publicProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user?.openId ?? "anonymous";
    await storage.deleteGmailTokens(userId);
    return { success: true };
  }),
});
