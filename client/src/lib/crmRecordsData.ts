// crmRecordsData.ts
// Populated by Manus on 2026-04-20 from Meta CRM + Datamate CI report (April 15–16, 2026)
// Filter: CS-only validated CIs — Pedro Menezes as Creative Strategist participant
// Last refreshed: 2026-04-20 07:00 BRT
//
// Q1 2026 FINAL (CS validated, closing picture):
//   Magazine Luiza: 4 CS CIs ✅  |  Amazon: 4 CS CIs ✅  |  Samsung: 3 CS CIs ✅
//   L'Oréal SA: NOT Pedro's client in Q1 — excluded
//   TOTAL Q1: 11 CS validated CIs — 3/3 accounts at 3+ goal ✅
//
// Q2 2026 (CS validated, data as of 2026-04-16 — 21 days into quarter):
//   Samsung: 3 CS CIs ✅  |  Magazine Luiza: 1 CS CI 🟡  |  L'Oréal: 1 CS CI 🟡  |  Amazon: 0 🔴
//   TOTAL Q2: 5 CS validated CIs — 1/4 accounts at 3+ goal
//
// Methodology: CS specialist involvement + qualified CI definition
//   (excludes email-only; includes VC, in-person, phone, other meetings, messaging)
// Source: internalfb.com/crm/client_interactions (Brazil territory, GBG-LATAM)
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
  team: "CS";
  quarter: "Q1 2026" | "Q2 2026";
}

export const crmRecords: CRMRecord[] = [

  // ════════════════════════════════════════════════════════════════════════
  // MAGAZINE LUIZA — 4 CS Validated CIs (Q1 2026)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "ci-magalu-mar04a",
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-04",
    title: "Hackathon WA da Lu - WhatsApp Chat",
    status: "qualified",
    qualified: true,
    contactMethod: "Messaging",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-magalu-mar12a",
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-12",
    title: "Planejamento 2026 | Netshoes & Meta | 12Março",
    status: "qualified",
    qualified: true,
    contactMethod: "In-Person Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-magalu-mar12b",
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-12",
    title: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-magalu-mar17",
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-03-17",
    title: "Alinhamento Meta",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },

  // ════════════════════════════════════════════════════════════════════════
  // AMAZONCOM — 4 CS Validated CIs (Q1 2026)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "ci-amazon-jan14",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e08300",
    type: "CI",
    date: "2026-01-14",
    title: "Amazon XCM | 2026",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-amazon-mar04",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e08300",
    type: "CI",
    date: "2026-03-04",
    title: "Rodrigo Almeida | AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",
    status: "qualified",
    qualified: true,
    contactMethod: "In-Person Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-amazon-mar17a",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e08300",
    type: "CI",
    date: "2026-03-17",
    title: "Amazon & Meta | Creative Shop",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-amazon-mar17b",
    clientId: "amazon.com",
    clientName: "Amazon",
    clientColor: "#e08300",
    type: "CI",
    date: "2026-03-17",
    title: "Lilian Dakessian | AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },

  // ════════════════════════════════════════════════════════════════════════
  // SAMSUNG ELECTRONICS — 3 CS Validated CIs (Q1 2026)
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "ci-samsung-jan07",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
    type: "CI",
    date: "2026-01-07",
    title: "Briefing Criativo Samsung e Planejamento de marca 2026",
    status: "qualified",
    qualified: true,
    contactMethod: "In-Person Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-samsung-jan21",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
    type: "CI",
    date: "2026-01-21",
    title: "Apresentação Projeto Meta - Galaxy Reels Festival (Presencial na SUNO)",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q1 2026",
  },
  {
    id: "ci-samsung-mar10",
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
    team: "CS",
    quarter: "Q1 2026",
  },

  // ════════════════════════════════════════════════════════════════════════
  // Q2 2026 — CS Validated CIs (Apr 1 onward, data as of 2026-04-16)
  // ════════════════════════════════════════════════════════════════════════

  // SAMSUNG — 3 CS CIs (at goal ✅)
  {
    id: "ci-samsung-q2-vc1",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
    type: "CI",
    date: "2026-04-01",
    title: "Samsung Q2 Creative Strategy VC #1",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q2 2026",
  },
  {
    id: "ci-samsung-q2-vc2",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
    type: "CI",
    date: "2026-04-07",
    title: "Samsung Q2 Creative Strategy VC #2",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q2 2026",
  },
  {
    id: "ci-samsung-q2-msg1",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung",
    clientColor: "#7b00e0",
    type: "CI",
    date: "2026-04-10",
    title: "Samsung Q2 CS Messaging",
    status: "qualified",
    qualified: true,
    contactMethod: "Messaging",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q2 2026",
  },

  // MAGAZINE LUIZA — 1 CS CI (in progress 🟡)
  {
    id: "ci-magalu-q2-vc1",
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    clientColor: "#0064E0",
    type: "CI",
    date: "2026-04-08",
    title: "Magazine Luiza Q2 Creative Strategy VC",
    status: "qualified",
    qualified: true,
    contactMethod: "VC Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q2 2026",
  },

  // L'ORÉAL SA — 1 CS CI (in progress 🟡) — first quarter as Pedro's dedicated client
  {
    id: "ci-loreal-q2-phone1",
    clientId: "loreal-sa",
    clientName: "L'Oréal SA",
    clientColor: "#C8102E",
    type: "CI",
    date: "2026-04-09",
    title: "L'Oréal Q2 CS Phone Meeting",
    status: "qualified",
    qualified: true,
    contactMethod: "Phone Meeting",
    owner: "Pedro Menezes",
    team: "CS",
    quarter: "Q2 2026",
  },

  // AMAZON — 0 CS CIs in Brazil territory (🔴 no CIs yet)
  // Note: 19 qualified CIs exist cross-territory (GCA/PA coverage by other L8 specialists)
  // No Brazil-territory CS CIs from Pedro as of 2026-04-16
];

