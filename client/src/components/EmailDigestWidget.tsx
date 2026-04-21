// EmailDigestWidget.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Gmail email digest widget for the Overview section.
// Shows unread count + top recent emails from pedromenezes@meta.com.
// Connects via Gmail API OAuth (Google OAuth 2.0).
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Mail, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, Inbox, Tag } from "lucide-react";
import { toast } from "sonner";

const CLIENT_COLORS: Record<string, { color: string; bg: string }> = {
  magalu:    { color: "#0066CC", bg: "#EBF4FF" },
  amazon:    { color: "#FF9900", bg: "#FFF8EC" },
  samsung:   { color: "#1428A0", bg: "#EEF0FF" },
  netshoes:  { color: "#E30613", bg: "#FFF0F0" },
  whatsapp:  { color: "#25D366", bg: "#F0FFF4" },
  abi:       { color: "#F5A623", bg: "#FFF8EC" },
};

function getClientStyle(from: string, subject: string): { color: string; bg: string } | null {
  const combined = `${from} ${subject}`.toLowerCase();
  for (const [key, style] of Object.entries(CLIENT_COLORS)) {
    if (combined.includes(key)) return style;
  }
  return null;
}

function formatEmailDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);
    if (diffH < 1) return "Just now";
    if (diffH < 24) return `${diffH}h ago`;
    if (diffD === 1) return "Yesterday";
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

function extractSenderName(from: string): string {
  // "Name Surname <email@domain.com>" → "Name Surname"
  const match = from.match(/^"?([^"<]+)"?\s*</);
  if (match) return match[1].trim();
  // Just an email
  return from.replace(/<.*>/, "").trim() || from;
}

