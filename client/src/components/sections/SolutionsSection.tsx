// Recommended Solutions Section — Live data from Meta CRM Pipeline Management
// Design: Warm Structured Intelligence
// Source: internalfb.com/crm/pipeline_management | Contributor: Pedro Menezes | Q1 2026

import { useState, useMemo } from "react";
import { rsPipeline, rsSummary, rsStageConfig, rsStatusConfig, rsClientColors, portfolioARSummary, RSStage } from "@/lib/rsPipelineData";
import { clients } from "@/lib/dashboardData";
import { ExternalLink, AlertTriangle, TrendingUp, Filter, RefreshCw, ChevronDown, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const ALL_STAGES: RSStage[] = ["discovery", "pitching", "scoping", "committed", "actioned", "partial", "adopted", "closed"];
const ALL_CLIENTS = ["magalu", "amazon", "samsung"];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

const VALID_STAGES: string[] = ["discovery", "pitching", "scoping", "committed", "actioned", "partial", "adopted", "closed"];

export default function SolutionsSection({ initialInitiative }: { initialInitiative?: string | null }) {
  // Determine if the initial filter is a stage or an initiative name
  const isStageFilter = initialInitiative ? VALID_STAGES.includes(initialInitiative) : false;
  const [filterClient, setFilterClient] = useState<string>("ALL");
  const [filterStage, setFilterStage] = useState<string>(isStageFilter && initialInitiative ? initialInitiative : "ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterInitiative, setFilterInitiative] = useState<string | null>(!isStageFilter ? (initialInitiative ?? null) : null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const refreshRS = trpc.scraper.refreshRS.useMutation({
    onMutate: () => setIsRefreshing(true),
    onSuccess: (data) => {
      setIsRefreshing(false);
      if (data.success) {
        toast.success("RS Pipeline refreshed", {
          description: `${(data as { solutions?: unknown[] }).solutions?.length ?? 0} solutions scraped from Meta CRM`,
        });
        setTimeout(() => window.location.reload(), 800);
      } else if ((data as any).manusAssisted) {
        toast.info("RS Pipeline is refreshed by Manus", {
          description: "Say \"refresh my RS pipeline\" in the Manus chat to update this data. Daily refresh runs at 7 AM BRT.",
          duration: 6000,
        });
      } else {
        toast.warning("RS refresh incomplete", {
          description: (data as { error?: string }).error ?? "Could not reach Meta CRM",
        });
      }
    },
    onError: (err) => {
      setIsRefreshing(false);
      toast.error("Refresh failed", { description: err.message });
    },
  });

  const filtered = rsPipeline.filter((rs) => {
    const clientMatch = filterClient === "ALL" || rs.client === filterClient;
    const stageMatch = filterStage === "ALL" || rs.stage === filterStage;
    // No status field in new schema — status filter shows all
    const statusMatch = filterStatus === "ALL" || filterStatus === "Clean";
    const initiativeMatch = !filterInitiative || rs.initiative === filterInitiative;
    return clientMatch && stageMatch && statusMatch && initiativeMatch;
  });

  const totalOpportunity = filtered.reduce((s, r) => s + r.oppSize, 0);
  const atRiskCount = 0; // Status field removed in new schema

  // Compute next Monday 8 AM BRT countdown
  const nextRefreshLabel = useMemo(() => {
    const now = new Date();
    const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000);
    const dayOfWeek = brt.getUTCDay(); // 0=Sun, 1=Mon
    const daysUntilMonday = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 7 : 8 - dayOfWeek;
    const nextMonday = new Date(brt);
    nextMonday.setUTCDate(brt.getUTCDate() + daysUntilMonday);
    nextMonday.setUTCHours(8, 0, 0, 0);
    const diffMs = nextMonday.getTime() - brt.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "today at 8 AM";
    if (diffDays === 1) return "tomorrow at 8 AM";
    return `in ${diffDays} days (Mon)`;
  }, []);

  // Build initiative chart data
  const initiativeChartData = useMemo(() => {
    return [...rsPipeline]
      .filter((rs) => filterClient === "ALL" || rs.client === filterClient)
      .reduce((acc, rs) => {
        const existing = acc.find((d) => d.fullName === rs.initiative);
        const clientCfg = rsClientColors[rs.client];
        const clientName = clientCfg?.name ?? rs.client;
        if (existing) {
          existing.headroom += Math.round(rs.arHeadroom / 1000);
          existing.accrued += Math.round(rs.accruedARQTD / 1000);
          existing.count += 1;
          const ec = existing.clientBreakdown.find((c) => c.name === clientName);
          if (ec) ec.headroom += Math.round(rs.arHeadroom / 1000);
          else existing.clientBreakdown.push({ name: clientName, headroom: Math.round(rs.arHeadroom / 1000), color: clientCfg?.color ?? "#6B7280" });
        } else {
          acc.push({
            name: rs.initiative.length > 30 ? rs.initiative.slice(0, 30) + "…" : rs.initiative,
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
  }, [filterClient]);

  // Stage breakdown for the funnel
  const stageCounts = ALL_STAGES.map((stage) => ({
    stage,
    count: rsPipeline.filter((r) => r.stage === stage).length,
    opp: rsPipeline.filter((r) => r.stage === stage).reduce((s, r) => s + r.oppSize, 0),
  })).filter((s) => s.count > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Recommended Solutions
          </h2>
          <p className="text-sm text-muted-foreground">
            {rsSummary.total} active initiatives · {fmt(rsSummary.totalOpportunitySize)} opportunity size · Q1 2026
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => refreshRS.mutate()}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border transition-all duration-150 hover:opacity-80 disabled:opacity-50"
            style={{ color: "#10B981", borderColor: "#10B981", background: isRefreshing ? "#ECFDF5" : "transparent" }}
            title="Refresh RS pipeline from Meta CRM"
          >
            <RefreshCw size={10} className={isRefreshing ? "animate-spin" : ""} />
            {isRefreshing ? "Scraping..." : "Refresh RS"}
          </button>
          <a
            href={rsSummary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#0066CC" }}
          >
            <ExternalLink size={11} />
            Open in CRM
          </a>
        </div>
      </div>

      {/* Portfolio KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in-up delay-50">
        {[
          { label: "Total Initiatives", value: String(rsSummary.total), sub: "Active · Q1 2026", color: "#0066CC", bg: "#EBF4FF" },
          { label: "Opportunity Size", value: fmt(rsSummary.totalOpportunitySize), sub: `${rsSummary.attributedProgress}% attributed`, color: "#10B981", bg: "#ECFDF5" },
          { label: "Eligible Revenue", value: fmt(rsSummary.totalEligibleTargetRevenue), sub: `${rsSummary.eligibleProgress}% progress`, color: "#7C3AED", bg: "#F5F3FF" },
          { label: "Accrued AR QTD", value: fmt(rsPipeline.reduce((s, r) => s + r.accruedARQTD, 0)), sub: "Revenue attributed this quarter", color: "#059669", bg: "#ECFDF5" },
        ].map((card) => (
          <div key={card.label} className="metric-card">
            <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif", color: card.color }}>{card.value}</p>
            <p className="text-xs font-semibold text-foreground/80">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* AR Headroom by Initiative Chart */}
      <div className="metric-card animate-fade-in-up delay-75">
        <div className="section-header">
          <div>
            <h3 className="section-title">AR Headroom by Initiative</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Which initiatives have the most remaining revenue upside · Source: Unidash
            </p>
            <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.12 155)" }}>
              Last refreshed: {portfolioARSummary.dataAsOf} · Next refresh {nextRefreshLabel} · Click a bar to filter
            </p>
          </div>
          <div className="flex gap-2">
            {[{ id: "ALL", label: "All" }, ...clients.map((c) => ({ id: c.id, label: c.shortName, color: c.color }))].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterClient(tab.id)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: filterClient === tab.id
                    ? ((tab as { color?: string }).color ?? "oklch(0.55 0.18 250)")
                    : "oklch(0.96 0.004 75)",
                  color: filterClient === tab.id ? "white" : "oklch(0.45 0.02 75)",
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {initiativeChartData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No initiatives found for this client.</p>
        ) : (
          <ResponsiveContainer width="100%" height={Math.max(initiativeChartData.length * 44, 200)}>
            <BarChart
              data={initiativeChartData}
              layout="vertical"
              margin={{ top: 4, right: 60, left: 8, bottom: 0 }}
              onClick={(data) => {
                if (data?.activePayload?.[0]?.payload?.fullName) {
                  setFilterInitiative(data.activePayload[0].payload.fullName);
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
                width={210}
              />
              <Tooltip
                formatter={(value: number, name: unknown) => [
                  `$${(value as number).toLocaleString()}K`,
                  name === "headroom" ? "AR Headroom" : "Accrued QTD",
                ]}
                labelFormatter={(label: unknown, payload: unknown[]) => {
                  const first = (payload as Array<{ payload: { fullName: string; count: number; clientBreakdown: Array<{ name: string; headroom: number }> } }>)?.[0]?.payload;
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

      {/* Active initiative filter banner */}
      {filterInitiative && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium animate-fade-in-up" style={{ background: "#EBF4FF", color: "#0066CC", border: "1px solid #BFDBFE" }}>
          <span>Filtered by initiative:</span>
          <span className="font-semibold truncate max-w-[300px]" title={filterInitiative}>{filterInitiative}</span>
          <button
            onClick={() => setFilterInitiative(null)}
            className="ml-auto text-xs hover:opacity-70 font-bold"
            style={{ color: "#0066CC" }}
          >✕ Clear</button>
        </div>
      )}

      {/* Stage Pipeline Funnel */}
      <div className="metric-card animate-fade-in-up delay-100">
        <div className="section-header mb-3">
          <h3 className="section-title">Pipeline by Stage</h3>
          <span className="text-xs text-muted-foreground">Click to filter</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {stageCounts.map((s) => {
            const cfg = rsStageConfig[s.stage as RSStage];
            const isActive = filterStage === s.stage;
            return (
              <button
                key={s.stage}
                onClick={() => setFilterStage(isActive ? "ALL" : s.stage)}
                className="flex flex-col items-center p-3 rounded-xl border transition-all duration-150 min-w-[90px]"
                style={{
                  background: isActive ? cfg.bg : "transparent",
                  borderColor: isActive ? cfg.color : "oklch(0.90 0.008 75)",
                }}
              >
                <span className="text-lg font-bold" style={{ fontFamily: "'Montserrat', sans-serif", color: cfg.color }}>{s.count}</span>
                <span className="text-xs font-medium mt-0.5" style={{ color: cfg.color }}>{cfg.label}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{fmt(s.opp)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center animate-fade-in-up delay-150">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Filter size={12} />
          <span>Filter:</span>
        </div>
        {/* Client filter */}
        <div className="flex gap-1.5">
          {["ALL", ...ALL_CLIENTS].map((c) => {
            const cfg = c !== "ALL" ? rsClientColors[c] : null;
            return (
              <button
                key={c}
                onClick={() => setFilterClient(c)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
                style={{
                  background: filterClient === c ? (cfg?.color || "#0066CC") : "transparent",
                  color: filterClient === c ? "white" : (cfg?.color || "oklch(0.5 0.01 75)"),
                  borderColor: cfg?.color || "oklch(0.88 0.008 75)",
                }}
              >
                {c === "ALL" ? "All Clients" : cfg?.name}
              </button>
            );
          })}
        </div>
        {/* Status filter */}
        <div className="flex gap-1.5">
          {["ALL", "At Risk", "Overdue", "Clean"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-3 py-1 rounded-full text-xs font-medium border transition-all"
              style={{
                background: filterStatus === s ? (s === "At Risk" ? "#F59E0B" : s === "Overdue" ? "#EF4444" : s === "Clean" ? "#10B981" : "#0066CC") : "transparent",
                color: filterStatus === s ? "white" : "oklch(0.5 0.01 75)",
                borderColor: s === "At Risk" ? "#F59E0B" : s === "Overdue" ? "#EF4444" : s === "Clean" ? "#10B981" : "oklch(0.88 0.008 75)",
              }}
            >
              {s === "ALL" ? "All Status" : s}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          Showing {filtered.length} of {rsPipeline.length} · {fmt(totalOpportunity)} opp. size
          {atRiskCount > 0 && <span className="ml-2 text-amber-600 font-semibold">⚠ {atRiskCount} need attention</span>}
        </span>
      </div>

      {/* Solutions Table */}
      <div className="metric-card animate-fade-in-up delay-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(0.92 0.004 75)" }}>
                <th className="text-left pb-3 text-xs font-semibold text-muted-foreground pr-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>Client</th>
                <th className="text-left pb-3 text-xs font-semibold text-muted-foreground pr-3">Solution</th>
                <th className="text-left pb-3 text-xs font-semibold text-muted-foreground pr-3">Type</th>
                <th className="text-left pb-3 text-xs font-semibold text-muted-foreground pr-3">Stage</th>
                <th className="text-left pb-3 text-xs font-semibold text-muted-foreground pr-3">Status</th>
                <th className="text-right pb-3 text-xs font-semibold text-muted-foreground pr-3">Eligible Progress</th>
                <th className="text-right pb-3 text-xs font-semibold text-muted-foreground">Opportunity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rs) => {
                const clientCfg = rsClientColors[rs.client];
                const stageCfg = rsStageConfig[rs.stage];
                const statusCfg = null; // Status field removed in new schema
                const isExpanded = expandedRow === rs.id;
                return (
                  <>
                  <tr
                    key={rs.id}
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    style={{ borderBottom: isExpanded ? "none" : "1px solid oklch(0.96 0.003 75)" }}
                    onClick={() => setExpandedRow(isExpanded ? null : rs.id)}
                  >
                    {/* Client */}
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-1.5">
                        {rs.stageHistory && rs.stageHistory.length > 0 ? (
                          isExpanded ? <ChevronDown size={10} className="text-muted-foreground flex-shrink-0" /> : <ChevronRight size={10} className="text-muted-foreground flex-shrink-0" />
                        ) : <span className="w-2.5" />}
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: clientCfg.color }} />
                        <span className="text-xs font-semibold" style={{ color: clientCfg.color }}>{clientCfg.name}</span>
                      </div>
                    </td>
                    {/* Solution name */}
                    <td className="py-3 pr-3 max-w-[200px]">
                      <p className="text-xs font-medium text-foreground truncate" title={rs.initiative}>{rs.initiative}</p>
                      <p className="text-xs text-muted-foreground truncate" title={rs.clientName} style={{ fontSize: "10px" }}>{rs.clientName.replace(" - Advertiser", "").replace(" LTDA.", "").replace(" S/A", "")}</p>
                    </td>
                    {/* Type */}
                    <td className="py-3 pr-3">
                      <span className="text-xs text-muted-foreground">{rs.type}</span>
                    </td>
                    {/* Stage */}
                    <td className="py-3 pr-3">
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: stageCfg.bg, color: stageCfg.color }}
                        >
                          {stageCfg.label}
                        </span>
                        {rs.stageHistory && rs.stageHistory.length > 0 && (() => {
                          const lastEntry = rs.stageHistory[rs.stageHistory.length - 1];
                          const daysSince = Math.floor((Date.now() - new Date(lastEntry.date).getTime()) / 86400000);
                          const urgencyColor = daysSince > 30 ? "#DC2626" : daysSince > 14 ? "#D97706" : "oklch(0.55 0.01 75)";
                          return (
                            <span style={{ color: urgencyColor, fontSize: "9px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, paddingLeft: "2px" }}>
                              {daysSince}d in stage
                            </span>
                          );
                        })()}
                      </div>
                    </td>
                    {/* Vertical */}
                    <td className="py-3 pr-3">
                      <span className="text-xs text-muted-foreground">{rs.vertical}</span>
                    </td>
                    {/* AR Headroom Progress */}
                    <td className="py-3 pr-3">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-mono-data font-semibold text-foreground/80">{fmt(rs.arHeadroom)}</span>
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.93 0.005 75)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(Math.max(rs.oppSize > 0 ? Math.round((rs.arHeadroom / rs.oppSize) * 100) : 0, 0), 100)}%`,
                              background: rs.arHeadroom <= 0 ? "#059669" : rs.arHeadroom < rs.oppSize * 0.3 ? "#10B981" : "#3B82F6",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    {/* Opp size */}
                    <td className="py-3 text-right">
                      <span className="text-xs font-mono-data font-semibold" style={{ color: clientCfg.color }}>{fmt(rs.oppSize)}</span>
                    </td>
                  </tr>
                  {/* Stage-transition log expansion row */}
                  {isExpanded && rs.stageHistory && rs.stageHistory.length > 0 && (
                    <tr style={{ borderBottom: "1px solid oklch(0.96 0.003 75)" }}>
                      <td colSpan={7} className="pb-3 pt-1 px-2">
                        <div className="flex items-center gap-0 ml-6 flex-wrap">
                          {rs.stageHistory.map((t, idx) => {
                            const cfg = rsStageConfig[t.stage];
                            const isLast = idx === rs.stageHistory!.length - 1;
                            return (
                              <div key={idx} className="flex items-center gap-0">
                                <div
                                  className="flex flex-col items-center px-2 py-1 rounded-lg"
                                  style={{ background: cfg.bg }}
                                  title={t.note ?? cfg.label}
                                >
                                  <span className="text-xs font-semibold" style={{ color: cfg.color, fontFamily: "'Montserrat', sans-serif" }}>{cfg.label}</span>
                                  <span className="text-xs" style={{ color: "oklch(0.55 0.01 75)", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace" }}>{t.date}</span>
                                  {t.note && <span className="text-xs text-muted-foreground" style={{ fontSize: "9px", maxWidth: 80, textAlign: "center", lineHeight: 1.2 }}>{t.note}</span>}
                                </div>
                                {!isLast && (
                                  <div className="w-4 h-px" style={{ background: "oklch(0.85 0.01 75)" }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No solutions match the current filters.
          </div>
        )}

        <div className="mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: "oklch(0.92 0.004 75)" }}>
          <p className="text-xs text-muted-foreground">
            Source: Meta CRM Pipeline Management · Last updated: Mar 13, 2026
          </p>
          <a
            href={rsSummary.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium hover:opacity-70"
            style={{ color: "#0066CC" }}
          >
            <ExternalLink size={10} />
            View all in CRM
          </a>
        </div>
      </div>
    </div>
  );
}
