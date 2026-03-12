// CRM Interactions Section — Meta CRM client interactions log
// Design: Warm Structured Intelligence

import { useState } from "react";
import { clientInteractions, clients, formatDate } from "@/lib/dashboardData";
import { MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";

const outcomeConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle }> = {
  Positive: { color: "#059669", bg: "#ECFDF5", icon: CheckCircle },
  "On Track": { color: "#0066CC", bg: "#EBF4FF", icon: CheckCircle },
  Pending: { color: "#F59E0B", bg: "#FFFBEB", icon: Clock },
  Negative: { color: "#DC2626", bg: "#FEF2F2", icon: AlertCircle },
};

const interactionTypeColors: Record<string, { color: string; bg: string }> = {
  "Creative Workshop": { color: "#7C3AED", bg: "#F5F3FF" },
  "Strategy Call": { color: "#0066CC", bg: "#EBF4FF" },
  Pitch: { color: "#F59E0B", bg: "#FFFBEB" },
  "Creative Sprint": { color: "#DC2626", bg: "#FEF2F2" },
  Workshop: { color: "#059669", bg: "#ECFDF5" },
  "Creative Review": { color: "#8B5CF6", bg: "#EDE9FE" },
};

export default function InteractionsSection() {
  const [filterClient, setFilterClient] = useState<string>("ALL");

  const filtered = clientInteractions.filter(
    (ci) => filterClient === "ALL" || ci.clientId === filterClient
  );

  const sorted = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Client Interactions
        </h2>
        <p className="text-sm text-muted-foreground">Meta CRM · Q1 2026 · {clientInteractions.length} interactions logged</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up delay-50">
        {[
          { label: "Total Interactions", value: clientInteractions.length, color: "#0066CC", bg: "#EBF4FF" },
          { label: "Positive Outcomes", value: clientInteractions.filter((ci) => ci.outcome === "Positive").length, color: "#059669", bg: "#ECFDF5" },
          { label: "Pending Follow-ups", value: clientInteractions.filter((ci) => ci.outcome === "Pending").length, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "On Track", value: clientInteractions.filter((ci) => ci.outcome === "On Track").length, color: "#6366F1", bg: "#EEF2FF" },
        ].map((s) => (
          <div key={s.label} className="metric-card text-center" style={{ borderTop: `3px solid ${s.color}` }}>
            <p className="text-2xl font-bold font-mono-data" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Client Filter */}
      <div className="flex gap-2 flex-wrap animate-fade-in-up delay-100">
        <button
          onClick={() => setFilterClient("ALL")}
          className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
          style={{
            background: filterClient === "ALL" ? "oklch(0.28 0.07 250)" : "transparent",
            color: filterClient === "ALL" ? "white" : "oklch(0.52 0.012 240)",
            borderColor: filterClient === "ALL" ? "oklch(0.28 0.07 250)" : "oklch(0.90 0.008 75)",
          }}
        >
          All Clients
        </button>
        {clients.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterClient(filterClient === c.id ? "ALL" : c.id)}
            className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
            style={{
              background: filterClient === c.id ? c.color : "transparent",
              color: filterClient === c.id ? "white" : c.color,
              borderColor: `${c.color}60`,
            }}
          >
            {c.shortName}
          </button>
        ))}
      </div>

      {/* Interaction Cards */}
      <div className="space-y-4">
        {sorted.map((interaction, i) => {
          const client = clients.find((c) => c.id === interaction.clientId);
          const outcome = outcomeConfig[interaction.outcome] || outcomeConfig["Pending"];
          const typeStyle = interactionTypeColors[interaction.type] || { color: "#6B7280", bg: "#F9FAFB" };
          const OutcomeIcon = outcome.icon;

          return (
            <div
              key={interaction.id}
              className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md animate-fade-in-up`}
              style={{
                borderColor: `${client?.color}30`,
                animationDelay: `${i * 60}ms`,
                borderLeft: `4px solid ${client?.color}`,
              }}
            >
              <div className="p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      {client && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: client.lightColor, color: client.color }}
                        >
                          {client.shortName}
                        </span>
                      )}
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: typeStyle.bg, color: typeStyle.color }}
                      >
                        {interaction.type}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                        style={{ background: outcome.bg, color: outcome.color }}
                      >
                        <OutcomeIcon size={10} />
                        {interaction.outcome}
                      </span>
                    </div>
                    <h3
                      className="text-sm font-bold text-foreground leading-tight"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {interaction.title}
                    </h3>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-foreground/70">{formatDate(interaction.date)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{interaction.owner}</p>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-foreground/70 leading-relaxed mb-3">{interaction.summary}</p>

                {/* Next Action */}
                <div
                  className="flex items-start gap-2 p-2.5 rounded-lg"
                  style={{ background: "oklch(0.97 0.003 75)" }}
                >
                  <Clock size={12} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 mb-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Next Action
                    </p>
                    <p className="text-xs text-foreground/80">{interaction.nextAction}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
