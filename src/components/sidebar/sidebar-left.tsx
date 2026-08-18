"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { getChannels } from "@/lib/mock-data";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  const channels = getChannels();

  return (
    <Sidebar
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={channels} />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
