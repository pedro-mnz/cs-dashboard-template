// workplaceDigestData.ts
// Populated by Manus on 2026-03-19 from Workplace (fb.workplace.com)
// Sources: Personal feed (@mentions/tags), Creative Shop Brazil group, Meta Business Brazil group
// Last refreshed: 2026-03-20 07:00 BRT (Manus daily refresh — Week 12, Friday)
// NOTE: Workplace SSO login required — session not available on 2026-03-20 refresh
// NOTE: Workplace requires authenticated corporate SSO login. Data below reflects last known state.
//       Re-run after granting Workplace browser access for live scraping.
// DO NOT edit manually — changes will be overwritten on next refresh.

export interface WorkplacePost {
  id: string;
  author: string;
  authorRole?: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  groupName?: string;
  url?: string;
}

// ── mentionsAndTags (personal feed — @mentions and tags of Pedro Menezes) ─────
export const mentionsAndTags: WorkplacePost[] = [
  // Workplace login required to scrape live data.
  // Last attempted: 2026-03-20. Re-run after granting Workplace access.
];

// ── creativeShopPosts (Creative Shop Brazil group) ────────────────────────────
export const creativeShopPosts: WorkplacePost[] = [
  // Workplace login required to scrape live data.
  // Last attempted: 2026-03-20. Re-run after granting Workplace access.
];

// ── metaBusinessPosts (Meta Business Brazil group) ───────────────────────────
export const metaBusinessPosts: WorkplacePost[] = [
  // Workplace login required to scrape live data.
  // Last attempted: 2026-03-20. Re-run after granting Workplace access.
];

// ── highlightOfTheDay ─────────────────────────────────────────────────────────
export const highlightOfTheDay: WorkplacePost | null = null;

// ── Digest metadata ───────────────────────────────────────────────────────────
export const digestDate = "2026-03-20";
export const digestTime = "07:00";

// ── Legacy workplacePosts array (kept for backward compatibility) ─────────────
export const workplacePosts: WorkplacePost[] = [
  ...mentionsAndTags,
  ...creativeShopPosts,
  ...metaBusinessPosts,
];

export const digestSummary = {
  dataAsOf: digestDate,
  lastRefreshed: `${digestDate}T${digestTime}:00-03:00`,
  mentionsCount: mentionsAndTags.length,
  creativeShopPostsCount: creativeShopPosts.length,
  metaBusinessPostsCount: metaBusinessPosts.length,
  sourceUrl: "https://fb.workplace.com",
  note: "Workplace login required for live data — please log in via browser to enable scraping.",
};
