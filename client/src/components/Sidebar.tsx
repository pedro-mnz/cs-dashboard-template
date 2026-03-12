// Sidebar — Meta Creative Shop Identity
// Design: Deep dark navy (#0A0F1E) with Meta Blue (#0064E0) active accents
// CS gradient logo mark, clean geometric sans typography

import { useState } from "react";
import { clients, userProfile } from "@/lib/dashboardData";
import { dashboardConfig } from "@/lib/dashboard.config";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Target,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Cpu,
  CalendarDays,
  Wand2,
  Link2,
  Check,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  activeClient: string | null;
  onClientChange: (clientId: string | null) => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "meetings", label: "Next Meetings", icon: Calendar },
  { id: "clients", label: "Client Content", icon: Users },
  { id: "solutions", label: "Rec. Solutions", icon: Target },
  { id: "crminteractions", label: "CI Dashboard", icon: MessageSquare },
  { id: "keydates", label: "Key Dates", icon: CalendarDays },
  { id: "aiusage", label: "My AI Usage", icon: Cpu },
];

// Meta Blue #0064E0 as the primary accent
const META_BLUE = "#0064E0";
const SIDEBAR_BG = "#0A0F1E";
const SIDEBAR_BORDER = "rgba(255,255,255,0.07)";
const NAV_ACTIVE_BG = "rgba(0, 100, 224, 0.15)";
const NAV_HOVER_BG = "rgba(255,255,255,0.05)";
const TEXT_PRIMARY = "rgba(255,255,255,0.92)";
const TEXT_SECONDARY = "rgba(255,255,255,0.45)";
const TEXT_MUTED = "rgba(255,255,255,0.28)";

