import * as React from "react";

import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { PostEditor } from "../postEditor/post-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ChannelSettings } from "./right/channes-settings";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/images/icon_logo.jpg",
  },
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex "
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border ">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent className="bg-amber-700">
        <Tabs  className="w-[24rem] min-w-[24rem] max-w-[24rem]" defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="channel">Channel</TabsTrigger>
            <TabsTrigger value="post">Post</TabsTrigger>
          </TabsList>
          <TabsContent value="channel" className="p-2">
            <ChannelSettings />
          </TabsContent>
          <TabsContent value="post" className="p-2">
            <PostEditor />
          </TabsContent>
        </Tabs>
        <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
