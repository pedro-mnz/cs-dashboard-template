// aiUsageData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
// Manus scrapes Unidash AI Usage dashboard and writes data here.

export interface AIUsageEntry {
  pillar: string;
  sessions: number;
  percentage: number;
  color: string;
}

export const aiUsageSummary = {
  totalSessions: 0,
  byPillar: [] as AIUsageEntry[],
  topPillar: "",
  quarter: "",
  salesRep: "",
  dataAsOf: new Date().toISOString().split("T")[0],
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/",
};
