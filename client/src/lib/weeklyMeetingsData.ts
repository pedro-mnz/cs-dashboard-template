// weeklyMeetingsData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Populated by Manus on 2026-04-21 | Refreshed by Manus on 2026-04-22 from Meta Calendar (internalfb.com/calendar)
// Current week: April 20–24, 2026 (Week 17) | Next: April 27–May 1 (Week 18) | Timezone: GMT-3 (America/Sao_Paulo)
// TODAY: Wednesday, April 22, 2026
// NOTE: Mon Apr 20 = Pedro's Choice Day (Time Away). Tue Apr 21 = Tiradentes Day (holiday).
// Source: https://www.internalfb.com/calendar — live data confirmed Apr 21, 2026 07:00 BRT
// Last refreshed: 2026-04-22 07:00 BRT
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
  // WEEK 17 — April 20–24, 2026 (current week — confirmed from live calendar)
  // Mon Apr 20 = Pedro's Choice Day (Time Away)
  // Tue Apr 21 = Tiradentes Day (Brazilian national holiday)
  // ════════════════════════════════════════════════════════════════════════

  // ── Monday, April 20 (Choice Day — Pedro Time Away) ──────────────────────
  {
    id: "w17-mon-1",
    date: "2026-04-20",
    dayLabel: "Mon",
    startTime: "12:30 PM",
    title: "Global ABI Core Team Weekly",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-mon-2",
    date: "2026-04-20",
    dayLabel: "Mon",
    startTime: "1:30 PM",
    title: "CS Opex Request Office Hours (Americas & EMEA)",
    location: "SAO3732.09 Largo da Batata",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-mon-3",
    date: "2026-04-20",
    dayLabel: "Mon",
    startTime: "4:05 PM",
    title: "BizAI Enterprise Client Workshop Planning - Brazil",
    location: "NYC 50.48 Townhouse",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-mon-4",
    date: "2026-04-20",
    dayLabel: "Mon",
    startTime: "5:00 PM",
    title: "US & Global ABI Biweekly",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Tuesday, April 21 (Tiradentes Day — Brazilian holiday) ───────────────
  {
    id: "w17-tue-1",
    date: "2026-04-21",
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
    date: "2026-04-21",
    dayLabel: "Tue",
    startTime: "12:00 PM",
    title: "Simplifying Web Integrations with Meta Pixel and Conversions API",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-tue-3",
    date: "2026-04-21",
    dayLabel: "Tue",
    startTime: "2:00 PM",
    title: "Tuesdays with Boz",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-tue-4",
    date: "2026-04-21",
    dayLabel: "Tue",
    startTime: "3:00 PM",
    title: "Global Partners AI Focus Block Weekly [1 of 2] | NORAM & LATAM",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Wednesday, April 22 ───────────────────────────────────────────────────
  {
    id: "w17-wed-1",
    date: "2026-04-22",
    dayLabel: "Wed",
    startTime: "12:00 PM",
    title: "CS CREATOR CAMP [Mandatory]: Partnership Ads Hub (Americas & EMEA)",
    location: "SAO3732.08 We will find you",
    type: "internal",
    client: null,
    isToday: true,
  },
  {
    id: "w17-wed-2",
    date: "2026-04-22",
    dayLabel: "Wed",
    startTime: "12:30 PM",
    title: "Almoção do CS (@Águas de Março)",
    type: "internal",
    client: null,
    isToday: true,
  },
  {
    id: "w17-wed-3",
    date: "2026-04-22",
    dayLabel: "Wed",
    startTime: "2:30 PM",
    title: "Seeds & Sequoias: CS Americas Monthly Workshare",
    location: "SAO3732.09 Largo da Batata",
    type: "internal",
    client: null,
    isToday: true,
  },
  {
    id: "w17-wed-4",
    date: "2026-04-22",
    dayLabel: "Wed",
    startTime: "3:05 PM",
    title: "BizAI Enterprise Client Workshop Planning - Brazil",
    location: "NYC 50.43 Before I Let Go",
    type: "internal",
    client: null,
    isToday: true,
  },
  {
    id: "w17-wed-5",
    date: "2026-04-22",
    dayLabel: "Wed",
    startTime: "5:00 PM",
    title: "GenCPV Netshoes & Meta Presentation",
    location: "ARENA MAGALU-3°-Adrenalina (3)",
    type: "client",
    client: null,
    isToday: true,
  },
  {
    id: "w17-wed-6",
    date: "2026-04-22",
    dayLabel: "Wed",
    startTime: "7:00 PM",
    title: "M365 Copilot Training Series (Virtual – Zoom)",
    location: "Menlo Park",
    type: "internal",
    client: null,
    isToday: true,
  },

  // ── Thursday, April 23 ────────────────────────────────────────────────────
  {
    id: "w17-thu-1",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "10:30 AM",
    title: "WhatsApp da Lu @ Cannes | Sync Ogilvy + Meta",
    type: "client",
    client: "magazine-luiza",
    isToday: false,
  },
  {
    id: "w17-thu-2",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "12:00 PM",
    title: "Global Training | MPA Partner Solutions Pilot (2026)",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-thu-3",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "12:45 PM",
    title: "CS Enterprise BizAI weekly",
    location: "LON 10.03 Take On Me",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-thu-4",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "2:00 PM",
    title: "AI Focus Block | Global Partners Americas",
    type: "focus",
    client: null,
    isToday: false,
  },
  {
    id: "w17-thu-5",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "3:00 PM",
    title: "MRG Brazil: AI for All",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-thu-6",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "4:00 PM",
    title: "Q&A Brasil",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-thu-7",
    date: "2026-04-23",
    dayLabel: "Thu",
    startTime: "7:00 PM",
    title: "M365 Copilot Training Series (Virtual – Zoom)",
    location: "Menlo Park",
    type: "internal",
    client: null,
    isToday: false,
  },

  // ── Friday, April 24 ──────────────────────────────────────────────────────
  {
    id: "w17-fri-1",
    date: "2026-04-24",
    dayLabel: "Fri",
    startTime: "12:00 PM",
    title: "Almoço Jess/Pedro/Marina",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-fri-2",
    date: "2026-04-24",
    dayLabel: "Fri",
    startTime: "2:30 PM",
    title: "GenCPV - Hands On + Devolutiva Copa",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-fri-3",
    date: "2026-04-24",
    dayLabel: "Fri",
    startTime: "3:05 PM",
    title: "[ Monthly Sync ] LATAM Team | GEN AI",
    location: "SAO3732.06 You are on mute",
    type: "internal",
    client: null,
    isToday: false,
  },
  {
    id: "w17-fri-4",
    date: "2026-04-24",
    dayLabel: "Fri",
    startTime: "5:00 PM",
    title: "[Confidential] Creator Marketing session with Meta Product Team | Magalu",
    type: "client",
    client: "magazine-luiza",
    isToday: false,
  },
];

export const weekSummary = {
  weekLabel: "Apr 20–24, 2026",
  totalMeetings: weeklyMeetings.filter(e => e.date >= "2026-04-20").length,
  totalHours: 18,
  focusHours: 2,
  clientMeetings: weeklyMeetings.filter(e => e.type === "client" && e.date >= "2026-04-20").length,
  internalMeetings: weeklyMeetings.filter(e => e.type === "internal" && e.date >= "2026-04-20").length,
  todayMeetings: weeklyMeetings.filter(e => e.isToday),
  sourceUrl: "https://www.internalfb.com/calendar",
  dataAsOf: "2026-04-22",
  lastUpdated: "2026-04-22 07:00 BRT",
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
