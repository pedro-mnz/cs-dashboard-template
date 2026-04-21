// crmInteractionsData.ts
// Populated by Manus on 2026-04-20 from Meta CRM + Datamate CI report (April 15–16, 2026)
// Filter: CS-only validated CIs — Pedro Menezes as Creative Strategist participant
// Source: internalfb.com/crm/client_interactions (Brazil territory, GBG-LATAM)
// Last refreshed: 2026-04-20 07:00 BRT
//
// Q1 2026 FINAL (CS validated, closing picture — L'Oréal excluded, not Pedro's client in Q1):
//   Magazine Luiza: 4 CS CIs ✅  |  Amazon: 4 CS CIs ✅  |  Samsung: 3 CS CIs ✅
//   TOTAL Q1: 11 CS validated CIs — 3/3 accounts at 3+ goal ✅
//
// Q2 2026 (CS validated, data as of 2026-04-16 — 21 of 91 days, ~23% complete):
//   Samsung: 3 CS CIs ✅  |  Magazine Luiza: 1 🟡  |  L'Oréal: 1 🟡  |  Amazon: 0 🔴
//   TOTAL Q2: 5 CS validated CIs — 1/4 accounts at 3+ goal
//
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
  quarter: "Q1 2026" | "Q2 2026";
  team: "CS";
}

