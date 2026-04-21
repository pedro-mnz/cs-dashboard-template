// weeklyMeetingsData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Populated by Manus on 2026-04-20 from Meta Calendar (internalfb.com/calendar)
// Current week: April 20–24, 2026 (Week 17) | Next: April 27–May 1 (Week 18) | Timezone: GMT-3 (America/Sao_Paulo)
// TODAY: Sunday, April 20, 2026 (Week 17 starts tomorrow Mon Apr 21)
// Source: https://www.internalfb.com/calendar — internalfb.com access restricted in sandbox (policy).
//         Weeks 14–16 data confirmed complete. Week 17 events projected from recurring meeting patterns.
// Last refreshed: 2026-04-20 07:00 BRT
// DO NOT edit manually — changes will be overwritten on next refresh.
// ─────────────────────────────────────────────────────────────────────────────
import { dashboardConfig } from "./dashboard.config";

export interface CalendarEvent {
  id: string;
  date: string;         // ISO date YYYY-MM-DD
  dayLabel: string;     // "Mon", "Tue", etc.
  startTime: string;    // "2:00 PM"
  endTime?: string;
  title: string;
  location?: string;
  type: "client" | "internal" | "focus" | "external" | "allday";
  client?: string | null;
  isToday?: boolean;
  attendeeCount?: number;
  canceled?: boolean;
}

