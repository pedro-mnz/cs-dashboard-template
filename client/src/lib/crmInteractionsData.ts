// crmInteractionsData.ts
// Populated by Manus on 2026-03-12 from Meta CRM (internalfb.com/crm/client_interactions)
// Filters: Participant in BoB + This Quarter (Q1 2026) + Is Qualified + Participant = Pedro Menezes
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

export const ciSummary = {
  totalCIs: crmInteractions.length,
  qualifiedCIs: crmInteractions.filter(ci => ci.isQualified).length,
  byClient: {
    "magazine-luiza": crmInteractions.filter(ci => ci.clientId === "magazine-luiza").length,
    "amazon.com": crmInteractions.filter(ci => ci.clientId === "amazon.com").length,
    "samsung-electronics-co-ltd---kr(usd)": crmInteractions.filter(ci => ci.clientId === "samsung-electronics-co-ltd---kr(usd)").length,
  },
  dataAsOf: "2026-03-12",
  sourceUrl: "https://www.internalfb.com/crm/client_interactions",
};
