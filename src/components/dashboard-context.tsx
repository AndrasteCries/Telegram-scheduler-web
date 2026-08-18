"use client";

import {
  ChannelContextType,
  type DashboardContextType,
} from "@/types/dashboard-context-type";
import { createContext } from "react";

export const DashboardContext = createContext<DashboardContextType | null>(
  null,
);

export const ChannelContext = createContext<ChannelContextType | null>(null);
