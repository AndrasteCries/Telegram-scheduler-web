"use client";

import { useContext } from "react";
import { DashboardContext } from "@/components/dashboard-context";

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboardContext must be used within PlannerProvider");
  }

  return context;
}