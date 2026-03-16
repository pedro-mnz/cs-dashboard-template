// inPersonData.ts
// Populated by Manus on 2026-03-16
// Tracks in-office attendance days for Pedro Menezes.
// DO NOT edit manually — changes will be overwritten on next refresh.

export interface InPersonDay {
  date: string;   // ISO date YYYY-MM-DD
  wasInOffice: boolean;
  office?: string;
}

export const inPersonDays: InPersonDay[] = [
  { date: "2026-03-16", wasInOffice: true,  office: "SAO" },
  { date: "2026-03-15", wasInOffice: true,  office: "SAO" },
  { date: "2026-03-10", wasInOffice: true,  office: "SAO" },
  { date: "2026-03-09", wasInOffice: true,  office: "SAO" },
  { date: "2026-03-04", wasInOffice: true,  office: "SAO" },
  { date: "2026-03-03", wasInOffice: false },
  { date: "2026-03-02", wasInOffice: false },
];

export const inPersonSummary = {
  currentWeekDays: 1,
  currentMonthDays: 5,
  targetPerWeek: 3,
  dataAsOf: "2026-03-16",
};

// ── currentPeriod (used by OverviewSection — In-Person Policy widget) ─────────
export const currentPeriod = {
  label: "Mar 1 – Apr 30",
  startDate: "2026-03-01",
  endDate: "2026-04-30",
  daysInPerson: 5,
  plannedDays: 0,
  timeAwayDays: 0,
  targetDays: 12,
  onTrack: true,
  daysNeeded: 7,
};

// ── weeklyBreakdown (used by OverviewSection — per-week day grid) ─────────────
export interface InPersonWeekBreakdown {
  weekLabel: string;
  total: number;
  onTrack: boolean;
  days: Array<{
    day: string;      // "Mon", "Tue", etc.
    date: string;     // "Mar 2"
    inPerson: boolean | null; // null = upcoming/unknown
  }>;
}

export const weeklyBreakdown: InPersonWeekBreakdown[] = [
  {
    weekLabel: "Feb 23",
    total: 0,
    onTrack: false,
    days: [
      { day: "Mon", date: "Feb 23", inPerson: false },
      { day: "Tue", date: "Feb 24", inPerson: false },
      { day: "Wed", date: "Feb 25", inPerson: false },
      { day: "Thu", date: "Feb 26", inPerson: false },
      { day: "Fri", date: "Feb 27", inPerson: false },
    ],
  },
  {
    weekLabel: "Mar 2",
    total: 1,
    onTrack: false,
    days: [
      { day: "Mon", date: "Mar 2",  inPerson: false },
      { day: "Tue", date: "Mar 3",  inPerson: false },
      { day: "Wed", date: "Mar 4",  inPerson: true  },
      { day: "Thu", date: "Mar 5",  inPerson: false },
      { day: "Fri", date: "Mar 6",  inPerson: false },
    ],
  },
  {
    weekLabel: "Mar 9",
    total: 3,
    onTrack: true,
    days: [
      { day: "Mon", date: "Mar 9",  inPerson: true  },
      { day: "Tue", date: "Mar 10", inPerson: true  },
      { day: "Wed", date: "Mar 11", inPerson: false },
      { day: "Thu", date: "Mar 12", inPerson: false },
      { day: "Fri", date: "Mar 13", inPerson: true  },
    ],
  },
  {
    weekLabel: "Mar 16",
    total: 1,
    onTrack: false,
    days: [
      { day: "Mon", date: "Mar 16", inPerson: true  },
      { day: "Tue", date: "Mar 17", inPerson: null  },
      { day: "Wed", date: "Mar 18", inPerson: null  },
      { day: "Thu", date: "Mar 19", inPerson: null  },
      { day: "Fri", date: "Mar 20", inPerson: null  },
    ],
  },
];

// ── statusPageUrl ─────────────────────────────────────────────────────────────
export const statusPageUrl = "https://www.internalfb.com/people/1084877300";
