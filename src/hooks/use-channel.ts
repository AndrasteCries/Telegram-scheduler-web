"use client";

import { useContext } from "react";
import { ChannelContext } from "@/components/dashboard-context";

export function useChannel() {
  const context = useContext(ChannelContext);

  if (!context) {
    throw new Error("useChannel must be used within Provider");
  }

  return context;
}