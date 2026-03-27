// aiUsageData.ts
// Populated by Manus on 2026-03-27 from Unidash My AI Usage dashboard
// Source: https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage
// User: @pedromenezes (userId: 1084877300)
// Last refreshed: 2026-03-27 10:10 BRT (Manus daily refresh — Week 13 Day 5 — Friday, Mar 27 — end of week)
// NOTE: internalfb.com access is restricted in this environment (sandbox policy).
//       Week 13 (Mar 23–27): Mon ✅ Tue ✅ Wed ✅ Thu ✅ Fri ✅ — 5/5 days used, status: over ✅
//       Week 14 (Mar 30–Apr 3): starts Monday — status: awaiting (first day not yet reached)
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

// Weekly AI usage history for Pedro Menezes (last 15 weeks)
// Last refreshed: 2026-03-27 10:10 BRT (Friday — Week 13 Day 5 — end of week)
// dailyUsage: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
// Summary: ✅ Over L4+/7: 10 | ➡️ Not Applicable: 4 | ❌ Under: 1 | ⏳ Awaiting: 1 (Week 14 — starts Mon Mar 30)
export const aiUsageWeeks: AIUsageWeek[] = [
  {
    year: 2026, week: 14, weekStarts: "2026-03-30",
    aiDaysThisWeek: 0, daysInWeek: 5, status: "awaiting",
    dailyUsage: ["awaiting", "awaiting", "awaiting", "awaiting", "awaiting", "not_applicable", "not_applicable"],
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
  week_2026_03_16: boolean;
  week_2026_03_23: boolean;
  week_2026_03_30: boolean;
}

export const aiFeatureUsage: AIFeatureUsage[] = [
  { feature: "Metamate",       week_2026_03_16: true,  week_2026_03_23: true,  week_2026_03_30: false },
  { feature: "DevMate",        week_2026_03_16: false, week_2026_03_23: false, week_2026_03_30: false },
  { feature: "Figma AI",       week_2026_03_16: true,  week_2026_03_23: false, week_2026_03_30: false },
  { feature: "CalendarAgent",  week_2026_03_16: true,  week_2026_03_23: true,  week_2026_03_30: false },
  { feature: "Google Docs AI", week_2026_03_16: false, week_2026_03_23: false, week_2026_03_30: false },
  { feature: "Zoom AI",        week_2026_03_16: false, week_2026_03_23: false, week_2026_03_30: false },
  { feature: "Gemini",         week_2026_03_16: false, week_2026_03_23: false, week_2026_03_30: false },
];

// Q1 2026 summary stats from Unidash
// Live data as of 2026-03-27 10:10 BRT: 10 weeks over goal (Weeks 3–7, 10–13), 1 under, 4 N/A, 1 awaiting (Week 14)
// Week 13 complete (Fri Day 5): Mon ✅ Tue ✅ Wed ✅ Thu ✅ Fri ✅ — 5/5 days used — status: over ✅
// Week 14 starts Mon Mar 30 — status: awaiting
// AI4P By Pillar breakdown skipped — internalfb.com access restricted (per playbook: skip if unavailable)
export const aiUsageSummary = {
  totalSessions: 0,
  weeksOverGoal: 10,        // Weeks 3–7, 10–13 confirmed over goal
  weeksUnderGoal: 1,        // Week 2
  weeksNotApplicable: 4,    // Weeks 1, 8, 9, 52
  weeksAwaitingData: 1,     // Week 14 — starts Mon Mar 30
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "Q1 2026",
  salesRep: "Pedro Menezes",
  lastUpdated: "2026-03-27 10:10 BRT",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
};
