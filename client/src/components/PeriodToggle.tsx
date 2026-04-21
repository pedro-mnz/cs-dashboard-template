// PeriodToggle.tsx
// Inline Q1 / Q2 / H1 pill toggle — matches Ceci dashboard reference style
// Active: Meta Blue #0064E0 filled, white text
// Inactive: transparent, gray text
// Outer pill: light #F0F2F5 background — sits inline next to the section title

import { usePeriod, type Period } from "@/contexts/PeriodContext";

const PERIODS: { value: Period; label: string }[] = [
  { value: "Q1", label: "Q1" },
  { value: "Q2", label: "Q2" },
  { value: "H1", label: "H1" },
];

export default function PeriodToggle() {
  const { period, setPeriod } = usePeriod();

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg p-0.5"
      style={{
        background: "#F0F2F5",
        border: "1px solid #E4E6EB",
      }}
      title="Switch between Q1, Q2, and H1 2026 views"
    >
      {PERIODS.map(({ value, label }) => {
        const isActive = period === value;
        return (
          <button
            key={value}
            onClick={() => setPeriod(value)}
            className="relative px-3 py-1 rounded-md text-xs font-bold transition-all duration-150 focus:outline-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.02em",
              background: isActive ? "#0064E0" : "transparent",
              color: isActive ? "#ffffff" : "#65676B",
              boxShadow: isActive ? "0 1px 3px rgba(0,100,224,0.25)" : "none",
              cursor: "pointer",
              border: "none",
            }}
            aria-pressed={isActive}
          >
            {label}
            {/* Green dot on Q2 when not active — marks current quarter */}
            {value === "Q2" && !isActive && (
              <span
                className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full"
                style={{ background: "#10B981" }}
                title="Current quarter"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
