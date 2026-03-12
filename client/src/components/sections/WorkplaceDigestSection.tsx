// WorkplaceDigestSection — Pedro Menezes Dashboard
// Design: Warm Structured Intelligence
// Data: Scraped live from fb.workplace.com daily at 7:00 AM BRT

import { ExternalLink, Bell, Palette, Globe, Star, AlertCircle, Info, RefreshCw } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  digestDate,
  digestTime,
  mentionsAndTags,
  creativeShopPosts,
  metaBusinessPosts,
  highlightOfTheDay,
  noUpdatesGroups,
  type WorkplacePost,
} from "@/lib/workplaceDigestData";

const categoryConfig = {
  action: {
    label: "Action Required",
    icon: Bell,
    color: "oklch(0.65 0.22 25)",
    bg: "oklch(0.98 0.015 25)",
    border: "oklch(0.88 0.06 25)",
    badge: "bg-red-100 text-red-700 border-red-200",
  },
  creative_shop: {
    label: "Creative Shop",
    icon: Palette,
    color: "oklch(0.55 0.18 280)",
    bg: "oklch(0.97 0.012 280)",
    border: "oklch(0.88 0.05 280)",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
  },
  meta_business: {
    label: "Meta & Business",
    icon: Globe,
    color: "oklch(0.48 0.16 220)",
    bg: "oklch(0.97 0.01 220)",
    border: "oklch(0.87 0.05 220)",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
  },
};

