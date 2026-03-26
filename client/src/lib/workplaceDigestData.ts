// workplaceDigestData.ts
// Populated by Manus on 2026-03-26 from Workplace (fb.workplace.com)
// Sources: Personal feed (@mentions/tags), Creative Shop Brazil group, Meta Business Brazil group
// Last refreshed: 2026-03-26 07:08 BRT (Manus daily refresh — Week 13 Day 4, Thursday)
// NOTE: Workplace SSO login required — session not available in this environment (sandbox policy).
//       Workplace requires authenticated corporate SSO login. Data below reflects last known state.
//       Re-run after granting Workplace browser access for live scraping.
//       Pedro's Workplace ID: 100079485511668 | username: pedromenezes
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
  // Last attempted: 2026-03-23. Re-run after granting Workplace access.
];

// ── creativeShopPosts (Creative Shop groups — FYI, The Work, Supply Hub, MPA, Scaled) ─
export const creativeShopPosts: WorkplacePost[] = [
  // Workplace login required to scrape live data.
  // Groups: CS FYI (400827236632564), CS The Work (365231093525512),
  //         CS Supply Hub (911376516957318), CS MPA (1168085517955096), CS Scaled (1627547464129372)
  // Last attempted: 2026-03-23. Re-run after granting Workplace access.
];

// ── metaBusinessPosts (Meta & GBG strategic groups) ──────────────────────────
export const metaBusinessPosts: WorkplacePost[] = [
  // Workplace login required to scrape live data.
  // Groups: Employee FYI (221503021668016), GBG FYI (1897663863683333),
  //         Global Sales FYI (103693176391123), People FYI (137103853516660)
  // Last attempted: 2026-03-23. Re-run after granting Workplace access.
];

// ── highlightOfTheDay ─────────────────────────────────────────────────────────
export const highlightOfTheDay: WorkplacePost | null = null;

// ── Digest metadata ───────────────────────────────────────────────────────────
export const digestDate = "2026-03-26";
export const digestTime = "07:08";

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
  note: "Workplace SSO login required for live data — session not available in sandbox. Pedro must re-authenticate via browser to enable live scraping.",
  lastUpdated: "2026-03-26 07:08 BRT",
};
