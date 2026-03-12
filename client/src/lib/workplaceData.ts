// Workplace posts data — populated by Manus during setup from Workplace
// This file is refreshed daily by Manus.

export interface WorkplacePost {
  id: string;
  author: string;
  group: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  tagged?: boolean;
  reacted?: boolean;
  url?: string;
}

export const workplacePosts: WorkplacePost[] = [];

export const workplaceSearchUrls: Record<string, string> = {};
