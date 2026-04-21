// Overview Section — Portfolio summary, AR headroom, top priorities
// Design: Warm Structured Intelligence

import { useState } from "react";
import { clients, formatCurrency, stageConfig } from "@/lib/dashboardData";
import { rsPipeline, clientARData, portfolioARSummary, rsStageConfig, rsClientColors, initiativeARData, stageDistribution, RSStage } from "@/lib/rsPipelineData";
import { clientCIGoals, crmRecordsSummary } from "@/lib/crmRecordsData";
import { weeklyMeetings, weekSummary, eventTypeConfig, calClientColors } from "@/lib/weeklyMeetingsData";
import { aiUsageSummary, aiUsageWeeks } from "@/lib/aiUsageData";
import { currentPeriod, weeklyBreakdown, statusPageUrl } from "@/lib/inPersonData";
import { dashboardConfig } from "@/lib/dashboard.config";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { TrendingUp, Target, Users, Calendar, ExternalLink, CheckCircle2, AlertCircle, Clock, Bot, Zap, MapPin, ArrowRight, DollarSign, Activity } from "lucide-react";
import { EmailDigestWidget } from "@/components/EmailDigestWidget";
import { usePeriod } from "@/contexts/PeriodContext";

interface OverviewSectionProps {
  onClientChange: (id: string) => void;
  onSectionChange: (section: string, filter?: string) => void;
}

const metricCards = [
  {
    label: "Accrued AR (QTD)",
    value: portfolioARSummary.totalAccruedQTD > 0
      ? "$" + (portfolioARSummary.totalAccruedQTD / 1_000_000).toFixed(2) + "M"
      : "—",
    sub: `${dashboardConfig.unidash.quarter} · Revenue attributed to CS-supported RS`,
    icon: DollarSign,
    color: "#059669",
    bg: "#ECFDF5",
    tooltip: "Primary KPI: Revenue attributed to solutions you help pitch and get adopted this quarter.",
  },
  {
    label: "AR Headroom",
    value: portfolioARSummary.totalARHeadroom > 0
      ? "$" + (portfolioARSummary.totalARHeadroom / 1_000_000).toFixed(1) + "M"
      : "—",
    sub: `Remaining upside · ${portfolioARSummary.dataAsOf}`,
    icon: TrendingUp,
    color: "#0066CC",
    bg: "#EBF4FF",
    tooltip: "Prioritization tool: Opp Size − Accrued AR Lifetime. Points you to the RS with the most remaining revenue potential.",
  },
  {
    label: "Target Eligible Rev.",
    value: portfolioARSummary.totalTargetEligibleRevenue > 0
      ? "$" + (portfolioARSummary.totalTargetEligibleRevenue / 1_000_000).toFixed(1) + "M"
      : "—",
    sub: `Total addressable pool · ${rsPipeline.length} active RS`,
    icon: Target,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    tooltip: "Context metric: Total revenue addressable across all open Recommended Solutions in your portfolio.",
  },
  {
    label: "This Week's Meetings",
    value: String(weekSummary.totalMeetings),
    sub: `${weekSummary.clientMeetings} client · ${weekSummary.internalMeetings} internal`,
    icon: Calendar,
    color: "#7C3AED",
    bg: "#F5F3FF",
    tooltip: "Meetings this week from your Meta Calendar.",
  },
];

// AR chart: AR Headroom vs Opp Size per client (from rsPipelineData)
const arChartData = clientARData.length > 0
  ? [...clientARData]
      .sort((a, b) => b.arHeadroom - a.arHeadroom)
      .map((d) => {
        const client = clients.find((c) => c.id === d.clientId);
        return {
          name: client?.shortName ?? d.clientName,
          headroom: Math.round(d.arHeadroom / 1000),
          opp: Math.round(d.oppSize / 1000),
          accrued: Math.round(d.accruedARQTD / 1000),
          color: client?.color ?? "#6B7280",
        };
      })
  : clients.map((c) => ({ name: c.shortName, headroom: 0, opp: 0, accrued: 0, color: c.color }));

