// ============================================================
// Creative Shop Dashboard — Data Router
// All Meta-SSO data (AI Usage, CI Dashboard, Workplace, Calendar, RS Pipeline)
// is refreshed via Manus-assisted workflow — Manus reads the live pages using
// its browser access and writes verified data to the static data files.
//
// WHY NO PUPPETEER:
// The deployed server environment does not have Chromium installed, and Meta
// SSO cookies are only available in the Manus browser context — not in a
// headless browser launched by the server. Puppeteer is therefore removed
// entirely to prevent "Browser not found" errors on every refresh attempt.
//
// HOW REFRESH WORKS:
// 1. Daily 7 AM BRT: Manus scheduled task reads all sources and writes data files
// 2. On-demand: Say "refresh [section]" to Manus in chat
// 3. The tRPC procedures below return the current data freshness status
// ============================================================

import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// ── Load user config ──────────────────────────────────────────
let _configCache: {
  salesRepName: string;
  ciUrl: string;
  aiUsageUrl: string;
  workplaceGroups: Array<{ name: string; url: string }>;
  rsPipelineUrl: string;
} | null = null;

function getConfig() {
  if (_configCache) return _configCache;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const cfg = require("../client/src/lib/dashboard.config");
    const c = cfg.dashboardConfig;
    _configCache = {
      salesRepName: c.unidash?.salesRepName ?? "Pedro Menezes",
      ciUrl:
        c.unidash?.ciUrl ??
        "https://www.internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/",
      aiUsageUrl:
        c.unidash?.aiUsageUrl ??
        "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
      workplaceGroups: c.workplace?.groups ?? [],
      rsPipelineUrl:
        c.crm?.rsPipelineUrl ??
        "https://www.internalfb.com/crm/pipeline_management?pipeline_management_tab=YOUR_SOLUTIONS",
    };
  } catch {
    _configCache = {
      salesRepName: "Pedro Menezes",
      ciUrl: "https://www.internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/",
      aiUsageUrl: "https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/ai4p_by_pillar/my_ai_usage",
      workplaceGroups: [],
      rsPipelineUrl:
        "https://www.internalfb.com/crm/pipeline_management?pipeline_management_tab=YOUR_SOLUTIONS",
    };
  }
  return _configCache;
}

// ── Manus-assisted message ────────────────────────────────────
const MANUS_REFRESH_MSG =
  "Data is refreshed by Manus daily at 7 AM BRT. To refresh now, say \"refresh [section]\" in the Manus chat.";

// ── Stub scrapers (Manus-assisted) ────────────────────────────
// These return a status response. Actual data is written by Manus directly
// to the static data files after reading the live Meta pages.

export async function scrapeAIUsage() {
  return {
    success: false,
    manusAssisted: true,
    error: MANUS_REFRESH_MSG,
    weeks: [],
    summary: null,
    scrapedAt: new Date().toISOString(),
  };
}

export async function scrapeWorkplace() {
  return {
    success: false,
    manusAssisted: true,
    error: MANUS_REFRESH_MSG,
    posts: [],
    scrapedAt: new Date().toISOString(),
  };
}

export async function scrapeCIDashboard() {
  return {
    success: false,
    manusAssisted: true,
    error: MANUS_REFRESH_MSG,
    rawText: "",
    ciCount: null,
    scrapedAt: new Date().toISOString(),
  };
}

export async function scrapeRSPipeline() {
  return {
    success: false,
    manusAssisted: true,
    error: MANUS_REFRESH_MSG,
    stageCounts: null,
    solutions: [],
    scrapedAt: new Date().toISOString(),
  };
}

export async function scrapeCalendar() {
  return {
    success: false,
    manusAssisted: true,
    error: MANUS_REFRESH_MSG,
    meetings: [],
    scrapedAt: new Date().toISOString(),
  };
}

