// PeriodToggle.tsx
// Q1 / Q2 / H1 toggle pill — sits in the top header bar
// Reads and writes to PeriodContext

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
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
      title="Switch between Q1, Q2, and H1 2026 views"
    >
      {PERIODS.map(({ value, label }) => {
        const isActive = period === value;
        return (
          <button
            key={value}
            onClick={() => setPeriod(value)}
            className="relative px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 focus:outline-none"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              background: isActive ? "#0064E0" : "transparent",
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
              boxShadow: isActive ? "0 1px 4px rgba(0,100,224,0.4)" : "none",
              letterSpacing: "0.04em",
            }}
            aria-pressed={isActive}
          >
            {label}
            {value === "Q2" && !isActive && (
              <span
                className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full"
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