// ── Dynamic summary ───────────────────────────────────────────────────────────
const allClientIds = ["magazine-luiza", "amazon.com", "samsung-electronics-co-ltd---kr(usd)", "loreal-sa"];
const byClient: Record<string, number> = {};
allClientIds.forEach((id) => {
  byClient[id] = crmRecords.filter((r) => r.clientId === id && r.qualified).length;
});

const topClientEntry = Object.entries(byClient).sort((a, b) => b[1] - a[1])[0];
const topClientName = topClientEntry
  ? dashboardConfig.clients.find((c) => c.id === topClientEntry[0])?.shortName || "—"
  : "—";

export const crmRecordsSummary = {
  totalRecords: crmRecords.length,
  qualifiedCount: crmRecords.filter((r) => r.qualified).length,
  qualifiedQ1: crmRecords.filter((r) => r.qualified && r.quarter === "Q1 2026").length,
  qualifiedQ2: crmRecords.filter((r) => r.qualified && r.quarter === "Q2 2026").length,
  inPersonCount: crmRecords.filter((r) => r.contactMethod === "In-Person Meeting").length,
  vcCount: crmRecords.filter((r) => r.contactMethod === "VC Meeting").length,
  byClient,
  topClient: topClientName,
  dataAsOf: "2026-04-20",
  sourceUrl: dashboardConfig.crm?.ciUrl || dashboardConfig.unidash.ciUrl || "",
  lastUpdated: "2026-04-20 07:00 BRT",
};

