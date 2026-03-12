// Meetings Section — Upcoming meetings with client color coding
// Design: Warm Structured Intelligence
// Data source: weeklyMeetingsData.ts (single source of truth for all calendar data)

import { adaptMeetingsForSection, type MeetingRecord } from "@/lib/weeklyMeetingsData";
import { clients, formatDate, getDaysUntil } from "@/lib/dashboardData";
import { Calendar, Clock, Users, Video } from "lucide-react";

export default function MeetingsSection() {
  const meetings = adaptMeetingsForSection();
  const sorted = [...meetings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcoming = sorted.filter((m) => getDaysUntil(m.date) >= 0);
  const past = sorted.filter((m) => getDaysUntil(m.date) < 0);

  const getClient = (clientId: string | null) => clients.find((c) => c.id === clientId) || null;

  const MeetingCard = ({ meeting, index }: { meeting: MeetingRecord; index: number }) => {
    const client = getClient(meeting.clientId);
    const daysUntil = getDaysUntil(meeting.date);
    const isToday = daysUntil === 0;
    const isTomorrow = daysUntil === 1;

    return (
      <div
        className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-md animate-fade-in-up`}
        style={{
          borderColor: client ? `${client.color}40` : "oklch(0.90 0.008 75)",
          animationDelay: `${index * 60}ms`,
          borderLeft: `4px solid ${client ? client.color : "oklch(0.65 0.15 210)"}`,
        }}
      >
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
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
                  style={{
                    background: meeting.type === "Internal" ? "#F5F3FF" : "#F0FDF4",
                    color: meeting.type === "Internal" ? "#7C3AED" : "#15803D",
                  }}
                >
                  {meeting.type}
                </span>
                {isToday && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#FEF2F2", color: "#DC2626" }}>
                    Today
                  </span>
                )}
                {isTomorrow && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#FFF7ED", color: "#C2410C" }}>
                    Tomorrow
                  </span>
                )}
              </div>
              <h3
                className="text-sm font-bold text-foreground leading-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {meeting.title}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              <p
                className="text-lg font-bold font-mono-data"
                style={{ color: client ? client.color : "oklch(0.55 0.18 250)" }}
              >
                {daysUntil === 0 ? "Today" : daysUntil === 1 ? "+1d" : `+${daysUntil}d`}
              </p>
              <p className="text-xs text-muted-foreground">{daysUntil > 1 ? "days away" : ""}</p>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{formatDate(meeting.date)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{meeting.time} · {meeting.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Video size={12} />
              <span>{meeting.platform}</span>
            </div>
          </div>

          {/* Topic */}
          <p className="text-xs text-foreground/70 mb-3 leading-relaxed">{meeting.topic}</p>

          {/* Attendees */}
          <div className="flex items-center gap-2">
            <Users size={12} className="text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground truncate">{meeting.attendees.join(", ")}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Next Meetings
        </h2>
        <p className="text-sm text-muted-foreground">
          {upcoming.length} upcoming meetings · Q1 2026
        </p>
      </div>

      {/* Week Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up delay-50">
        {[
          { label: "This Week", count: upcoming.filter((m) => getDaysUntil(m.date) <= 7).length, color: "#DC2626", bg: "#FEF2F2" },
          { label: "Client Meetings", count: upcoming.filter((m) => m.type === "Client").length, color: "#0066CC", bg: "#EBF4FF" },
          { label: "Internal Syncs", count: upcoming.filter((m) => m.type === "Internal").length, color: "#7C3AED", bg: "#F5F3FF" },
          { label: "Total Upcoming", count: upcoming.length, color: "#059669", bg: "#ECFDF5" },
        ].map((stat) => (
          <div key={stat.label} className="metric-card text-center">
            <p className="text-2xl font-bold font-mono-data" style={{ color: stat.color }}>{stat.count}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Meetings */}
      <div>
        <h3 className="section-title mb-4 animate-fade-in-up delay-100">Upcoming</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {upcoming.map((meeting, i) => (
            <MeetingCard key={meeting.id} meeting={meeting} index={i} />
          ))}
        </div>
      </div>

      {/* Past Meetings */}
      {past.length > 0 && (
        <div>
          <h3 className="section-title mb-4 text-muted-foreground animate-fade-in-up">Recent (Past)</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 opacity-60">
            {past.slice(0, 4).map((meeting, i) => (
              <MeetingCard key={meeting.id} meeting={meeting} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
