"use client";

import { useState } from "react";

import { DashboardContext } from "./dashboard-context";
import { emptyDraft, Post } from "@/types/post";

export function DashboardProvider({ children, initialPosts }: { children: React.ReactNode, initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
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