function PostCard({ post }: { post: WorkplacePost }) {
  const config = categoryConfig[post.category];
  const Icon = config.icon;

  return (
    <div
      className="rounded-xl border p-4 transition-all hover:shadow-md"
      style={{
        background: config.bg,
        borderColor: config.border,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-2 min-w-0">
          <div
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
            style={{ background: config.border }}
          >
            <Icon size={13} style={{ color: config.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
              {post.group}
            </p>
            <h4
              className="text-sm font-bold leading-snug"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "oklch(0.25 0.015 65)" }}
            >
              {post.title}
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {post.requiresAction && (
            <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
              <AlertCircle size={10} />
              Action
            </span>
          )}
          <span className="text-xs text-muted-foreground whitespace-nowrap">{post.timeAgo}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mb-2 ml-9">
        {post.summary}
      </p>

      {post.actionNote && (
        <div
          className="ml-9 mb-2 px-3 py-2 rounded-lg text-xs font-medium"
          style={{ background: "oklch(0.98 0.02 25)", border: "1px solid oklch(0.88 0.06 25)", color: "oklch(0.55 0.18 25)" }}
        >
          <span className="font-bold">→ </span>{post.actionNote}
        </div>
      )}

      {post.whyItMatters && (
        <div
          className="ml-9 mb-2 px-3 py-2 rounded-lg text-xs"
          style={{ background: "oklch(0.97 0.008 65)", border: "1px solid oklch(0.90 0.01 65)", color: "oklch(0.45 0.015 65)" }}
        >
          <span className="font-semibold">Why it matters: </span>{post.whyItMatters}
        </div>
      )}

      <div className="ml-9 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {post.author && (
            <span className="font-medium" style={{ color: "oklch(0.45 0.015 65)" }}>
              {post.author}
            </span>
          )}
          {post.engagement?.reactions !== undefined && post.engagement.reactions > 0 && (
            <span>👍 {post.engagement.reactions}</span>
          )}
          {post.engagement?.comments !== undefined && post.engagement.comments > 0 && (
            <span>💬 {post.engagement.comments}</span>
          )}
          {post.engagement?.views !== undefined && post.engagement.views > 0 && (
            <span>👁 {post.engagement.views.toLocaleString()}</span>
          )}
        </div>
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold hover:underline"
          style={{ color: config.color }}
        >
          Open <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

export default function WorkplaceDigestSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshWorkplace = trpc.scraper.refreshWorkplace.useMutation({
    onMutate: () => setIsRefreshing(true),
    onSuccess: (data) => {
      setIsRefreshing(false);
      if (data.success) {
        toast.success("Workplace Digest refreshed", {
          description: "Scraped latest posts from Workplace. Reloading...",
        });
        setTimeout(() => window.location.reload(), 1200);
      } else if ((data as any).manusAssisted) {
        toast.info("Workplace Digest is refreshed by Manus", {
          description: "Say \"refresh my Workplace digest\" in the Manus chat to update this data. Daily refresh runs at 7 AM BRT.",
          duration: 6000,
        });
      } else {
        toast.warning("Workplace could not be reached", {
          description: "Your Meta session may need to be refreshed in the browser.",
        });
      }
    },
    onError: (err) => {
      setIsRefreshing(false);
      toast.error("Refresh failed", { description: err.message });
    },
  });

  const actionItems = [...mentionsAndTags.filter((p) => p.requiresAction), ...metaBusinessPosts.filter((p) => p.requiresAction)];
  const allActionItems = mentionsAndTags;
  const totalActionRequired = actionItems.length;

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {/* CS Full Wordmark */}
          <div className="flex items-center gap-3 mb-1">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663321707387/ncXKdRsdXjEbWytkFjVxwi/cs-wordmark-black_326cc2cc.png"
              alt="Creative Shop"
              className="h-7 w-auto object-contain"
              style={{ maxWidth: 200 }}
            />
            <span
              className="text-base font-semibold tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "oklch(0.45 0.015 65)" }}
            >
              Daily Digest
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {digestDate} · Auto-refreshed at {digestTime} ·{" "}
            <a
              href="https://fb.workplace.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "oklch(0.48 0.16 220)" }}
            >
              Open Workplace
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "oklch(0.97 0.015 25)", border: "1px solid oklch(0.88 0.06 25)", color: "oklch(0.55 0.18 25)" }}
          >
            <Bell size={12} />
            {totalActionRequired} action{totalActionRequired !== 1 ? "s" : ""} required
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground"
            style={{ background: "white", border: "1px solid oklch(0.90 0.008 65)" }}
          >
            <RefreshCw size={11} />
            Daily at 7 AM BRT
          </div>
          {/* Live refresh button */}
          <button
            onClick={() => !isRefreshing && refreshWorkplace.mutate()}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
            style={{
              background: isRefreshing ? "oklch(0.97 0.012 280)" : "oklch(0.97 0.012 280)",
              color: "oklch(0.55 0.18 280)",
              borderColor: "oklch(0.88 0.05 280)",
              cursor: isRefreshing ? "default" : "pointer",
              opacity: isRefreshing ? 0.8 : 1,
            }}
            title={isRefreshing ? "Scraping Workplace posts..." : "Re-scrape posts from Workplace"}
          >
            <RefreshCw
              size={11}
              style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }}
            />
            {isRefreshing ? "Scraping..." : "Refresh Digest"}
          </button>
        </div>
      </div>

      {/* Highlight of the Day */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: "linear-gradient(135deg, oklch(0.22 0.04 240) 0%, oklch(0.28 0.06 260) 100%)",
          borderColor: "oklch(0.35 0.06 240)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Star size={14} className="text-yellow-400" fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
            Highlight of the Day
          </span>
        </div>
        <h3
          className="text-base font-black text-white mb-2 leading-snug"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {highlightOfTheDay.post.title}
        </h3>
        <p className="text-sm text-white/80 leading-relaxed mb-3">
          {highlightOfTheDay.take}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/60">
            {highlightOfTheDay.post.author} · {highlightOfTheDay.post.group} · {highlightOfTheDay.post.timeAgo}
          </span>
          <a
            href={highlightOfTheDay.post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-yellow-400 hover:text-yellow-300 hover:underline"
          >
            Open post <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Section 1: Action Required */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Bell size={15} style={{ color: "oklch(0.65 0.22 25)" }} />
          <h3
            className="text-base font-black"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "oklch(0.25 0.015 65)" }}
          >
            Action Required
          </h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "oklch(0.88 0.06 25)", color: "oklch(0.55 0.18 25)" }}
          >
            {allActionItems.length}
          </span>
        </div>
        {allActionItems.length === 0 ? (
          <div
            className="rounded-xl border p-4 text-sm text-muted-foreground text-center"
            style={{ background: "oklch(0.98 0.005 65)", borderColor: "oklch(0.92 0.004 65)" }}
          >
            No action items in the last 24h
          </div>
        ) : (
          <div className="space-y-3">
            {allActionItems.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Creative Shop Today */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Palette size={15} style={{ color: "oklch(0.55 0.18 280)" }} />
          <h3
            className="text-base font-black"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "oklch(0.25 0.015 65)" }}
          >
            Creative Shop Today
          </h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "oklch(0.88 0.05 280)", color: "oklch(0.45 0.15 280)" }}
          >
            {creativeShopPosts.length}
          </span>
        </div>
        {creativeShopPosts.length === 0 ? (
          <div
            className="rounded-xl border p-4 text-sm text-muted-foreground text-center"
            style={{ background: "oklch(0.98 0.005 65)", borderColor: "oklch(0.92 0.004 65)" }}
          >
            No updates in the last 24h
          </div>
        ) : (
          <div className="space-y-3">
            {creativeShopPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        {noUpdatesGroups.filter(g => g.startsWith("Creative")).length > 0 && (
          <div
            className="mt-2 px-3 py-2 rounded-lg text-xs text-muted-foreground flex items-center gap-2"
            style={{ background: "oklch(0.97 0.005 65)", border: "1px solid oklch(0.92 0.004 65)" }}
          >
            <Info size={11} />
            No new posts in: {noUpdatesGroups.filter(g => g.startsWith("Creative")).join(", ")}
          </div>
        )}
      </div>

      {/* Section 3: Meta & Business */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Globe size={15} style={{ color: "oklch(0.48 0.16 220)" }} />
          <h3
            className="text-base font-black"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "oklch(0.25 0.015 65)" }}
          >
            Meta & Business
          </h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "oklch(0.87 0.05 220)", color: "oklch(0.38 0.12 220)" }}
          >
            {metaBusinessPosts.length}
          </span>
        </div>
        <div className="space-y-3">
          {metaBusinessPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {noUpdatesGroups.filter(g => g === "Employee FYI").length > 0 && (
          <div
            className="mt-2 px-3 py-2 rounded-lg text-xs text-muted-foreground flex items-center gap-2"
            style={{ background: "oklch(0.97 0.005 65)", border: "1px solid oklch(0.92 0.004 65)" }}
          >
            <Info size={11} />
            No new posts in: Employee FYI
          </div>
        )}
      </div>
    </div>
  );
}
