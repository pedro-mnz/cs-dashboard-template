// rsPipelineData.ts
// Populated by Manus on 2026-03-12 from Meta CRM Pipeline Management
// Source: https://www.internalfb.com/crm/pipeline_management
// Filter: Creative Strategist role, Q1 2026 (Current)
// DO NOT edit manually — changes will be overwritten on next refresh.

export interface PipelineItem {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  stage: string;
  solutionType: string;
  eligibleTargetRevenue: number;
  attributedRevenue: number;
  eligibleProgress: number;
  attributedProgress: number;
  status: "active" | "closed" | "paused" | "at_risk" | "overdue";
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
    clientId: "magazine-luiza",
    clientName: "Magazine Luiza",
    title: "Catalog Product Level Video: Creative",
    stage: "Partially adopted",
    solutionType: "Catalog Format",
    eligibleTargetRevenue: 5100511,
    attributedRevenue: 1530153,
    eligibleProgress: 16,
    attributedProgress: 16,
    status: "at_risk",
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
    clientId: "amazon.com",
    clientName: "Amazon.Com",
    title: "Catalog Product Level Video: Creative",
    stage: "Partially adopted",
    solutionType: "Catalog Format",
    eligibleTargetRevenue: 3356257,
    attributedRevenue: 1006877,
    eligibleProgress: 16,
    attributedProgress: 16,
    status: "at_risk",
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
    clientId: "amazon.com",
    clientName: "Amazon.Com",
    title: "Scale partnership ads",
    stage: "Actioned",
    solutionType: "Partnership ads",
    eligibleTargetRevenue: 5875129,
    attributedRevenue: 613837,
    eligibleProgress: 4,
    attributedProgress: 0,
    status: "active",
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
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung Electronics Co Ltd - KR(USD)",
    title: "Adopt CTX",
    stage: "Scoped",
    solutionType: "Click to message (CTX)",
    eligibleTargetRevenue: 1930778,
    attributedRevenue: 579233,
    eligibleProgress: 0,
    attributedProgress: 0,
    status: "overdue",
    priorityTag: "Recommended",
    owner: "Bruno Boehringer Mastantuono",
    lastModified: "2026-03-12",
    revenueStartDate: "2026-03-19",
    revenueEndDate: "2026-06-17",
    ciCount: 0,
  },
  {
    id: "3795039417470054",
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung Electronics Co Ltd - KR(USD)",
    title: "Scale partnership ads",
    stage: "Actioned",
    solutionType: "Partnership ads",
    eligibleTargetRevenue: 5312148,
    attributedRevenue: 567608,
    eligibleProgress: 2,
    attributedProgress: 0,
    status: "active",
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
    clientId: "samsung-electronics-co-ltd---kr(usd)",
    clientName: "Samsung Electronics Co Ltd - KR(USD)",
    title: "Simplify or consolidate ad sets",
    stage: "Actioned",
    solutionType: "Account simplification",
    eligibleTargetRevenue: 4300332,
    attributedRevenue: 653650,
    eligibleProgress: 3,
    attributedProgress: 0,
    status: "active",
    priorityTag: "Recommended",
    owner: "Bruno Boehringer Mastantuono",
    lastModified: "2026-03-12",
    revenueStartDate: "2025-10-17",
    revenueEndDate: "2026-01-14",
    lastClientInteraction: "2026-03-10",
    ciCount: 21,
  },
];

export const pipelineSummary = {
  totalItems: rsPipeline.length,
  totalEligibleRevenue: rsPipeline.reduce((sum, item) => sum + item.eligibleTargetRevenue, 0),
  totalAttributedRevenue: rsPipeline.reduce((sum, item) => sum + item.attributedRevenue, 0),
  atRiskCount: rsPipeline.filter(item => item.status === "at_risk").length,
  overdueCount: rsPipeline.filter(item => item.status === "overdue").length,
  activeCount: rsPipeline.filter(item => item.status === "active").length,
  byClient: {
    "magazine-luiza": rsPipeline.filter(item => item.clientId === "magazine-luiza").length,
    "amazon.com": rsPipeline.filter(item => item.clientId === "amazon.com").length,
    "samsung-electronics-co-ltd---kr(usd)": rsPipeline.filter(item => item.clientId === "samsung-electronics-co-ltd---kr(usd)").length,
  },
  quarter: "Q1 2026",
  dataAsOf: "2026-03-12",
  sourceUrl: "https://www.internalfb.com/crm/pipeline_management",
};
