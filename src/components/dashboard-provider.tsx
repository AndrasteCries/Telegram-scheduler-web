"use client";

import { useState } from "react";

import { DashboardContext } from "./dashboard-context";
import { emptyDraft, Post } from "@/types/post";
import { mockPosts } from "@/lib/mock-data";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [draft, setDraft] = useState<Post>(() => structuredClone(emptyDraft));

  return (
    <DashboardContext.Provider
      value={{
        posts,
        setPosts,
        draft,
        setDraft,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
