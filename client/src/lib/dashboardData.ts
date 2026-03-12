// ============================================================
// Creative Shop Dashboard — Core Data
// User identity and client portfolio are driven by dashboard.config.ts
// ============================================================

import { dashboardConfig } from "./dashboard.config";

export const userProfile = {
  name: dashboardConfig.profile.name,
  role: dashboardConfig.profile.role,
  team: dashboardConfig.profile.team,
  company: dashboardConfig.profile.company,
  territory: dashboardConfig.profile.territory,
  manager: dashboardConfig.profile.manager,
  level: dashboardConfig.profile.level,
  rating: "Exceeded Expectations",
};

// ─── CLIENTS ────────────────────────────────────────────────
// Driven by dashboard.config.ts — edit clients there, not here.
// Fields like totalAR, csEligibleAR, activeProjects are refreshed by Manus on each data update.
export const clients = dashboardConfig.clients.map((c, i) => ({
  id: c.id,
  name: c.name,
  shortName: c.shortName,
  tier: c.tier,
  priority: i + 1,
  color: c.color,
  lightColor: c.lightColor ?? "#F5F5FF",
  borderColor: c.color,
  totalAR: 0,
  csEligibleAR: 0,
  globalAR: null as number | null,
  csServiceLevel: "Dedicated: Proactive",
  totalRSes: 0,
  q1Eligible: true,
  q2Eligible: true,
  logo: c.logo ?? "🏢",
  summary: c.summary,
  activeProjects: [] as string[],
  contacts: {
    internal: `${dashboardConfig.profile.name} (CS) + ${dashboardConfig.profile.manager} (Manager)`,
    meetingCadence: "Weekly sync",
  },
}));

// ─── RECOMMENDED SOLUTIONS ──────────────────────────────────
export const recommendedSolutions = [
  // TEMPLATE PLACEHOLDER — Manus will populate this during setup and daily refresh
  // by scraping the Unidash RS Pipeline dashboard filtered to your name.
];

// ─── MEETINGS ───────────────────────────────────────────────
export const meetings = [
  // TEMPLATE PLACEHOLDER — Manus will populate this during setup and daily refresh
  // by scraping Meta Calendar for the current week's events.
];

// ─── CLIENT INTERACTIONS (Meta CRM) ─────────────────────────
export const clientInteractions = [
  // TEMPLATE PLACEHOLDER — Manus will populate this during setup and daily refresh
  // by reading your CRM Client Interactions filtered to your BoB.
];

// ─── KEY DATES ───────────────────────────────────────────────
export const keyDates = [
  // TEMPLATE PLACEHOLDER — Manus will populate this during setup and daily refresh
  // by reading key dates from CRM, calendar, and client records.
];

// ─── PORTFOLIO SUMMARY ───────────────────────────────────────
export const portfolioSummary = {
  totalClients: 11,
  totalRSes: 126,
  totalARHeadroom: 15600000,
  csEligibleAR: 8100000,
  q1EligibleRSes: 47,
  csEligibility: "100%",
  dedicatedClients: 3,
  topOpportunity: "Magazine Luiza A+ Catalog — $2.5M+",
};

// ─── STAGE COLORS ────────────────────────────────────────────
export const stageConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  DISCOVERY: { label: "Discovery", color: "#6366F1", bg: "#EEF2FF", dot: "#6366F1" },
  PITCHING: { label: "Pitching", color: "#F59E0B", bg: "#FFFBEB", dot: "#F59E0B" },
  SCOPING: { label: "Scoping", color: "#8B5CF6", bg: "#F5F3FF", dot: "#8B5CF6" },
  ACTIONED: { label: "Actioned", color: "#3B82F6", bg: "#EFF6FF", dot: "#3B82F6" },
  PARTIALLY_ADOPTED: { label: "Partial", color: "#F97316", bg: "#FFF7ED", dot: "#F97316" },
  ADOPTED: { label: "Adopted", color: "#10B981", bg: "#ECFDF5", dot: "#10B981" },
  CLOSED: { label: "Closed", color: "#6B7280", bg: "#F9FAFB", dot: "#6B7280" },
  CLOSED_WON: { label: "Won ✓", color: "#059669", bg: "#ECFDF5", dot: "#059669" },
};

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
};

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export const getDaysUntil = (dateStr: string): number => {
  // Use Brazil timezone (America/Sao_Paulo) for accurate date comparison
  const todayBRT = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }); // YYYY-MM-DD
  const todayMs = new Date(todayBRT + "T00:00:00").getTime();
  const targetMs = new Date(dateStr + "T00:00:00").getTime();
  return Math.ceil((targetMs - todayMs) / (1000 * 60 * 60 * 24));
};
