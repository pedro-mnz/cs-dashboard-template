// CRMInteractionsSection.tsx
// Sources:
//   1. Meta DCMP Unidash: internalfb.com/unidash/dashboard/engagement_management_process_dashboard/dcmp_client_interaction_insights/
//   2. Meta CRM Records: internalfb.com/crm/client_interactions (filtered to CS, Pedro Menezes)
//
// Period-aware: Q1 / Q2 / H1 toggle via PeriodContext
// Q1 2026: 3 BoB clients (Magalu 4, Amazon 4, Samsung 3) — 11 CS CIs, 3/3 at goal ✅
// Q2 2026: 4 BoB clients (+ L'Oréal) — 5 CS CIs so far, 1/4 at goal
// H1 2026: Side-by-side Q1 vs Q2 comparison

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
  Target,
  CheckCircle2,
  Video,
  MapPin,
  ChevronRight,
  Star,
  AlertCircle,
  Info,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { usePeriod } from "@/contexts/PeriodContext";
import { dashboardConfig } from "@/lib/dashboard.config";

const topicKeys = Object.keys(topicLabels) as (keyof typeof topicLabels)[];

// Custom stacked bar tooltip
const TopicTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-xl shadow-lg p-3 text-xs" style={{ background: "white", border: "1px solid #E5E7EB", fontFamily: "'Montserrat', sans-serif", minWidth: 180 }}>
      <p className="font-bold mb-2 text-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: p.fill }} />
            <span className="text-muted-foreground">{topicLabels[p.dataKey as keyof typeof topicLabels]}</span>
          </div>
          <span className="font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

// Contact method badge
const MethodBadge = ({ method }: { method: string }) => {
  const isInPerson = method === "In-Person Meeting";
  const isPhone = method === "Phone Meeting";
  const isMsg = method === "Messaging";
  const bg = isInPerson ? "#ECFDF5" : isPhone ? "#F3F0FF" : isMsg ? "#FEF3C7" : "#EFF6FF";
  const color = isInPerson ? "#059669" : isPhone ? "#7C3AED" : isMsg ? "#D97706" : "#3B82F6";
  const Icon = isInPerson ? MapPin : isPhone ? Phone : isMsg ? MessageSquare : Video;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: bg, color }}>
      <Icon size={10} />
      {method}
    </span>
  );
};

// Client badge
const ClientBadge = ({ clientId }: { clientId: string }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: `${clientColors[clientId] || "#6B7280"}18`, color: clientColors[clientId] || "#6B7280" }}>
    {clientLabels[clientId] || clientId}
  </span>
);

