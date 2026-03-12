// workplaceData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
// Manus scrapes Workplace client content pages and writes data here.

export interface WorkplacePost {
  id: string;
  client: string;
  title: string;
  summary: string;
  author: string;
  group: string;
  date: string;
  dateLabel: string;
  reactions: number;
  views: number;
  comments?: number;
  tags: string[];
  tagged?: boolean;    // User was mentioned/tagged in this post
  reacted?: boolean;   // User reacted to this post
  isRecent?: boolean;
  workplaceUrl?: string;
}

// Populated by Manus during setup and daily refresh
export const workplacePosts: WorkplacePost[] = [];

export const getPostsByClient = (client: string) =>
  workplacePosts.filter((p) => p.client === client);

export const wpClientColors: Record<string, { color: string; bg: string; border: string }> = {};
export const wpClientLabels: Record<string, string> = {};
export const dataAsOf = new Date().toISOString().split("T")[0];
export const workplaceSearchUrls: Record<string, string> = {};
