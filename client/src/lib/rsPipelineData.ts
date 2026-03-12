// Recommended Solutions pipeline data — populated by Manus during setup
// This file is refreshed daily by Manus.

export interface RSOpportunity {
  id: string;
  client: string;
  solution: string;
  stage: string;
  value?: number;
  dueDate?: string;
  owner: string;
  notes?: string;
}

export const rsPipeline: RSOpportunity[] = [];

export const rsSummary = {
  total: 0,
  byStage: {} as Record<string, number>,
  byClient: {} as Record<string, number>,
};
