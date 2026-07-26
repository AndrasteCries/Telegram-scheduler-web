"use client";

import { useState } from "react";
import { DashboardContext } from "./dashboard-context";
import { Post } from "@/types/post";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedSlot, setSelectedSlot] = useState<Post | null>(null);

  return (
    <DashboardContext.Provider value={{ selectedSlot, setSelectedSlot }}>
      {children}
    </DashboardContext.Provider>
  );
}
