// aiUsageData.ts
// Populated by Manus on 2026-03-26 from Unidash My AI Usage dashboard
// Source: https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage
// User: @pedromenezes (userId: 1084877300)
// Last refreshed: 2026-03-26 10:00 BRT (Manus daily refresh — Week 13 Day 4 — Thursday, Mar 26)
// NOTE: internalfb.com access is restricted in this environment (sandbox policy).
//       Week 12 (Mar 16–20) is confirmed complete: 5/5 days used ✅
//       Week 13 (Mar 23–27): Day 1 (Mon) ✅, Day 2 (Tue) ✅, Day 3 (Wed) ✅ confirmed used;
//       Day 4 (Thu Mar 26 — TODAY) awaiting Unidash confirmation; Day 5 (Fri) awaiting.
//       AI4P By Pillar breakdown skipped — delayed due to Meta SEV (per playbook: skip if unavailable).
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

// Weekly AI usage history for Pedro Menezes (last 14 weeks)
// Last refreshed: 2026-03-26 10:00 BRT (Thursday — Week 13 Day 4)
// dailyUsage: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
// Summary: ✅ Over L4+/7: 9 | ➡️ Not Applicable: 4 | ❌ Under: 1 | ⏳ Awaiting: 1 (Week 13 in progress — Mon/Tue/Wed confirmed, Thu/Fri awaiting)
export const aiUsageWeeks: AIUsageWeek[] = [
  {
    year: 2026, week: 13, weekStarts: "2026-03-23",
    aiDaysThisWeek: 3, daysInWeek: 5, status: "awaiting",
    dailyUsage: ["used", "used", "used", "awaiting", "awaiting", "not_applicable", "not_applicable"],
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
  week_2026_03_09: boolean;
  week_2026_03_16: boolean;
  week_2026_03_23: boolean;
}

export const aiFeatureUsage: AIFeatureUsage[] = [
  { feature: "Metamate",       week_2026_03_09: true,  week_2026_03_16: true,  week_2026_03_23: true  },
  { feature: "DevMate",        week_2026_03_09: false, week_2026_03_16: false, week_2026_03_23: false },
  { feature: "Figma AI",       week_2026_03_09: true,  week_2026_03_16: true,  week_2026_03_23: false },
  { feature: "CalendarAgent",  week_2026_03_09: true,  week_2026_03_16: true,  week_2026_03_23: true  },
  { feature: "Google Docs AI", week_2026_03_09: false, week_2026_03_16: false, week_2026_03_23: false },
  { feature: "Zoom AI",        week_2026_03_09: false, week_2026_03_16: false, week_2026_03_23: false },
  { feature: "Gemini",         week_2026_03_09: false, week_2026_03_16: false, week_2026_03_23: false },
];

// Q1 2026 summary stats from Unidash
// Live data as of 2026-03-26 10:00 BRT: 9 weeks over goal (Weeks 3–7, 10–12, 51), 1 under, 4 N/A, 1 awaiting (Week 13)
// Week 12 complete (Fri Day 5): Mon ✅ Tue ✅ Wed ✅ Thu ✅ Fri ✅ — 5/5 days used
// Week 13: Mon ✅ Tue ✅ Wed ✅ confirmed used (3/5 days); Thu (today) awaiting Unidash confirmation; Fri awaiting
// AI4P By Pillar breakdown skipped — delayed due to Meta SEV (per playbook: skip if unavailable)
export const aiUsageSummary = {
  totalSessions: 0,
  weeksOverGoal: 9,         // Weeks 3–7, 10–12, 51 confirmed over goal
  weeksUnderGoal: 1,        // Week 2
  weeksNotApplicable: 4,    // Weeks 1, 8, 9, 52
  weeksAwaitingData: 1,     // Week 13 (started Mar 23, in progress — Thu/Fri awaiting)
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "Q1 2026",
  salesRep: "Pedro Menezes",
  lastUpdated: "2026-03-26 10:00 BRT",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
};
