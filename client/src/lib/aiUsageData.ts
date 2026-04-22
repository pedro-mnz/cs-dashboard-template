// aiUsageData.ts
// Populated by Manus on 2026-04-21 from Unidash My AI Usage dashboard
// Source: https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/
// User: @pedromenezes (userId: 1084877300)
// Last refreshed: 2026-04-22 07:00 BRT (Manus daily refresh — Week 17 Day 3 — Wednesday, Apr 22)
// NOTE: Week 17 (Apr 20–26) — 0 AI days so far (2 days in week), status: Awaiting Data
//       Week 16 (Apr 13–19): 7/7 days used, status: over ✅ (L5+/7)
//       Week 15 (Apr 6–12): 7/7 days used, status: over ✅ (L5+/7)
//       Week 14 (Mar 30–Apr 5): 7/7 days used, status: over ✅ (L5+/7)
//       Summary: Awaiting Data: 1 | Weeks Over L5+/7: 3 | Weeks Over L4+/7: 8 | Not Applicable: 2
// DO NOT edit manually — changes will be overwritten on next refresh.

export interface AIUsageEntry {
  pillar: string;
  sessions: number;
  percentage: number;
  color: string;
}

export type AIWeekStatus = "over" | "under" | "not_applicable" | "awaiting";

export interface AIUsageWeek {
  year: number;
  week: number;
  weekStarts: string;
  aiDaysThisWeek: number;
  daysInWeek: number;
  status: AIWeekStatus;
  // Per-day usage: "used" | "not_used" | "not_applicable" | "awaiting"
  dailyUsage: Array<"used" | "not_used" | "not_applicable" | "awaiting">;
}

