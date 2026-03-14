// Home — Pedro Menezes | Creative Shop Dashboard
// Design: Meta Creative Shop Identity
// Layout: Dark navy sidebar (CS brand) + pure white main canvas
// Colors: Meta Blue #0064E0, CS Purple #7C3AED, white surfaces

import { useState, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import OverviewSection from "@/components/sections/OverviewSection";
import MeetingsSection from "@/components/sections/MeetingsSection";
import ClientsSection from "@/components/sections/ClientsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import InteractionsSection from "@/components/sections/InteractionsSection";
import KeyDatesSection from "@/components/sections/KeyDatesSection";
import AIUsageSection from "@/components/sections/AIUsageSection";
import CRMInteractionsSection from "@/components/sections/CRMInteractionsSection";
import CSMetrics101 from "@/pages/CSMetrics101";
import { Bell, Search, RefreshCw } from "lucide-react";
import { adaptMeetingsForSection } from "@/lib/weeklyMeetingsData";
import { dashboardConfig } from "@/lib/dashboard.config";
import { getDaysUntil } from "@/lib/dashboardData";
import { aiUsageSummary } from "@/lib/aiUsageData";

const sectionTitles: Record<string, string> = {
  overview: "Dashboard Overview",
  meetings: "Next Meetings",
  clients: "Client Content",
  solutions: "Recommended Solutions",
  interactions: "CRM Interactions",
  keydates: "Key Dates",
  aiusage: "My AI Usage",
  crminteractions: "CI Dashboard",
  metrics101: "CS Metrics 101",
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sectionFilter, setSectionFilter] = useState<string | null>(null);
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const scrollTargetRef = useRef<string | null>(null);

  // Scroll to top on every section change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSection]);

  // Scroll to specific client card after section renders
  useEffect(() => {
    if (!scrollTargetRef.current) return;
    const targetId = scrollTargetRef.current;
    scrollTargetRef.current = null;
    // Wait for the new section to render
    const timer = setTimeout(() => {
      const el = document.getElementById(`client-card-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
    return () => clearTimeout(timer);
  }, [activeSection, activeClient]);

  const handleClientChange = (id: string | null) => {
    scrollTargetRef.current = id ?? null;
    setActiveClient(id);
    setActiveSection("clients");
  };

  // ── Live refresh via backend scraper ──────────────────────────
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const [refreshStatus, setRefreshStatus] = useState<string>("idle");

  const baseUpdated = aiUsageSummary.lastUpdated
    ? new Date(aiUsageSummary.lastUpdated + "T12:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const lastUpdated = refreshedAt ?? baseUpdated;
  const isRefreshing = refreshStatus !== "idle";

  const fastRefresh = trpc.scraper.refreshFast.useMutation({
      onMutate: () => setRefreshStatus("Checking data freshness..."),
    onSuccess: () => {
      const now = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      setRefreshedAt(now);
      setRefreshStatus("idle");
      // All data sources are Manus-assisted — show a clear, helpful message
      toast.info("Data is refreshed daily by Manus at 7 AM BRT", {
        description: "To refresh now, say \"refresh my dashboard\" in the Manus chat. Calendar, AI Usage, Workplace, and CRM are all updated automatically.",
        duration: 6000,
      });
    },
    onError: (err) => {
      setRefreshStatus("idle");
      toast.error("Refresh failed", { description: err.message });
    },
  });

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setRefreshStatus("Connecting to Meta...");
    fastRefresh.mutate();
  }, [isRefreshing, fastRefresh]);

  const upcomingThisWeek = adaptMeetingsForSection().filter((m) => {
    const d = getDaysUntil(m.date);
    return d >= 0 && d <= 7;
  }).length;

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection
            onClientChange={(id) => setActiveClient(id)}
            onSectionChange={(section, filter) => { setActiveSection(section); setSectionFilter(filter ?? null); }}
          />
        );
      case "meetings":
        return <MeetingsSection />;
      case "clients":
        return (
          <ClientsSection
            activeClient={activeClient}
            onClientChange={setActiveClient}
          />
        );
      case "solutions":
        return <SolutionsSection initialInitiative={sectionFilter} />;
      case "interactions":
        return <InteractionsSection />;
      case "keydates":
        return <KeyDatesSection />;
      case "aiusage":
        return <AIUsageSection />;
      case "crminteractions":
        return <CRMInteractionsSection />;
      case "metrics101":
        return <CSMetrics101 />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        activeClient={activeClient}
        onClientChange={handleClientChange}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar — Meta-style clean white header */}
        <header
          className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-white border-b"
          style={{ borderColor: "#E4E6EB" }}
        >
          <div className="flex items-center gap-3">
            {/* CS gradient accent line */}
            <div
              className="w-1 h-8 rounded-full flex-shrink-0"
              style={{ background: "linear-gradient(180deg, #8B5CF6 0%, #0064E0 100%)" }}
            />
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.02em" }}>
                {sectionTitles[activeSection]}
              </h1>
              <p className="text-xs text-gray-400 leading-tight" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Q1 2026 · Brazil L8 ·{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Last Updated — clickable refresh button */}
            {lastUpdated && (
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: isRefreshing ? "#E0EDFF" : "#F0F7FF",
                  color: "#0064E0",
                  border: "1px solid #C8DFF8",
                  cursor: isRefreshing ? "default" : "pointer",
                  opacity: isRefreshing ? 0.85 : 1,
                }}
                title={isRefreshing ? "Refreshing data..." : "Click to refresh dashboard data"}
              >
                <RefreshCw
                  size={10}
                  className="flex-shrink-0"
                  style={{
                    color: "#0064E0",
                    animation: isRefreshing ? "spin 0.8s linear infinite" : "none",
                  }}
                />
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
                  {isRefreshing ? refreshStatus : `Updated ${lastUpdated}`}
                </span>
              </button>
            )}
            {/* Workplace primary group quick link — reads from dashboardConfig.workplace.primaryGroup */}
            {dashboardConfig.workplace.primaryGroup && (
              <a
                href={dashboardConfig.workplace.primaryGroup.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all hover:opacity-90"
                style={{
                  background: "#F3F0FF",
                  color: "#7C3AED",
                  border: "1px solid #DDD6FE",
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                title={`Open ${dashboardConfig.workplace.primaryGroup.name} on Workplace`}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                {dashboardConfig.workplace.primaryGroup.name}
              </a>
            )}

            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border text-xs text-gray-400 bg-gray-50 border-gray-200">
              <Search size={12} />
              <span>Search...</span>
              <kbd className="text-xs px-1 py-0.5 rounded bg-gray-100 text-gray-400">⌘K</kbd>
            </div>

            {/* Notification bell */}
            <button
              className="relative w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 transition-colors hover:bg-gray-50"
              onClick={() => setActiveSection("meetings")}
              title="Upcoming meetings"
            >
              <Bell size={14} className="text-gray-500" />
              {upcomingThisWeek > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center font-bold"
                  style={{ background: "#0064E0", fontSize: "9px" }}
                >
                  {upcomingThisWeek}
                </span>
              )}
            </button>

            {/* Avatar with CS gradient */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #0064E0 100%)" }}
            >
              PM
            </div>
          </div>
        </header>

        {/* Scrollable Content — pure white canvas */}
        <main ref={mainRef} className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-5xl mx-auto p-6">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
