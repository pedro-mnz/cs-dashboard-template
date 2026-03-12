// Weekly meetings data — populated by Manus during setup from your Meta calendar
import { dashboardConfig } from "./dashboard.config";

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: "client" | "internal" | "1on1" | "team";
  attendees: string[];
  location?: string;
  description?: string;
  isRecurring?: boolean;
}

// This file is refreshed daily by Manus from your Meta calendar.
// During initial setup, Manus will populate this with your actual meetings.
export const weeklyMeetings: Meeting[] = [];

export const getDaysUntil = (dateStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const meetings = weeklyMeetings;
