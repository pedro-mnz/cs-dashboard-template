// CS Metrics 101 — Reference guide for Creative Shop KPIs and pipeline terminology
// Built from internal context documents shared by Pedro Menezes

import { useState, useMemo } from "react";
import { BookOpen, ChevronDown, ChevronRight, ExternalLink, Info, Target, TrendingUp, Zap, Search, X, Link2 } from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactNode;
}

export default function CSMetrics101() {
  const [expanded, setExpanded] = useState<string[]>(["metrics"]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (q.trim()) {
      // Auto-expand all sections when searching
      setExpanded(["metrics", "kpis", "terminology", "datasource", "quickref"]);
    }
  };

  const highlight = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? `<mark style="background:#FEF08A;border-radius:2px;padding:0 1px">${part}</mark>` : part
    ).join("");
  };

  const sections: Section[] = [
    {
      id: "metrics",
      title: "Metric Definitions",
      icon: <TrendingUp size={16} />,
      color: "#0064E0",
      content: (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            These are the core financial metrics used across the xRS pipeline widget, CRM, and this dashboard. Understanding the distinction between Lifetime and QTD is essential for accurate quarterly performance tracking.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Metric</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>What it is</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>How it's calculated</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    metric: "Accrued AR (Lifetime)",
                    what: "Total Attributed Revenue accrued over the entire lifetime of the opportunity/solution.",
                    how: "COALESCE(attributed_revenue_usd_lifetime, 0) — cumulative revenue attributed since inception.",
                  },
                  {
                    metric: "Accrued AR (QTD)",
                    what: "Attributed Revenue accrued Quarter-To-Date only. Resets each quarter.",
                    how: "COALESCE(attributed_revenue_usd_qtd, 0). In Q1 2026, QTD often equals Lifetime for new initiatives.",
                  },
                  {
                    metric: "Opportunity Size (Opp)",
                    what: "Estimated total revenue potential — the projected ceiling of revenue the solution could generate.",
                    how: "ROUND(estimated_opportunity_size / 100.0) — converted from cents to dollars.",
                  },
                  {
                    metric: "AR Headroom (Opp − AR)",
                    what: "Remaining revenue potential: the gap between Opportunity Size and Lifetime AR. Can be negative if over-delivered.",
                    how: "Opportunity Size − Accrued AR (Lifetime). Negative = over-delivered vs. estimate.",
                  },
                  {
                    metric: "Target Eligible Revenue",
                    what: "Total revenue base of the advertiser eligible for targeting with this solution. The broader pool from which Opp Size was scoped.",
                    how: "Sourced from estimated_etr in crm_key_initiative. Amazon BR Catalog PLV: $3.36M ETR → $1.01M Opp (~30% of pool).",
                  },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                    <td className="py-2.5 px-3 font-semibold text-foreground align-top" style={{ fontFamily: "'Montserrat', sans-serif", whiteSpace: "nowrap" }}>{row.metric}</td>
                    <td className="py-2.5 px-3 text-muted-foreground align-top">{row.what}</td>
                    <td className="py-2.5 px-3 text-muted-foreground align-top" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px" }}>{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg p-4 text-sm" style={{ background: "oklch(0.97 0.01 250)", border: "1px solid oklch(0.88 0.02 250)" }}>
            <p className="font-semibold text-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>How they relate</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              <strong>Target Eligible Revenue</strong> → <strong>Opportunity Size</strong> → <strong>(Accrued AR + AR Headroom)</strong>, where QTD is the current-quarter slice of Accrued AR.
              AR Headroom is your <em>prioritization tool</em> — the higher it is, the more revenue is yet to be captured.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "kpis",
      title: "Creative Shop Specialist KPIs",
      icon: <Target size={16} />,
      color: "#7C3AED",
      content: (
        <div className="space-y-5">
          <div className="rounded-lg p-4 text-sm" style={{ background: "oklch(0.97 0.01 290)", border: "1px solid oklch(0.88 0.02 290)" }}>
            <p className="font-semibold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Is AR Headroom your primary KPI?</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              <strong>Not exactly.</strong> AR Headroom is a <em>prioritization metric</em>, not a KPI itself. It tells you where the biggest untapped opportunities are — use it to decide where to focus your creative expertise. Your actual KPIs are below.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>🎯 Primary Sales-Aligned Goals (Shared with Sales)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Goal</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { goal: "Opportunity Score (OS) / RWOS", desc: "Starting H2 2025, CS Specialists share a Revenue Weighted Opportunity Score goal with Sales counterparts. Measures how well advertisers adopt value-proven recommendations." },
                    { goal: "Attributed Revenue (AR)", desc: "Revenue attributed to solutions you help pitch and get adopted. AR Headroom helps you maximize this — bigger headroom = more AR potential." },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                      <td className="py-2.5 px-3 font-semibold text-foreground align-top" style={{ fontFamily: "'Montserrat', sans-serif" }}>{row.goal}</td>
                      <td className="py-2.5 px-3 text-muted-foreground align-top">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>📊 Specialist Execution Metrics (2025 BAS KPI Framework)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Metric</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: "Named Account Coverage", desc: "90% of Named Accounts (H/M/S) goaled at L4 and L8." },
                    { metric: "Total Account Coverage", desc: "Breadth of accounts touched." },
                    { metric: "$ Opportunity Enabled", desc: "Dollar value of opportunities you've contributed to." },
                    { metric: "KI (Solution) Closed Won Rate", desc: "% of solutions that reach adoption / closed-won." },
                    { metric: "xQIs (Cross-functional Quality Interactions)", desc: "Quality of specialist interactions with clients." },
                    { metric: "Product Priorities", desc: "Aligned product adoption goals (e.g., Reels, Creative Diversification)." },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                      <td className="py-2.5 px-3 font-semibold text-foreground align-top" style={{ fontFamily: "'Montserrat', sans-serif" }}>{row.metric}</td>
                      <td className="py-2.5 px-3 text-muted-foreground align-top">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>🎨 Creative Shop-Specific Focus</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>What AR Headroom tells you</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>What to DO with it</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { signal: "Magalu — Catalog PLV: $1.28M headroom", action: "🔴 Biggest opportunity — focus creative support here to drive more AR" },
                    { signal: "Amazon BR — Catalog PLV: $845K headroom", action: "🟠 Second priority — partially adopted, room to scale" },
                    { signal: "Samsung — Adopt CTX: $579K headroom", action: "🟡 In Discovery — needs creative strategy to move forward" },
                    { signal: "Samsung — Creative Diversification: $471K headroom", action: "🟡 Actioned — creative work underway, track adoption" },
                    { signal: "Opportunities with negative headroom (e.g., Audible: −$13.8K)", action: "✅ Over-delivered — celebrate the win, deprioritize" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                      <td className="py-2.5 px-3 text-muted-foreground align-top">{row.signal}</td>
                      <td className="py-2.5 px-3 text-muted-foreground align-top">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "terminology",
      title: "Pipeline Terminology: RS, SCS & Initiatives",
      icon: <BookOpen size={16} />,
      color: "#059669",
      content: (
        <div className="space-y-5">
          <div className="rounded-lg p-4 text-sm" style={{ background: "oklch(0.97 0.01 160)", border: "1px solid oklch(0.88 0.02 160)" }}>
            <p className="font-semibold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>Nomenclature update — July 8, 2025</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              The terminology was restructured. The old "Key Initiative (KI)" and "Company-Led Initiative (CLI)" names were replaced. Use the new terms below in all communications.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Old Term</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>New Term</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { old: "Key Initiative (KI)", newTerm: "Solution", desc: "The umbrella term for any actionable item in your pipeline." },
                  { old: "Company-Led Initiative (CLI)", newTerm: "Recommended Solution (RS)", desc: "Meta-recommended, value-proven solutions automatically added to your pipeline. Has an initiative_definition_id in the data." },
                  { old: "Self-Led Initiative (SLI)", newTerm: "Self-Created Solution (SCS)", desc: "Solutions manually created by the salesperson. No 'Recommended' icon. Has a NULL initiative_definition_id." },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                    <td className="py-2.5 px-3 text-muted-foreground align-top line-through">{row.old}</td>
                    <td className="py-2.5 px-3 font-semibold text-foreground align-top" style={{ fontFamily: "'Montserrat', sans-serif" }}>{row.newTerm}</td>
                    <td className="py-2.5 px-3 text-muted-foreground align-top">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Key differences: RS vs. SCS</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Aspect</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Recommended Solutions (RS)</th>
                    <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Self-Created Solutions (SCS)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { aspect: "Created by", rs: "Meta automatically", scs: "Salesperson manually" },
                    { aspect: "Value-proven", rs: "Always", scs: "Only if using value-proven recommendations" },
                    { aspect: "Contributes to AR", rs: "Yes (all recommendations)", scs: "Only value-proven recommendations (as of Q4'25)" },
                    { aspect: "Opportunity Size", rs: "System-calculated (not editable)", scs: "Sales inputs as 'Eligible Target Revenue'" },
                    { aspect: "Deployment cadence", rs: "Continuous (weekly/daily since Q1'26)", scs: "Created at any time by sales" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                      <td className="py-2.5 px-3 font-semibold text-foreground align-top" style={{ fontFamily: "'Montserrat', sans-serif" }}>{row.aspect}</td>
                      <td className="py-2.5 px-3 text-muted-foreground align-top">{row.rs}</td>
                      <td className="py-2.5 px-3 text-muted-foreground align-top">{row.scs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "datasource",
      title: "Data Sources & CRM Alignment",
      icon: <Info size={16} />,
      color: "#D97706",
      content: (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This dashboard reads from the same backend as CRM Pipeline Management. Numbers should align closely, with minor timing differences due to daily snapshot refreshes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "oklch(0.97 0.004 75)" }}>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Layer</th>
                  <th className="text-left py-2 px-3 font-semibold text-foreground border-b" style={{ borderColor: "oklch(0.90 0.004 75)" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { layer: "CRM UI (Pipeline Management)", desc: "The frontend where Sales creates, manages, and tracks solutions. Operational source of truth — stages get updated, CIs get logged here." },
                  { layer: "crm_key_initiative (Hive table)", desc: "Foundational backend table storing enriched initiative data, sourced from the CRM raw scrape. Refreshed daily." },
                  { layer: "crm_key_initiative_quarterly_rolling", desc: "Downstream table adding quarterly context (active_current, active_future, inactive status). Used by the DCMP dashboard." },
                  { layer: "This xRS dashboard", desc: "Further downstream — joins crm_key_initiative with specialist maps, account selection, and agency data for the specialist-focused view." },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid oklch(0.93 0.004 75)" }}>
                    <td className="py-2.5 px-3 font-semibold text-foreground align-top" style={{ fontFamily: "'Montserrat', sans-serif", whiteSpace: "nowrap" }}>{row.layer}</td>
                    <td className="py-2.5 px-3 text-muted-foreground align-top">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg p-4 text-xs space-y-2" style={{ background: "oklch(0.97 0.01 75)", border: "1px solid oklch(0.88 0.02 75)" }}>
            <p className="font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Key takeaways</p>
            <p className="text-muted-foreground">✅ CRM is the source of truth — this dashboard reads from the same backend (crm_key_initiative), so numbers should align closely with CRM Pipeline Management.</p>
            <p className="text-muted-foreground">✅ Initiatives = Solutions (the old term). They encompass both RS and SCS.</p>
            <p className="text-muted-foreground">✅ RS ≠ all Initiatives — RS is a subset of Solutions (only Meta-recommended ones). SCS is the other subset (sales-created).</p>
            <p className="text-muted-foreground">⚠️ Minor data timing differences (1–2 days) are expected between CRM and this dashboard due to daily snapshot refreshes.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://fburl.com/datainsights/x5oismt6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-80 transition-opacity"
              style={{ background: "oklch(0.95 0.02 290)", color: "#7C3AED", border: "1px solid oklch(0.88 0.03 290)" }}
            >
              <ExternalLink size={11} />
              Unidash (AR source of truth)
            </a>
            <a
              href="https://www.internalfb.com/crm/pipeline_management"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-80 transition-opacity"
              style={{ background: "oklch(0.95 0.02 250)", color: "#0064E0", border: "1px solid oklch(0.88 0.03 250)" }}
            >
              <ExternalLink size={11} />
              CRM Pipeline Management
            </a>
          </div>
        </div>
      ),
    },
    {
      id: "quickref",
      title: "Quick Reference Card",
      icon: <Zap size={16} />,
      color: "#DC2626",
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A one-page cheat sheet for the most common questions you'll face when reviewing pipeline data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "What's my #1 KPI?",
                a: "Attributed Revenue (AR) — revenue credited to solutions you help drive adoption on. RWOS / Opportunity Score is the shared goal with Sales.",
              },
              {
                q: "What does AR Headroom mean?",
                a: "Opportunity Size − Accrued AR (Lifetime). It's your prioritization tool — higher headroom = more AR still to capture. Not a KPI itself.",
              },
              {
                q: "Why does QTD ≠ Lifetime?",
                a: "QTD resets each quarter. Lifetime is cumulative. For new Q1 2026 initiatives, they're often equal because no prior-quarter AR was accrued.",
              },
              {
                q: "Are RS and Initiatives the same?",
                a: "No. Initiatives = Solutions (umbrella term). RS is the Meta-recommended subset. SCS is the sales-created subset. All 25 entries in this dashboard are RS.",
              },
              {
                q: "Why are numbers slightly off from CRM?",
                a: "This dashboard uses a daily snapshot (ds = '2026-03-11'). CRM may show 1–2 days more recent data. Core numbers (Opp Size, Stage) should align.",
              },
              {
                q: "What's Target Eligible Revenue?",
                a: "The total addressable revenue pool for the advertiser. Opp Size is a subset of it. E.g., Amazon BR: $3.36M ETR → $1.01M Opp (~30% scoped).",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg p-3 text-xs"
                style={{ background: "oklch(0.97 0.004 75)", border: "1px solid oklch(0.92 0.004 75)" }}
              >
                <p className="font-semibold text-foreground mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{item.q}</p>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const workplaceLinks = [
    { label: "CRM FYI", url: "https://www.internalfb.com/groups/crmfyi", desc: "CRM updates, pipeline changes, and best practices", color: "#0064E0" },
    { label: "DCMP FYI", url: "https://www.internalfb.com/groups/dcmpfyi", desc: "DCMP dashboard updates and methodology changes", color: "#7C3AED" },
    { label: "xRS Wiki", url: "https://www.internalfb.com/intern/wiki/xrs", desc: "Full xRS methodology, definitions, and FAQ", color: "#059669" },
    { label: "CRM Pipeline Management", url: "https://www.internalfb.com/crm/pipeline_management", desc: "Source of truth for all solutions and stages", color: "#D97706" },
    { label: "Unidash (AR data)", url: "https://fburl.com/datainsights/x5oismt6", desc: "Individual Opportunities CSV — AR headroom source", color: "#DC2626" },
    { label: "BAS KPI Framework", url: "https://www.internalfb.com/intern/wiki/bas_kpi", desc: "2025 BAS KPI definitions and targets", color: "#6B7280" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "oklch(0.95 0.02 290)", color: "#7C3AED" }}
          >
            <BookOpen size={18} />
          </div>
          <div>
            <h1
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              CS Metrics 101
            </h1>
            <p className="text-xs text-muted-foreground">
              Reference guide for Creative Shop KPIs, pipeline terminology, and data sources
            </p>
          </div>
        </div>
        <div
          className="mt-3 px-4 py-2.5 rounded-lg text-xs text-muted-foreground"
          style={{ background: "oklch(0.97 0.004 75)", border: "1px solid oklch(0.92 0.004 75)" }}
        >
          Built from internal context documents. For the most up-to-date reference, check the{" "}
          <a href="https://www.internalfb.com/groups/crmfyi" target="_blank" rel="noopener noreferrer" className="font-medium hover:opacity-70" style={{ color: "#0064E0" }}>CRM FYI Workplace group</a>{" "}
          and the{" "}
          <a href="https://www.internalfb.com/groups/dcmpfyi" target="_blank" rel="noopener noreferrer" className="font-medium hover:opacity-70" style={{ color: "#0064E0" }}>DCMP FYI group</a>.
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search metrics, terms, KPIs…"
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2"
          style={{ borderColor: "oklch(0.88 0.008 75)", fontFamily: "inherit" }}
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Accordion sections */}
      {sections.map((section) => {
        const isOpen = expanded.includes(section.id);
        return (
          <div
            key={section.id}
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid oklch(0.92 0.004 75)" }}
          >
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:opacity-90 transition-opacity"
              style={{ background: isOpen ? "oklch(0.97 0.004 75)" : "white" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ background: `${section.color}18`, color: section.color }}
                >
                  {section.icon}
                </div>
                <span
                  className="text-sm font-semibold text-foreground"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {section.title}
                </span>
              </div>
              {isOpen ? (
                <ChevronDown size={16} className="text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {isOpen && (
              <div
                className="px-5 pb-5 pt-1"
                style={{ background: "white", borderTop: "1px solid oklch(0.93 0.004 75)" }}
              >
                {section.content}
              </div>
            )}
          </div>
        );
      })}
      {/* Workplace Digest quick-links */}
      <div
        className="rounded-xl p-5 mt-2"
        style={{ background: "oklch(0.97 0.004 75)", border: "1px solid oklch(0.92 0.004 75)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "#0064E018", color: "#0064E0" }}
          >
            <Link2 size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Internal Resources</p>
            <p className="text-xs text-muted-foreground">Quick access to Workplace groups, wikis, and data tools</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {workplaceLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2.5 p-3 rounded-lg bg-white hover:opacity-80 transition-opacity"
              style={{ border: `1px solid ${link.color}22` }}
            >
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${link.color}15`, color: link.color }}
              >
                <ExternalLink size={10} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground" style={{ fontFamily: "'Montserrat', sans-serif", color: link.color }}>{link.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
