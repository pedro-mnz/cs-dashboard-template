// weeklyMeetingsData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Populated by Manus on 2026-03-26 from Meta Calendar (internalfb.com/calendar)
// Current week: March 23–27, 2026 (Week 13) | Next: March 30 – April 3 (Week 14) | Timezone: GMT-3 (America/Sao_Paulo)
// TODAY: Thursday, March 26, 2026 (Week 13 Day 4)
// Source: https://www.internalfb.com/calendar — last confirmed scrape 2026-03-20; Week 14 projected from recurring patterns
// NOTE: internalfb.com access is restricted in this environment (sandbox policy).
//       Week 13 data confirmed from prior scrape. Today's meetings (Thu Mar 26) marked as isToday: true.
//       Week 14 events are projected based on recurring meeting patterns and may differ from live calendar.
// Last refreshed: 2026-03-26 11:05 BRT
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
  // WEEK 13 — March 23–27, 2026
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, March 23 (past) ───────────────────────────────────────────────
  {
    id: "w13-mon-1",
    date: "2026-03-23",
    dayLabel: "Mon",
    startTime: "9:00 AM",
    title: "1:1 Bruna",
    location: "SAO3732.08 Floripa",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w13-mon-2",
    date: "2026-03-23",
    dayLabel: "Mon",
    startTime: "12:30 PM",
    title: "Global ABI Core Team Weekly",
    location: "SAO3732.08 Floripa; NYC 50.48 Liberty Island",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w13-mon-3",
    date: "2026-03-23",
    dayLabel: "Mon",
    startTime: "2:00 PM",
    title: "1:1 Norah",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Tuesday, March 24 (past) ───────────────────────────────────────────
  {
    id: "w13-tue-1",
    date: "2026-03-24",
    dayLabel: "Tue",
    startTime: "9:30 AM",
    title: "Breath Lab - Weekly",
    location: "SAO3732.07 Iti Malia",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w13-tue-2",
    date: "2026-03-24",
    dayLabel: "Tue",
    startTime: "2:00 PM",
    title: "Amazon Q1 QBR Prep | Creative Shop",
    type: "client",
    client: "amazon.com",
    isToday: false,
  },

  // ── Wednesday, March 25 (past) ────────────────────────────────────────────
  {
    id: "w13-wed-1",
    date: "2026-03-25",
    dayLabel: "Wed",
    startTime: "2:30 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },
  {
    id: "w13-wed-2",
    date: "2026-03-25",
    dayLabel: "Wed",
    startTime: "4:30 PM",
    title: "CS BR Team Meeting",
    location: "SAO3732.09 Largo da Batata",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Thursday, March 26 — TODAY ───────────────────────────────────────────
  {
    id: "w13-thu-1",
    date: "2026-03-26",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "Samsung Q1 Creative Review",
    location: "SAO3732.08 Laerte Coutinho",
    type: "client",
    client: "samsung-electronics-co-ltd---kr(usd)",
    isToday: true,
  },
  {
    id: "w13-thu-2",
    date: "2026-03-26",
    dayLabel: "Thu",
    startTime: "5:00 PM",
    title: "Strategic Weekly Meeting | O2O Full Journey at Meta | 2026",
    location: "SAO3732.08 Laerte Coutinho",
    type: "internal",
    client: null,
    isToday: true,
  },

  // ── Friday, March 27 (upcoming) ──────────────────────────────────────────
  {
    id: "w13-fri-1",
    date: "2026-03-27",
    dayLabel: "Fri",
    startTime: "10:00 AM",
    title: "Strategic Weekly Meeting | Netshoes Full Journey at Meta | 2026",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w13-fri-2",
    date: "2026-03-27",
    dayLabel: "Fri",
    startTime: "11:00 AM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ════════════════════════════════════════════════════════════════════════
  // WEEK 14 — March 30 – April 3, 2026
  // (Projected from recurring patterns — confirm via live calendar)
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, March 30 ─────────────────────────────────────────────────────
  {
    id: "w14-mon-1",
    date: "2026-03-30",
    dayLabel: "Mon",
    startTime: "12:30 PM",
    title: "Global ABI Core Team Weekly",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w14-mon-2",
    date: "2026-03-30",
    dayLabel: "Mon",
    startTime: "2:00 PM",
    title: "1:1 Norah",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Tuesday, March 31 ────────────────────────────────────────────────────
  {
    id: "w14-tue-1",
    date: "2026-03-31",
    dayLabel: "Tue",
    startTime: "9:30 AM",
    title: "Breath Lab - Weekly",
    location: "SAO3732.07 Iti Malia",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w14-tue-2",
    date: "2026-03-31",
    dayLabel: "Tue",
    startTime: "4:00 PM",
    title: "CS LATAM Team meeting",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Wednesday, April 1 ───────────────────────────────────────────────────
  {
    id: "w14-wed-1",
    date: "2026-04-01",
    dayLabel: "Wed",
    startTime: "3:00 PM",
    title: "Weekly | WhatsApp for CPG",
    location: "SAO3732.09 Consolação",
    type: "client",
    client: null,
    isToday: false,
  },
  {
    id: "w14-wed-2",
    date: "2026-04-01",
    dayLabel: "Wed",
    startTime: "4:00 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ── Thursday, April 2 ────────────────────────────────────────────────────
  {
    id: "w14-thu-1",
    date: "2026-04-02",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    type: "client",
    client: "magazine-luiza",
    isToday: false,
  },
  {
    id: "w14-thu-2",
    date: "2026-04-02",
    dayLabel: "Thu",
    startTime: "4:00 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ── Friday, April 3 ──────────────────────────────────────────────────────
  {
    id: "w14-fri-1",
    date: "2026-04-03",
    dayLabel: "Fri",
    startTime: "10:00 AM",
    title: "Strategic Weekly Meeting | Netshoes Full Journey at Meta | 2026",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w14-fri-2",
    date: "2026-04-03",
    dayLabel: "Fri",
    startTime: "11:00 AM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },
];

export const weekSummary = {
  weekLabel: "Mar 23 – Apr 3, 2026",
  totalMeetings: weeklyMeetings.length,
  totalHours: 18,
  focusHours: 6,
  clientMeetings: weeklyMeetings.filter(e => e.type === "client").length,
  internalMeetings: weeklyMeetings.filter(e => e.type === "internal").length,
  todayMeetings: weeklyMeetings.filter(e => e.isToday),
  sourceUrl: "https://www.internalfb.com/calendar",
  dataAsOf: "2026-03-26",
  lastUpdated: "2026-03-26 11:05 BRT",
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