// Per-client goal card (period-aware)
const ClientGoalCard = ({ goal, quarter }: { goal: ClientCIGoal; quarter: "Q1" | "Q2" }) => {
  const count = quarter === "Q1" ? goal.validatedCIsQ1 : goal.validatedCIsQ2;
  const isActive = quarter === "Q1" ? goal.inQ1 : goal.inQ2;

  if (!isActive) {
    return (
      <div className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: "#F9FAFB", border: "1.5px dashed #E5E7EB" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style={{ background: goal.color }}>
            {goal.label.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-400" style={{ fontFamily: "'Montserrat', sans-serif" }}>{goal.label}</p>
            <p className="text-xs text-gray-400">Not in BoB this quarter</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 italic">{goal.bobNote}</p>
      </div>
    );
  }

  const pct = Math.min(100, Math.round((count / goal.quarterlyGoal) * 100));
  const isGoalMet = count >= goal.quarterlyGoal;
  const statusLabel = isGoalMet ? "Goal Met ✓" : count > 0 ? "In Progress" : "Not Started";
  const statusBg = isGoalMet ? "#ECFDF5" : count > 0 ? "#FEF3C7" : "#FEF2F2";
  const statusColor = isGoalMet ? "#059669" : count > 0 ? "#D97706" : "#DC2626";
  const barColor = isGoalMet ? "#059669" : count > 0 ? "#F59E0B" : "#EF4444";

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: "white",
        border: `1.5px solid ${isGoalMet ? "#BBF7D0" : count > 0 ? "#FDE68A" : "#FECACA"}`,
        boxShadow: "0 1px 6px 0 rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style={{ background: goal.color }}>
            {goal.label.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{goal.label}</p>
            <p className="text-xs text-muted-foreground">Dedicated BoB</p>
          </div>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: statusBg, color: statusColor }}>
          {statusLabel}
        </span>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-bold" style={{ color: goal.color, lineHeight: 1, fontFamily: "'JetBrains Mono', monospace" }}>{count}</span>
        <span className="text-sm text-muted-foreground mb-0.5">/ {goal.quarterlyGoal} CIs</span>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">{quarter} 2026 progress</span>
          <span className="font-semibold" style={{ color: goal.color, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: barColor }} />
        </div>
        {!isGoalMet && count > 0 && (
          <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#D97706" }}>
            <AlertCircle size={10} />
            {goal.quarterlyGoal - count} more CI{goal.quarterlyGoal - count > 1 ? "s" : ""} needed by EOQ
          </p>
        )}
        {!isGoalMet && count === 0 && (
          <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#DC2626" }}>
            <AlertCircle size={10} />
            No CIs logged yet this quarter
          </p>
        )}
        {isGoalMet && (
          <p className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#059669" }}>
            <CheckCircle2 size={10} />
            Minimum quarterly goal achieved
          </p>
        )}
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: goal.quarterlyGoal }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{
              background: i < count ? goal.color : "#F3F4F6",
              color: i < count ? "white" : "#9CA3AF",
            }}
          >
            {i < count ? "✓" : "·"}
          </div>
        ))}
      </div>
    </div>
  );
};

// H1 side-by-side comparison card
const H1ComparisonCard = ({ goal }: { goal: ClientCIGoal }) => {
  const q1Count = goal.validatedCIsQ1;
  const q2Count = goal.validatedCIsQ2;
  const h1Total = q1Count + q2Count;
  const h1Goal = goal.inQ1 && goal.inQ2 ? goal.quarterlyGoal * 2 : goal.quarterlyGoal;
  const h1Pct = Math.min(100, Math.round((h1Total / h1Goal) * 100));

  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: "white", border: "1.5px solid #E5E7EB", boxShadow: "0 1px 6px 0 rgba(0,0,0,0.04)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white" style={{ background: goal.color }}>
            {goal.label.slice(0, 2).toUpperCase()}
          </div>
          <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{goal.label}</p>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#EFF6FF", color: "#3B82F6" }}>
          H1: {h1Total}/{h1Goal}
        </span>
      </div>

      {/* Q1 vs Q2 bars */}
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-muted-foreground">Q1 2026</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: goal.inQ1 ? goal.color : "#9CA3AF" }}>
              {goal.inQ1 ? `${q1Count}/${goal.quarterlyGoal}` : "N/A"}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
            <div className="h-full rounded-full" style={{ width: goal.inQ1 ? `${Math.min(100, Math.round((q1Count / goal.quarterlyGoal) * 100))}%` : "0%", background: goal.inQ1 && q1Count >= goal.quarterlyGoal ? "#059669" : goal.color }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-muted-foreground">Q2 2026</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: goal.inQ2 ? goal.color : "#9CA3AF" }}>
              {goal.inQ2 ? `${q2Count}/${goal.quarterlyGoal}` : "N/A"}
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
            <div className="h-full rounded-full" style={{ width: goal.inQ2 ? `${Math.min(100, Math.round((q2Count / goal.quarterlyGoal) * 100))}%` : "0%", background: goal.inQ2 && q2Count >= goal.quarterlyGoal ? "#059669" : "#F59E0B" }} />
          </div>
        </div>
      </div>

      {/* H1 total bar */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="font-bold text-foreground">H1 Total</span>
          <span className="font-bold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#3B82F6" }}>{h1Pct}%</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#EFF6FF" }}>
          <div className="h-full rounded-full" style={{ width: `${h1Pct}%`, background: h1Total >= h1Goal ? "#059669" : "#3B82F6" }} />
        </div>
      </div>
    </div>
  );
};