// Initiative AR Headroom chart data (top 6 by headroom)
const initiativeChartData = [...initiativeARData]
  .sort((a, b) => b.arHeadroom - a.arHeadroom)
  .slice(0, 6)
  .map((d) => ({
    name: d.name.length > 22 ? d.name.slice(0, 22) + "…" : d.name,
    fullName: d.name,
    headroom: Math.round(d.arHeadroom / 1000),
    accrued: Math.round(d.accruedARQTD / 1000),
    count: d.count,
  }));

// Stage progression data
const stageProgressData = [
  { stage: "Discovery", count: stageDistribution.discovery, color: "#6B7280" },
  { stage: "Pitching", count: stageDistribution.pitching, color: "#F59E0B" },
  { stage: "Scoping", count: stageDistribution.scoping, color: "#8B5CF6" },
  { stage: "Committed", count: stageDistribution.committed, color: "#3B82F6" },
  { stage: "Actioned", count: stageDistribution.actioned, color: "#0EA5E9" },
  { stage: "Partial", count: stageDistribution.partial, color: "#10B981" },
  { stage: "Adopted", count: stageDistribution.adopted, color: "#059669" },
].filter((d) => d.count > 0);

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

function InitiativeChart({ onSectionChange }: { onSectionChange: (section: string, filter?: string) => void }) {
  const [activeClient, setActiveClient] = useState<string>("all");

  // Build per-client initiative data from rsPipeline
  const filteredData = [...rsPipeline]
    .filter((rs) => activeClient === "all" || rs.client === activeClient)
    .reduce((acc, rs) => {
      const existing = acc.find((d) => d.fullName === rs.initiative);
      if (existing) {
        existing.headroom += Math.round(rs.arHeadroom / 1000);
        existing.accrued += Math.round(rs.accruedARQTD / 1000);
        existing.count += 1;
        // Track top client by headroom contribution
        const clientCfg = rsClientColors[rs.client];
        const clientName = clientCfg?.name ?? rs.client;
        const existingClient = existing.clientBreakdown.find((c) => c.name === clientName);
        if (existingClient) {
          existingClient.headroom += Math.round(rs.arHeadroom / 1000);
        } else {
          existing.clientBreakdown.push({ name: clientName, headroom: Math.round(rs.arHeadroom / 1000), color: clientCfg?.color ?? "#6B7280" });
        }
      } else {
        const clientCfg = rsClientColors[rs.client];
        const clientName = clientCfg?.name ?? rs.client;
        acc.push({
          name: rs.initiative.length > 28 ? rs.initiative.slice(0, 28) + "…" : rs.initiative,
          fullName: rs.initiative,
          headroom: Math.round(rs.arHeadroom / 1000),
          accrued: Math.round(rs.accruedARQTD / 1000),
          count: 1,
          clientBreakdown: [{ name: clientName, headroom: Math.round(rs.arHeadroom / 1000), color: clientCfg?.color ?? "#6B7280" }],
        });
      }
      return acc;
    }, [] as Array<{ name: string; fullName: string; headroom: number; accrued: number; count: number; clientBreakdown: Array<{ name: string; headroom: number; color: string }> }>)
    .sort((a, b) => b.headroom - a.headroom);

  const clientTabs = [
    { id: "all", label: "All Clients" },
    ...clients.map((c) => ({ id: c.id, label: c.shortName, color: c.color })),
  ];

  return (
    <div className="metric-card animate-fade-in-up delay-305">
      <div className="section-header">
        <div>
          <h3 className="section-title">AR Headroom by Initiative</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Which Creative Shop initiatives have the most remaining revenue upside · Source: Unidash
          </p>
          <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.12 155)" }}>
            Last refreshed: {portfolioARSummary.dataAsOf} · Click a bar to drill down
          </p>
        </div>
        <button
          onClick={() => onSectionChange("solutions")}
          className="text-xs font-medium hover:underline"
          style={{ color: "oklch(0.55 0.18 250)" }}
        >
          View all RS →
        </button>
      </div>

      {/* Client filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {clientTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveClient(tab.id)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={{
              background: activeClient === tab.id
                ? (tab.id === "all" ? "oklch(0.55 0.18 250)" : (tab as {color?: string}).color ?? "oklch(0.55 0.18 250)")
                : "oklch(0.96 0.004 75)",
              color: activeClient === tab.id ? "white" : "oklch(0.45 0.02 75)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredData.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No initiatives found for this client.</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(filteredData.length * 44, 200)}>
          <BarChart
            data={filteredData}
            layout="vertical"
            margin={{ top: 4, right: 60, left: 8, bottom: 0 }}
            onClick={(data) => {
              if (data?.activePayload?.[0]?.payload?.fullName) {
                onSectionChange("solutions", data.activePayload[0].payload.fullName);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 75)" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}K`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fontFamily: "'Montserrat', sans-serif" }}
              axisLine={false}
              tickLine={false}
              width={200}
            />
            <Tooltip
              formatter={(value: number, name: unknown) => [
                `$${(value as number).toLocaleString()}K`,
                name === "headroom" ? "AR Headroom" : "Accrued QTD",
              ]}
              labelFormatter={(label: unknown, payload: unknown[]) => {
                const first = (payload as Array<{ payload: { fullName: string; count: number; clientBreakdown: Array<{ name: string; headroom: number; color: string }> } }>)?.[0]?.payload;
                if (!first?.fullName) return String(label);
                const topClient = first.clientBreakdown?.sort((a, b) => b.headroom - a.headroom)[0];
                const topClientStr = topClient ? ` · Top: ${topClient.name}` : "";
                return `${first.fullName} (${first.count} RS${topClientStr})`;
              }}
              contentStyle={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 12,
                borderRadius: 8,
                border: "1px solid oklch(0.90 0.008 75)",
              }}
            />
            <Bar dataKey="headroom" fill="oklch(0.55 0.18 250)" radius={[0, 4, 4, 0]} name="headroom" cursor="pointer" />
            <Bar dataKey="accrued" fill="oklch(0.45 0.18 155)" radius={[0, 4, 4, 0]} name="accrued" cursor="pointer" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "oklch(0.55 0.18 250)" }} />
          <span className="text-xs text-muted-foreground">AR Headroom (remaining upside)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded" style={{ background: "oklch(0.45 0.18 155)" }} />
          <span className="text-xs text-muted-foreground">Accrued QTD</span>
        </div>
      </div>
    </div>
  );
}

export default function OverviewSection({ onClientChange, onSectionChange }: OverviewSectionProps) {
  const greeting = getBrazilGreeting();
  const todayDayLabel = getTodayDayLabel();
  const { period, isQ1, isQ2, isH1, periodLabel } = usePeriod();
  // Top RS by Eligible Target Revenue from rsPipelineData
  const topRS = [...rsPipeline]
    .filter((rs) => rs.stage !== "closed" && rs.stage !== "adopted")
    .sort((a, b) => b.arHeadroom - a.arHeadroom)
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
            {dashboardConfig.profile.role} · Meta {dashboardConfig.profile.team} · <span className="font-bold">{periodLabel}</span>
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
            {(() => {
              // Top initiative by AR Headroom
              const topInit = [...rsPipeline]
                .reduce((acc, rs) => {
                  const ex = acc.find((d) => d.name === rs.initiative);
                  if (ex) { ex.headroom += rs.arHeadroom; ex.count += 1; }
                  else acc.push({ name: rs.initiative, headroom: rs.arHeadroom, count: 1 });
                  return acc;
                }, [] as Array<{ name: string; headroom: number; count: number }>)
                .sort((a, b) => b.headroom - a.headroom)[0];
              if (!topInit) return null;
              const shortName = topInit.name.length > 32 ? topInit.name.slice(0, 32) + "…" : topInit.name;
              const headroomK = topInit.headroom >= 1_000_000
                ? `$${(topInit.headroom / 1_000_000).toFixed(1)}M`
                : `$${Math.round(topInit.headroom / 1_000)}K`;
              return (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-xs opacity-70">Top Initiative · {topInit.count} RS</p>
                  <p className="text-sm font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {shortName}
                  </p>
                  <p className="text-xs opacity-60 mt-0.5">{headroomK} AR Headroom</p>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          const isARCard = card.label === "Accrued AR (QTD)";
          const pctOfTarget = isARCard && portfolioARSummary.totalTargetEligibleRevenue > 0
            ? Math.round((portfolioARSummary.totalAccruedQTD / portfolioARSummary.totalTargetEligibleRevenue) * 100)
            : null;
          // QoQ delta vs last quarter
          const qoqDelta = isARCard && portfolioARSummary.accruedARLastQuarter > 0
            ? Math.round(((portfolioARSummary.totalAccruedQTD - portfolioARSummary.accruedARLastQuarter) / portfolioARSummary.accruedARLastQuarter) * 100)
            : null;
          // Per-client breakdown for the Accrued AR QTD progress bar
          const clientBreakdown = isARCard ? clientARData
            .filter((d) => d.accruedARQTD > 0)
            .sort((a, b) => b.accruedARQTD - a.accruedARQTD)
            .map((d) => {
              const clientCfg = clients.find((c) => c.id === d.clientId);
              return {
                name: clientCfg?.shortName ?? d.clientName,
                color: clientCfg?.color ?? "#6B7280",
                pct: portfolioARSummary.totalAccruedQTD > 0
                  ? Math.round((d.accruedARQTD / portfolioARSummary.totalAccruedQTD) * 100)
                  : 0,
                value: d.accruedARQTD,
              };
            }) : [];
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
                {isARCard && qoqDelta !== null && (
                  <div
                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: qoqDelta >= 0 ? "#DCFCE7" : "#FEE2E2",
                      color: qoqDelta >= 0 ? "#15803D" : "#DC2626",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                    title={`vs ${portfolioARSummary.lastQuarterLabel} final accrued AR`}
                  >
                    {qoqDelta >= 0 ? "↑" : "↓"}{Math.abs(qoqDelta)}% QoQ
                  </div>
                )}
              </div>
              <p
                className="text-2xl font-bold mb-0.5"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.03em", color: card.color }}
              >
                {card.value}
              </p>
              <p className="text-xs font-semibold text-foreground/80">{card.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
              {isARCard && pctOfTarget !== null && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">% of Target Eligible Rev.</span>
                    <span className="text-xs font-bold font-mono-data" style={{ color: card.color }}>{pctOfTarget}%</span>
                  </div>
                  {/* Segmented per-client progress bar */}
                  <div className="h-2 rounded-full overflow-hidden flex gap-px bg-gray-100">
                    {clientBreakdown.length > 0 ? clientBreakdown.map((seg) => (
                      <div
                        key={seg.name}
                        className="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full"
                        style={{
                          width: `${Math.round(seg.pct * (pctOfTarget / 100))}%`,
                          background: seg.color,
                          minWidth: seg.pct > 0 ? 2 : 0,
                        }}
                        title={`${seg.name}: ${formatCurrency(seg.value)} (${seg.pct}% of total QTD)`}
                      />
                    )) : (
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(pctOfTarget, 100)}%`, background: card.color }}
                      />
                    )}
                  </div>
                  {/* Client legend — clickable to navigate to Client Content */}
                  {clientBreakdown.length > 0 && (
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      {clientBreakdown.map((seg) => {
                        const clientObj = clients.find((c) => (c.shortName ?? c.name) === seg.name);
                        return (
                          <button
                            key={seg.name}
                            onClick={() => { if (clientObj) { onClientChange(clientObj.id); onSectionChange("clients"); } }}
                            className="flex items-center gap-1 transition-opacity hover:opacity-70 rounded"
                            style={{ cursor: clientObj ? "pointer" : "default" }}
                            title={clientObj ? `Go to ${seg.name} client page` : seg.name}
                          >
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                            <span className="text-muted-foreground" style={{ fontSize: "10px" }}>{seg.name} {seg.pct}%</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {/* Close Quarter button */}
                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Close Q1 2026?\n\nThis will save the current Accrued AR QTD ($${(portfolioARSummary.totalAccruedQTD / 1000).toFixed(0)}K) as the Q1 2026 final value, which will be used as the baseline for the QoQ badge next quarter.\n\nUpdate the accruedARLastQuarter field in rsPipelineData.ts to:\n  ${portfolioARSummary.totalAccruedQTD}\n\nand set lastQuarterLabel to: "Q1 2026"`
                      );
                      if (confirmed) {
                        navigator.clipboard.writeText(
                          `accruedARLastQuarter: ${portfolioARSummary.totalAccruedQTD},\nlastQuarterLabel: "Q1 2026",`
                        ).then(() => alert("Copied to clipboard! Paste into rsPipelineData.ts \u2192 portfolioARSummary."));
                      }
                    }}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs font-semibold px-2 py-1.5 rounded-lg border transition-all hover:opacity-80"
                    style={{ color: "#7C3AED", borderColor: "#DDD6FE", background: "#F5F3FF" }}
                    title="Lock in current QTD as the quarter's final value for QoQ tracking"
                  >
                    <span>&#x1F512;</span> Close Quarter
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stage Velocity Card */}
      {(() => {
        // Compute avg days between stage transitions across all RS entries with stageHistory
        const allTransitions: number[] = [];
        rsPipeline.forEach((rs) => {
          if (!rs.stageHistory || rs.stageHistory.length < 2) return;
          for (let i = 1; i < rs.stageHistory.length; i++) {
            const prev = new Date(rs.stageHistory[i - 1].date).getTime();
            const curr = new Date(rs.stageHistory[i].date).getTime();
            const days = Math.round((curr - prev) / 86400000);
            if (days >= 0) allTransitions.push(days);
          }
        });
        const avgDays = allTransitions.length > 0
          ? Math.round(allTransitions.reduce((s, d) => s + d, 0) / allTransitions.length)
          : null;
        // Count stalled RS (>30d in current stage)
        const today = Date.now();
        const stalledCount = rsPipeline.filter((rs) => {
          if (!rs.stageHistory || rs.stageHistory.length === 0) return false;
          const lastDate = new Date(rs.stageHistory[rs.stageHistory.length - 1].date).getTime();
          return Math.floor((today - lastDate) / 86400000) > 30;
        }).length;
        const withHistory = rsPipeline.filter((rs) => rs.stageHistory && rs.stageHistory.length > 0).length;
        return (
          <div className="metric-card animate-fade-in-up delay-125">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Activity size={15} style={{ color: "#7C3AED" }} />
                  <h3 className="text-sm font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Stage Velocity</h3>
                </div>
                <p className="text-xs text-muted-foreground">Avg time between stage transitions · {withHistory} RS with history tracked</p>
              </div>
              <button
                onClick={() => onSectionChange("solutions")}
                className="text-xs font-medium hover:opacity-70 transition-opacity flex items-center gap-1"
                style={{ color: "#7C3AED" }}
              >
                View all <ArrowRight size={10} />
              </button>
            </div>
            <div className="flex items-end gap-6 mb-4">
              <div>
                <p className="text-3xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: avgDays !== null && avgDays > 21 ? "#D97706" : "#7C3AED" }}>
                  {avgDays !== null ? `${avgDays}d` : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">avg per transition</p>
              </div>
              <div className="h-10 w-px" style={{ background: "oklch(0.92 0.004 75)" }} />
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: stalledCount > 3 ? "#DC2626" : stalledCount > 0 ? "#D97706" : "#059669" }}>
                  {stalledCount}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">stalled &gt;30d</p>
              </div>
              <div className="h-10 w-px" style={{ background: "oklch(0.92 0.004 75)" }} />
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: "#059669" }}>
                  {allTransitions.length}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">total transitions logged</p>
              </div>
            </div>
            {/* Stage funnel drop-off mini chart */}
            {(() => {
              const stageOrder: Array<{ key: keyof typeof stageDistribution; label: string }> = [
                { key: "discovery", label: "Discovery" },
                { key: "pitching", label: "Pitching" },
                { key: "scoping", label: "Scoping" },
                { key: "committed", label: "Committed" },
                { key: "actioned", label: "Actioned" },
                { key: "partial", label: "Partial" },
                { key: "adopted", label: "Adopted" },
              ];
              const maxCount = Math.max(...stageOrder.map((s) => stageDistribution[s.key]));
              return (
                <div>
                  <p className="text-xs text-muted-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Pipeline funnel · drop-off by stage</p>
                  <div className="flex items-end gap-1">
                    {stageOrder.map((s, idx) => {
                      const count = stageDistribution[s.key];
                      const prev = idx > 0 ? stageDistribution[stageOrder[idx - 1].key] : null;
                      const isDropOff = prev !== null && count < prev;
                      const barH = maxCount > 0 ? Math.max(Math.round((count / maxCount) * 48), 4) : 4;
                      const cfg = rsStageConfig[s.key as RSStage];
                      return (
                        <div key={s.key} className="flex flex-col items-center gap-0.5 flex-1">
                          <span style={{ fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", color: isDropOff ? "#DC2626" : "oklch(0.55 0.01 75)", fontWeight: isDropOff ? 700 : 400 }}>
                            {count}{isDropOff && " ↓"}
                          </span>
                          <div
                            className="w-full rounded-t"
                            style={{
                              height: barH,
                              background: isDropOff ? "#FCA5A5" : cfg.bg,
                              border: `1px solid ${isDropOff ? "#EF4444" : cfg.color}`,
                              opacity: 0.85,
                            }}
                          />
                          <span style={{ fontSize: "8px", color: "oklch(0.55 0.01 75)", textAlign: "center", lineHeight: 1.1 }}>{s.label.slice(0, 4)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      })()}

      {/* AR Headroom Chart + Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AR Headroom by Client */}
        <div className="metric-card animate-fade-in-up delay-200">
          <div className="section-header">
            <div>
              <h3 className="section-title">AR Headroom by Client</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Prioritization tool — where to focus to maximize AR · Source: Unidash</p>
            </div>
            <span className="text-xs text-muted-foreground">{portfolioARSummary.dataAsOf}</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={arChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 75)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "'Montserrat', sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}K`} />
              <Tooltip
                formatter={(value: number, name: unknown) => [
                  `$${(value as number).toLocaleString()}K`,
                  name === "headroom" ? "AR Headroom" : name === "opp" ? "Opp Size" : "Accrued QTD"
                ]}
                contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, borderRadius: 8, border: "1px solid oklch(0.90 0.008 75)" }}
              />
              <Bar dataKey="opp" fill="oklch(0.88 0.04 250)" radius={[4, 4, 0, 0]} name="opp" />
              <Bar dataKey="headroom" fill="oklch(0.55 0.18 250)" radius={[4, 4, 0, 0]} name="headroom" />
              <Bar dataKey="accrued" fill="oklch(0.45 0.18 155)" radius={[4, 4, 0, 0]} name="accrued" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "oklch(0.88 0.04 250)" }} />
              <span className="text-xs text-muted-foreground">Opp Size</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "oklch(0.55 0.18 250)" }} />
              <span className="text-xs text-muted-foreground">AR Headroom</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: "oklch(0.45 0.18 155)" }} />
              <span className="text-xs text-muted-foreground">Accrued QTD</span>
            </div>
          </div>
        </div>

        {/* Client Priority Cards */}
        <div className="metric-card animate-fade-in-up delay-250">
          <div className="section-header">
            <h3 className="section-title">Client Priority Ranking</h3>
            <span className="text-xs text-muted-foreground" title="Ranked by AR Headroom from Unidash — the revenue gap each client still has to close.">By AR Headroom · Unidash</span>
          </div>
          {/* Column headers */}
          <div className="flex items-center justify-between mb-1 pb-1" style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
            <span className="text-xs text-muted-foreground">Client</span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground text-right" style={{ minWidth: 72 }} title="Revenue attributed to CS solutions this quarter">Accrued QTD</span>
              <span className="text-xs text-muted-foreground text-right" style={{ minWidth: 72 }} title="Remaining revenue gap to close">AR Headroom</span>
            </div>
          </div>
          <div className="space-y-3">
            {[...clients]
              .sort((a, b) => {
                const arA = clientARData.find((d) => d.clientId === a.id)?.arHeadroom ?? 0;
                const arB = clientARData.find((d) => d.clientId === b.id)?.arHeadroom ?? 0;
                return arB - arA;
              })
              .map((client) => {
              // Prefer live AR data from clientARData (CRM Scorecard), fall back to 0
              const arEntry = clientARData.find((d) => d.clientId === client.id);
              const ar = arEntry?.arHeadroom ?? 0;
              const targetRev = arEntry?.targetEligibleRevenue ?? 0;
              const accruedQTD = arEntry?.accruedARQTD ?? 0;
              const pctOfTarget = targetRev > 0 ? Math.round((accruedQTD / targetRev) * 100) : 0;
              const maxAR = Math.max(...clientARData.map((d) => d.arHeadroom), 1);
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
                    <div className="flex items-center gap-4">
                      <div className="text-right" style={{ minWidth: 72 }}>
                        <span className="text-sm font-bold font-mono-data" style={{ color: "#059669" }}>
                          {accruedQTD > 0 ? formatCurrency(accruedQTD) : "—"}
                        </span>
                        {pctOfTarget > 0 && (
                          <p className="text-muted-foreground font-mono-data" style={{ fontSize: "10px" }}>{pctOfTarget}% of target</p>
                        )}
                      </div>
                      <div className="text-right" style={{ minWidth: 72 }}>
                        <span className="text-sm font-bold font-mono-data" style={{ color: client.color }}>
                          {ar > 0 ? formatCurrency(ar) : "—"}
                        </span>
                      </div>
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
          <div>
            <h3 className="section-title">Top Open Recommended Solutions</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Sorted by AR Headroom — each RS is a lever to close the client's gap · Source: Unidash</p>
          </div>
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
                <th className="text-right pb-2 text-xs font-semibold text-muted-foreground" title="AR Headroom: remaining revenue upside for this RS (Opp Size − Accrued AR Lifetime).">AR Headroom</th>
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
                          {client?.shortName ?? rs.clientName}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-foreground/80 max-w-[200px] truncate">{rs.initiative}</td>
                    <td className="py-2.5 pr-4">
                      <span
                        className="stage-badge"
                        style={{ background: stage?.bg, color: stage?.color }}
                      >
                        {stage?.label}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono-data text-sm font-semibold" style={{ color: "oklch(0.28 0.07 250)" }}>
                      {formatCurrency(rs.arHeadroom)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>



      {/* RS Stage Progression */}
      <div className="metric-card animate-fade-in-up delay-310">
        <div className="section-header">
          <div>
            <h3 className="section-title">RS Stage Progression</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{rsPipeline.length} active solutions · click a stage to filter the Solutions view</p>
          </div>
          <span className="text-xs text-muted-foreground">{portfolioARSummary.dataAsOf}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-2">
          {stageProgressData.map((d) => (
            <button
              key={d.stage}
              onClick={() => onSectionChange("solutions", d.stage.toLowerCase())}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all hover:shadow-md hover:scale-105 cursor-pointer"
              style={{ borderColor: `${d.color}30`, background: `${d.color}08` }}
              title={`View ${d.stage} solutions`}
            >
              <span className="text-2xl font-bold font-mono-data" style={{ color: d.color }}>{d.count}</span>
              <span className="text-xs font-semibold text-center" style={{ color: d.color, fontFamily: "'Montserrat', sans-serif" }}>{d.stage}</span>
              <div className="w-full h-1 rounded-full" style={{ background: `${d.color}30` }}>
                <div className="h-full rounded-full" style={{ width: `${Math.round((d.count / rsPipeline.length) * 100)}%`, background: d.color }} />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t flex items-center gap-4" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#059669" }} />
            <span className="text-xs text-muted-foreground">{stageDistribution.adopted} Adopted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#10B981" }} />
            <span className="text-xs text-muted-foreground">{stageDistribution.partial} Partially Adopted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#F59E0B" }} />
            <span className="text-xs text-muted-foreground">{stageDistribution.pitching + stageDistribution.discovery + stageDistribution.scoping} In Progress</span>
          </div>
        </div>
      </div>



      {/* CI Goal Widget */}
      <div className="metric-card animate-fade-in-up delay-325">
        <div className="section-header">
          <div>
            <h3 className="section-title">Client Interactions Goal</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{periodLabel} · CS-only validated CIs · Min. 3 per dedicated client</p>
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

        {/* H1 side-by-side mini view */}
        {isH1 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
            {clientCIGoals.map((goal) => {
              const h1Total = goal.validatedCIsQ1 + goal.validatedCIsQ2;
              const h1Goal = (goal.inQ1 ? goal.quarterlyGoal : 0) + (goal.inQ2 ? goal.quarterlyGoal : 0);
              const h1Pct = h1Goal > 0 ? Math.min(100, Math.round((h1Total / h1Goal) * 100)) : 0;
              return (
                <div key={goal.clientId} className="rounded-xl p-3 flex flex-col gap-2" style={{ background: "white", border: "1.5px solid #E5E7EB" }}>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: goal.color }} />
                    <span className="text-xs font-bold" style={{ color: goal.color, fontFamily: "'Montserrat', sans-serif" }}>{goal.label}</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: "#059669", fontFamily: "'JetBrains Mono', monospace" }}>{goal.validatedCIsQ1}</p>
                      <p className="text-xs text-muted-foreground">Q1</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: "#F59E0B", fontFamily: "'JetBrains Mono', monospace" }}>{goal.validatedCIsQ2}</p>
                      <p className="text-xs text-muted-foreground">Q2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold" style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}>{h1Total}</p>
                      <p className="text-xs text-muted-foreground">H1</p>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
                    <div className="h-full rounded-full" style={{ width: `${h1Pct}%`, background: h1Total >= h1Goal ? "#059669" : "#3B82F6" }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 mt-3 ${isH1 ? "hidden" : ""}`}>
          {clientCIGoals.filter((g) => isQ1 ? g.inQ1 : g.inQ2).map((goal) => {
            const validatedCIs = isQ1 ? goal.validatedCIsQ1 : goal.validatedCIsQ2;
            const pct = goal.isBoB ? Math.min((validatedCIs / goal.quarterlyGoal) * 100, 100) : null;
            const isGoalMet = goal.isBoB && validatedCIs >= goal.quarterlyGoal;
            const isAtRisk = goal.isBoB && validatedCIs === 0;
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
                        {validatedCIs}
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
                            background: i < validatedCIs ? statusColor : "transparent",
                            borderColor: i < validatedCIs ? statusColor : `${statusColor}50`,
                          }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
                      style={{ background: `${statusColor}20`, color: statusColor }}
                    >
                      {isGoalMet ? "Goal Met ✓" : isAtRisk ? "Not Started" : "In Progress"}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: statusColor }}>
                        {validatedCIs}
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
            {isH1
              ? `H1: ${clientCIGoals.reduce((s, g) => s + g.validatedCIsQ1 + g.validatedCIsQ2, 0)} total CIs · ${clientCIGoals.filter(g => g.inQ1 && g.validatedCIsQ1 >= g.quarterlyGoal).length}/3 Q1 goals · ${clientCIGoals.filter(g => g.inQ2 && g.validatedCIsQ2 >= g.quarterlyGoal).length}/4 Q2 goals`
              : `${clientCIGoals.filter(g => isQ1 ? (g.inQ1 && g.validatedCIsQ1 >= g.quarterlyGoal) : (g.inQ2 && g.validatedCIsQ2 >= g.quarterlyGoal)).length} of ${isQ1 ? 3 : 4} dedicated clients at goal · Last updated ${crmRecordsSummary.dataAsOf}`
            }
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

      {/* Email Digest Widget */}
      <EmailDigestWidget />

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