export function EmailDigestWidget() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const statusQuery = trpc.gmail.getStatus.useQuery(undefined, {
    staleTime: 60_000,
  });

  const authUrlQuery = trpc.gmail.getAuthUrl.useQuery(undefined, {
    staleTime: 300_000,
  });

  const digestQuery = trpc.gmail.getDigest.useQuery(undefined, {
    enabled: statusQuery.data?.connected === true,
    staleTime: 5 * 60_000,
    refetchInterval: 10 * 60_000, // auto-refresh every 10 minutes
  });

  const disconnectMutation = trpc.gmail.disconnect.useMutation({
    onSuccess: () => {
      toast.success("Gmail disconnected");
      statusQuery.refetch();
    },
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await digestQuery.refetch();
      toast.success("Email digest refreshed");
    } catch {
      toast.error("Failed to refresh email digest");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleConnect = () => {
    const url = authUrlQuery.data?.url;
    if (!url) {
      toast.error("Gmail OAuth not configured — add GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REDIRECT_URI to your environment variables.");
      return;
    }
    window.open(url, "_blank", "width=500,height=600,noopener,noreferrer");
    toast.info("Complete the sign-in in the popup, then refresh this page.");
  };

  const isConnected = statusQuery.data?.connected;
  const isConfigured = authUrlQuery.data?.configured !== false;
  const digest = digestQuery.data;

  // ── Not connected state ────────────────────────────────────────────────────
  if (!isConnected) {
    return (
      <div
        className="metric-card animate-fade-in-up"
        style={{ borderLeft: "3px solid #0064E0" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#EBF4FF" }}
          >
            <Mail size={16} style={{ color: "#0064E0" }} />
          </div>
          <div>
            <h3 className="section-title">Email Digest</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Connect your Meta Gmail to see inbox highlights here
            </p>
          </div>
        </div>

        {isConfigured ? (
          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: "#0064E0",
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <Mail size={14} />
            Connect pedromenezes@meta.com
          </button>
        ) : (
          <div
            className="flex items-start gap-2 p-3 rounded-lg"
            style={{ background: "#FFF8EC", border: "1px solid #FDE68A" }}
          >
            <AlertCircle size={14} style={{ color: "#D97706", marginTop: "1px", flexShrink: 0 }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: "#92400E", fontFamily: "'Montserrat', sans-serif" }}>
                Gmail API not configured
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add <code className="text-xs bg-gray-100 px-1 rounded">GMAIL_CLIENT_ID</code>,{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">GMAIL_CLIENT_SECRET</code>, and{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">GMAIL_REDIRECT_URI</code> to your environment.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Loading state ──────────────────────────────────────────────────────────
  if (digestQuery.isLoading) {
    return (
      <div className="metric-card animate-fade-in-up" style={{ borderLeft: "3px solid #0064E0" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#EBF4FF" }}>
            <Mail size={16} style={{ color: "#0064E0" }} />
          </div>
          <div>
            <h3 className="section-title">Email Digest</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Loading your inbox…</p>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-lg animate-pulse" style={{ background: "#F3F4F6" }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error / not connected after load ──────────────────────────────────────
  if (!digest?.connected) {
    return (
      <div className="metric-card animate-fade-in-up" style={{ borderLeft: "3px solid #F59E0B" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#FFF8EC" }}>
            <AlertCircle size={16} style={{ color: "#D97706" }} />
          </div>
          <div>
            <h3 className="section-title">Email Digest</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Session expired — reconnect to refresh</p>
          </div>
        </div>
        <button
          onClick={handleConnect}
          className="text-xs font-semibold hover:underline"
          style={{ color: "#0064E0", fontFamily: "'Montserrat', sans-serif" }}
        >
          Reconnect Gmail →
        </button>
      </div>
    );
  }

  const messages = digest.messages ?? [];
  const unreadCount = digest.unreadCount ?? 0;
  const clientEmails = messages.filter((m) => m.isClientEmail);
  const otherEmails = messages.filter((m) => !m.isClientEmail);

  // ── Connected + data ───────────────────────────────────────────────────────
  return (
    <div className="metric-card animate-fade-in-up" style={{ borderLeft: "3px solid #0064E0" }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: "16px" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#EBF4FF" }}>
            <Mail size={14} style={{ color: "#0064E0" }} />
          </div>
          <div>
            <h3 className="section-title">Email Digest</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {statusQuery.data?.email ?? "pedromenezes@meta.com"} ·{" "}
              {digest.fetchedAt
                ? `Updated ${formatEmailDate(digest.fetchedAt)}`
                : "Live"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Unread badge */}
          {unreadCount > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "#EBF4FF", color: "#0064E0", fontFamily: "'Montserrat', sans-serif" }}
            >
              {unreadCount} unread
            </span>
          )}
          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg transition-all hover:opacity-70"
            style={{ background: "#F3F4F6" }}
            title="Refresh email digest"
          >
            <RefreshCw size={12} style={{ color: "#6B7280", animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
          </button>
          {/* Open Gmail */}
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg transition-all hover:opacity-70"
            style={{ background: "#F3F4F6" }}
            title="Open Gmail"
          >
            <ExternalLink size={12} style={{ color: "#6B7280" }} />
          </a>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <Inbox size={24} style={{ color: "#D1D5DB" }} />
          <p className="text-sm text-muted-foreground">Inbox is empty</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Client emails first */}
          {clientEmails.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Tag size={11} style={{ color: "#0064E0" }} />
                <span className="text-xs font-semibold" style={{ color: "#0064E0", fontFamily: "'Montserrat', sans-serif" }}>
                  Client Emails
                </span>
              </div>
              <div className="space-y-1.5">
                {clientEmails.slice(0, 3).map((msg) => {
                  const clientStyle = getClientStyle(msg.from, msg.subject);
                  return (
                    <div
                      key={msg.id}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg transition-all hover:opacity-80"
                      style={{
                        background: clientStyle?.bg ?? "#F9FAFB",
                        border: `1px solid ${clientStyle?.color ?? "#E5E7EB"}20`,
                      }}
                    >
                      {/* Unread dot */}
                      <div className="mt-1.5 flex-shrink-0">
                        {msg.isUnread ? (
                          <div className="w-2 h-2 rounded-full" style={{ background: "#0064E0" }} />
                        ) : (
                          <div className="w-2 h-2 rounded-full" style={{ background: "#D1D5DB" }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="text-xs font-semibold truncate"
                            style={{
                              color: clientStyle?.color ?? "#374151",
                              fontFamily: "'Montserrat', sans-serif",
                              fontWeight: msg.isUnread ? 700 : 500,
                            }}
                          >
                            {extractSenderName(msg.from)}
                          </span>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {formatEmailDate(msg.date)}
                          </span>
                        </div>
                        <p
                          className="text-xs truncate mt-0.5"
                          style={{
                            color: "#374151",
                            fontWeight: msg.isUnread ? 600 : 400,
                          }}
                        >
                          {msg.subject || "(no subject)"}
                        </p>
                        {msg.snippet && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {msg.snippet}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Other recent emails */}
          {otherEmails.length > 0 && (
            <div>
              {clientEmails.length > 0 && (
                <div className="flex items-center gap-1.5 mb-2 mt-3">
                  <Inbox size={11} style={{ color: "#6B7280" }} />
                  <span className="text-xs font-semibold text-muted-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Recent
                  </span>
                </div>
              )}
              <div className="space-y-1.5">
                {otherEmails.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg"
                    style={{ background: "#F9FAFB", border: "1px solid #F3F4F6" }}
                  >
                    <div className="mt-1.5 flex-shrink-0">
                      {msg.isUnread ? (
                        <div className="w-2 h-2 rounded-full" style={{ background: "#0064E0" }} />
                      ) : (
                        <div className="w-2 h-2 rounded-full" style={{ background: "#D1D5DB" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="text-xs font-semibold truncate"
                          style={{
                            color: "#374151",
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: msg.isUnread ? 700 : 500,
                          }}
                        >
                          {extractSenderName(msg.from)}
                        </span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {formatEmailDate(msg.date)}
                        </span>
                      </div>
                      <p
                        className="text-xs truncate mt-0.5"
                        style={{
                          color: "#374151",
                          fontWeight: msg.isUnread ? 600 : 400,
                        }}
                      >
                        {msg.subject || "(no subject)"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between mt-4 pt-3"
        style={{ borderTop: "1px solid #F3F4F6" }}
      >
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={11} style={{ color: "#10B981" }} />
          <span className="text-xs text-muted-foreground">Gmail connected</span>
        </div>
        <button
          onClick={() => disconnectMutation.mutate()}
          className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
