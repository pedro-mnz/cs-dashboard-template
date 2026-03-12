// Recommended Solutions Section — Live data from Meta CRM Pipeline Management
// Design: Warm Structured Intelligence
// Source: internalfb.com/crm/pipeline_management | Contributor: Pedro Menezes | Q1 2026

import { useState } from "react";
import { rsPipeline, rsSummary, rsStageConfig, rsStatusConfig, rsClientColors, RSStage } from "@/lib/rsPipelineData";
import { ExternalLink, AlertTriangle, TrendingUp, Filter, RefreshCw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const ALL_STAGES: RSStage[] = ["Scoped", "Pitched", "Committed", "Actioned", "Partially adopted", "Adopted", "Closed - Lost"];
const ALL_CLIENTS = ["magalu", "amazon", "samsung"];

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n}`;
}

export default function SolutionsSection() {
  const [filterClient, setFilterClient] = useState<string>("ALL");
  const [filterStage, setFilterStage] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    const statusMatch =
      filterStatus === "ALL" ||
      (filterStatus === "At Risk" && rs.status === "At Risk") ||
      (filterStatus === "Overdue" && rs.status === "Overdue") ||
      (filterStatus === "Clean" && !rs.status);
    return clientMatch && stageMatch && statusMatch;
  });

  const totalOpportunity = filtered.reduce((s, r) => s + r.opportunitySize, 0);
  const atRiskCount = filtered.filter((r) => r.status === "At Risk" || r.status === "Overdue").length;

  // Stage breakdown for the funnel
  const stageCounts = ALL_STAGES.map((stage) => ({
    stage,
    count: rsPipeline.filter((r) => r.stage === stage).length,
    opp: rsPipeline.filter((r) => r.stage === stage).reduce((s, r) => s + r.opportunitySize, 0),
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
          { label: "At Risk / Overdue", value: String(rsPipeline.filter(r => r.status === "At Risk" || r.status === "Overdue").length), sub: "Need attention", color: "#EF4444", bg: "#FEF2F2" },
        ].map((card) => (
          <div key={card.label} className="metric-card">
            <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif", color: card.color }}>{card.value}</p>
            <p className="text-xs font-semibold text-foreground/80">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

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
                const statusCfg = rs.status ? rsStatusConfig[rs.status] : null;
                return (
                  <tr
                    key={rs.id}
                    className="hover:bg-muted/30 transition-colors"
                    style={{ borderBottom: "1px solid oklch(0.96 0.003 75)" }}
                  >
                    {/* Client */}
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: clientCfg.color }} />
                        <span className="text-xs font-semibold" style={{ color: clientCfg.color }}>{clientCfg.name}</span>
                      </div>
                    </td>
                    {/* Solution name */}
                    <td className="py-3 pr-3 max-w-[200px]">
                      <p className="text-xs font-medium text-foreground truncate" title={rs.name}>{rs.name}</p>
                      <p className="text-xs text-muted-foreground truncate" title={rs.advertiser} style={{ fontSize: "10px" }}>{rs.advertiser.replace(" - Advertiser", "").replace(" LTDA.", "").replace(" S/A", "")}</p>
                    </td>
                    {/* Type */}
                    <td className="py-3 pr-3">
                      <span className="text-xs text-muted-foreground">{rs.solutionType.split("/")[0].trim()}</span>
                    </td>
                    {/* Stage */}
                    <td className="py-3 pr-3">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ background: stageCfg.bg, color: stageCfg.color }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: stageCfg.dot }} />
                        {stageCfg.label}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="py-3 pr-3">
                      {statusCfg ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: statusCfg.bg, color: statusCfg.color }}
                        >
                          <AlertTriangle size={10} />
                          {statusCfg.label}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    {/* Eligible Progress */}
                    <td className="py-3 pr-3">
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-mono-data font-semibold text-foreground/80">{rs.eligibleProgress}%</span>
                        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.93 0.005 75)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(rs.eligibleProgress, 100)}%`,
                              background: rs.eligibleProgress >= 80 ? "#10B981" : rs.eligibleProgress >= 40 ? "#F59E0B" : "#3B82F6",
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    {/* Opportunity size */}
                    <td className="py-3 text-right">
                      <span className="text-xs font-mono-data font-semibold" style={{ color: clientCfg.color }}>{fmt(rs.opportunitySize)}</span>
                    </td>
                  </tr>
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
            Source: Meta CRM Pipeline Management · Last updated: {new Date(rsSummary.dataAsOf + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
