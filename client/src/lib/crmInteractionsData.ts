// crmInteractionsData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
// Manus scrapes Meta CRM Client Interactions and writes data here.

export interface CIRecord {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  type: string;
  topic: string;
  participants: string[];
  isQualified: boolean;
  quarter: string;
}

export const crmInteractions: CIRecord[] = [];
// Manus will populate this array during setup and daily refresh.

export const ciSummary = {
  totalCIs: 0,
  qualifiedCIs: 0,
  byClient: {} as Record<string, number>,
  dataAsOf: new Date().toISOString().split("T")[0],
};
