// workplaceDigestData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
// Manus scrapes Workplace feed and writes the top posts here.

export interface WorkplacePost {
  id: string;
  author: string;
  authorRole?: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  groupName?: string;
  url?: string;
}

export const workplacePosts: WorkplacePost[] = [];
// Manus will populate this array during setup and daily refresh.

export const digestSummary = {
  dataAsOf: new Date().toISOString().split("T")[0],
  sourceUrl: "https://www.workplace.com",
};