export default function Sidebar({ activeSection, onSectionChange, activeClient, onClientChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const copySetupLink = async () => {
    const url = `${window.location.origin}/setup`;
    await navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out flex-shrink-0 z-20"
      style={{
        width: collapsed ? "60px" : "232px",
        background: SIDEBAR_BG,
        backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663321707387/ncXKdRsdXjEbWytkFjVxwi/cs-sidebar-bg-BWigngRKoCodp8SoufzTLH.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        borderRight: `1px solid ${SIDEBAR_BORDER}`,
      }}
    >
      {/* CS Logo Header */}
      <div
        className="flex items-center justify-between px-3 py-4 border-b"
        style={{ borderColor: SIDEBAR_BORDER }}
      >
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Official CS Compact Stamp */}
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663321707387/ncXKdRsdXjEbWytkFjVxwi/cs-stamp-outline-white_48e7ea76.png"
              alt="Creative Shop"
              className="h-8 w-8 flex-shrink-0 rounded-full"
              style={{ opacity: 0.92 }}
            />
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663321707387/ncXKdRsdXjEbWytkFjVxwi/cs-stamp-outline-white_48e7ea76.png"
              alt="CS"
              className="h-8 w-8 rounded-full"
              style={{ opacity: 0.92 }}
            />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors ml-1"
            style={{ color: TEXT_MUTED }}
            onMouseEnter={(e) => (e.currentTarget.style.color = TEXT_SECONDARY)}
            onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
          >
            <ChevronLeft size={13} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-16 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
            style={{ background: META_BLUE, color: "white" }}
          >
            <ChevronRight size={12} />
          </button>
        )}
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="px-3 py-3 border-b" style={{ borderColor: SIDEBAR_BORDER }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${dashboardConfig.profile.avatarColor} 0%, #0064E0 100%)`, color: "white" }}
            >
              {dashboardConfig.profile.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: TEXT_PRIMARY }}>
                {userProfile.name}
              </p>
              <p className="text-xs truncate" style={{ color: TEXT_MUTED }}>
                {userProfile.role}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {!collapsed && (
          <p
            className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{ color: TEXT_MUTED, letterSpacing: "0.1em" }}
          >
            Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all duration-150 ${collapsed ? "justify-center rounded-lg" : "rounded-lg"}`}
              style={{
                color: isActive ? "white" : TEXT_SECONDARY,
                background: isActive ? NAV_ACTIVE_BG : "transparent",
                borderLeft: isActive && !collapsed ? `3px solid ${META_BLUE}` : "3px solid transparent",
                paddingLeft: !collapsed ? (isActive ? "9px" : "12px") : undefined,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = NAV_HOVER_BG;
                  e.currentTarget.style.color = TEXT_PRIMARY;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = TEXT_SECONDARY;
                }
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                size={15}
                className="flex-shrink-0"
                style={{ color: isActive ? META_BLUE : "inherit" }}
              />
              {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          );
        })}

        {/* Clients section */}
        {!collapsed && (
          <>
            <div className="pt-4 pb-1">
              <p
                className="px-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: TEXT_MUTED, letterSpacing: "0.1em" }}
              >
                Clients
              </p>
            </div>
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => {
                  onClientChange(client.id);
                  onSectionChange("clients");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150"
                style={{
                  color: activeClient === client.id ? "white" : TEXT_SECONDARY,
                  background: activeClient === client.id ? NAV_ACTIVE_BG : "transparent",
                  borderLeft: activeClient === client.id ? `3px solid ${META_BLUE}` : "3px solid transparent",
                  paddingLeft: activeClient === client.id ? "9px" : "12px",
                }}
                onMouseEnter={(e) => {
                  if (activeClient !== client.id) {
                    e.currentTarget.style.background = NAV_HOVER_BG;
                    e.currentTarget.style.color = TEXT_PRIMARY;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeClient !== client.id) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = TEXT_SECONDARY;
                  }
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: client.color }}
                />
                <span className="truncate font-medium">{client.shortName}</span>
                <span
                  className="ml-auto text-xs px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(255,255,255,0.07)", color: TEXT_MUTED }}
                >
                  {client.tier}
                </span>
              </button>
            ))}
          </>
        )}

        {/* Collapsed client dots */}
        {collapsed && (
          <div className="pt-4 space-y-2">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => {
                  onClientChange(client.id);
                  onSectionChange("clients");
                }}
                className="w-full flex justify-center py-1"
                title={client.name}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full transition-opacity"
                  style={{
                    background: client.color,
                    opacity: activeClient === client.id ? 1 : 0.4,
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-3 py-3 border-t" style={{ borderColor: SIDEBAR_BORDER }}>
          <p className="text-xs" style={{ color: TEXT_MUTED }}>
            {dashboardConfig.unidash.quarter} · {dashboardConfig.profile.territory}
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.18)" }}>
            Updated daily at 7:00 AM BRT
          </p>
          <div className="mt-3 flex gap-1.5">
            <a
              href="/setup"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center gap-1.5 text-xs rounded-lg px-2 py-1.5 transition-all"
              style={{
                color: "rgba(167,139,250,0.85)",
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.22)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.22)";
                e.currentTarget.style.color = "rgba(196,181,253,1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(124,58,237,0.12)";
                e.currentTarget.style.color = "rgba(167,139,250,0.85)";
              }}
            >
              <Wand2 className="w-3 h-3 shrink-0" />
              <span>Set up yours</span>
            </a>
            <button
              onClick={copySetupLink}
              title="Copy setup link"
              className="flex items-center justify-center w-7 h-7 rounded-lg transition-all flex-shrink-0"
              style={{
                color: copiedLink ? "rgba(134,239,172,0.9)" : "rgba(167,139,250,0.7)",
                background: copiedLink ? "rgba(22,163,74,0.15)" : "rgba(124,58,237,0.12)",
                border: `1px solid ${copiedLink ? "rgba(22,163,74,0.3)" : "rgba(124,58,237,0.22)"}`,
              }}
              onMouseEnter={(e) => {
                if (!copiedLink) {
                  e.currentTarget.style.background = "rgba(124,58,237,0.22)";
                  e.currentTarget.style.color = "rgba(196,181,253,1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!copiedLink) {
                  e.currentTarget.style.background = "rgba(124,58,237,0.12)";
                  e.currentTarget.style.color = "rgba(167,139,250,0.7)";
                }
              }}
            >
              {copiedLink ? <Check className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
            </button>
          </div>
        </div>
      )}
      {/* Collapsed footer — wizard icon only */}
      {collapsed && (
        <div className="px-2 py-3 border-t flex justify-center" style={{ borderColor: SIDEBAR_BORDER }}>
          <a
            href="/setup"
            target="_blank"
            rel="noreferrer"
            title="Set up your own dashboard"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
            style={{
              color: "rgba(167,139,250,0.7)",
              background: "rgba(124,58,237,0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.25)";
              e.currentTarget.style.color = "rgba(196,181,253,1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.12)";
              e.currentTarget.style.color = "rgba(167,139,250,0.7)";
            }}
          >
            <Wand2 className="w-4 h-4" />
          </a>
        </div>
      )}
    </aside>
  );
}
