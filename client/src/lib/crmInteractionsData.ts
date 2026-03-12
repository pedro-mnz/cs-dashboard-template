// CRM Interactions data — populated by Manus during setup from your CI Dashboard
// This file is refreshed daily by Manus.

export interface CRMInteraction {
  id: string;
  date: string;
  client: string;
  type: string;
  summary: string;
  attendees: string[];
  outcome?: string;
  nextSteps?: string;
}

export const crmInteractions: CRMInteraction[] = [];

export const crmSummary = {
  totalCIs: 0,
  thisQuarter: 0,
  byClient: {} as Record<string, number>,
  byType: {} as Record<string, number>,
};