export default function CRMInteractionsSection() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { period, isQ1, isQ2, isH1, periodLabel } = usePeriod();

  const refreshCI = trpc.scraper.refreshCI.useMutation({
    onMutate: () => setIsRefreshing(true),
    onSuccess: (data) => {
      setIsRefreshing(false);
      if (data.success) {
        toast.success("CI Dashboard refreshed", { description: "Scraped latest data from Unidash. Reloading..." });
        setTimeout(() => window.location.reload(), 1200);
      } else if ((data as any).manusAssisted) {
        toast.info("CI Dashboard is refreshed by Manus", {
          description: "Say \"refresh my CRM data\" in the Manus chat to update this data. Daily refresh runs at 7 AM BRT.",
          duration: 6000,
        });
      } else {
        toast.warning("CI Dashboard could not be reached", { description: "Your Meta session may need to be refreshed." });
      }
    },
    onError: (err) => {
      setIsRefreshing(false);
      toast.error("Refresh failed", { description: err.message });
    },
  });

  // Period-filtered records
  const quarterLabel = isQ1 ? "Q1 2026" : "Q2 2026";
  const filteredRecords = isH1
    ? crmRecords.filter((r) => r.qualified)
    : crmRecords.filter((r) => r.qualified && r.quarter === quarterLabel);

  // Period-filtered goals
  const activeGoals = isQ1
    ? clientCIGoals.filter((g) => g.inQ1)
    : isQ2
    ? clientCIGoals.filter((g) => g.inQ2)
    : clientCIGoals; // H1: all

  const bobGoals = activeGoals.filter((g) => g.isBoB);
  const bobGoalsMet = isH1
    ? bobGoals.filter((g) => (g.validatedCIsQ1 + g.validatedCIsQ2) >= g.quarterlyGoal * (g.inQ1 && g.inQ2 ? 1 : 1)).length
    : bobGoals.filter((g) => (isQ1 ? g.validatedCIsQ1 : g.validatedCIsQ2) >= g.quarterlyGoal).length;

  // Summary stats for the current period
  const totalCIsForPeriod = isH1
    ? crmRecordsSummary.qualifiedCount
    : isQ1
    ? crmRecordsSummary.qualifiedQ1
    : crmRecordsSummary.qualifiedQ2;

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
            <strong>{periodLabel}</strong> · CS-only validated CIs · Min <strong>{dashboardConfig.unidash.ciMinTarget} CIs/quarter</strong> per dedicated client
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw size={11} />
            <span>CRM: {crmRecordsSummary.dataAsOf}</span>
          </div>
          <button
            onClick={() => !isRefreshing && refreshCI.mutate()}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
            style={{ background: isRefreshing ? "#ECFDF5" : "#F0FDF4", color: "#059669", borderColor: "#A7F3D0", cursor: isRefreshing ? "default" : "pointer", opacity: isRefreshing ? 0.8 : 1 }}
          >
            <RefreshCw size={11} style={{ animation: isRefreshing ? "spin 0.8s linear infinite" : "none" }} />
            {isRefreshing ? "Scraping..." : "Refresh CI"}
          </button>
          <a href={crmSummary.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-muted" style={{ borderColor: "#E5E7EB", color: "#059669" }}>
            <ExternalLink size={12} />Unidash
          </a>
          <a href={crmRecordsSummary.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-muted" style={{ borderColor: "#E5E7EB", color: "#3B82F6" }}>
            <ExternalLink size={12} />Meta CRM
          </a>
        </div>
      </div>

      {/* ── H1 SIDE-BY-SIDE VIEW ── */}
      {isH1 && (
        <div className="animate-fade-in-up">
          {/* H1 summary banner */}
          <div className="rounded-xl p-4 mb-4 flex items-center justify-between gap-4 flex-wrap" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)", border: "1px solid #BFDBFE" }}>
            <div>
              <p className="text-sm font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>H1 2026 — CS CI Summary</p>
              <p className="text-xs text-muted-foreground mt-0.5">Q1 (Jan–Mar) + Q2 (Apr–Jun) · CS-only validated interactions</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#059669", fontFamily: "'JetBrains Mono', monospace" }}>{crmRecordsSummary.qualifiedQ1}</p>
                <p className="text-xs text-muted-foreground">Q1 CIs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#F59E0B", fontFamily: "'JetBrains Mono', monospace" }}>{crmRecordsSummary.qualifiedQ2}</p>
                <p className="text-xs text-muted-foreground">Q2 CIs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold" style={{ color: "#3B82F6", fontFamily: "'JetBrains Mono', monospace" }}>{crmRecordsSummary.qualifiedCount}</p>
                <p className="text-xs text-muted-foreground">H1 Total</p>
              </div>
            </div>
          </div>

          {/* H1 per-client comparison grid */}
          <h3 className="text-base font-bold text-foreground mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Per-Client H1 Comparison
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientCIGoals.map((goal) => (
              <H1ComparisonCard key={goal.clientId} goal={goal} />
            ))}
          </div>
        </div>
      )}

      {/* ── Q1 / Q2 GOAL TRACKER ── */}
      {!isH1 && (
        <div className="animate-fade-in-up delay-25">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {periodLabel} CI Goal Tracker
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {totalCIsForPeriod} CS validated CIs · {bobGoalsMet} of {bobGoals.length} dedicated clients at goal
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: bobGoalsMet === bobGoals.length ? "#ECFDF5" : "#FEF3C7", color: bobGoalsMet === bobGoals.length ? "#059669" : "#D97706" }}>
              <Target size={11} />
              <span className="font-semibold">{bobGoalsMet}/{bobGoals.length} goals met</span>
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-4 mb-4 ${bobGoals.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"}`}>
            {bobGoals.map((goal) => (
              <ClientGoalCard key={goal.clientId} goal={goal} quarter={isQ1 ? "Q1" : "Q2"} />
            ))}
          </div>
        </div>
      )}

      {/* ── INDIVIDUAL RECORDS ── */}
      <div className="metric-card animate-fade-in-up delay-75">
        <div className="section-header">
          <div>
            <h3 className="section-title">Individual Interaction Records</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Source: Meta CRM · CS-only validated · {periodLabel}
              {isH1 && <span className="ml-1 text-blue-500 font-medium">({crmRecordsSummary.qualifiedQ1} Q1 + {crmRecordsSummary.qualifiedQ2} Q2)</span>}
            </p>
          </div>
          <a href={crmRecordsSummary.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-70" style={{ color: "#3B82F6" }}>
            View all in CRM <ChevronRight size={12} />
          </a>
        </div>
        <div className="space-y-2 mt-3">
          {filteredRecords.length === 0 ? (
            <div className="rounded-xl p-6 text-center text-sm text-muted-foreground" style={{ background: "#F9FAFB", border: "1px dashed #E5E7EB" }}>
              No CS validated CIs recorded for {periodLabel} yet.
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div key={record.id} className="rounded-xl p-3 transition-colors hover:bg-muted/30" style={{ background: "#FAFAFA", border: "1px solid #F3F4F6" }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <ClientBadge clientId={record.clientId} />
                      <MethodBadge method={record.contactMethod} />
                      {isH1 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: record.quarter === "Q1 2026" ? "#F0FDF4" : "#FEF3C7", color: record.quarter === "Q1 2026" ? "#059669" : "#D97706" }}>
                          {record.quarter === "Q1 2026" ? "Q1" : "Q2"}
                        </span>
                      )}
                      {record.qualified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "#F0FDF4", color: "#059669" }}>
                          <CheckCircle2 size={9} />Qualified
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-foreground truncate" title={record.title}>{record.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{record.owner} · CS</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── TOPIC CHART (Q2 / H1 shows combined; Q1 shows Q1 data) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="metric-card lg:col-span-2 animate-fade-in-up delay-100">
          <div className="section-header">
            <h3 className="section-title">CIs by Topic — {periodLabel}</h3>
            <span className="text-xs text-muted-foreground">Weekly breakdown</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topicWeeks} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<TopicTooltip />} />
              {topicKeys.map((key) => (
                <Bar key={key} dataKey={key} stackId="a" fill={topicColors[key]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t" style={{ borderColor: "#F3F4F6" }}>
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
            <span className="text-xs text-muted-foreground">Weekly</span>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="text-center py-4">
              <p className="text-4xl font-bold" style={{ color: "#059669", fontFamily: "'JetBrains Mono', monospace" }}>
                {typeof avgLiveHoursPerClient === "number" ? `${avgLiveHoursPerClient}h` : "1.5h"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">avg per client · {periodLabel}</p>
            </div>
            <div className="space-y-2 pt-2 border-t" style={{ borderColor: "#F3F4F6" }}>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Q1 total CIs</span>
                <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#059669" }}>{crmRecordsSummary.qualifiedQ1}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Q2 total CIs</span>
                <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F59E0B" }}>{crmRecordsSummary.qualifiedQ2}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">In-person</span>
                <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmRecordsSummary.inPersonCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">VC</span>
                <span className="font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmRecordsSummary.vcCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COVERAGE TABLE (Q2 view) ── */}
      {!isQ1 && (
        <div className="metric-card animate-fade-in-up delay-200">
          <div className="section-header">
            <h3 className="section-title">Coverage Deep Dive</h3>
            <span className="text-xs text-muted-foreground">Unidash · L2 · GBG Direct · {isH1 ? "H1 2026" : "Q2 2026"}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                  {["Territory", "Total Clients", "Live CI QTD", "Msg CI QTD", "Live+Msg CI QTD", "Future CI (EOQ)", "% Outreach", "1+ CI", "3+ CI", "In-Person Mtgs", "% to IP Goal", "Qualifying CI/Client"].map((h) => (
                    <th key={h} className="text-left pb-2 pr-4 font-bold text-muted-foreground whitespace-nowrap" style={{ fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/20 transition-colors">
                  <td className="py-3 pr-4 font-semibold text-foreground whitespace-nowrap">GBG Direct</td>
                  <td className="py-3 pr-4 font-bold text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.totalClients}</td>
                  <td className="py-3 pr-4 font-bold text-center text-blue-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.totalLiveCIQTD}</td>
                  <td className="py-3 pr-4 text-center text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.totalMessagingCIQTD}</td>
                  <td className="py-3 pr-4 font-bold text-center text-blue-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.totalLiveAndMessagingCIQTD}</td>
                  <td className="py-3 pr-4 text-center text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.futureCIScheduledByEOQ}</td>
                  <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#ECFDF5", color: "#059669" }}>{crmCoverage.outreachPct}%</span></td>
                  <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#EFF6FF", color: "#3B82F6" }}>{crmCoverage.pctClients1PlusCI}%</span></td>
                  <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#FEF3C7", color: "#D97706" }}>{crmCoverage.pctClients3PlusCI}%</span></td>
                  <td className="py-3 pr-4 text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.inPersonMeetings}</td>
                  <td className="py-3 pr-4 text-center"><span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#FEF3C7", color: "#D97706" }}>{crmCoverage.pctToInPersonGoal}%</span></td>
                  <td className="py-3 pr-4 font-bold text-center" style={{ color: "#8B5CF6", fontFamily: "'JetBrains Mono', monospace" }}>{crmCoverage.qualifyingInteractionPerClient}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Definitions */}
      <div className="rounded-xl p-4 text-xs animate-fade-in-up delay-250" style={{ background: "#FAFAFA", border: "1px solid #F3F4F6" }}>
        <p className="font-bold text-foreground/70 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Definitions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-muted-foreground">
          <p><strong className="text-foreground/60">CI</strong> — Client Interaction (CS-validated)</p>
          <p><strong className="text-foreground/60">VC</strong> — Video Conference</p>
          <p><strong className="text-foreground/60">BoB</strong> — Book of Business</p>
          <p><strong className="text-foreground/60">QTD</strong> — Quarter to Date</p>
          <p><strong className="text-foreground/60">EOQ</strong> — End of Quarter</p>
          <p><strong className="text-foreground/60">H1</strong> — First Half (Q1 + Q2)</p>
        </div>
      </div>
    </div>
  );
}
