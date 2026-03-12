// Key Dates Section — Timeline of important deadlines, milestones, events
// Design: Warm Structured Intelligence

import { keyDates, clients, formatDate, getDaysUntil } from "@/lib/dashboardData";
import { Calendar, Flag, Zap, Target, Star } from "lucide-react";

const typeConfig: Record<string, { color: string; bg: string; icon: typeof Calendar; label: string }> = {
  Deadline: { color: "#DC2626", bg: "#FEF2F2", icon: Flag, label: "Deadline" },
  Milestone: { color: "#0066CC", bg: "#EBF4FF", icon: Target, label: "Milestone" },
  Event: { color: "#7C3AED", bg: "#F5F3FF", icon: Star, label: "Event" },
  Campaign: { color: "#F59E0B", bg: "#FFFBEB", icon: Zap, label: "Campaign" },
  Internal: { color: "#6B7280", bg: "#F9FAFB", icon: Calendar, label: "Internal" },
  Product: { color: "#059669", bg: "#ECFDF5", icon: Zap, label: "Product" },
};

export default function KeyDatesSection() {
  const sorted = [...keyDates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcoming = sorted.filter((d) => getDaysUntil(d.date) >= 0);
  const past = sorted.filter((d) => getDaysUntil(d.date) < 0);

  const urgentCount = upcoming.filter((d) => getDaysUntil(d.date) <= 14).length;
  const highPriorityCount = upcoming.filter((d) => d.priority === "high").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Key Dates
        </h2>
        <p className="text-sm text-muted-foreground">
          {upcoming.length} upcoming · {urgentCount} within 14 days
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up delay-50">
        {[
          { label: "Upcoming Dates", value: upcoming.length, color: "#0066CC", bg: "#EBF4FF" },
          { label: "Within 14 Days", value: urgentCount, color: "#DC2626", bg: "#FEF2F2" },
          { label: "High Priority", value: highPriorityCount, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "Campaigns", value: upcoming.filter((d) => d.type === "Campaign").length, color: "#7C3AED", bg: "#F5F3FF" },
        ].map((s) => (
          <div key={s.label} className="metric-card text-center">
            <p className="text-2xl font-bold font-mono-data" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline — Upcoming */}
      <div className="animate-fade-in-up delay-100">
        <h3 className="section-title mb-5">Upcoming Timeline</h3>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] top-0 bottom-0 w-0.5"
            style={{ background: "oklch(0.90 0.008 75)" }}
          />

          <div className="space-y-4 pl-10">
            {upcoming.map((date, i) => {
              const client = clients.find((c) => c.id === date.clientId);
              const type = typeConfig[date.type];
              const TypeIcon = type.icon;
              const daysUntil = getDaysUntil(date.date);
              const isUrgent = daysUntil <= 7;
              const isSoon = daysUntil <= 14;

              return (
                <div
                  key={date.id}
                  className={`relative animate-fade-in-up`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[29px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    style={{ background: client ? client.color : type.color }}
                  >
                    <TypeIcon size={10} color="white" />
                  </div>

                  <div
                    className="bg-white rounded-xl border p-4 transition-all duration-200 hover:shadow-md"
                    style={{
                      borderColor: isUrgent ? "#FCA5A5" : isSoon ? "#FDE68A" : "oklch(0.90 0.008 75)",
                      borderLeft: `3px solid ${client ? client.color : type.color}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
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
                            style={{ background: type.bg, color: type.color }}
                          >
                            {type.label}
                          </span>
                          {date.priority === "high" && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#FEF2F2", color: "#DC2626" }}>
                              High Priority
                            </span>
                          )}
                          {isUrgent && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold animate-pulse" style={{ background: "#FEF2F2", color: "#DC2626" }}>
                              🔴 Urgent
                            </span>
                          )}
                        </div>
                        <h4
                          className="text-sm font-bold text-foreground mb-1"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {date.title}
                        </h4>
                        <p className="text-xs text-foreground/70 leading-relaxed">{date.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-base font-bold font-mono-data"
                          style={{ color: isUrgent ? "#DC2626" : isSoon ? "#B45309" : client ? client.color : type.color }}
                        >
                          {daysUntil === 0 ? "Today" : `+${daysUntil}d`}
                        </p>
                        <p className="text-xs text-muted-foreground">{formatDate(date.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Past Dates */}
      {past.length > 0 && (
        <div className="animate-fade-in-up">
          <h3 className="section-title mb-4 text-muted-foreground">Past Dates</h3>
          <div className="space-y-2 opacity-50">
            {past.map((date) => {
              const client = clients.find((c) => c.id === date.clientId);
              const type = typeConfig[date.type];
              return (
                <div
                  key={date.id}
                  className="bg-white rounded-lg border p-3 flex items-center justify-between gap-3"
                  style={{ borderColor: "oklch(0.90 0.008 75)" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {client && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: client.color }} />
                    )}
                    <p className="text-xs text-foreground/70 truncate">{date.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: type.bg, color: type.color }}>
                      {type.label}
                    </span>
                    <p className="text-xs font-mono-data text-muted-foreground">{formatDate(date.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
