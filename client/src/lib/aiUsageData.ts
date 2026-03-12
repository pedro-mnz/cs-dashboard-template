// aiUsageData.ts
// Populated by Manus on 2026-03-12 from Unidash My AI Usage dashboard
// Source: https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage
// User: @pedromenezes (userId: 1084877300)
// DO NOT edit manually — changes will be overwritten on next refresh.

export interface AIUsageEntry {
  pillar: string;
  sessions: number;
  percentage: number;
  color: string;
}

export interface AIWeekRecord {
  year: number;
  week: number;
  weekStarts: string;
  aiDays: number;
  daysInWeek: number;
  status: "over" | "under" | "awaiting" | "na";
}

// Weekly AI usage history for Pedro Menezes (Q1 2026)
export const aiWeeklyHistory: AIWeekRecord[] = [
  { year: 2026, week: 11, weekStarts: "2026-03-09", aiDays: 0, daysInWeek: 4, status: "awaiting" },
  { year: 2026, week: 10, weekStarts: "2026-03-02", aiDays: 6, daysInWeek: 7, status: "over" },
  { year: 2026, week: 9,  weekStarts: "2026-02-23", aiDays: 1, daysInWeek: 7, status: "na" },
  { year: 2026, week: 8,  weekStarts: "2026-02-16", aiDays: 0, daysInWeek: 7, status: "na" },
  { year: 2026, week: 7,  weekStarts: "2026-02-09", aiDays: 5, daysInWeek: 7, status: "over" },
  { year: 2026, week: 6,  weekStarts: "2026-02-02", aiDays: 4, daysInWeek: 7, status: "over" },
  { year: 2026, week: 5,  weekStarts: "2026-01-26", aiDays: 5, daysInWeek: 7, status: "over" },
  { year: 2026, week: 4,  weekStarts: "2026-01-19", aiDays: 5, daysInWeek: 7, status: "over" },
  { year: 2026, week: 3,  weekStarts: "2026-01-12", aiDays: 5, daysInWeek: 7, status: "over" },
  { year: 2026, week: 2,  weekStarts: "2026-01-05", aiDays: 2, daysInWeek: 7, status: "under" },
  { year: 2026, week: 1,  weekStarts: "2025-12-29", aiDays: 1, daysInWeek: 7, status: "na" },
];

// Q1 2026 summary stats from Unidash
export const aiUsageSummary = {
  totalSessions: 0,
  weeksOverTarget: 8,
  weeksUnderTarget: 1,
  weeksNotApplicable: 4,
  weeksAwaitingData: 1,
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "Q1 2026",
  salesRep: "Pedro Menezes",
  dataAsOf: "2026-03-12",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
};
