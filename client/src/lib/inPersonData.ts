// In-person office visit data — populated by Manus during setup
// This file is refreshed daily by Manus.

export interface InPersonDay {
  date: string;
  office: string;
  note?: string;
}

export const inPersonDays: InPersonDay[] = [];

export const inPersonSummary = {
  thisWeek: 0,
  thisMonth: 0,
  target: 3,
  streak: 0,
};
