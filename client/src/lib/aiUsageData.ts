// AI Usage data — populated by Manus during setup from your Unidash AI Usage page
// This file is refreshed daily by Manus.

export interface AISession {
  date: string;
  tool: string;
  pillar: string;
  useCase: string;
  client?: string;
  outcome?: string;
}

export const aiSessions: AISession[] = [];

export const aiUsageSummary = {
  totalSessions: 0,
  byPillar: {} as Record<string, number>,
  byTool: {} as Record<string, number>,
  byClient: {} as Record<string, number>,
  weeklyTrend: [] as { week: string; count: number }[],
};
