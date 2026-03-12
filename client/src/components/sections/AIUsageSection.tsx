// AI Usage Section — Meta Unidash "My AI Usage" data
// Source: internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/
// Design: Warm Structured Intelligence

import { aiUsageSummary, aiUsageWeeks, aiFeatureUsage, type AIUsageWeek } from "@/lib/aiUsageData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ExternalLink, RefreshCw, CheckCircle, XCircle, Minus, Clock, Cpu } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const statusConfig = {
  over: { label: "Over Goal ✅", color: "#059669", bg: "#ECFDF5", icon: "✅" },
  under: { label: "Under Goal ❌", color: "#DC2626", bg: "#FEF2F2", icon: "❌" },
  not_applicable: { label: "N/A", color: "#9CA3AF", bg: "#F9FAFB", icon: "➖" },
  awaiting: { label: "Awaiting Data", color: "#3B82F6", bg: "#EFF6FF", icon: "🔵" },
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DayDot = ({ status }: { status: "used" | "not_used" | "not_applicable" | "awaiting" }) => {
  if (status === "used") return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#ECFDF5" }}>
      <CheckCircle size={14} style={{ color: "#059669" }} />
    </div>
  );
  if (status === "not_used") return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#FEF2F2" }}>
      <XCircle size={14} style={{ color: "#DC2626" }} />
    </div>
  );
  if (status === "awaiting") return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#EFF6FF" }}>
      <Clock size={12} style={{ color: "#3B82F6" }} />
    </div>
  );
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#F3F4F6" }}>
      <Minus size={12} style={{ color: "#9CA3AF" }} />
    </div>
  );
};

