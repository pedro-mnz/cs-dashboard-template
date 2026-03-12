// inPersonData.ts
// TEMPLATE PLACEHOLDER — populated by Manus during setup and daily refresh.
// Tracks in-office attendance days.

export interface InPersonDay {
  date: string;   // ISO date YYYY-MM-DD
  wasInOffice: boolean;
  office?: string;
}

export const inPersonDays: InPersonDay[] = [];
// Manus will populate this array during setup and daily refresh.

export const inPersonSummary = {
  currentWeekDays: 0,
  currentMonthDays: 0,
  targetPerWeek: 3,
  dataAsOf: new Date().toISOString().split("T")[0],
};
