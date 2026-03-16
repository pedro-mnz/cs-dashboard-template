// weeklyMeetingsData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Populated by Manus on 2026-03-16 from Meta Calendar (internalfb.com/calendar)
// Current week: March 16–20, 2026 (Week 12) | Next: March 23–27 | Timezone: GMT-3 (America/Sao_Paulo)
// Source: https://www.internalfb.com/calendar — live scrape, authenticated session
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
  // WEEK 12 — March 16–20, 2026
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, March 16 ─────────────────────────────────────────────────────
  {
    id: "w12-mon-1",
    date: "2026-03-16",
    dayLabel: "Mon",
    startTime: "11:30 AM",
    title: "Meta & Omnicom Summit | Alinhamento Atividade Evento",
    type: "external",
    client: null,
    isToday: true,
  },
  {
    id: "w12-mon-2",
    date: "2026-03-16",
    dayLabel: "Mon",
    startTime: "1:00 PM",
    title: "Block Time",
    type: "focus",
    client: null,
    isToday: true,
  },
  {
    id: "w12-mon-3",
    date: "2026-03-16",
    dayLabel: "Mon",
    startTime: "1:30 PM",
    title: "CS Opex Request Office Hours (Americas & EMEA)",
    location: "SAO3732.09 Padmasana",
    type: "internal",
    client: null,
    isToday: true,
    canceled: true,
  },
  {
    id: "w12-mon-4",
    date: "2026-03-16",
    dayLabel: "Mon",
    startTime: "12:00 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: true,
  },
  {
    id: "w12-mon-5",
    date: "2026-03-16",
    dayLabel: "Mon",
    startTime: "4:00 PM",
    title: "Global ABI Core Team Weekly",
    type: "client",
    client: null,
    isToday: true,
    canceled: true,
  },

  // ── Tuesday, March 17 ────────────────────────────────────────────────────
  {
    id: "w12-tue-1",
    date: "2026-03-17",
    dayLabel: "Tue",
    startTime: "9:30 AM",
    title: "Breath Lab - Weekly",
    location: "SAO3732.07 Iti Malia",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w12-tue-2",
    date: "2026-03-17",
    dayLabel: "Tue",
    startTime: "1:00 PM",
    title: "Creators for Business Day",
    type: "external",
    client: null,
    isToday: false,
  },
  {
    id: "w12-tue-3",
    date: "2026-03-17",
    dayLabel: "Tue",
    startTime: "3:30 PM",
    title: "GBG New Floor Celebration Moment",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w12-tue-4",
    date: "2026-03-17",
    dayLabel: "Tue",
    startTime: "4:00 PM",
    title: "CS LATAM Team meeting",
    location: "SAO3732.09 Largo da Batata; BAI7208.24 Divididos; MEX 24.21 Esta canon",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w12-tue-5",
    date: "2026-03-17",
    dayLabel: "Tue",
    startTime: "4:00 PM",
    title: "On Hold - Amazon & Meta",
    type: "client",
    client: "amazon.com",
    isToday: false,
  },

  // ── Wednesday, March 18 ──────────────────────────────────────────────────
  {
    id: "w12-wed-1",
    date: "2026-03-18",
    dayLabel: "Wed",
    startTime: "2:30 PM",
    title: "Corona Cero & Oakley Meta @ World Cup",
    location: "SAO3732.08 Trancoso; BAI7208.24 Piazzolla; MEX 24.21 The Clown Carried you",
    type: "client",
    client: null,
    isToday: false,
  },
  {
    id: "w12-wed-2",
    date: "2026-03-18",
    dayLabel: "Wed",
    startTime: "3:00 PM",
    title: "Weekly | WhatsApp for CPG",
    location: "SAO3732.09 Consolação",
    type: "client",
    client: null,
    isToday: false,
  },
  {
    id: "w12-wed-3",
    date: "2026-03-18",
    dayLabel: "Wed",
    startTime: "3:45 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ── Thursday, March 19 ───────────────────────────────────────────────────
  {
    id: "w12-thu-1",
    date: "2026-03-19",
    dayLabel: "Thu",
    startTime: "1:00 PM",
    title: "[Optional] - Weavy Meta Office Hours",
    location: "https://figma.zoom.us/j/91402480973",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w12-thu-2",
    date: "2026-03-19",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "Strategic Weekly Meeting | Magalu Full Journey at Meta | 2026",
    type: "client",
    client: "magazine-luiza",
    isToday: false,
  },
  {
    id: "w12-thu-3",
    date: "2026-03-19",
    dayLabel: "Thu",
    startTime: "4:00 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },

  // ── Friday, March 20 ─────────────────────────────────────────────────────
  {
    id: "w12-fri-1",
    date: "2026-03-20",
    dayLabel: "Fri",
    startTime: "1:00 PM",
    title: "NORAM: Business Messaging and Enterprise (Agentic Ai) Priority Updates",
    location: "MIA 701.25 I work where you vacation!",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w12-fri-2",
    date: "2026-03-20",
    dayLabel: "Fri",
    startTime: "1:45 PM",
    title: "Focus Time",
    type: "focus",
    client: null,
    isToday: false,
  },
  {
    id: "w12-fri-3",
    date: "2026-03-20",
    dayLabel: "Fri",
    startTime: "4:30 PM",
    title: "Content Council - Meta Festival Creative Edition (Kick-Off)",
    location: "SAO3732.08 Coxinha",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ════════════════════════════════════════════════════════════════════════
  // WEEK 13 — March 23–27, 2026
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, March 23 ─────────────────────────────────────────────────────
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
  // ── Tuesday, March 24 ────────────────────────────────────────────────────
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
  // ── Wednesday, March 25 ──────────────────────────────────────────────────
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
  // ── Thursday, March 26 ───────────────────────────────────────────────────
  {
    id: "w13-thu-1",
    date: "2026-03-26",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "Samsung Q1 Creative Review",
    location: "SAO3732.08 Laerte Coutinho",
    type: "client",
    client: "samsung-electronics-co-ltd---kr(usd)",
    isToday: false,
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
    isToday: false,
  },
  // ── Friday, March 27 ─────────────────────────────────────────────────────
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
];

export const weekSummary = {
  weekLabel: "Mar 16–27, 2026",
  totalMeetings: weeklyMeetings.length,
  totalHours: 20,
  focusHours: 5,
  clientMeetings: weeklyMeetings.filter(e => e.type === "client").length,
  internalMeetings: weeklyMeetings.filter(e => e.type === "internal").length,
  todayMeetings: weeklyMeetings.filter(e => e.isToday),
  sourceUrl: "https://www.internalfb.com/calendar",
  dataAsOf: "2026-03-16",
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
