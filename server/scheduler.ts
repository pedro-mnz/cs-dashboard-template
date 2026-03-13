// ============================================================
// Pedro Dashboard — Daily Auto-Refresh Scheduler
// Runs every day at 7:00 AM BRT (10:00 AM UTC)
// Triggers all scrapers and writes updated data to the data files
// ============================================================

import cron from "node-cron";
import fs from "fs";
import path from "path";
// NOTE: All scrapers are Manus-assisted — no Puppeteer imports needed.
// Manus reads Meta pages directly and writes data files via the scheduled task.

// ── Format date as YYYY-MM-DD in BRT (UTC-3) ─────────────────
function todayBRT(): string {
  const now = new Date();
  const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  return brt.toISOString().slice(0, 10);
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });
}

// ── Run daily refresh ─────────────────────────────────────────
// All data sources are Manus-assisted. Manus reads Meta pages directly
// and writes data files. The scheduler logs the refresh attempt.
export async function runDailyRefresh() {
  const startTime = new Date();
  console.log(`[Scheduler] Daily refresh started at ${formatTime(startTime)} BRT`);

  const MANUS_MSG = "Manus-assisted: Manus reads Meta pages and writes data files at 7 AM BRT";

  const results: Record<string, { success: boolean; error?: string; manusAssisted?: boolean }> = {
    calendar: { success: false, manusAssisted: true, error: MANUS_MSG },
    aiUsage: { success: false, manusAssisted: true, error: MANUS_MSG },
    workplace: { success: false, manusAssisted: true, error: MANUS_MSG },
    ci: { success: false, manusAssisted: true, error: MANUS_MSG },
    rsPipeline: { success: false, manusAssisted: true, error: MANUS_MSG },
  };

  console.log("[Scheduler] All data sources are Manus-assisted. Manus will update data files via scheduled task.");

  // ── Write refresh log ─────────────────────────────────────
  const logEntry = {
    timestamp: new Date().toISOString(),
    date: todayBRT(),
    results,
  };

  const logPath = path.resolve(process.cwd(), ".manus-logs/scheduler.log");
  try {
    const existing = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf-8") : "[]";
    const logs = JSON.parse(existing);
    logs.unshift(logEntry);
    fs.writeFileSync(logPath, JSON.stringify(logs.slice(0, 30), null, 2));
  } catch {
    // Log dir may not exist yet — ignore
  }

  const endTime = new Date();
  const elapsed = Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  console.log(`[Scheduler] Daily refresh logged in ${elapsed}s`);
  return results;
}

// ── Register cron job ─────────────────────────────────────────
// 7:00 AM BRT = 10:00 AM UTC (BRT is UTC-3)
// Cron format: seconds minutes hours day month weekday
export function startScheduler() {
  console.log("[Scheduler] Daily auto-refresh scheduled for 7:00 AM BRT (10:00 AM UTC)");

  // Daily 7 AM BRT refresh
  cron.schedule("0 0 10 * * *", async () => {
    console.log("[Scheduler] Triggering daily 7:00 AM BRT refresh...");
    try {
      await runDailyRefresh();
    } catch (err) {
      console.error("[Scheduler] Daily refresh error:", err);
    }
  }, {
    timezone: "UTC",
  });

  // Weekly Monday 8 AM BRT (11:00 AM UTC) — Unidash CSV refresh reminder
  // Reminds the user to export fresh CSV from fburl.com/datainsights/x5oismt6
  cron.schedule("0 0 11 * * 1", async () => {
    console.log("[Scheduler] Weekly Unidash CSV refresh reminder triggered (Monday 8 AM BRT)");
    const logPath = path.resolve(process.cwd(), ".manus-logs/scheduler.log");
    try {
      const existing = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf-8") : "[]";
      const logs = JSON.parse(existing);
      logs.unshift({
        timestamp: new Date().toISOString(),
        date: todayBRT(),
        type: "unidash-weekly-reminder",
        message: "Weekly Unidash CSV refresh due. Export from fburl.com/datainsights/x5oismt6 filtered by your name in Specialist(s) Contributor(s) column, then update rsPipelineData.ts.",
      });
      fs.writeFileSync(logPath, JSON.stringify(logs.slice(0, 30), null, 2));
    } catch {
      // ignore
    }
  }, {
    timezone: "UTC",
  });

  console.log("[Scheduler] Weekly Unidash CSV reminder scheduled for Monday 8:00 AM BRT (11:00 AM UTC)");
}
