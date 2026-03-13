// Overview Section — Portfolio summary, AR headroom, top priorities
// Design: Warm Structured Intelligence

import { clients, formatCurrency, stageConfig } from "@/lib/dashboardData";
import { rsPipeline, clientARData, portfolioARSummary, rsStageConfig } from "@/lib/rsPipelineData";
import { clientCIGoals, crmRecordsSummary } from "@/lib/crmRecordsData";
import { weeklyMeetings, weekSummary, eventTypeConfig, calClientColors } from "@/lib/weeklyMeetingsData";
import { aiUsageSummary, aiUsageWeeks } from "@/lib/aiUsageData";
import { currentPeriod, weeklyBreakdown, statusPageUrl } from "@/lib/inPersonData";
import { dashboardConfig } from "@/lib/dashboard.config";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, Target, Users, Calendar, ExternalLink, CheckCircle2, AlertCircle, Clock, Bot, Zap, MapPin, ArrowRight } from "lucide-react";

interface OverviewSectionProps {
  onClientChange: (id: string) => void;
  onSectionChange: (section: string) => void;
}

const metricCards = [
  {
    label: "Total AR Headroom",
    value: portfolioARSummary.totalARHeadroom > 0
      ? "$" + (portfolioARSummary.totalARHeadroom / 1_000_000).toFixed(1) + "M"
      : "—",
    sub: `${dashboardConfig.unidash.quarter} · ${dashboardConfig.profile.territory}`,
    icon: TrendingUp,
    color: "#0066CC",
    bg: "#EBF4FF",
  },
  {
    label: "CS-Eligible AR",
    value: portfolioARSummary.csEligibleAR > 0
      ? "$" + (portfolioARSummary.csEligibleAR / 1_000_000).toFixed(1) + "M"
      : "—",
    sub: portfolioARSummary.totalARHeadroom > 0
      ? `${Math.round((portfolioARSummary.csEligibleAR / portfolioARSummary.totalARHeadroom) * 100)}% of total book`
      : "Pending Scorecard scrape",
    icon: Target,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Active Clients",
    value: String(clients.length),
    sub: "Dedicated portfolio",
    icon: Users,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    label: "This Week's Meetings",
    value: String(weekSummary.totalMeetings),
    sub: `${weekSummary.clientMeetings} client · ${weekSummary.internalMeetings} internal`,
    icon: Calendar,
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
];

// AR chart: use clientARData from rsPipelineData (sourced from CRM Scorecard)
// Falls back to clients list with zero values if not yet scraped
const arChartData = clientARData.length > 0
  ? clientARData.map((d) => {
      const client = clients.find((c) => c.id === d.clientId);
      return {
        name: client?.shortName ?? d.clientName,
        ar: Math.round(d.totalAR / 1000),
        eligible: Math.round(d.csEligibleAR / 1000),
        color: client?.color ?? "#6B7280",
      };
    })
  : clients.map((c) => ({ name: c.shortName, ar: 0, eligible: 0, color: c.color }));

function getBrazilGreeting(): string {
  // Brazil time = UTC-3
  const now = new Date();
  const brazilHour = (now.getUTCHours() - 3 + 24) % 24;
  if (brazilHour >= 5 && brazilHour < 12) return "Good morning";
  if (brazilHour >= 12 && brazilHour < 18) return "Good afternoon";
  return "Good evening";
}

// Compute today's day label dynamically (Brazil time)
function getTodayDayLabel(): string {
  const now = new Date();
  // Use Brazil timezone (America/Sao_Paulo)
  const dayName = now.toLocaleDateString("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" });
  // Normalize to 3-letter abbreviation matching our data keys
  const map: Record<string, string> = {
    Mon: "Mon", Tue: "Tue", Wed: "Wed", Thu: "Thu", Fri: "Fri", Sat: "Sat", Sun: "Sun",
  };
  return map[dayName] ?? dayName.slice(0, 3);
}

