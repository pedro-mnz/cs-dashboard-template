// rsPipelineData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
// Manus scrapes CRM RS/pipeline view and writes active pipeline items here.

export interface PipelineItem {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  stage: string;
  value?: number;
  currency?: string;
  dueDate?: string;
  owner: string;
  status: "active" | "closed" | "paused";
}

export const rsPipeline: PipelineItem[] = [];
// Manus will populate this array during setup and daily refresh.
