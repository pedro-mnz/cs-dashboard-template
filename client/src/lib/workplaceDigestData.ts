// workplaceDigestData.ts
// Populated by Manus on 2026-04-21 from Workplace (fb.workplace.com)
// Sources: Personal feed (@mentions/tags), Creative Shop groups, Meta strategic groups, GBG LATAM
// Last refreshed: 2026-04-21 07:00 BRT (Manus daily refresh — Week 17 Day 2, Tuesday Tiradentes Day)
// Pedro's Workplace ID: 100079485511668 | username: pedromenezes
// NOTE: Workplace session active in sandbox browser. Live data scraped from groups.
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
  // No @mentions or tags of Pedro Menezes found in last 24h (Apr 20–21, 2026).
  // Checked: personal feed, notifications. No action required.
];

// ── creativeShopPosts (Creative Shop groups — FYI, The Work, Supply Hub, MPA, Scaled) ─
export const creativeShopPosts: WorkplacePost[] = [
  {
    id: "cs-fyi-creator-camp-apr15",
    author: "Nana Bediako",
    authorRole: "Creative Shop",
    content: "CS Creator Camp: 3 Sessions to Get Fluent in Meta Creator Tools. TLDR: Pitching Partnership Ads Hub and Creator Marketplace, our 1P creator tools, is a CS priority this half. Creator Camp is the fastest way to get there — 3 sessions with Product (BPM), Apr–May, 45 min each. Session 1 is this Wednesday Apr 22 (mandatory for CS).",
    timestamp: "2026-04-15T18:26:00-03:00",
    likes: 10,
    comments: 4,
    groupName: "Creative Shop FYI",
    url: "https://fb.workplace.com/groups/400827236632564",
  },
  {
    id: "cs-the-work-leaply-apr21",
    author: "Nikodem Witkowski",
    authorRole: "Creative Shop",
    content: "Leaply Achieves 4X YoY Growth Through Creative Diversification & Scalable Production — new case study featured in CS: The Work. Showcases how creative strategy + scalable production drove exceptional results.",
    timestamp: "2026-04-21T06:00:00-03:00",
    likes: 5,
    comments: 0,
    groupName: "CS: The Work",
    url: "https://fb.workplace.com/groups/365231093525512",
  },
  {
    id: "cs-people-edward-ng-farewell",
    author: "Edward Ng",
    authorRole: "Creative Shop",
    content: "Stay hungry, stay foolish. This quote has quietly guided me through some of the most meaningful moments of my 8 years at Meta, and it feels like the right note to leave on. It's what's guiding me to leave a place that gave me my best career years, connected me with world-class marketing leaders, and supported me as both a professional and a parent, to pursue what comes next.",
    timestamp: "2026-04-20T17:00:00-03:00",
    likes: 32,
    comments: 3,
    groupName: "CS: People",
    url: "https://fb.workplace.com/groups",
  },
];

// ── metaBusinessPosts (Meta & GBG strategic groups) ──────────────────────────
export const metaBusinessPosts: WorkplacePost[] = [
  {
    id: "people-fyi-pulse-survey-apr21",
    author: "Pat Caputo",
    authorRole: "People",
    content: "The Pulse survey is open today through May 4. Please take a few minutes to share your feedback — your voice helps shape our culture and priorities.",
    timestamp: "2026-04-21T07:00:00-03:00",
    likes: 304,
    comments: 0,
    groupName: "People FYI",
    url: "https://fb.workplace.com/groups/137103853516660",
  },
  {
    id: "agent-transformation-boz-apr21",
    author: "Andrew Bosworth",
    authorRole: "CTO, Meta",
    content: "Agent Transformation Accelerator — Boz shares update on Meta's internal AI agent transformation program. Key focus: accelerating how Meta employees use AI agents to amplify their work.",
    timestamp: "2026-04-21T06:00:00-03:00",
    likes: 1500,
    comments: 0,
    groupName: "Agent Transformation Accelerator FYI",
    url: "https://fb.workplace.com/groups",
  },
  {
    id: "gbg-latam-magalu-mpk-immersion",
    author: "Thelio Goncalves",
    authorRole: "GBG LATAM",
    content: "MPK Immersion Recap: Grupo Magalu x Meta — Scaling the Future: AI-Powered Commerce & Incrementality. Last week, we hosted 11 senior executives from Grupo Magalu — spanning Magalu, KaBuM!, Netshoes, and Época Cosméticos — at Meta HQ in Menlo Park for a two-day strategic immersion. Client feedback scores were exceptional.",
    timestamp: "2026-04-20T10:45:00-03:00",
    likes: 7,
    comments: 1,
    groupName: "GBG LATAM Community Spotlight",
    url: "https://fb.workplace.com/groups",
  },
];

// ── highlightOfTheDay ─────────────────────────────────────────────────────────
// Standout post for Apr 21, 2026: Grupo Magalu MPK Immersion recap — directly relevant to Pedro's book of business
export const highlightOfTheDay: WorkplacePost = {
  id: "gbg-latam-magalu-mpk-immersion",
  author: "Thelio Goncalves",
  authorRole: "GBG LATAM",
  content: "MPK Immersion Recap: Grupo Magalu x Meta — 11 senior executives from Grupo Magalu (Magalu, KaBuM!, Netshoes, Época Cosméticos) at Meta HQ Menlo Park for 2-day strategic immersion on AI-Powered Commerce & Incrementality. Exceptional client satisfaction scores. Key context for Pedro's ongoing Magalu CS engagement and upcoming Creator Marketing session (Fri Apr 24).",
  timestamp: "2026-04-20T10:45:00-03:00",
  likes: 7,
  comments: 1,
  groupName: "GBG LATAM Community Spotlight",
  url: "https://fb.workplace.com/groups",
};

// ── Digest metadata ───────────────────────────────────────────────────────────
export const digestDate = "2026-04-21";
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
  note: "Live data scraped from Workplace on 2026-04-21 07:00 BRT. No @mentions of Pedro in last 24h. Pulse Survey open through May 4. CS Creator Camp Session 1 is Wed Apr 22 (mandatory).",
  lastUpdated: "2026-04-21 07:00 BRT",
};

// ── noUpdatesGroups ───────────────────────────────────────────────────────────
// Groups checked with no new posts in last 24h
export const noUpdatesGroups: string[] = [
  "CS: The Work",       // Only pinned post visible (no new posts today)
  "Employee FYI",       // Only pinned welcome post (no new posts today)
  "Creative Shop Supply Hub",
  "Creative Shop MPA Creative Solutions",
  "Creative Shop for Scaled",
  "Global Business Group FYI",
  "Global Sales FYI",
];