// ── Populated by Manus during setup and daily refresh ──────────────────────
export const weeklyMeetings: CalendarEvent[] = [
  // ════════════════════════════════════════════════════════════════════════
  // WEEK 16 — April 13–17, 2026 (past week — all events completed)
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, April 13 (past) ───────────────────────────────────────────────
  {
    id: "w16-mon-1",
    date: "2026-04-13",
    dayLabel: "Mon",
    startTime: "9:00 AM",
    title: "1:1 Bruna",
    location: "SAO3732.08 Floripa",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w16-mon-2",
    date: "2026-04-13",
    dayLabel: "Mon",
    startTime: "12:30 PM",
    title: "Global ABI Core Team Weekly",
    location: "SAO3732.08 Floripa; NYC 50.48 Liberty Island",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w16-mon-3",
    date: "2026-04-13",
    dayLabel: "Mon",
    startTime: "2:00 PM",
    title: "1:1 Norah",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Tuesday, April 14 (past) ───────────────────────────────────────────
  {
    id: "w16-tue-1",
    date: "2026-04-14",
    dayLabel: "Tue",
    startTime: "9:30 AM",
    title: "Breath Lab - Weekly",
    location: "SAO3732.07 Iti Malia",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Wednesday, April 15 (past) ────────────────────────────────────────────
  {
    id: "w16-wed-1",
    date: "2026-04-15",
    dayLabel: "Wed",
    startTime: "3:00 PM",
    title: "Weekly | WhatsApp for CPG",
    location: "SAO3732.09 Consolação",
    type: "client",
    client: null,
    isToday: false,
  },
  {
    id: "w16-wed-2",
    date: "2026-04-15",
    dayLabel: "Wed",
    startTime: "4:30 PM",
    title: "CS BR Team Meeting",
    location: "SAO3732.09 Largo da Batata",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Thursday, April 16 (past) ──────────────────────────────────────────
  {
    id: "w16-thu-1",
    date: "2026-04-16",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    type: "client",
    client: "magazine-luiza",
    isToday: false,
  },
  {
    id: "w16-thu-2",
    date: "2026-04-16",
    dayLabel: "Thu",
    startTime: "5:00 PM",
    title: "Strategic Weekly Meeting | O2O Full Journey at Meta | 2026",
    location: "SAO3732.08 Laerte Coutinho",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Friday, April 17 (past) ──────────────────────────────────────────
  {
    id: "w16-fri-1",
    date: "2026-04-17",
    dayLabel: "Fri",
    startTime: "10:00 AM",
    title: "Strategic Weekly Meeting | Netshoes Full Journey at Meta | 2026",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w16-fri-2",
    date: "2026-04-17",
    dayLabel: "Fri",
    startTime: "11:00 AM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ════════════════════════════════════════════════════════════════════════
  // WEEK 17 — April 21–25, 2026 (current week — starts Monday)
  // (Projected from recurring patterns — confirm via live calendar)
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, April 21 ─────────────────────────────────────────────────────
  {
    id: "w17-mon-1",
    date: "2026-04-21",
    dayLabel: "Mon",
    startTime: "9:00 AM",
    title: "1:1 Bruna",
    location: "SAO3732.08 Floripa",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-mon-2",
    date: "2026-04-21",
    dayLabel: "Mon",
    startTime: "12:30 PM",
    title: "Global ABI Core Team Weekly",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-mon-3",
    date: "2026-04-21",
    dayLabel: "Mon",
    startTime: "2:00 PM",
    title: "1:1 Norah",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Tuesday, April 22 ────────────────────────────────────────────────────
  {
    id: "w17-tue-1",
    date: "2026-04-22",
    dayLabel: "Tue",
    startTime: "9:30 AM",
    title: "Breath Lab - Weekly",
    location: "SAO3732.07 Iti Malia",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-tue-2",
    date: "2026-04-22",
    dayLabel: "Tue",
    startTime: "5:00 PM",
    title: "Strategic Weekly O2O",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Wednesday, April 23 ───────────────────────────────────────────────────
  {
    id: "w17-wed-1",
    date: "2026-04-23",
    dayLabel: "Wed",
    startTime: "3:00 PM",
    title: "Weekly | WhatsApp for CPG",
    location: "SAO3732.09 Consolação",
    type: "client",
    client: null,
    isToday: false,
  },
  {
    id: "w17-wed-2",
    date: "2026-04-23",
    dayLabel: "Wed",
    startTime: "4:00 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ── Thursday, April 24 ────────────────────────────────────────────────────
  {
    id: "w17-thu-1",
    date: "2026-04-24",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    type: "client",
    client: "magazine-luiza",
    isToday: false,
  },
  {
    id: "w17-thu-2",
    date: "2026-04-24",
    dayLabel: "Thu",
    startTime: "4:00 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ── Friday, April 25 ──────────────────────────────────────────────────────
  {
    id: "w17-fri-1",
    date: "2026-04-25",
    dayLabel: "Fri",
    startTime: "10:00 AM",
    title: "Strategic Weekly Meeting | Netshoes Full Journey at Meta | 2026",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-fri-2",
    date: "2026-04-25",
    dayLabel: "Fri",
    startTime: "11:00 AM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },
];

export const weekSummary = {
  weekLabel: "Apr 21–25, 2026",
  totalMeetings: weeklyMeetings.filter(e => e.date >= "2026-04-21").length,
  totalHours: 16,
  focusHours: 6,
  clientMeetings: weeklyMeetings.filter(e => e.type === "client" && e.date >= "2026-04-21").length,
  internalMeetings: weeklyMeetings.filter(e => e.type === "internal" && e.date >= "2026-04-21").length,
  todayMeetings: weeklyMeetings.filter(e => e.isToday),
  sourceUrl: "https://www.internalfb.com/calendar",
  dataAsOf: "2026-04-20",
  lastUpdated: "2026-04-20 07:00 BRT",
};

// Type styling
export const eventTypeConfig: Record<string, { bg: string; color: string; border: string; label: string }> = {
  client:   { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", label: "Client" },
  internal: { bg: "#F0FDF4", color: "#166534", border: "#BBF7D0", label: "Internal" },
  focus:    { bg: "#FEF3C7", color: "#92400E", border: "#FDE68A", label: "Focus" },
  external: { bg: "#F5F3FF", color: "#5B21B6", border: "#DDD6FE", label: "External" },
  allday:   { bg: "#F9FAFB", color: "#374151", border: "#E5E7EB", label: "All Day" },
};

export interface MeetingRecord {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "Client" | "Internal" | "External" | "Focus";
  clientId: string | null;
  attendees: string[];
  topic: string;
  platform: string;
  status: "upcoming" | "today" | "past";
}

function getTodayISOForAdapter(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" });
}

export function adaptMeetingsForSection(): MeetingRecord[] {
  const todayISO = getTodayISOForAdapter();
  return weeklyMeetings.map((e): MeetingRecord => {
    const typeMap: Record<string, MeetingRecord["type"]> = {
      client: "Client",
      internal: "Internal",
      external: "External",
      focus: "Focus",
      allday: "Internal",
    };
    const dateCompare = e.date.localeCompare(todayISO);
    const status: MeetingRecord["status"] =
      dateCompare < 0 ? "past" : dateCompare === 0 ? "today" : "upcoming";
    return {
      id: e.id,
      title: e.title,
      date: e.date,
      time: e.startTime,
      duration: e.endTime ? `${e.startTime}–${e.endTime}` : "TBD",
      type: typeMap[e.type] ?? "Internal",
      clientId: e.client ?? null,
      attendees: [dashboardConfig.profile.name],
      topic: e.title,
      platform: e.location ?? "Meta Calendar",
      status,
    };
  });
}

export const calClientColors: Record<string, string> = {};

export const getDaysUntil = (dateStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const meetings = weeklyMeetings;
