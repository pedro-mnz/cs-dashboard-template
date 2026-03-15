// crmRecordsData.ts
// Populated by Manus on 2026-03-15 from Meta CRM
// DO NOT edit manually — changes will be overwritten on next refresh.
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

export const crmRecords: CRMRecord[] = [
  {
    id: "ci-612810056579956",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#1428A0",
    type: "CI",
    date: "2026-03-10",
    title: "Samsung & Meta Creative Shop Support",
    status: "qualified",
    qualified: true,
    contactMethod: "Messaging",
    owner: "Pedro Menezes",
  },
  {
    id: "ci-638687166179572-mar",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e05a00",
    type: "CI",
    date: "2026-03-04",
    title: "Rodrigo Almeida | AMAZON SERVICOS DE VAREJO DO BRASIL LTDA. | 2026-03-04",
    status: "qualified",
    qualified: true,
    contactMethod: "In-Person Meeting",
    owner: "Douglas Mendes",
  },
  {
    id: "ci-301939693888949",
    clientId: "magazine-luiza",
    clientName: "Magalu",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-04",
    title: "Hackathon WA da Lu - WhatsApp Chat",
    status: "qualified",
    qualified: true,
    contactMethod: "Messaging",
    owner: "Pedro Menezes",
  },
  {
    id: "ci-multi-jan21",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#1428A0",
    type: "CI",
    date: "2026-01-21",
    title: "Apresentação Projeto Meta - Galaxy Reels Festival (Presencial na SUNO)",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Bruno Boehringer Mastantuono",
  },
  {
    id: "ci-638687166179572-xcm",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e05a00",
    type: "CI",
    date: "2026-01-14",
    title: "Amazon XCM | 2026",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Douglas Mendes",
  },
  {
    id: "ci-638687166179572-mkteng",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e05a00",
    type: "CI",
    date: "2026-01-14",
    title: "Meta & Amazon: Marketing Engagement",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Douglas Mendes",
  },
  {
    id: "ci-557520800977956",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#1428A0",
    type: "CI",
    date: "2026-01-07",
    title: "Briefing Criativo Samsung e Planejamento de marca 2026",
    status: "qualified",
    qualified: true,
    contactMethod: "In-Person Meeting",
    owner: "Bruno Boehringer Mastantuono",
  },
];

// ── Dynamic summary ───────────────────────────────────────────────────────────
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
  dataAsOf: "2026-03-15",
  sourceUrl: dashboardConfig.crm?.ciUrl || dashboardConfig.unidash.ciUrl || "",
};

// ── clientCIGoals (used by CRMInteractionsSection and OverviewSection) ────────
export interface ClientCIGoal {
  clientId: string;
  label: string;
  color: string;
  isBoB: boolean;
  quarterlyGoal: number;
  validatedCIs: number;
  bobNote?: string;
}

export const clientCIGoals: ClientCIGoal[] = [
  {
    clientId: "magazine-luiza",
    label: "Magalu",
    color: "#0064E0",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "magazine-luiza" && r.qualified).length,
  },
  {
    clientId: "amazon.com",
    label: "Amazon",
    color: "#e05a00",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "amazon.com" && r.qualified).length,
  },
  {
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    label: "Samsung",
    color: "#1428A0",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "samsung-electronics-co-ltd---kr(usd)" && r.qualified).length,
  },
];

// ── Dynamic client color/label maps from config ───────────────────────────────
export const clientColors: Record<string, string> = Object.fromEntries(
  dashboardConfig.clients.map((c) => [c.id, c.color])
);
export const clientLabels: Record<string, string> = Object.fromEntries(
  dashboardConfig.clients.map((c) => [c.id, c.shortName])
);
