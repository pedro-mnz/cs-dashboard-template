// Workplace digest data — populated by Manus during setup from Workplace
// This file is refreshed daily by Manus.

export interface DigestItem {
  id: string;
  type: "post" | "announcement" | "event";
  title: string;
  group: string;
  date: string;
  url?: string;
  summary?: string;
}

export const workplaceDigest: DigestItem[] = [];
