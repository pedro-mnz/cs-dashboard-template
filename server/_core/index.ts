import "dotenv/config";
import express, { type Request, type Response } from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { startScheduler } from "../scheduler";
import * as storage from "../storage";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // OAuth callback under /api/oauth/callback (Manus auth)
  registerOAuthRoutes(app);

  // Gmail OAuth callback — /api/gmail/callback
  app.get("/api/gmail/callback", async (req: Request, res: Response) => {
    const code = typeof req.query.code === "string" ? req.query.code : "";
    const state = typeof req.query.state === "string" ? req.query.state : "";
    const error = typeof req.query.error === "string" ? req.query.error : "";

    if (error) {
      console.error("[Gmail OAuth] User denied access or error:", error);
      res.redirect("/?gmail_error=" + encodeURIComponent(error));
      return;
    }

    if (!code || !state) {
      res.status(400).send("Missing code or state");
      return;
    }

    try {
      // Exchange code for tokens
      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: process.env.GMAIL_CLIENT_ID ?? "",
          client_secret: process.env.GMAIL_CLIENT_SECRET ?? "",
          redirect_uri: process.env.GMAIL_REDIRECT_URI ?? "",
          grant_type: "authorization_code",
        }).toString(),
      });

      if (!tokenRes.ok) {
        const err = await tokenRes.text();
        console.error("[Gmail OAuth] Token exchange failed:", err);
        res.redirect("/?gmail_error=token_exchange_failed");
        return;
      }

      const tokens: any = await tokenRes.json();

      // Get user email
      let email = "";
      try {
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        const userInfo: any = await userRes.json();
        email = userInfo.email ?? "";
      } catch {}

      // Decode userId from state
      let userId = "pedro"; // default to pedro since this is a single-user dashboard
      try {
        const decoded = JSON.parse(Buffer.from(state, "base64url").toString());
        userId = decoded.userId ?? "pedro";
      } catch {}

      await storage.saveGmailTokens(userId, {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ?? null,
        expiresAt: Date.now() + (tokens.expires_in ?? 3600) * 1000,
        email,
      });

      console.log(`[Gmail OAuth] Connected successfully for ${email}`);
      res.redirect("/?gmail_connected=true");
    } catch (err: any) {
      console.error("[Gmail OAuth] Callback error:", err.message);
      res.redirect("/?gmail_error=callback_failed");
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    // Start daily auto-refresh scheduler (7:00 AM BRT)
    startScheduler();
  });
}

startServer().catch(console.error);
