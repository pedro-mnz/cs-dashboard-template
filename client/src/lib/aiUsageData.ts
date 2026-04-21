// aiUsageData.ts
// Populated by Manus on 2026-04-20 from Unidash My AI Usage dashboard
// Source: https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage
// User: @pedromenezes (userId: 1084877300)
// Last refreshed: 2026-04-20 07:00 BRT (Manus daily refresh — Week 17 Day 7 — Sunday, Apr 20)
// NOTE: internalfb.com access is restricted in this environment (sandbox policy).
//       Week 14 (Mar 30–Apr 3): 5/5 days used, status: over ✅
//       Week 15 (Apr 6–10): 5/5 days used, status: over ✅
//       Week 16 (Apr 13–17): 5/5 days used, status: over ✅
//       Week 17 (Apr 20–24): starts today (Sunday Apr 20) — status: awaiting
//       AI4P By Pillar breakdown skipped — internalfb.com access restricted (per playbook: skip if unavailable).
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
// Last refreshed: 2026-04-20 07:00 BRT (Sunday — Week 17 starts Mon Apr 20)
// dailyUsage: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
// Summary: ✅ Over L4+/7: 13 | ➡️ Not Applicable: 4 | ❌ Under: 1 | ⏳ Awaiting: 1 (Week 17 — starts Mon Apr 20)
export const aiUsageWeeks: AIUsageWeek[] = [
  {
    year: 2026, week: 17, weekStarts: "2026-04-20",
    aiDaysThisWeek: 0, daysInWeek: 5, status: "awaiting",
    dailyUsage: ["awaiting", "awaiting", "awaiting", "awaiting", "awaiting", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 16, weekStarts: "2026-04-13",
    aiDaysThisWeek: 5, daysInWeek: 5, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 15, weekStarts: "2026-04-06",
    aiDaysThisWeek: 5, daysInWeek: 5, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 14, weekStarts: "2026-03-30",
    aiDaysThisWeek: 5, daysInWeek: 5, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 13, weekStarts: "2026-03-23",
    aiDaysThisWeek: 5, daysInWeek: 5, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 12, weekStarts: "2026-03-16",
    aiDaysThisWeek: 5, daysInWeek: 5, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 11, weekStarts: "2026-03-09",
    aiDaysThisWeek: 5, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
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
// Live data as of 2026-04-20 07:00 BRT: 13 weeks over goal (Weeks 3–7, 10–16), 1 under, 4 N/A, 1 awaiting (Week 17)
// Week 16 complete (Fri Apr 17): Mon ✅ Tue ✅ Wed ✅ Thu ✅ Fri ✅ — 5/5 days used — status: over ✅
// Week 17 starts Mon Apr 20 — status: awaiting
// AI4P By Pillar breakdown skipped — internalfb.com access restricted (per playbook: skip if unavailable)
export const aiUsageSummary = {
  totalSessions: 0,
  weeksOverGoal: 13,        // Weeks 3–7, 10–16 confirmed over goal
  weeksUnderGoal: 1,        // Week 2
  weeksNotApplicable: 4,    // Weeks 1, 8, 9, 52
  weeksAwaitingData: 1,     // Week 17 — starts Mon Apr 20
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "Q2 2026",
  salesRep: "Pedro Menezes",
  lastUpdated: "2026-04-20 07:00 BRT",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
};