const WeekRow = ({ week, index }: { week: AIUsageWeek; index: number }) => {
  const cfg = statusConfig[week.status];
  const weekDate = new Date(week.weekStarts + "T00:00:00");
  const label = weekDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div
      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors animate-fade-in-up`}
      style={{
        animationDelay: `${index * 40}ms`,
        background: index === 0 ? cfg.bg : "transparent",
        borderLeft: index === 0 ? `3px solid ${cfg.color}` : "3px solid transparent",
      }}
    >
      {/* Week label */}
      <div className="w-20 flex-shrink-0">
        <p className="text-xs font-semibold text-foreground/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Wk {week.week}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>

      {/* Day dots */}
      <div className="flex gap-1 flex-shrink-0">
        {week.dailyUsage.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <DayDot status={d} />
            <span className="text-xs text-muted-foreground" style={{ fontSize: "9px" }}>
              {dayLabels[i]}
            </span>
          </div>
        ))}
      </div>

      {/* AI days count */}
      <div className="flex-shrink-0 w-8 text-center">
        <p
          className="text-sm font-bold font-mono-data"
          style={{ color: week.status === "over" ? "#059669" : week.status === "under" ? "#DC2626" : "#9CA3AF" }}
        >
          {week.aiDaysThisWeek}
        </p>
        <p className="text-xs text-muted-foreground" style={{ fontSize: "9px" }}>days</p>
      </div>

      {/* Status badge */}
      <div className="ml-auto flex-shrink-0">
        <span
          className="text-xs px-2 py-1 rounded-full font-semibold"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {cfg.icon} {cfg.label}
        </span>
      </div>
    </div>
  );
};

export default function AIUsageSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshAI = trpc.scraper.refreshAIUsage.useMutation({
    onMutate: () => setIsRefreshing(true),
    onSuccess: (data) => {
      setIsRefreshing(false);
      if (data.success) {
        toast.success("AI Usage refreshed", {
          description: "Scraped latest data from Unidash. Reloading...",
        });
        setTimeout(() => window.location.reload(), 1200);
      } else if ((data as any).manusAssisted) {
        toast.info("AI Usage is refreshed by Manus", {
          description: "Say \"refresh my AI usage\" in the Manus chat to update this data. Daily refresh runs at 7 AM BRT.",
          duration: 6000,
        });
      } else {
        toast.warning("AI Usage could not be reached", {
          description: "Your Meta session may need to be refreshed in the browser.",
        });
      }
    },
    onError: (err) => {
      setIsRefreshing(false);
      toast.error("Refresh failed", { description: err.message });
    },
  });

  // Chart data — only weeks with actual data (not awaiting, not N/A)
  const chartData = aiUsageWeeks
    .filter((w) => w.status !== "awaiting" && w.status !== "not_applicable")
    .slice(0, 10)
    .reverse()
    .map((w) => ({
      label: `Wk ${w.week}`,
      days: w.aiDaysThisWeek,
      status: w.status,
    }));

  const goalRate = Math.round(
    (aiUsageSummary.weeksOverGoal / (aiUsageSummary.weeksOverGoal + aiUsageSummary.weeksUnderGoal)) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#EFF6FF" }}
            >
              <Cpu size={15} style={{ color: "#3B82F6" }} />
            </div>
            <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              My AI Usage
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Meta Unidash · @pedromenezes · Goal: Use AI 4+ days/week (L4+/7)
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Live refresh button */}
          <button
            onClick={() => !isRefreshing && refreshAI.mutate()}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
            style={{
              background: isRefreshing ? "#EFF6FF" : "#F0F7FF",
              color: "#3B82F6",
              borderColor: "#BFDBFE",
              cursor: isRefreshing ? "default" : "pointer",
              opacity: isRefreshing ? 0.8 : 1,
            }}
            title={isRefreshing ? "Scraping Unidash AI Usage..." : "Re-scrape AI Usage from Unidash"}
          >
            <RefreshCw
              size={11}
              style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }}
            />
            {isRefreshing ? "Scraping..." : "Refresh AI"}
          </button>
          <a
            href="https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-muted"
            style={{ borderColor: "oklch(0.90 0.008 75)", color: "#3B82F6" }}
          >
            <ExternalLink size={12} />
            View in Unidash
          </a>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up delay-50">
        {[
          { label: "Weeks Over Goal", value: aiUsageSummary.weeksOverGoal, color: "#059669", bg: "#ECFDF5", icon: "✅" },
          { label: "Weeks Under Goal", value: aiUsageSummary.weeksUnderGoal, color: "#DC2626", bg: "#FEF2F2", icon: "❌" },
          { label: "Goal Achievement Rate", value: `${goalRate}%`, color: "#3B82F6", bg: "#EFF6FF", icon: "🎯" },
          { label: "Weeks N/A or Awaiting", value: aiUsageSummary.weeksNotApplicable + aiUsageSummary.weeksAwaitingData, color: "#9CA3AF", bg: "#F9FAFB", icon: "➖" },
        ].map((s) => (
          <div
            key={s.label}
            className="metric-card text-center"
            style={{ borderTop: `3px solid ${s.color}` }}
          >
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-2xl font-bold font-mono-data" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Chart + Current Week */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="metric-card lg:col-span-2 animate-fade-in-up delay-100">
          <div className="section-header">
            <h3 className="section-title">AI Days Used Per Week</h3>
            <span className="text-xs text-muted-foreground">Last 13 weeks · Goal = 4 days</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 75)" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 7]} ticks={[0, 1, 2, 3, 4, 5, 6, 7]} tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(value: number) => [`${value} days`, "AI Usage"]}
                contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, borderRadius: 8 }}
              />
              {/* Goal line reference */}
              <Bar dataKey="days" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.status === "over" ? "#059669" : entry.status === "under" ? "#DC2626" : "#9CA3AF"}
                    opacity={0.85}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Goal line annotation */}
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "#059669" }} />
              <span className="text-xs text-muted-foreground">Over Goal (4+ days)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "#DC2626" }} />
              <span className="text-xs text-muted-foreground">Under Goal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 border-t-2 border-dashed" style={{ borderColor: "#F59E0B" }} />
              <span className="text-xs text-muted-foreground">Goal = 4 days</span>
            </div>
          </div>
        </div>

        {/* Current Week Status */}
        <div className="metric-card animate-fade-in-up delay-150">
          <div className="section-header">
            <h3 className="section-title">Current Week</h3>
            <span className="text-xs text-muted-foreground">Wk 11 · Mar 9</span>
          </div>
          <div
            className="rounded-xl p-4 text-center mb-4"
            style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Clock size={14} style={{ color: "#3B82F6" }} />
              <span className="text-xs font-semibold" style={{ color: "#3B82F6" }}>Awaiting Data</span>
            </div>
            <p className="text-3xl font-bold font-mono-data" style={{ color: "#3B82F6" }}>🔵</p>
            <p className="text-xs text-muted-foreground mt-2">
              Data updates every 24h. Latest usage may be delayed 2–3 days.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Week starts</span>
              <span className="font-semibold">Mar 9, 2026</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Days in week</span>
              <span className="font-semibold font-mono-data">2 (partial)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">AI days so far</span>
              <span className="font-semibold font-mono-data text-blue-500">Awaiting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly History */}
      <div className="metric-card animate-fade-in-up delay-200">
        <div className="section-header">
          <h3 className="section-title">Weekly History</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw size={11} />
            <span>Last scraped: {new Date(aiUsageSummary.lastUpdated + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
        <div className="space-y-1">
          {aiUsageWeeks.map((week, i) => (
            <WeekRow key={`${week.year}-${week.week}`} week={week} index={i} />
          ))}
        </div>
      </div>

      {/* Features Used */}
      <div className="metric-card animate-fade-in-up delay-250">
        <div className="section-header">
          <h3 className="section-title">Features Used (Last 3 Weeks)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.92 0.004 75)" }}>
                <th className="text-left pb-2 text-xs font-bold text-muted-foreground pr-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Feature
                </th>
                {["Feb 23", "Mar 2", "Mar 9"].map((wk) => (
                  <th key={wk} className="text-center pb-2 text-xs font-bold text-muted-foreground px-3">
                    Wk of {wk}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "oklch(0.96 0.003 75)" }}>
              {aiFeatureUsage.map((f) => (
                <tr key={f.feature} className="hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 pr-6">
                    <div className="flex items-center gap-2">
                      <Cpu size={12} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground/80">{f.feature}</span>
                    </div>
                  </td>
                  {[f.week_2026_02_23, f.week_2026_03_02, f.week_2026_03_09].map((used, i) => (
                    <td key={i} className="py-2.5 px-3 text-center">
                      {used ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ background: "#ECFDF5" }}>
                          <CheckCircle size={13} style={{ color: "#059669" }} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full" style={{ background: "#F3F4F6" }}>
                          <Minus size={12} style={{ color: "#9CA3AF" }} />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3 pt-3 border-t" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
          Covers Metamate, DevMate, Figma AI, CalendarAgent, Google Docs AI, and more.{" "}
          <a
            href="https://www.internalfb.com/unidash/dashboard/ai_usage_at_meta/goal/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: "#3B82F6" }}
          >
            View full feature list →
          </a>
        </p>
      </div>
    </div>
  );
}
