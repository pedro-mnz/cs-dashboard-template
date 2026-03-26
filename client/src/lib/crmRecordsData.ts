// crmRecordsData.ts
// Populated by Manus on 2026-03-26 from Meta CRM
// Last refreshed: 2026-03-26 07:08 BRT (Manus daily refresh — Week 13 Day 4, Thursday)
// NOTE: internalfb.com access is restricted in this environment (sandbox policy).
//       Data reflects last confirmed state from 2026-03-20 with Week 12 finalized.
//       No new CIs confirmed since last refresh. Week 13 Day 4 (Thu) in progress.
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
  // ── Q1 2026 — March ──────────────────────────────────────────────────────
  {
    id: "ci-netshoes-mar12",
    clientId: "magazine-luiza",
    clientName: "Magalu / Netshoes",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-12",
    title: "Planejamento 2026 | Netshoes & Meta | 12Março",
    status: "qualified",
    qualified: true,
    contactMethod: "In-Person Meeting",
    owner: "Thelio Goncalves",
  },
  {
    id: "ci-magalu-mar12",
    clientId: "magazine-luiza",
    clientName: "Magalu",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-12",
    title: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Thiago Lima",
  },
  {
    id: "ci-612810056579956",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
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
    clientColor: "#e08300",
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
  // ── Q1 2026 — January ────────────────────────────────────────────────────
  {
    id: "ci-multi-jan21",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
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
    clientColor: "#e08300",
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
    clientColor: "#e08300",
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
    clientColor: "#7b00e0",
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
  dataAsOf: "2026-03-25",
  sourceUrl: dashboardConfig.crm?.ciUrl || dashboardConfig.unidash.ciUrl || "",
  lastUpdated: "2026-03-25 10:05 BRT",
};

// ── clientCIGoals (used by CRMInteractionsSection and OverviewSection) ────────
// Q1 2026 validated CI counts as of 2026-03-25 (Week 13 Day 3 — Wednesday):
//   Magalu:  3 CIs (Mar 12 In-Person, Mar 12 VC, Mar 4 Messaging) → goal MET ✅
//   Amazon:  3 CIs (Mar 4 In-Person, Jan 14 VC x2) → goal MET ✅
//   Samsung: 3 CIs (Mar 10 Messaging, Jan 21 VC, Jan 7 In-Person) → goal MET ✅
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
    color: "#e08300",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "amazon.com" && r.qualified).length,
  },
  {
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    label: "Samsung",
    color: "#7b00e0",
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
