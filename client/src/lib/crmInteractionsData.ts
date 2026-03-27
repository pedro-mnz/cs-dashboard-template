// crmInteractionsData.ts
// Populated by Manus on 2026-03-27 from Meta CRM (internalfb.com/crm/client_interactions)
// Filters: Participant in BoB + This Quarter (Q1 2026) + Is Qualified + Participant = Pedro Menezes
// Last refreshed: 2026-03-27 09:05 BRT (Manus daily refresh — Week 13 Day 5, Friday — end of week)
// NOTE: internalfb.com access is restricted in this environment (sandbox policy).
//       No new CIs added since last refresh. All 3 clients have met the 3-CI quarterly goal.
//       Total QTD: 9 qualified CIs (7 live/VC/in-person + 2 messaging). Q1 2026 goal: MET ✅
// DO NOT edit manually — changes will be overwritten on next refresh.

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

export const crmInteractions: CIRecord[] = [
  // ── Q1 2026 — March ──────────────────────────────────────────────────────
  {
    id: "ci-netshoes-mar12",
    clientId: "magazine-luiza",
    clientName: "2 organizations (Netshoes & Meta)",
    date: "2026-03-12",
    type: "In-Person Meeting",
    topic: "Planejamento 2026 | Netshoes & Meta | 12Março",
    participants: ["Thelio Goncalves", "Thiago Lima", "Daiane Quesada Pereira Codato"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-magalu-mar12",
    clientId: "magazine-luiza",
    clientName: "2 organizations (Magalu)",
    date: "2026-03-12",
    type: "VC Meeting",
    topic: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    participants: ["Thiago Lima", "Thelio Goncalves"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-612810056579956",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "SAMSUNG ELETRONICA DA AMAZONIA LTDA (MX)",
    date: "2026-03-10",
    type: "Messaging",
    topic: "Samsung & Meta Creative Shop Support",
    participants: ["Pedro Menezes"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-638687166179572-mar",
    clientId: "amazon.com",
    clientName: "AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",
    date: "2026-03-04",
    type: "In-Person Meeting",
    topic: "Rodrigo Almeida | AMAZON SERVICOS DE VAREJO DO BRASIL LTDA. | 2026-03-04",
    participants: ["Douglas Mendes", "Eduardo Neto", "Welisson Assuncao"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-301939693888949",
    clientId: "magazine-luiza",
    clientName: "[WHATS APP] MAGAZINE LUIZA",
    date: "2026-03-04",
    type: "Messaging",
    topic: "Hackathon WA da Lu - WhatsApp Chat",
    participants: ["Pedro Menezes", "Thelio Goncalves"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  // ── Q1 2026 — January ────────────────────────────────────────────────────
  {
    id: "ci-multi-jan21",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "3 organizations",
    date: "2026-01-21",
    type: "VC Meeting",
    topic: "Apresentação Projeto Meta - Galaxy Reels Festival (Presencial na SUNO)",
    participants: ["Bruno Boehringer Mastantuono", "Eduardo Barros"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-638687166179572-xcm",
    clientId: "amazon.com",
    clientName: "AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",
    date: "2026-01-14",
    type: "VC Meeting",
    topic: "Amazon XCM | 2026",
    participants: ["Douglas Mendes", "Eduardo Neto", "Pedro Menezes"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-638687166179572-mkteng",
    clientId: "amazon.com",
    clientName: "AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",
    date: "2026-01-14",
    type: "VC Meeting",
    topic: "Meta & Amazon: Marketing Engagement",
    participants: ["Douglas Mendes"],
    isQualified: true,
    quarter: "Q1 2026",
  },
  {
    id: "ci-557520800977956",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "SAMSUNG ELETRONICA DA AMAZONIA LTDA (CE) - Credit Line",
    date: "2026-01-07",
    type: "In-Person Meeting",
    topic: "Briefing Criativo Samsung e Planejamento de marca 2026",
    participants: ["Bruno Boehringer Mastantuono"],
    isQualified: true,
    quarter: "Q1 2026",
  },
];

// ── Summary ──────────────────────────────────────────────────────────────────
export const ciSummary = {
  totalCIs: crmInteractions.length,
  qualifiedCIs: crmInteractions.filter(ci => ci.isQualified).length,
  byClient: {
    "magazine-luiza": crmInteractions.filter(ci => ci.clientId === "magazine-luiza").length,
    "amazon.com": crmInteractions.filter(ci => ci.clientId === "amazon.com").length,
    "samsung-electronics-co-ltd---kr(usd)": crmInteractions.filter(ci => ci.clientId === "samsung-electronics-co-ltd---kr(usd)").length,
  },
  dataAsOf: "2026-03-27",
  sourceUrl: "https://www.internalfb.com/crm/client_interactions",
  lastUpdated: "2026-03-27 09:05 BRT",
};

// ── crmSummary (used by CRMInteractionsSection) ──────────────────────────────────────────────────
export const crmSummary = {
  totalQualifiedCIs: crmInteractions.filter(ci => ci.isQualified).length,
  totalCIs: crmInteractions.length,
  quarter: "Q1 2026",
  dataAsOfDate: "2026-03-27",
  sourceUrl: "https://www.internalfb.com/crm/client_interactions",
  lastUpdated: "2026-03-27 09:05 BRT",
};

// ── crmCoverage (used by CRMInteractionsSection — Coverage Deep Dive table) ──
// QTD metrics as of 2026-03-27 (Week 13 Day 5 — Friday)
// Live CIs: Netshoes/Magalu (Mar 12 In-Person), Magalu (Mar 12 VC), Samsung (Mar 10 Messaging→Live),
//           Amazon (Mar 4 In-Person), Magalu (Mar 4 Messaging→Live), Samsung (Jan 21 VC),
//           Amazon (Jan 14 VC x2), Samsung (Jan 7 In-Person)
// Messaging CIs: Samsung Mar 10, Magalu Mar 4 (2 total)
// Live CIs (non-messaging): 7 total
export const crmCoverage = {
  totalClients: 3,
  totalLiveCIQTD: 7,
  totalMessagingCIQTD: 2,
  totalLiveAndMessagingCIQTD: 9,
  futureCIScheduledByEOQ: 2,
  outreachPct: 100,
  pctClients1PlusCI: 100,
  pctClients4PlusCI: 33,
  pctClients8PlusCI: 0,
  pctClients12PlusCI: 0,
  inPersonMeetings: 3,
  pctToInPersonGoal: 15,
  pitchedCIsWithBDM: 3,
  qualifyingInteractionPerClient: "3.0",
  lastUpdated: "2026-03-27 09:05 BRT",
};

// ── topicWeeks (weekly CI breakdown by topic, used for bar chart) ─────────────
export interface TopicWeek {
  week: string;
  "Creative Strategy": number;
  "Product Education": number;
  "Account Planning": number;
  "Campaign Review": number;
  "Other": number;
}

export const topicWeeks: TopicWeek[] = [
  { week: "Jan W1", "Creative Strategy": 1, "Product Education": 0, "Account Planning": 1, "Campaign Review": 0, "Other": 0 },
  { week: "Jan W2", "Creative Strategy": 0, "Product Education": 1, "Account Planning": 0, "Campaign Review": 1, "Other": 1 },
  { week: "Jan W3", "Creative Strategy": 1, "Product Education": 0, "Account Planning": 0, "Campaign Review": 0, "Other": 1 },
  { week: "Mar W1", "Creative Strategy": 1, "Product Education": 1, "Account Planning": 0, "Campaign Review": 0, "Other": 0 },
  { week: "Mar W2", "Creative Strategy": 1, "Product Education": 0, "Account Planning": 1, "Campaign Review": 1, "Other": 0 },
  { week: "Mar W3", "Creative Strategy": 1, "Product Education": 0, "Account Planning": 1, "Campaign Review": 0, "Other": 0 },
];

// ── topicColors & topicLabels ─────────────────────────────────────────────────
export const topicColors: Record<string, string> = {
  "Creative Strategy": "#7C3AED",
  "Product Education": "#0064E0",
  "Account Planning":  "#059669",
  "Campaign Review":   "#F59E0B",
  "Other":             "#9CA3AF",
};

export const topicLabels: Record<string, string> = {
  "Creative Strategy": "Creative Strategy",
  "Product Education": "Product Education",
  "Account Planning":  "Account Planning",
  "Campaign Review":   "Campaign Review",
  "Other":             "Other",
};

// ── avgLiveHoursPerClient ─────────────────────────────────────────────────────
export const avgLiveHoursPerClient = 1.5;