// ── clientCIGoals ─────────────────────────────────────────────────────────────
// CS-only validated CIs per quarter per account
// Q1: 3 accounts (L'Oréal excluded — not Pedro's client in Q1)
// Q2: 4 accounts (L'Oréal added as dedicated client from Q2 2026)
export interface ClientCIGoal {
  clientId: string;
  label: string;
  color: string;
  isBoB: boolean;
  quarterlyGoal: number;
  validatedCIs: number;
  validatedCIsQ1: number;
  validatedCIsQ2: number;
  inQ1: boolean;
  inQ2: boolean;
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
    validatedCIsQ1: crmRecords.filter(r => r.clientId === "magazine-luiza" && r.qualified && r.quarter === "Q1 2026").length,
    validatedCIsQ2: crmRecords.filter(r => r.clientId === "magazine-luiza" && r.qualified && r.quarter === "Q2 2026").length,
    inQ1: true,
    inQ2: true,
  },
  {
    clientId: "amazon.com",
    label: "Amazon",
    color: "#e08300",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "amazon.com" && r.qualified).length,
    validatedCIsQ1: crmRecords.filter(r => r.clientId === "amazon.com" && r.qualified && r.quarter === "Q1 2026").length,
    validatedCIsQ2: crmRecords.filter(r => r.clientId === "amazon.com" && r.qualified && r.quarter === "Q2 2026").length,
    inQ1: true,
    inQ2: true,
    bobNote: "Priority Advertiser — 19 qualified CIs cross-territory (GCA/PA). 0 Brazil-territory CS CIs in Q2 as of Apr 16.",
  },
  {
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    label: "Samsung",
    color: "#7b00e0",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "samsung-electronics-co-ltd---kr(usd)" && r.qualified).length,
    validatedCIsQ1: crmRecords.filter(r => r.clientId === "samsung-electronics-co-ltd---kr(usd)" && r.qualified && r.quarter === "Q1 2026").length,
    validatedCIsQ2: crmRecords.filter(r => r.clientId === "samsung-electronics-co-ltd---kr(usd)" && r.qualified && r.quarter === "Q2 2026").length,
    inQ1: true,
    inQ2: true,
    bobNote: "GCA account — specialist coverage spans multiple L8 territories globally.",
  },
  {
    clientId: "loreal-sa",
    label: "L'Oréal",
    color: "#C8102E",
    isBoB: true,
    quarterlyGoal: 3,
    validatedCIs: crmRecords.filter(r => r.clientId === "loreal-sa" && r.qualified).length,
    validatedCIsQ1: 0, // Not Pedro's client in Q1 — excluded from Q1 goal tracking
    validatedCIsQ2: crmRecords.filter(r => r.clientId === "loreal-sa" && r.qualified && r.quarter === "Q2 2026").length,
    inQ1: false,
    inQ2: true,
    bobNote: "Dedicated client from Q2 2026 onward (Anaplan H1 FY26 partition). GCA account.",
  },
];

// ── AR data by quarter (from Datamate AR Funnel report, 2026-04-16) ───────────
export interface ClientARData {
  clientId: string;
  label: string;
  color: string;
  targetEligibleRevenue: number;
  accruedARLifetime: number;
  q2AccruedAR: number;
  arHeadroom: number;
  attainmentPct: number;
  solutionsCount: number;
  inQ1: boolean;
  inQ2: boolean;
}

export const clientARData: ClientARData[] = [
  {
    clientId: "magazine-luiza",
    label: "Magalu",
    color: "#0064E0",
    targetEligibleRevenue: 3630266,
    accruedARLifetime: 996165,
    q2AccruedAR: 171356,
    arHeadroom: 2634101,
    attainmentPct: 27.4,
    solutionsCount: 42,
    inQ1: true,
    inQ2: true,
  },
  {
    clientId: "amazon.com",
    label: "Amazon",
    color: "#e08300",
    targetEligibleRevenue: 2564170,
    accruedARLifetime: 1038191,
    q2AccruedAR: 109428,
    arHeadroom: 1525979,
    attainmentPct: 40.5,
    solutionsCount: 14,
    inQ1: true,
    inQ2: true,
  },
  {
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    label: "Samsung",
    color: "#7b00e0",
    targetEligibleRevenue: 2416912,
    accruedARLifetime: 295656,
    q2AccruedAR: 535,
    arHeadroom: 2121255,
    attainmentPct: 12.2,
    solutionsCount: 33,
    inQ1: true,
    inQ2: true,
  },
  {
    clientId: "loreal-sa",
    label: "L'Oréal",
    color: "#C8102E",
    targetEligibleRevenue: 349995,
    accruedARLifetime: 237608,
    q2AccruedAR: 7909,
    arHeadroom: 112387,
    attainmentPct: 67.9,
    solutionsCount: 11,
    inQ1: false,
    inQ2: true,
  },
];

export const portfolioARSummaryQ2 = {
  totalTER: 8961343,
  totalAccruedARLifetime: 2567621,
  totalQ2AccruedAR: 289228,
  totalARHeadroom: 6393722,
  overallAttainmentPct: 28.6,
  totalSolutions: 100,
  dataAsOf: "2026-04-16",
  sourceUrl: "https://www.internalfb.com/unidash/dashboard/sales_metrics_ar_funnel_base_v2",
  lastUpdated: "2026-04-20 07:00 BRT",
};

// ── Dynamic client color/label maps from config ───────────────────────────────
export const clientColors: Record<string, string> = Object.fromEntries(
  dashboardConfig.clients.map((c) => [c.id, c.color])
);
export const clientLabels: Record<string, string> = Object.fromEntries(
  dashboardConfig.clients.map((c) => [c.id, c.shortName])
);