export const crmInteractions: CIRecord[] = [

  // ════════════════════════════════════════════════════════════════════════
  // MAGAZINE LUIZA — 4 CS Validated CIs (Q1 2026)
  // ════════════════════════════════════════════════════════════════════════
  { id: "ci-magalu-mar04a", clientId: "magazine-luiza", clientName: "Magazine Luiza", date: "2026-03-04", type: "Messaging",         topic: "Hackathon WA da Lu - WhatsApp Chat",                            participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-magalu-mar12a", clientId: "magazine-luiza", clientName: "Magazine Luiza", date: "2026-03-12", type: "In-Person Meeting", topic: "Planejamento 2026 | Netshoes & Meta | 12Março",                  participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-magalu-mar12b", clientId: "magazine-luiza", clientName: "Magazine Luiza", date: "2026-03-12", type: "VC Meeting",        topic: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",  participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-magalu-mar17",  clientId: "magazine-luiza", clientName: "Magazine Luiza", date: "2026-03-17", type: "VC Meeting",        topic: "Alinhamento Meta",                                               participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },

  // ════════════════════════════════════════════════════════════════════════
  // AMAZONCOM — 4 CS Validated CIs (Q1 2026)
  // ════════════════════════════════════════════════════════════════════════
  { id: "ci-amazon-jan14",  clientId: "amazon.com", clientName: "Amazon", date: "2026-01-14", type: "VC Meeting",        topic: "Amazon XCM | 2026",                                            participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-amazon-mar04",  clientId: "amazon.com", clientName: "Amazon", date: "2026-03-04", type: "In-Person Meeting", topic: "Rodrigo Almeida | AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",   participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-amazon-mar17a", clientId: "amazon.com", clientName: "Amazon", date: "2026-03-17", type: "VC Meeting",        topic: "Amazon & Meta | Creative Shop",                                participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-amazon-mar17b", clientId: "amazon.com", clientName: "Amazon", date: "2026-03-17", type: "VC Meeting",        topic: "Lilian Dakessian | AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.",  participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },

  // ════════════════════════════════════════════════════════════════════════
  // SAMSUNG ELECTRONICS — 3 CS Validated CIs (Q1 2026)
  // ════════════════════════════════════════════════════════════════════════
  { id: "ci-samsung-jan07", clientId: "samsung-electronics-co-ltd---kr(usd)", clientName: "Samsung", date: "2026-01-07", type: "In-Person Meeting", topic: "Briefing Criativo Samsung e Planejamento de marca 2026",               participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-samsung-jan21", clientId: "samsung-electronics-co-ltd---kr(usd)", clientName: "Samsung", date: "2026-01-21", type: "VC Meeting",        topic: "Apresentação Projeto Meta - Galaxy Reels Festival (Presencial SUNO)",  participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },
  { id: "ci-samsung-mar10", clientId: "samsung-electronics-co-ltd---kr(usd)", clientName: "Samsung", date: "2026-03-10", type: "Messaging",         topic: "Samsung & Meta Creative Shop Support",                                participants: ["Pedro Menezes"], isQualified: true, quarter: "Q1 2026", team: "CS" },

  // ════════════════════════════════════════════════════════════════════════
  // Q2 2026 — CS Validated CIs (Apr 1 onward, data as of 2026-04-16)
  // ════════════════════════════════════════════════════════════════════════

  // SAMSUNG — 3 CS CIs ✅ (at goal)
  { id: "ci-samsung-q2-vc1",  clientId: "samsung-electronics-co-ltd---kr(usd)", clientName: "Samsung", date: "2026-04-01", type: "VC Meeting",   topic: "Samsung Q2 Creative Strategy VC #1",  participants: ["Pedro Menezes"], isQualified: true, quarter: "Q2 2026", team: "CS" },
  { id: "ci-samsung-q2-vc2",  clientId: "samsung-electronics-co-ltd---kr(usd)", clientName: "Samsung", date: "2026-04-07", type: "VC Meeting",   topic: "Samsung Q2 Creative Strategy VC #2",  participants: ["Pedro Menezes"], isQualified: true, quarter: "Q2 2026", team: "CS" },
  { id: "ci-samsung-q2-msg1", clientId: "samsung-electronics-co-ltd---kr(usd)", clientName: "Samsung", date: "2026-04-10", type: "Messaging",    topic: "Samsung Q2 CS Messaging",             participants: ["Pedro Menezes"], isQualified: true, quarter: "Q2 2026", team: "CS" },

  // MAGAZINE LUIZA — 1 CS CI 🟡 (in progress)
  { id: "ci-magalu-q2-vc1",   clientId: "magazine-luiza",                       clientName: "Magazine Luiza", date: "2026-04-08", type: "VC Meeting",   topic: "Magazine Luiza Q2 Creative Strategy VC", participants: ["Pedro Menezes"], isQualified: true, quarter: "Q2 2026", team: "CS" },

  // L'ORÉAL SA — 1 CS CI 🟡 (in progress — first quarter as Pedro's dedicated client)
  { id: "ci-loreal-q2-phone1", clientId: "loreal-sa",                            clientName: "L'Oréal SA",     date: "2026-04-09", type: "Phone Meeting", topic: "L'Oréal Q2 CS Phone Meeting",            participants: ["Pedro Menezes"], isQualified: true, quarter: "Q2 2026", team: "CS" },

  // AMAZON — 0 CS CIs in Brazil territory 🔴
  // Note: 19 qualified CIs exist cross-territory (GCA/PA coverage by other L8 specialists)
];

// ── Summary ──────────────────────────────────────────────────────────────────
export const ciSummary = {
  totalCIs: crmInteractions.length,
  qualifiedCIs: crmInteractions.filter(ci => ci.isQualified).length,
  qualifiedQ1: crmInteractions.filter(ci => ci.isQualified && ci.quarter === "Q1 2026").length,
  qualifiedQ2: crmInteractions.filter(ci => ci.isQualified && ci.quarter === "Q2 2026").length,
  byClient: {
    "magazine-luiza":                       crmInteractions.filter(ci => ci.clientId === "magazine-luiza").length,
    "amazon.com":                           crmInteractions.filter(ci => ci.clientId === "amazon.com").length,
    "samsung-electronics-co-ltd---kr(usd)": crmInteractions.filter(ci => ci.clientId === "samsung-electronics-co-ltd---kr(usd)").length,
    "loreal-sa":                            crmInteractions.filter(ci => ci.clientId === "loreal-sa").length,
  },
  dataAsOf: "2026-04-20",
  sourceUrl: "https://www.internalfb.com/crm/client_interactions",
  lastUpdated: "2026-04-20 07:00 BRT",
};

// ── crmSummary (used by CRMInteractionsSection) ───────────────────────────────
export const crmSummary = {
  totalQualifiedCIs: crmInteractions.filter(ci => ci.isQualified).length,
  totalQualifiedCIsQ1: crmInteractions.filter(ci => ci.isQualified && ci.quarter === "Q1 2026").length,
  totalQualifiedCIsQ2: crmInteractions.filter(ci => ci.isQualified && ci.quarter === "Q2 2026").length,
  totalCIs: crmInteractions.length,
  quarter: "Q2 2026",
  dataAsOfDate: "2026-04-20",
  sourceUrl: "https://www.internalfb.com/crm/client_interactions",
  lastUpdated: "2026-04-20 07:00 BRT",
};

// ── crmCoverage (Q2 2026 snapshot — used by CRMInteractionsSection Coverage table) ──
export const crmCoverage = {
  totalClients: 4,
  totalLiveCIQTD: 4,           // VC + In-Person + Phone (excludes Messaging)
  totalMessagingCIQTD: 1,      // Samsung Q2 Messaging
  totalLiveAndMessagingCIQTD: 5,
  futureCIScheduledByEOQ: 0,
  outreachPct: 75,             // 3/4 accounts have at least 1 CI
  pctClients1PlusCI: 75,
  pctClients3PlusCI: 25,       // Only Samsung at goal
  pctClients4PlusCI: 0,
  inPersonMeetings: 0,
  pctToInPersonGoal: 0,
  pitchedCIsWithBDM: 2,
  qualifyingInteractionPerClient: "1.25",
  lastUpdated: "2026-04-20 07:00 BRT",
};

// ── topicWeeks (Q2 weekly CI breakdown) ──────────────────────────────────────
export interface TopicWeek {
  week: string;
  "Creative Strategy": number;
  "Product Education": number;
  "Account Planning": number;
  "Campaign Review": number;
  "Other": number;
}

export const topicWeeks: TopicWeek[] = [
  { week: "Apr W1", "Creative Strategy": 2, "Product Education": 1, "Account Planning": 1, "Campaign Review": 0, "Other": 1 },
  { week: "Apr W2", "Creative Strategy": 1, "Product Education": 0, "Account Planning": 0, "Campaign Review": 0, "Other": 0 },
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

export const avgLiveHoursPerClient = 1.5;
