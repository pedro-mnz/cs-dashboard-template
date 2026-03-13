// rsPipelineData.ts
// Populated by Manus on 2026-03-12 from Meta CRM Pipeline Management
// Source: https://www.internalfb.com/crm/pipeline_management
// Filter: Creative Strategist role, Q1 2026 (Current)
// DO NOT edit manually — changes will be overwritten on next refresh.

export type RSStage =
  | "Scoped"
  | "Pitched"
  | "Committed"
  | "Actioned"
  | "Partially adopted"
  | "Adopted"
  | "Closed - Lost";

export interface PipelineItem {
  id: string;
  client: string; // "magalu" | "amazon" | "samsung"
  clientId: string;
  clientName: string;
  name: string;
  advertiser: string;
  stage: RSStage;
  solutionType: string;
  status?: "At Risk" | "Overdue" | null;
  eligibleTargetRevenue: number;
  attributedRevenue: number;
  opportunitySize: number;
  eligibleProgress: number;
  attributedProgress: number;
  priorityTag: string;
  owner: string;
  lastModified: string;
  revenueStartDate?: string;
  revenueEndDate?: string;
  lastClientInteraction?: string;
  ciCount?: number;
}

// Active and recent pipeline items for Pedro Menezes's clients (Q1 2026)
export const rsPipeline: PipelineItem[] = [
  {
    id: "2964730907061360",
    client: "magalu",
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    name: "Catalog Product Level Video: Creative",
    advertiser: "MAGAZINE LUIZA S/A - Advertiser",
    stage: "Partially adopted",
    solutionType: "Catalog Format",
    status: "At Risk",
    eligibleTargetRevenue: 5100511,
    attributedRevenue: 1530153,
    opportunitySize: 5100511,
    eligibleProgress: 16,
    attributedProgress: 16,
    priorityTag: "Recommended",
    owner: "Thelio Goncalves",
    lastModified: "2026-03-12",
    revenueStartDate: "2026-01-09",
    revenueEndDate: "2026-04-08",
    lastClientInteraction: "2026-03-11",
    ciCount: 4,
  },
  {
    id: "25589294394025504",
    client: "amazon",
    clientId: "amazon.com",
    clientName: "Amazon.Com",
    name: "Catalog Product Level Video: Creative",
    advertiser: "AMAZON SERVICOS DE VAREJO DO BRASIL LTDA. - Advertiser",
    stage: "Partially adopted",
    solutionType: "Catalog Format",
    status: "At Risk",
    eligibleTargetRevenue: 3356257,
    attributedRevenue: 1006877,
    opportunitySize: 3356257,
    eligibleProgress: 16,
    attributedProgress: 16,
    priorityTag: "Recommended",
    owner: "Douglas Mendes",
    lastModified: "2026-03-10",
    revenueStartDate: "2026-02-02",
    revenueEndDate: "2026-05-02",
    lastClientInteraction: "2026-02-27",
    ciCount: 7,
  },
  {
    id: "24916066381348312",
    client: "amazon",
    clientId: "amazon.com",
    clientName: "Amazon.Com",
    name: "Scale partnership ads",
    advertiser: "AMAZON SERVICOS DE VAREJO DO BRASIL LTDA. - Advertiser",
    stage: "Actioned",
    solutionType: "Partnership ads",
    status: null,
    eligibleTargetRevenue: 5875129,
    attributedRevenue: 613837,
    opportunitySize: 5875129,
    eligibleProgress: 4,
    attributedProgress: 0,
    priorityTag: "Recommended",
    owner: "Douglas Mendes",
    lastModified: "2026-03-12",
    revenueStartDate: "2025-10-28",
    revenueEndDate: "2026-01-25",
    lastClientInteraction: "2026-02-10",
    ciCount: 18,
  },
  {
    id: "3397688507051624",
    client: "samsung",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung Electronics Co Ltd - KR(USD)",
    name: "Adopt CTX",
    advertiser: "Samsung - CE - Account Team",
    stage: "Scoped",
    solutionType: "Click to message (CTX)",
    status: "Overdue",
    eligibleTargetRevenue: 1930778,
    attributedRevenue: 579233,
    opportunitySize: 1930778,
    eligibleProgress: 0,
    attributedProgress: 0,
    priorityTag: "Recommended",
    owner: "Bruno Boehringer Mastantuono",
    lastModified: "2026-03-12",
    revenueStartDate: "2026-03-19",
    revenueEndDate: "2026-06-17",
    ciCount: 0,
  },
  {
    id: "3795039417470054",
    client: "samsung",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung Electronics Co Ltd - KR(USD)",
    name: "Scale partnership ads",
    advertiser: "Samsung - ME / MX - Account Team",
    stage: "Actioned",
    solutionType: "Partnership ads",
    status: null,
    eligibleTargetRevenue: 5312148,
    attributedRevenue: 567608,
    opportunitySize: 5312148,
    eligibleProgress: 2,
    attributedProgress: 0,
    priorityTag: "Recommended",
    owner: "Bruno Boehringer Mastantuono",
    lastModified: "2026-03-12",
    revenueStartDate: "2025-11-06",
    revenueEndDate: "2026-02-03",
    lastClientInteraction: "2026-03-11",
    ciCount: 9,
  },
  {
    id: "3775725686068094",
    client: "samsung",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung Electronics Co Ltd - KR(USD)",
    name: "Simplify or consolidate ad sets",
    advertiser: "Samsung - ME / MX - Account Team",
    stage: "Actioned",
    solutionType: "Account simplification",
    status: null,
    eligibleTargetRevenue: 4300332,
    attributedRevenue: 653650,
    opportunitySize: 4300332,
    eligibleProgress: 3,
    attributedProgress: 0,
    priorityTag: "Recommended",
    owner: "Bruno Boehringer Mastantuono",
    lastModified: "2026-03-12",
    revenueStartDate: "2025-10-17",
    revenueEndDate: "2026-01-14",
    lastClientInteraction: "2026-03-10",
    ciCount: 21,
  },
];

