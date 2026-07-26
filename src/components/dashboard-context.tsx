"use client";

import type { DashboardContextType } from "@/types/dashboard-context-type"
import { createContext } from "react";

export const DashboardContext =
  createContext<DashboardContextType | null>(null);