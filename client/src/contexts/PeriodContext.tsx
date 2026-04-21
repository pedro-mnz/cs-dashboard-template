// PeriodContext.tsx
// Global context for Q1 / Q2 / H1 period toggle
// Default: Q2 (current quarter)

import React, { createContext, useContext, useState } from "react";

export type Period = "Q1" | "Q2" | "H1";

interface PeriodContextType {
  period: Period;
  setPeriod: (p: Period) => void;
  isQ1: boolean;
  isQ2: boolean;
  isH1: boolean;
  periodLabel: string;
  quarterLabel: string; // "Q1 2026" | "Q2 2026" | "H1 2026"
}

const PeriodContext = createContext<PeriodContextType | undefined>(undefined);

export function PeriodProvider({ children }: { children: React.ReactNode }) {
  const [period, setPeriod] = useState<Period>("Q2"); // default: current quarter

  const value: PeriodContextType = {
    period,
    setPeriod,
    isQ1: period === "Q1",
    isQ2: period === "Q2",
    isH1: period === "H1",
    periodLabel: period === "H1" ? "H1 2026" : `${period} 2026`,
    quarterLabel: period === "H1" ? "H1 2026" : `${period} 2026`,
  };

  return (
    <PeriodContext.Provider value={value}>
      {children}
    </PeriodContext.Provider>
  );
}

export function usePeriod(): PeriodContextType {
  const ctx = useContext(PeriodContext);
  if (!ctx) throw new Error("usePeriod must be used within a PeriodProvider");
  return ctx;
}
