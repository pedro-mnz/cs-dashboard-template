// CRM Client Interactions Section
// Sources:
//   1. Meta DCMP Unidash: internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/
//   2. Meta CRM Records: internalfb.com/crm/client_interactions (filtered to your name)
//
// Business logic:
//   - Dedicated BoB clients: your clients from config → min CI target/quarter goal
//   - POC clients (not in BoB) → tracked separately, no coverage KPI
//
// Design: Warm Structured Intelligence

import {
  crmSummary,
  crmCoverage,
  topicWeeks,
  avgLiveHoursPerClient,
  topicColors,
  topicLabels,
} from "@/lib/crmInteractionsData";
import {
  crmRecords,
  crmRecordsSummary,
  clientCIGoals,
  clientColors,
  clientLabels,
  type ClientCIGoal,
} from "@/lib/crmRecordsData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  ExternalLink,
  RefreshCw,
  Users,
  TrendingUp,
  Calendar,
  Target,
  CheckCircle2,
  Video,
  MapPin,
  ChevronRight,
  Star,
  AlertCircle,
  Info,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const topicKeys = Object.keys(topicLabels) as (keyof typeof topicLabels)[];

// Custom stacked bar tooltip
const TopicTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl shadow-lg p-3 text-xs" style={{ background: "white", border: "1px solid oklch(0.92 0.004 75)", fontFamily: "'Montserrat', sans-serif", minWidth: 180 }}>
      <p className="font-bold mb-2 text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Week of {label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.fill }} />
            <span className="text-muted-foreground">{topicLabels[p.dataKey as keyof typeof topicLabels]}</span>
          </div>
          <span className="font-semibold text-foreground">{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

// Per-client goal card
const ClientGoalCard = ({ goal }: { goal: ClientCIGoal }) => {
  const pct = goal.isBoB ? Math.min(100, Math.round((goal.validatedCIs / goal.quarterlyGoal) * 100)) : null;
  const isGoalMet = goal.isBoB && goal.validatedCIs >= goal.quarterlyGoal;
  const isAtRisk = goal.isBoB && goal.validatedCIs < goal.quarterlyGoal;

  // Status
  let statusLabel = "";
  let statusBg = "";
  let statusColor = "";
  if (!goal.isBoB) {
    statusLabel = "POC Tracking";
    statusBg = "#F5F3FF";
    statusColor = "#7C3AED";
  } else if (isGoalMet) {
    statusLabel = "Goal Met ✓";
    statusBg = "#ECFDF5";
    statusColor = "#059669";
  } else if (goal.validatedCIs > 0) {
    statusLabel = "In Progress";
    statusBg = "#FEF3C7";
    statusColor = "#D97706";
  } else {
    statusLabel = "Not Started";
    statusBg = "#FEF2F2";
    statusColor = "#DC2626";
  }

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: "white",
        border: `1.5px solid ${goal.isBoB ? (isGoalMet ? "#BBF7D0" : isAtRisk ? "#FDE68A" : "#FECACA") : "#DDD6FE"}`,
        boxShadow: "0 1px 6px 0 rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style={{ background: goal.color }}>
            {goal.label.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{goal.label}</p>
            <p className="text-xs text-muted-foreground">{goal.isBoB ? "Dedicated BoB" : "CS Global POC"}</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: statusBg, color: statusColor }}>
          {statusLabel}
        </span>
      </div>

      {/* CI count + goal */}
      {goal.isBoB ? (
        <>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold font-mono-data" style={{ color: goal.color, lineHeight: 1 }}>
              {goal.validatedCIs}
            </span>
            <span className="text-sm text-muted-foreground mb-0.5">/ {goal.quarterlyGoal} CIs</span>
          </div>
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Q1 2026 progress</span>
              <span className="font-semibold font-mono-data" style={{ color: goal.color }}>{pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "oklch(0.93 0.004 75)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: isGoalMet ? "#059669" : isAtRisk && goal.validatedCIs > 0 ? "#F59E0B" : goal.validatedCIs === 0 ? "#EF4444" : goal.color,
                }}
              />
            </div>
            {/* Remaining */}
            {!isGoalMet && (
              <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#D97706" }}>
                <AlertCircle size={10} />
                {goal.quarterlyGoal - goal.validatedCIs} more CI{goal.quarterlyGoal - goal.validatedCIs > 1 ? "s" : ""} needed by EOQ
              </p>
            )}
            {isGoalMet && (
              <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#059669" }}>
                <CheckCircle2 size={10} />
                Minimum quarterly goal achieved
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold font-mono-data" style={{ color: goal.color, lineHeight: 1 }}>
              {goal.validatedCIs}
            </span>
            <span className="text-sm text-muted-foreground mb-0.5">CIs logged</span>
          </div>
          <div
            className="rounded-xl p-2.5 flex items-start gap-2 text-xs"
            style={{ background: "#F5F3FF", border: "1px solid #DDD6FE" }}
          >
            <Info size={11} style={{ color: "#7C3AED", marginTop: 1, flexShrink: 0 }} />
            <span style={{ color: "#5B21B6" }}>{goal.bobNote}</span>
          </div>
        </>
      )}

      {/* Interaction dots */}
      {goal.validatedCIs > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {Array.from({ length: goal.isBoB ? goal.quarterlyGoal : goal.validatedCIs }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: i < goal.validatedCIs ? goal.color : "oklch(0.93 0.004 75)",
                color: i < goal.validatedCIs ? "white" : "oklch(0.6 0.004 75)",
              }}
            >
              {i < goal.validatedCIs ? "✓" : "·"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Contact method badge
const MethodBadge = ({ method }: { method: string }) => {
  const isInPerson = method === "In-Person Meeting";
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: isInPerson ? "#ECFDF5" : "#EFF6FF", color: isInPerson ? "#059669" : "#3B82F6" }}>
      {isInPerson ? <MapPin size={10} /> : <Video size={10} />}
      {method}
    </span>
  );
};

// Client badge
const ClientBadge = ({ client }: { client: string }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${clientColors[client]}18`, color: clientColors[client] }}>
    {clientLabels[client]}
  </span>
);

export default function CRMInteractionsSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshCI = trpc.scraper.refreshCI.useMutation({
    onMutate: () => setIsRefreshing(true),
    onSuccess: (data) => {
      setIsRefreshing(false);
      if (data.success) {
        toast.success("CI Dashboard refreshed", {
          description: "Scraped latest data from Unidash. Reloading...",
        });
        setTimeout(() => window.location.reload(), 1200);
      } else if ((data as any).manusAssisted) {
        toast.info("CI Dashboard is refreshed by Manus", {
          description: "Say \"refresh my CRM data\" in the Manus chat to update this data. Daily refresh runs at 7 AM BRT.",
          duration: 6000,
        });
      } else {
        toast.warning("CI Dashboard could not be reached", {
          description: "Your Meta session may need to be refreshed in the browser.",
        });
      }
    },
    onError: (err) => {
      setIsRefreshing(false);
      toast.error("Refresh failed", { description: err.message });
    },
  });

  const chartData = topicWeeks.map((w) => ({
    week: w.week,
    accountPlanning: w.accountPlanning,
    budgetAndUpselling: w.budgetAndUpselling,
    education: w.education,
    partnershipCheckIn: w.partnershipCheckIn,
    qbr: w.qbr,
    relationshipDevelopment: w.relationshipDevelopment,
    troubleshooting: w.troubleshooting,
  }));

  const bobGoals = clientCIGoals.filter((g) => g.isBoB);
  const pocGoals = clientCIGoals.filter((g) => !g.isBoB);
  const bobGoalsMet = bobGoals.filter((g) => g.validatedCIs >= g.quarterlyGoal).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#F0FDF4" }}>
              <Users size={15} style={{ color: "#059669" }} />
            </div>
            <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              CRM Client Interactions
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {dashboardConfig.unidash.quarter} · Min <strong>{dashboardConfig.unidash.ciMinTarget} validated CIs/quarter</strong> per dedicated client
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw size={11} />
            <span>Unidash: {crmSummary.dataAsOfDate} · CRM: {crmRecordsSummary.dataAsOf}</span>
          </div>
          {/* Live refresh button */}
          <button
            onClick={() => !isRefreshing && refreshCI.mutate()}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
            style={{
              background: isRefreshing ? "#ECFDF5" : "#F0FDF4",
              color: "#059669",
              borderColor: "#A7F3D0",
              cursor: isRefreshing ? "default" : "pointer",
              opacity: isRefreshing ? 0.8 : 1,
            }}
            title={isRefreshing ? "Scraping Unidash CI data..." : "Re-scrape CI data from Unidash"}
          >
            <RefreshCw
              size={11}
              style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }}
            />
            {isRefreshing ? "Scraping..." : "Refresh CI"}
          </button>
          <a href={crmSummary.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-muted" style={{ borderColor: "oklch(0.90 0.008 75)", color: "#059669" }}>
            <ExternalLink size={12} />Unidash
          </a>
          <a href={crmRecordsSummary.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-muted" style={{ borderColor: "oklch(0.90 0.008 75)", color: "#3B82F6" }}>
            <ExternalLink size={12} />Meta CRM
          </a>
        </div>
      </div>

      {/* ── SECTION 1: Per-client goal tracker (HERO) ── */}
      <div className="animate-fade-in-up delay-25">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Quarterly CI Goal Tracker
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {bobGoalsMet} of {bobGoals.length} dedicated clients have met the 3 CI minimum this quarter
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: bobGoalsMet === bobGoals.length ? "#ECFDF5" : "#FEF3C7", color: bobGoalsMet === bobGoals.length ? "#059669" : "#D97706" }}>
            <Target size={11} />
            <span className="font-semibold">{bobGoalsMet}/{bobGoals.length} goals met</span>
          </div>
        </div>

        {/* BoB clients — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {bobGoals.map((goal) => (
            <ClientGoalCard key={goal.clientId} goal={goal} />
          ))}
        </div>

        {pocGoals.length > 0 && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Star size={12} style={{ color: "#7C3AED" }} />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">CS Global POC — Not in BoB</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pocGoals.map((goal) => (
                <ClientGoalCard key={goal.clientId} goal={goal} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Cross-reference banner */}
      <div className="rounded-xl p-3 flex items-start gap-3 animate-fade-in-up delay-50" style={{ background: "#EFF6FF", border: "1px solid #BFDBFE" }}>
        <CheckCircle2 size={14} style={{ color: "#3B82F6", marginTop: 1, flexShrink: 0 }} />
        <div className="text-xs" style={{ color: "#1E40AF" }}>
          <strong>Cross-reference:</strong> Unidash reports <strong>4 Live CIs QTD</strong> (GBG Direct, L2). 
          Meta CRM shows <strong>{crmRecordsSummary.qualifiedCount} qualified interactions</strong> — 
          <strong> {crmRecordsSummary.inPersonCount} in-person</strong>, <strong>{crmRecordsSummary.vcCount} VC</strong>. 
          Top client: <strong>{crmRecordsSummary.topClient || "—"} CIs</strong> leading this quarter.
        </div>
      </div>

      {/* ── SECTION 2: Individual records ── */}
      <div className="metric-card animate-fade-in-up delay-75">
        <div className="section-header">
          <div>
            <h3 className="section-title">Individual Interaction Records</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Source: Meta CRM · Qualified only · Q1 2026</p>
          </div>
          <a href={crmRecordsSummary.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70" style={{ color: "#3B82F6" }}>
            View all in CRM <ChevronRight size={12} />
          </a>
        </div>
        <div className="space-y-2 mt-3">
          {crmRecords.map((record) => (
            <div key={record.id} className="rounded-xl p-3 transition-colors hover:bg-muted/30" style={{ background: "oklch(0.985 0.002 75)", border: "1px solid oklch(0.93 0.004 75)" }}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <ClientBadge client={record.client} />
                    <MethodBadge method={record.contactMethod} />
                    {record.qualified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "#F0FDF4", color: "#059669" }}>
                        <CheckCircle2 size={9} />Qualified
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground truncate" title={record.title}>{record.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{record.organization}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold font-mono-data text-foreground">
                    {new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <p className="text-xs text-muted-foreground">{record.time}</p>
                </div>
              </div>
              {record.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid oklch(0.93 0.004 75)" }}>
                  {record.topics.map((topic) => {
                    const key = Object.entries(topicLabels).find(([, v]) => v === topic)?.[0];
                    const color = key ? topicColors[key] : "#6B7280";
                    return (
                      <span key={topic} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs" style={{ background: `${color}15`, color }}>
                        {topic}
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Users size={10} />
                <span>{record.internalParticipants.join(" · ")}</span>
                {record.contactCount > 0 && (
                  <span className="ml-1 text-muted-foreground/60">· {record.contactCount} client contact{record.contactCount > 1 ? "s" : ""}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: Unidash aggregate charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="metric-card lg:col-span-2 animate-fade-in-up delay-100">
          <div className="section-header">
            <h3 className="section-title">Share of Live Hours by Topic</h3>
            <span className="text-xs text-muted-foreground">Unidash · Q1 2026 · Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 75)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TopicTooltip />} />
              {topicKeys.map((key) => (
                <Bar key={key} dataKey={key} stackId="a" fill={topicColors[key]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
            {topicKeys.map((key) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: topicColors[key] }} />
                <span className="text-xs text-muted-foreground">{topicLabels[key]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="metric-card animate-fade-in-up delay-150">
          <div className="section-header">
            <h3 className="section-title">Avg Live Hours / Client</h3>
            <span className="text-xs text-muted-foreground">Unidash · Weekly</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={avgLiveHoursPerClient} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 75)" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0.8, 1.5]} tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [`${v}h`, "Avg Live Hours"]} contentStyle={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, borderRadius: 8 }} />
              <Line type="monotone" dataKey="hours" stroke="#059669" strokeWidth={2.5} dot={{ fill: "#059669", r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Peak week</span>
              <span className="font-semibold font-mono-data" style={{ color: "#059669" }}>Jan 12 · 1.4h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Latest week</span>
              <span className="font-semibold font-mono-data">Jan 19 · 1.3h</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: Unidash coverage table ── */}
      <div className="metric-card animate-fade-in-up delay-200">
        <div className="section-header">
          <h3 className="section-title">Coverage Deep Dive</h3>
          <span className="text-xs text-muted-foreground">Unidash · L2 · GBG Direct</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.92 0.004 75)" }}>
                {["Territory", "Total Clients", "Live CI QTD", "Msg CI QTD", "Live+Msg CI QTD", "Future CI (EOQ)", "% Outreach", "1+ CI", "4+ CI", "8+ CI", "12+ CI", "In-Person Mtgs", "% to IP Goal", "Pitched w/ BDM", "Qualifying CI/Client"].map((h) => (
                  <th key={h} className="text-left pb-2 pr-4 font-bold text-muted-foreground whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="py-3 pr-4 font-semibold text-foreground whitespace-nowrap">GBG Direct</td>
                <td className="py-3 pr-4 font-mono-data font-bold text-center">{crmCoverage.totalClients}</td>
                <td className="py-3 pr-4 font-mono-data font-bold text-center text-blue-600">{crmCoverage.totalLiveCIQTD}</td>
                <td className="py-3 pr-4 font-mono-data text-center text-muted-foreground">{crmCoverage.totalMessagingCIQTD}</td>
                <td className="py-3 pr-4 font-mono-data font-bold text-center text-blue-600">{crmCoverage.totalLiveAndMessagingCIQTD}</td>
                <td className="py-3 pr-4 font-mono-data text-center text-muted-foreground">{crmCoverage.futureCIScheduledByEOQ}</td>
                <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#ECFDF5", color: "#059669" }}>{crmCoverage.outreachPct}%</span></td>
                <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#EFF6FF", color: "#3B82F6" }}>{crmCoverage.pctClients1PlusCI}%</span></td>
                <td className="py-3 pr-4 font-mono-data text-center text-muted-foreground">{crmCoverage.pctClients4PlusCI}%</td>
                <td className="py-3 pr-4 font-mono-data text-center text-muted-foreground">{crmCoverage.pctClients8PlusCI}%</td>
                <td className="py-3 pr-4 font-mono-data text-center text-muted-foreground">{crmCoverage.pctClients12PlusCI}%</td>
                <td className="py-3 pr-4 font-mono-data text-center">{crmCoverage.inPersonMeetings}</td>
                <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#FEF3C7", color: "#D97706" }}>{crmCoverage.pctToInPersonGoal}%</span></td>
                <td className="py-3 pr-4 font-mono-data text-center">{crmCoverage.pitchedCIsWithBDM}</td>
                <td className="py-3 pr-4 font-mono-data font-bold text-center" style={{ color: "#8B5CF6" }}>{crmCoverage.qualifyingInteractionPerClient}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-xl p-3 flex items-start gap-3" style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}>
          <Target size={14} style={{ color: "#D97706", marginTop: 1, flexShrink: 0 }} />
          <div>
            <p className="text-xs font-bold" style={{ color: "#92400E" }}>In-Person Meetings Gap</p>
            <p className="text-xs mt-0.5" style={{ color: "#78350F" }}>
              Currently at <strong>1 in-person meeting</strong> against a goal of <strong>19</strong> — only <strong>5.3%</strong> to goal. Scheduling more in-person client visits this quarter is a key priority.
            </p>
          </div>
        </div>
      </div>

      {/* Definitions */}
      <div className="rounded-xl p-4 text-xs animate-fade-in-up delay-250" style={{ background: "oklch(0.97 0.003 75)", border: "1px solid oklch(0.92 0.004 75)" }}>
        <p className="font-bold text-foreground/70 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Definitions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-muted-foreground">
          <p><strong className="text-foreground/60">CI</strong> — Client Interaction</p>
          <p><strong className="text-foreground/60">VC</strong> — Video Conference</p>
          <p><strong className="text-foreground/60">BoB</strong> — Book of Business</p>
          <p><strong className="text-foreground/60">BDM</strong> — Budget Decision Maker</p>
          <p><strong className="text-foreground/60">QTD</strong> — Quarter to Date</p>
          <p><strong className="text-foreground/60">EOQ</strong> — End of Quarter</p>
        </div>
      </div>
    </div>
  );
}