const totalEligible = rsPipeline.reduce((s, r) => s + r.eligibleTargetRevenue, 0);
const totalAttributed = rsPipeline.reduce((s, r) => s + r.attributedRevenue, 0);
const totalOpp = rsPipeline.reduce((s, r) => s + r.opportunitySize, 0);

export const rsSummary = {
  total: rsPipeline.length,
  totalOpportunitySize: totalOpp,
  totalEligibleTargetRevenue: totalEligible,
  totalAttributedRevenue: totalAttributed,
  eligibleProgress: totalEligible > 0 ? Math.round((totalAttributed / totalEligible) * 100) : 0,
  attributedProgress: totalOpp > 0 ? Math.round((totalAttributed / totalOpp) * 100) : 0,
  atRiskCount: rsPipeline.filter(r => r.status === "At Risk").length,
  overdueCount: rsPipeline.filter(r => r.status === "Overdue").length,
  byClient: {
    magalu: rsPipeline.filter(r => r.client === "magalu").length,
    amazon: rsPipeline.filter(r => r.client === "amazon").length,
    samsung: rsPipeline.filter(r => r.client === "samsung").length,
  },
  quarter: "Q1 2026",
  dataAsOf: "2026-03-12",
  sourceUrl: "https://www.internalfb.com/crm/pipeline_management",
};

export const rsStageConfig: Record<RSStage, { label: string; color: string; bg: string; dot: string }> = {
  "Scoped":           { label: "Scoped",            color: "#6B7280", bg: "#F9FAFB", dot: "#9CA3AF" },
  "Pitched":          { label: "Pitched",           color: "#3B82F6", bg: "#EFF6FF", dot: "#60A5FA" },
  "Committed":        { label: "Committed",         color: "#8B5CF6", bg: "#F5F3FF", dot: "#A78BFA" },
  "Actioned":         { label: "Actioned",          color: "#F59E0B", bg: "#FFFBEB", dot: "#FCD34D" },
  "Partially adopted":{ label: "Partially adopted", color: "#0064E0", bg: "#EBF4FF", dot: "#60A5FA" },
  "Adopted":          { label: "Adopted",           color: "#059669", bg: "#ECFDF5", dot: "#34D399" },
  "Closed - Lost":    { label: "Closed - Lost",     color: "#DC2626", bg: "#FEF2F2", dot: "#F87171" },
};

export const rsStatusConfig: Record<"At Risk" | "Overdue", { label: string; color: string; bg: string }> = {
  "At Risk": { label: "At Risk",  color: "#D97706", bg: "#FEF3C7" },
  "Overdue": { label: "Overdue",  color: "#DC2626", bg: "#FEF2F2" },
};

export const rsClientColors: Record<string, { name: string; color: string; bg: string }> = {
  magalu:  { name: "Magalu",   color: "#0064E0", bg: "#EBF4FF" },
  amazon:  { name: "Amazon",   color: "#e05a00", bg: "#FFF3EB" },
  samsung: { name: "Samsung",  color: "#1428A0", bg: "#EBF0FF" },
};