// ── Calendar write helper ─────────────────────────────────────
// Called by Manus after reading internalfb.com/calendar + Outlook cross-check.
export async function writeCalendarData(
  events: Array<{
    id: string;
    date: string;
    dayLabel: string;
    startTime: string;
    endTime?: string;
    title: string;
    location?: string;
    type: "client" | "internal" | "focus" | "external" | "allday";
    client?: "amazon" | "samsung" | "magalu" | "abi" | null;
    isToday?: boolean;
  }>,
  weekLabel: string,
  dataAsOf: string
): Promise<{ success: boolean; eventsWritten: number; error?: string }> {
  try {
    const { writeFileSync, readFileSync } = await import("fs");
    const { join } = await import("path");
    const dataFilePath = join(
      process.cwd(),
      "client/src/lib/weeklyMeetingsData.ts"
    );
    const existing = readFileSync(dataFilePath, "utf-8");
    const eventsCode = events
      .map((e) => {
        const clientVal = e.client ? `"${e.client}" as const` : "null";
        const endTimeVal = e.endTime ?? "";
        const locationVal = e.location ? JSON.stringify(e.location) : "undefined";
        return [
          "  {",
          `    id: "${e.id}",`,
          `    date: "${e.date}",`,
          `    dayLabel: "${e.dayLabel}",`,
          `    startTime: "${e.startTime}",`,
          `    endTime: "${endTimeVal}",`,
          `    title: ${JSON.stringify(e.title)},`,
          `    location: ${locationVal},`,
          `    type: "${e.type}" as const,`,
          `    client: ${clientVal},`,
          `    isToday: ${e.isToday ?? false},`,
          "  }",
        ].join("\n");
      })
      .join(",\n");

    const newArrayBlock =
      "// ============================================================\n" +
      `// Pedro Menezes — Weekly Meetings (${weekLabel})\n` +
      "// Source: https://www.internalfb.com/calendar (cross-checked with Outlook)\n" +
      `// Refreshed by Manus: ${dataAsOf}\n` +
      "// ============================================================\n" +
      "export interface CalendarEvent {\n" +
      "  id: string;\n" +
      "  date: string;         // ISO date YYYY-MM-DD\n" +
      '  dayLabel: string;     // "Mon", "Tue", etc.\n' +
      '  startTime: string;    // "2:00 PM"\n' +
      "  endTime?: string;\n" +
      "  title: string;\n" +
      "  location?: string;\n" +
      '  type: "client" | "internal" | "focus" | "external" | "allday";\n' +
      '  client?: "amazon" | "samsung" | "magalu" | "abi" | null;\n' +
      "  isToday?: boolean;\n" +
      "  attendeeCount?: number;\n" +
      "}\n" +
      "export const weeklyMeetings: CalendarEvent[] = [\n" +
      eventsCode + "\n" +
      "];";

    const adapterMarker = "// Adapter";
    const adapterStart = existing.indexOf(adapterMarker);
    if (adapterStart !== -1) {
      const lineStart = existing.lastIndexOf("\n", adapterStart - 2) + 1;
      writeFileSync(
        dataFilePath,
        newArrayBlock + "\n\n" + existing.slice(lineStart),
        "utf-8"
      );
    } else {
      const arrayEnd = existing.lastIndexOf("];");
      if (arrayEnd !== -1) {
        writeFileSync(
          dataFilePath,
          newArrayBlock + existing.slice(arrayEnd + 2),
          "utf-8"
        );
      }
    }
    return { success: true, eventsWritten: events.length };
  } catch (err) {
    return { success: false, eventsWritten: 0, error: String(err) };
  }
}

// ── tRPC Router ───────────────────────────────────────────────
export const scraperRouter = router({
  // Fast refresh: returns Manus-assisted status for all sections
  refreshFast: publicProcedure.mutation(async () => {
    return {
      aiUsage: { success: false, manusAssisted: true, error: MANUS_REFRESH_MSG },
      workplace: { success: false, manusAssisted: true, error: MANUS_REFRESH_MSG },
      calendar: { success: false, manusAssisted: true, error: MANUS_REFRESH_MSG },
      scrapedAt: new Date().toISOString(),
    };
  }),

  // Individual refresh procedures — all Manus-assisted
  refreshCalendar: publicProcedure.mutation(scrapeCalendar),
  refreshAIUsage: publicProcedure.mutation(scrapeAIUsage),
  refreshWorkplace: publicProcedure.mutation(scrapeWorkplace),
  refreshCI: publicProcedure.mutation(scrapeCIDashboard),
  refreshRS: publicProcedure.mutation(scrapeRSPipeline),

  // Manus-assisted calendar update: accepts verified payload and writes to weeklyMeetingsData.ts
  updateCalendarData: publicProcedure
    .input(
      z.object({
        events: z.array(
          z.object({
            id: z.string(),
            date: z.string(),
            dayLabel: z.string(),
            startTime: z.string(),
            endTime: z.string().optional(),
            title: z.string(),
            location: z.string().optional(),
            type: z.enum(["client", "internal", "focus", "external", "allday"]),
            client: z
              .enum(["amazon", "samsung", "magalu", "abi"])
              .nullable()
              .optional(),
            isToday: z.boolean().optional(),
          })
        ),
        weekLabel: z.string(),
        dataAsOf: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return writeCalendarData(input.events, input.weekLabel, input.dataAsOf);
    }),

  // Config accessor (used by setup wizard)
  getConfig: publicProcedure.query(() => {
    return getConfig();
  }),
});
