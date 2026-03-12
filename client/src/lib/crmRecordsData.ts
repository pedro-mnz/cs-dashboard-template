// crmRecordsData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
import { dashboardConfig } from "./dashboard.config";

export interface CRMRecord {
  id: string;
  clientId: string;
  clientName: string;
  clientColor: string;
  type: string;
  date: string;
  title: string;
  status: string;
  qualified: boolean;
  contactMethod: string;
  owner: string;
}

// Populated by Manus during setup and daily refresh
export const crmRecords: CRMRecord[] = [];

// Dynamic summary — works with any client list from config
const byClient: Record<string, number> = {};
dashboardConfig.clients.forEach((c) => {
  byClient[c.id] = crmRecords.filter((r) => r.clientId === c.id).length;
});

const topClientEntry = Object.entries(byClient).sort((a, b) => b[1] - a[1])[0];
const topClientName = topClientEntry
  ? dashboardConfig.clients.find((c) => c.id === topClientEntry[0])?.shortName || "—"
  : "—";

export const crmRecordsSummary = {
  totalRecords: crmRecords.length,
  qualifiedCount: crmRecords.filter((r) => r.qualified).length,
  inPersonCount: crmRecords.filter((r) => r.contactMethod === "In-Person Meeting").length,
  vcCount: crmRecords.filter((r) => r.contactMethod === "VC Meeting").length,
  byClient,
  topClient: topClientName,
  dataAsOf: new Date().toISOString().split("T")[0],
  sourceUrl: dashboardConfig.unidash.ciUrl || "",
};

// Dynamic client color/label maps from config
export const clientColors: Record<string, string> = Object.fromEntries(
  dashboardConfig.clients.map((c) => [c.id, c.color])
);
export const clientLabels: Record<string, string> = Object.fromEntries(
  dashboardConfig.clients.map((c) => [c.id, c.shortName])
);
