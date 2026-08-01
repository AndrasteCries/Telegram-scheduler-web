"use client";

import { CalendarGrid } from "./caldendar-grid";
import { DashboardProvider } from "@/components/dashboard-provider";
import { PostEditorPanel } from "./post-editor-panel";

export function Dashboard() {
  return (
    <div className="flex h-screen">
      <DashboardProvider>
        <section className="flex-1 overflow-auto">
          <CalendarGrid />
        </section>

        <aside className="w-96 border-l">
          <PostEditorPanel />
        </aside>
      </DashboardProvider>
    </div>
  );
}
