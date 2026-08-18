"use client";

import { useState } from "react";

import { ChannelContext, DashboardContext } from "./dashboard-context";
import { emptyDraft, Post } from "@/types/post";
import { SlotTemplate } from "@/types/slot-template";

type DashboardProps = {
  children: React.ReactNode;
  initialPosts: Post[];
  slotTemplates: SlotTemplate[];
};

export function DashboardProvider({
  children,
  initialPosts,
  slotTemplates,
}: DashboardProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [draft, setDraft] = useState<Post>(() => structuredClone(emptyDraft));
  const [templates, setTemplates] = useState<SlotTemplate[]>(slotTemplates);

  return (
    <DashboardContext.Provider
      value={{
        posts,
        setPosts,
        draft,
        setDraft,
      }}
    >
      <ChannelContext.Provider value={{ templates, setTemplates }}>
        {children}
      </ChannelContext.Provider>
    </DashboardContext.Provider>
  );
}