export default function OverviewSection({ onClientChange, onSectionChange }: OverviewSectionProps) {
  const greeting = getBrazilGreeting();
  const todayDayLabel = getTodayDayLabel();
  // Top RS by Eligible Target Revenue from rsPipelineData
  const topRS = [...rsPipeline]
    .filter((rs) => rs.stage !== "Closed - Lost" && rs.stage !== "Adopted")
    .sort((a, b) => b.eligibleTargetRevenue - a.eligibleTargetRevenue)
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div
        className="rounded-xl p-6 text-white relative overflow-hidden animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, oklch(0.14 0.04 250) 0%, oklch(0.22 0.08 260) 100%)",
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663321707387/ncXKdRsdXjEbWytkFjVxwi/dashboard-header-bg-Q7tWNRQSEox6vA3r5u94ok.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* CS Wordmark Watermark */}
        <div className="absolute bottom-5 right-6 z-10 pointer-events-none select-none">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663321707387/ncXKdRsdXjEbWytkFjVxwi/cs-wordmark-white_5060bc1a.png"
            alt="Creative Shop"
            className="h-6 w-auto"
            style={{ opacity: 0.22 }}
          />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-70 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "America/Sao_Paulo" })} · {dashboardConfig.profile.territory}
          </p>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em", color: "#FFFFFF" }}>
            {greeting}, {dashboardConfig.profile.firstName} 👋
          </h1>
          <p className="text-sm opacity-80" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {dashboardConfig.profile.role} · Meta {dashboardConfig.profile.team} · {dashboardConfig.unidash.quarter}
          </p>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs opacity-70">{dashboardConfig.unidash.quarter} Priority</p>
              <p className="text-sm font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {clients[0]?.name ?? "No clients configured"}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-xs opacity-70">Top AR Opportunity</p>
              <p className="text-sm font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {portfolioARSummary.topOpportunity}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`metric-card animate-fade-in-up delay-${(i + 1) * 50}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: card.bg }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
              </div>
              <p
                className="text-2xl font-bold mb-0.5"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em", color: card.color }}
              >
                {card.value}
              </p>
              <p className="text-xs font-semibold text-foreground/80">{card.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* AR Headroom Chart + Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AR Chart */}
        <div className="metric-card animate-fade-in-up delay-200">
          <div className="section-header">
            <h3 className="section-title">AR Headroom by Client</h3>
            <span className="text-xs text-muted-foreground">Q1–Q2 2026 · Brazil</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={arChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 75)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "'Montserrat', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}K`} />
              <Tooltip
                formatter={(value: number, name: string) => [`$${value.toLocaleString()}K`, name === "ar" ? "Total AR" : "CS-Eligible"]}
                contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, borderRadius: 8, border: "1px solid oklch(0.90 0.008 75)" }}
              />
              <Bar dataKey="ar" fill="oklch(0.75 0.08 250)" radius={[4, 4, 0, 0]} name="ar" />
              <Bar dataKey="eligible" fill="oklch(0.55 0.18 250)" radius={[4, 4, 0, 0]} name="eligible" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "oklch(0.75 0.08 250)" }} />
              <span className="text-xs text-muted-foreground">Total AR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "oklch(0.55 0.18 250)" }} />
              <span className="text-xs text-muted-foreground">CS-Eligible</span>
            </div>
          </div>
        </div>

        {/* Client Priority Cards */}
        <div className="metric-card animate-fade-in-up delay-250">
          <div className="section-header">
            <h3 className="section-title">Client Priority Ranking</h3>
            <span className="text-xs text-muted-foreground">By AR Headroom</span>
          </div>
          <div className="space-y-3">
            {[...clients]
              .sort((a, b) => {
                const arA = clientARData.find((d) => d.clientId === a.id)?.totalAR ?? 0;
                const arB = clientARData.find((d) => d.clientId === b.id)?.totalAR ?? 0;
                return arB - arA;
              })
              .map((client) => {
              // Prefer live AR data from clientARData (CRM Scorecard), fall back to 0
              const arEntry = clientARData.find((d) => d.clientId === client.id);
              const ar = arEntry?.totalAR ?? 0;
              const targetRev = arEntry?.csEligibleAR ?? 0;
              const accruedQTD = arEntry?.accruedQTD ?? 0;
              const pctOfTarget = targetRev > 0 ? Math.round((accruedQTD / targetRev) * 100) : 0;
              const maxAR = Math.max(...clientARData.map((d) => d.totalAR), 1);
              const pct = Math.round((ar / maxAR) * 100);
              return (
                <button
                  key={client.id}
                  onClick={() => { onClientChange(client.id); onSectionChange("clients"); }}
                  className="w-full text-left group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: client.color }} />
                      <span className="text-sm font-semibold text-foreground group-hover:underline" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {client.shortName}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ background: client.lightColor, color: client.color }}
                      >
                        {client.tier}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {pctOfTarget > 0 && (
                        <span className="text-xs text-muted-foreground font-mono-data" title={`Accrued QTD: ${formatCurrency(accruedQTD)} / Target: ${formatCurrency(targetRev)}`}>
                          {pctOfTarget}% of target
                        </span>
                      )}
                      <span className="text-sm font-bold font-mono-data" style={{ color: client.color }}>
                        {ar > 0 ? formatCurrency(ar) : "—"}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(pct, 100)}%`, background: client.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{client.csServiceLevel}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top RS Pipeline */}
      <div className="metric-card animate-fade-in-up delay-300">
        <div className="section-header">
          <h3 className="section-title">Top Open Recommended Solutions</h3>
          <button
            onClick={() => onSectionChange("solutions")}
            className="text-xs font-medium hover:underline"
            style={{ color: "oklch(0.55 0.18 250)" }}
          >
            View all →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.92 0.004 75)" }}>
                <th className="text-left pb-2 text-xs font-semibold text-muted-foreground pr-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Client</th>
                <th className="text-left pb-2 text-xs font-semibold text-muted-foreground pr-4">Initiative</th>
                <th className="text-left pb-2 text-xs font-semibold text-muted-foreground pr-4">Stage</th>
                <th className="text-right pb-2 text-xs font-semibold text-muted-foreground">AR Headroom</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "oklch(0.96 0.003 75)" }}>
              {topRS.map((rs) => {
                const client = clients.find((c) => c.id === rs.client);
                const stage = rsStageConfig[rs.stage];
                return (
                  <tr key={rs.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-2.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: client?.color }} />
                        <span className="font-medium text-xs" style={{ color: client?.color }}>
                          {client?.shortName ?? rs.advertiser}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-foreground/80 max-w-[200px] truncate">{rs.name}</td>
                    <td className="py-2.5 pr-4">
                      <span
                        className="stage-badge"
                        style={{ background: stage?.bg, color: stage?.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: stage?.dot }} />
                        {stage?.label}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono-data text-sm font-semibold" style={{ color: "oklch(0.28 0.07 250)" }}>
                      {formatCurrency(rs.eligibleTargetRevenue)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CI Goal Widget */}
      <div className="metric-card animate-fade-in-up delay-325">
        <div className="section-header">
          <div>
            <h3 className="section-title">Client Interactions Goal</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Q1 2026 · Min. 3 validated CIs per dedicated client</p>
          </div>
          <a
            href={crmRecordsSummary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#0066CC" }}
          >
            <ExternalLink size={11} />
            Open CRM
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {clientCIGoals.map((goal) => {
            const pct = goal.isBoB ? Math.min((goal.validatedCIs / goal.quarterlyGoal) * 100, 100) : null;
            const isGoalMet = goal.isBoB && goal.validatedCIs >= goal.quarterlyGoal;
            const isAtRisk = goal.isBoB && goal.validatedCIs === 0;
            const statusColor = !goal.isBoB ? "#8B5CF6" : isGoalMet ? "#10B981" : isAtRisk ? "#EF4444" : "#F59E0B";
            const statusBg = !goal.isBoB ? "#F5F3FF" : isGoalMet ? "#ECFDF5" : isAtRisk ? "#FEF2F2" : "#FFFBEB";
            const StatusIcon = !goal.isBoB ? Clock : isGoalMet ? CheckCircle2 : AlertCircle;
            return (
              <div
                key={goal.clientId}
                className="rounded-xl p-4 flex flex-col gap-2"
                style={{
                  background: statusBg,
                  border: `1.5px solid ${statusColor}30`,
                }}
              >
                {/* Client name + status icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: goal.color }} />
                    <span className="text-xs font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: goal.color }}>
                      {goal.label}
                    </span>
                  </div>
                  <StatusIcon size={14} style={{ color: statusColor }} />
                </div>

                {/* CI count */}
                {goal.isBoB ? (
                  <>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: statusColor }}>
                        {goal.validatedCIs}
                      </span>
                      <span className="text-xs text-muted-foreground mb-1">/ {goal.quarterlyGoal} goal</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1.5 rounded-full overflow-hidden bg-gray-100">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: statusColor }}
                      />
                    </div>
                    {/* Dot indicators */}
                    <div className="flex gap-1.5">
                      {Array.from({ length: goal.quarterlyGoal }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full border-2"
                          style={{
                            background: i < goal.validatedCIs ? statusColor : "transparent",
                            borderColor: i < goal.validatedCIs ? statusColor : `${statusColor}50`,
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
                      style={{ background: `${statusColor}20`, color: statusColor }}
                    >
                      {isGoalMet ? "Goal Met" : isAtRisk ? "Not Started" : "In Progress"}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: statusColor }}>
                        {goal.validatedCIs}
                      </span>
                      <span className="text-xs text-muted-foreground mb-1">CIs this Q</span>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
                      style={{ background: "#EDE9FE", color: "#7C3AED" }}
                    >
                      CS Global POC
                    </span>
                    <p className="text-xs text-muted-foreground" style={{ fontSize: "10px" }}>Not in BoB · No coverage KPI</p>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary line */}
        <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
          <p className="text-xs text-muted-foreground">
            {clientCIGoals.filter(g => g.isBoB && g.validatedCIs >= g.quarterlyGoal).length} of 3 dedicated clients at goal · Last updated {crmRecordsSummary.dataAsOf}
          </p>
          <button
            onClick={() => onSectionChange("crminteractions")}
            className="text-xs font-medium hover:underline"
            style={{ color: "#0066CC" }}
          >
            View CI Dashboard →
          </button>
        </div>
      </div>

      {/* AI Usage This Week Widget */}
      {(() => {
        const currentWeek = aiUsageWeeks[0]; // Week 10 — current
        const prevWeek = aiUsageWeeks[1];    // Week 9
        const goalRate = Math.round((aiUsageSummary.weeksOverGoal / (aiUsageSummary.weeksOverGoal + aiUsageSummary.weeksUnderGoal)) * 100);
        const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        const currentDays = currentWeek.dailyUsage.slice(0, 5);
        const isAwaiting = currentWeek.status === "awaiting";
        return (
          <div className="metric-card animate-fade-in-up delay-340">
            <div className="section-header">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "oklch(0.92 0.04 280)" }}>
                  <Bot size={16} style={{ color: "oklch(0.48 0.18 280)" }} />
                </div>
                <div>
                  <h3 className="section-title">My AI Usage — This Week</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Week {currentWeek.week} · Goal: 4+ AI days/week (L4+/7)</p>
                </div>
              </div>
              <a
                href={aiUsageSummary.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.48 0.18 280)" }}
              >
                <ExternalLink size={11} />
                Open Unidash
              </a>
            </div>

            <div className="flex items-start gap-6 mt-3">
              {/* Left: big stat */}
              <div className="flex-shrink-0">
                <div className="flex items-end gap-1.5">
                  <span
                    className="text-4xl font-black"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: isAwaiting ? "oklch(0.60 0.01 75)" : currentWeek.aiDaysThisWeek >= 4 ? "oklch(0.45 0.18 155)" : "oklch(0.55 0.22 25)" }}
                  >
                    {isAwaiting ? "—" : currentWeek.aiDaysThisWeek}
                  </span>
                  <span className="text-sm text-muted-foreground mb-1.5">/ 4 days</span>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: isAwaiting ? "oklch(0.95 0.005 75)" : currentWeek.aiDaysThisWeek >= 4 ? "oklch(0.92 0.06 155)" : "oklch(0.97 0.04 25)",
                    color: isAwaiting ? "oklch(0.55 0.01 75)" : currentWeek.aiDaysThisWeek >= 4 ? "oklch(0.38 0.15 155)" : "oklch(0.55 0.22 25)",
                  }}
                >
                  {isAwaiting ? "Awaiting Data" : currentWeek.aiDaysThisWeek >= 4 ? "✓ Goal Met" : "Below Goal"}
                </span>
                <div className="mt-3 flex items-center gap-1.5">
                  <Zap size={11} style={{ color: "oklch(0.55 0.18 60)" }} />
                  <span className="text-xs text-muted-foreground">{goalRate}% goal rate · {aiUsageSummary.weeksOverGoal}W over</span>
                </div>
              </div>

              {/* Right: day-by-day dots for current week */}
              <div className="flex-1">
                <p className="text-xs font-semibold text-muted-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>This Week (W{currentWeek.week})</p>
                <div className="flex gap-2">
                  {dayLabels.map((day, i) => {
                    const status = currentDays[i];
                    const isUsed = status === "used";
                    const isNotUsed = status === "not_used";
                    const isNA = status === "not_applicable";
                    const isToday = day === todayDayLabel;
                    return (
                      <div key={day} className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center border-2 transition-all"
                          style={{
                            background: isUsed ? "oklch(0.92 0.06 155)" : isNotUsed ? "oklch(0.97 0.04 25)" : "oklch(0.96 0.003 75)",
                            borderColor: isToday ? "oklch(0.55 0.18 280)" : isUsed ? "oklch(0.75 0.12 155)" : isNotUsed ? "oklch(0.80 0.10 25)" : "oklch(0.90 0.004 75)",
                          }}
                          title={isUsed ? "AI Used" : isNotUsed ? "Not Used" : isNA ? "N/A" : "Awaiting"}
                        >
                          {isUsed && <CheckCircle2 size={16} style={{ color: "oklch(0.45 0.18 155)" }} />}
                          {isNotUsed && <span style={{ fontSize: 14, color: "oklch(0.65 0.15 25)" }}>✕</span>}
                          {(isNA || (!isUsed && !isNotUsed)) && <span style={{ fontSize: 12, color: "oklch(0.70 0.01 75)" }}>—</span>}
                        </div>
                        <span
                          className="text-xs font-semibold"
                          style={{ fontFamily: "'Montserrat', sans-serif", color: isToday ? "oklch(0.48 0.18 280)" : "oklch(0.55 0.01 75)", fontSize: "10px" }}
                        >
                          {day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Previous week comparison */}
                <div className="mt-3 pt-3 border-t" style={{ borderColor: "oklch(0.93 0.004 75)" }}>
                  <p className="text-xs text-muted-foreground mb-1.5" style={{ fontSize: "10px" }}>Previous week (W{prevWeek.week}) — {prevWeek.aiDaysThisWeek} AI day{prevWeek.aiDaysThisWeek !== 1 ? "s" : ""}</p>
                  <div className="flex gap-1.5">
                    {prevWeek.dailyUsage.slice(0, 5).map((status, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-md"
                        style={{
                          background: status === "used" ? "oklch(0.85 0.08 155)" : status === "not_used" ? "oklch(0.92 0.04 25)" : "oklch(0.94 0.003 75)",
                          border: `1px solid ${status === "used" ? "oklch(0.75 0.12 155)" : status === "not_used" ? "oklch(0.80 0.10 25)" : "oklch(0.90 0.004 75)"}`,
                        }}
                        title={dayLabels[i]}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Features used this week */}
              <div className="flex-shrink-0 hidden lg:block">
                <p className="text-xs font-semibold text-muted-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Active Tools</p>
                <div className="space-y-1.5">
                  {["Metamate Chat", "Metamate Web", "Llmvm", "Unified Auto"].map((tool) => (
                    <div key={tool} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.55 0.18 280)" }} />
                      <span className="text-xs" style={{ color: "oklch(0.45 0.01 75)", fontSize: "11px" }}>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Weekly Meetings Widget */}
      <div className="metric-card animate-fade-in-up delay-350">
        <div className="section-header">
          <div>
            <h3 className="section-title">This Week's Meetings</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{weekSummary.weekLabel} · {weekSummary.totalMeetings} meetings · {weekSummary.clientMeetings} client</p>
          </div>
          <a
            href={weekSummary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#7C3AED" }}
          >
            <ExternalLink size={11} />
            Open Calendar
          </a>
        </div>

        {/* Day columns */}
        <div className="grid grid-cols-5 gap-2 mt-3">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, dayIdx) => {
            // Dynamically compute Mon–Fri dates for the current week in Brazil timezone
            const nowBRT = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
            const dow = nowBRT.getDay(); // 0=Sun,1=Mon,...,6=Sat
            const diffToMon = dow === 0 ? -6 : 1 - dow;
            const monday = new Date(nowBRT);
            monday.setDate(nowBRT.getDate() + diffToMon);
            const dayKeys = ["Mon", "Tue", "Wed", "Thu", "Fri"];
            const dateMap: Record<string, string> = Object.fromEntries(
              dayKeys.map((k, i) => {
                const d = new Date(monday);
                d.setDate(monday.getDate() + i);
                return [k, d.toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" })];
              })
            );
            const dayDateLabel: Record<string, string> = Object.fromEntries(
              dayKeys.map((k, i) => {
                const d = new Date(monday);
                d.setDate(monday.getDate() + i);
                return [k, d.toLocaleDateString("en-US", { timeZone: "America/Sao_Paulo", month: "short", day: "numeric" })];
              })
            );
            const isToday = day === todayDayLabel;
            const dayEvents = weeklyMeetings.filter((e) => e.date === dateMap[day] && e.type !== "focus");
            return (
              <div
                key={day}
                className="rounded-xl p-2 flex flex-col gap-1.5"
                style={{
                  background: isToday ? "oklch(0.96 0.01 270)" : "oklch(0.985 0.002 75)",
                  border: isToday ? "1.5px solid oklch(0.80 0.12 270)" : "1px solid oklch(0.93 0.004 75)",
                }}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <p
                    className="text-xs font-bold"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      color: isToday ? "#7C3AED" : "oklch(0.4 0.01 75)",
                    }}
                  >
                    {day}
                  </p>
                  {isToday && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: "#7C3AED", color: "white", fontSize: "9px" }}>TODAY</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground" style={{ fontSize: "10px" }}>{dayDateLabel[day]}</p>
                {dayEvents.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic" style={{ fontSize: "10px" }}>No meetings</p>
                ) : (
                  dayEvents.map((ev) => {
                    const cfg = eventTypeConfig[ev.type];
                    const clientColor = ev.client ? calClientColors[ev.client] : null;
                    return (
                      <div
                        key={ev.id}
                        className="rounded-lg p-1.5"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                        title={ev.title}
                      >
                        <div className="flex items-center gap-1 mb-0.5">
                          {clientColor && (
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: clientColor }} />
                          )}
                          <p
                            className="text-xs font-semibold truncate"
                            style={{ color: cfg.color, fontSize: "10px", lineHeight: 1.3, fontFamily: "'Montserrat', sans-serif" }}
                          >
                            {ev.startTime}
                          </p>
                        </div>
                        <p
                          className="text-xs truncate"
                          style={{ color: cfg.color, fontSize: "10px", lineHeight: 1.3, opacity: 0.85 }}
                          title={ev.title}
                        >
                          {ev.title.length > 28 ? ev.title.slice(0, 28) + "…" : ev.title}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-3 pt-3 border-t flex-wrap" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
          {Object.entries(eventTypeConfig).filter(([k]) => k !== "allday" && k !== "external").map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }} />
              <span className="text-xs text-muted-foreground">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* In-Person Time Widget — bottom of page, only for non-remote */}
      {dashboardConfig.profile.isInOffice && (
      <div className="metric-card animate-fade-in-up delay-360" style={{ borderLeft: "3px solid #10B981" }}>
        <div className="section-header" style={{ marginBottom: "16px" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#ECFDF5" }}>
              <MapPin size={14} style={{ color: "#10B981" }} />
            </div>
            <div>
              <h3 className="section-title">In-Person Time</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{currentPeriod.label} · Policy period {currentPeriod.startDate.slice(5)} – {currentPeriod.endDate.slice(5)}</p>
            </div>
          </div>
          <a
            href={statusPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70"
            style={{ color: "#10B981", fontFamily: "'Montserrat', sans-serif" }}
          >
            Status <ArrowRight size={11} />
          </a>
        </div>

        {/* Compliance Status Banner */}
        {currentPeriod.onTrack ? (
          <div className="flex items-center gap-2 p-2.5 rounded-lg mb-4" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <CheckCircle2 size={13} style={{ color: "#16A34A", flexShrink: 0 }} />
            <p className="text-xs font-semibold" style={{ color: "#15803D", fontFamily: "'Montserrat', sans-serif" }}>On track — meeting the 3 days/week requirement</p>
          </div>
        ) : (
          <div className="flex items-start gap-2 p-2.5 rounded-lg mb-4" style={{ background: "#FFF7ED", border: "1px solid #FED7AA" }}>
            <AlertCircle size={13} style={{ color: "#EA580C", marginTop: "1px", flexShrink: 0 }} />
            <p className="text-xs font-semibold" style={{ color: "#9A3412", fontFamily: "'Montserrat', sans-serif" }}>
              Off track — {currentPeriod.daysNeeded} more days needed this period to meet policy
            </p>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "In-Person", count: currentPeriod.daysInPerson, color: "#10B981", bg: "#ECFDF5" },
            { label: "Planned", count: currentPeriod.plannedDays, color: "#0064E0", bg: "#EBF4FF" },
            { label: "Time Away", count: currentPeriod.timeAwayDays, color: "#8B5CF6", bg: "#F5F3FF" },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className="flex flex-col items-center justify-center p-3 rounded-lg" style={{ background: bg }}>
              <span className="text-lg font-bold" style={{ color, fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>{count}</span>
              <span className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Weekly Breakdown */}
        <div className="space-y-2">
          {weeklyBreakdown.map((week) => (
            <div key={week.weekLabel}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-foreground/70" style={{ fontFamily: "'Montserrat', sans-serif" }}>{week.weekLabel}</span>
                <span className="text-xs font-bold" style={{ color: week.onTrack ? "#10B981" : "#EA580C", fontFamily: "'Montserrat', sans-serif" }}>
                  {week.total}/5 days {week.onTrack ? "✓" : "⚠"}
                </span>
              </div>
              <div className="flex gap-1">
                {week.days.map((d) => (
                  <div
                    key={d.day}
                    className="flex-1 h-6 rounded flex items-center justify-center"
                    style={{
                      background: d.inPerson === null ? "#F3F4F6" : d.inPerson ? "#D1FAE5" : "#FEE2E2",
                      border: `1px solid ${d.inPerson === null ? "#E5E7EB" : d.inPerson ? "#6EE7B7" : "#FECACA"}`,
                    }}
                    title={`${d.day} ${d.date}: ${d.inPerson === null ? "Upcoming" : d.inPerson ? "In-person ✓" : "Not in-person"}`}
                  >
                    <span className="text-xs font-bold" style={{ color: d.inPerson === null ? "#9CA3AF" : d.inPerson ? "#065F46" : "#991B1B", fontFamily: "'Montserrat', sans-serif", fontSize: "10px" }}>
                      {d.day.slice(0, 1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
