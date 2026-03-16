// aiUsageData.ts
// Populated by Manus on 2026-03-16 from Unidash My AI Usage dashboard
// Source: https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage
// User: @pedromenezes (userId: 1084877300)
// Last refreshed: 2026-03-16 (Manus daily refresh — Monday Week 12)
// Week 12 (Mar 16–20): Day 1 (Mon Mar 16) confirmed used. Tue–Fri awaiting.
// Week 11 (Mar 9–13): Confirmed — Pedro used AI all 5 working days.
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
// Last refreshed: 2026-03-16 (Monday — Week 12 Day 1 confirmed used)
// dailyUsage: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
export const aiUsageWeeks: AIUsageWeek[] = [
  {
    year: 2026, week: 12, weekStarts: "2026-03-16",
    aiDaysThisWeek: 1, daysInWeek: 5, status: "awaiting",
    dailyUsage: ["used", "awaiting", "awaiting", "awaiting", "awaiting", "not_applicable", "not_applicable"],
  },
  {
    year: 2026, week: 11, weekStarts: "2026-03-09",
    aiDaysThisWeek: 5, daysInWeek: 5, status: "over",
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
  {
    year: 2025, week: 51, weekStarts: "2025-12-15",
    aiDaysThisWeek: 5, daysInWeek: 7, status: "over",
    dailyUsage: ["used", "used", "used", "used", "used", "not_applicable", "not_applicable"],
  },
];

// Feature-level usage breakdown (last 3 weeks)
export interface AIFeatureUsage {
  feature: string;
  week_2026_03_02: boolean;
  week_2026_03_09: boolean;
  week_2026_03_16: boolean;
}

export const aiFeatureUsage: AIFeatureUsage[] = [
  { feature: "Metamate",       week_2026_03_02: true,  week_2026_03_09: true,  week_2026_03_16: true  },
  { feature: "DevMate",        week_2026_03_02: true,  week_2026_03_09: false, week_2026_03_16: false },
  { feature: "Figma AI",       week_2026_03_02: true,  week_2026_03_09: true,  week_2026_03_16: false },
  { feature: "CalendarAgent",  week_2026_03_02: true,  week_2026_03_09: true,  week_2026_03_16: true  },
  { feature: "Google Docs AI", week_2026_03_02: true,  week_2026_03_09: false, week_2026_03_16: false },
  { feature: "Zoom AI",        week_2026_03_02: false, week_2026_03_09: false, week_2026_03_16: false },
  { feature: "Gemini",         week_2026_03_02: false, week_2026_03_09: false, week_2026_03_16: false },
];

// Q1 2026 summary stats from Unidash
// weeksOverGoal: Weeks 3–7, 10, 11 confirmed over goal (7 full weeks) + Week 12 in progress
export const aiUsageSummary = {
  totalSessions: 0,
  weeksOverGoal: 9,        // Weeks 3–7, 10, 11 confirmed over goal; Week 12 in progress (1/5 days)
  weeksUnderGoal: 1,       // Week 2
  weeksNotApplicable: 4,   // Weeks 1, 8, 9, 52
  weeksAwaitingData: 1,    // Week 12 (current — partial, Day 1 confirmed)
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "Q1 2026",
  salesRep: "Pedro Menezes",
  lastUpdated: "2026-03-16",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
};