// Weekly AI usage history for Pedro Menezes (last 18 weeks)
// Last refreshed: 2026-04-22 07:00 BRT (Wednesday — Week 17, Day 3)
// dailyUsage: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
// Summary: ✅ Over L5+/7: 3 (Weeks 14–16) | ✅ Over L4+/7: 8 | ➖ Not Applicable: 2 | 🔵 Awaiting: 1 (Week 17)
export const aiUsageWeeks: AIUsageWeek[] = [
  {
    year: 2026, week: 17, weekStarts: "2026-04-20",
    aiDaysThisWeek: 0, daysInWeek: 3, status: "awaiting",
    // Mon Apr 20 = Choice Day (Time Away); Tue Apr 21 = Tiradentes (holiday); Wed Apr 22 = today — data pending (2-3 day delay)
    dailyUsage: ["awaiting", "awaiting", "awaiting", "awaiting", "awaiting", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 16, weekStarts: "2026-04-13",
    aiDaysThisWeek: 7, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "used"],
  },
  {
    year: 2026, week: 15, weekStarts: "2026-04-06",
    aiDaysThisWeek: 7, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "used"],
  },
  {
    year: 2026, week: 14, weekStarts: "2026-03-30",
    aiDaysThisWeek: 7, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "used"],
  },
  {
    year: 2026, week: 13, weekStarts: "2026-03-23",
    aiDaysThisWeek: 7, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "used"],
  },
  {
    year: 2026, week: 12, weekStarts: "2026-03-16",
    aiDaysThisWeek: 7, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "used"],
  },
  {
    year: 2026, week: 11, weekStarts: "2026-03-09",
    aiDaysThisWeek: 7, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "used"],
  },
  {
    year: 2026, week: 10, weekStarts: "2026-03-02",
    aiDaysThisWeek: 6, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "used", "not_applicable"],
  },
  {
    year: 2026, week: 9, weekStarts: "2026-02-23",
    aiDaysThisWeek: 1, daysInWeek: 7, status: "not_applicable",
    dailyUsage: ["not_applicable", "not_applicable", "not_applicable", "used", "not_applicable", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 8, weekStarts: "2026-02-16",
    aiDaysThisWeek: 0, daysInWeek: 7, status: "not_applicable",
    dailyUsage: ["not_applicable", "not_applicable", "not_applicable", "not_applicable", "not_applicable", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 7, weekStarts: "2026-02-09",
    aiDaysThisWeek: 5, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 6, weekStarts: "2026-02-02",
    aiDaysThisWeek: 4, daysInWeek: 7, status: "over",
    dailyUsage: ["not_used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 5, weekStarts: "2026-01-26",
    aiDaysThisWeek: 5, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 4, weekStarts: "2026-01-19",
    aiDaysThisWeek: 5, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 3, weekStarts: "2026-01-12",
    aiDaysThisWeek: 5, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 2, weekStarts: "2026-01-05",
    aiDaysThisWeek: 2, daysInWeek: 7, status: "under",
    dailyUsage: ["not_used", "used", "used", "not_used", "not_used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 1, weekStarts: "2025-12-29",
    aiDaysThisWeek: 1, daysInWeek: 7, status: "not_applicable",
    dailyUsage: ["not_used", "not_used", "not_applicable", "used", "not_used", "not_applicable", "not_applicable"],
  },
  {
    year: 2025, week: 52, weekStarts: "2025-12-22",
    aiDaysThisWeek: 2, daysInWeek: 7, status: "not_applicable",
    dailyUsage: ["not_used", "used", "not_applicable", "not_applicable", "used", "not_applicable", "not_applicable"],
  },
];

// Feature-level usage breakdown (last 3 weeks)
export interface AIFeatureUsage {
  feature: string;
  week_2026_04_06: boolean;
  week_2026_04_13: boolean;
  week_2026_04_20: boolean;
}

export const aiFeatureUsage: AIFeatureUsage[] = [
  { feature: "Metamate",       week_2026_04_06: true,  week_2026_04_13: true,  week_2026_04_20: false },
  { feature: "DevMate",        week_2026_04_06: false, week_2026_04_13: false, week_2026_04_20: false },
  { feature: "Figma AI",       week_2026_04_06: true,  week_2026_04_13: true,  week_2026_04_20: false },
  { feature: "CalendarAgent",  week_2026_04_06: true,  week_2026_04_13: true,  week_2026_04_20: false },
  { feature: "Google Docs AI", week_2026_04_06: false, week_2026_04_13: false, week_2026_04_20: false },
  { feature: "Zoom AI",        week_2026_04_06: false, week_2026_04_13: false, week_2026_04_20: false },
  { feature: "Gemini",         week_2026_04_06: true,  week_2026_04_13: false, week_2026_04_20: false },
];

// Q1/Q2 2026 summary stats from Unidash
// Live data as of 2026-04-22 07:00 BRT:
//   Awaiting Data: 1 (Week 17) | Over L5+/7: 3 (Weeks 14–16) | Over L4+/7: 8 | Not Applicable: 2
// Week 16 complete (Sun Apr 19): 7/7 days used — status: over ✅ (L5+/7)
// Week 17 in progress (Mon Apr 20 – Sun Apr 26) — status: awaiting (0 days confirmed, 3 days elapsed: Mon=Time Away, Tue=Holiday, Wed=today)
// AI4P By Pillar breakdown: not available from My AI Usage dashboard (requires separate page)
export const aiUsageSummary = {
  totalSessions: 0,
  weeksOverGoal: 11,        // Weeks 3–7, 10–16 confirmed over goal (L4+ or L5+)
  weeksUnderGoal: 1,        // Week 2
  weeksNotApplicable: 2,    // Weeks 8, 9
  weeksAwaitingData: 1,     // Week 17 — starts Mon Apr 20
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "Q2 2026",
  salesRep: "Pedro Menezes",
  lastUpdated: "2026-04-22 07:00 BRT",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/",
};

// Q1 2026: Weeks 1–13 (Dec 29 2025 – Mar 29 2026)
// Q2 2026: Weeks 14–26 (Mar 30 – Jun 28 2026)
export const Q1_WEEK_STARTS = "2025-12-29"; // Week 1 start
export const Q1_WEEK_ENDS   = "2026-03-29"; // Week 13 end (Sun)
export const Q2_WEEK_STARTS = "2026-03-30"; // Week 14 start

export const aiUsageSummaryQ1 = {
  weeksOverGoal: 9,        // Weeks 3–7, 10–13
  weeksUnderGoal: 1,       // Week 2
  weeksNotApplicable: 4,   // Weeks 1, 8, 9, 52
  weeksAwaitingData: 0,
  totalWeeks: 14,          // Weeks 52 (2025) + 1–13 (2026)
};

export const aiUsageSummaryQ2 = {
  weeksOverGoal: 3,        // Weeks 14–16 confirmed over (L5+/7)
  weeksUnderGoal: 0,
  weeksNotApplicable: 0,
  weeksAwaitingData: 1,    // Week 17
  totalWeeks: 4,           // Weeks 14–17 so far
};
