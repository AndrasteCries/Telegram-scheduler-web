"use client"

import * as React from "react";

import {NavUser} from "@/components/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import {PostEditor} from "../postEditor/post-editor";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import {ChannelSettings} from "./right/channel-settings";
import {useAuthContext} from "@/hooks/use-auth-context";
import {useEffect, useState} from "react";
import {User} from "@/entities/user/model/types";

export function SidebarRight({...props}: React.ComponentProps<typeof Sidebar>) {
    const {user} = useAuthContext();

    if (!user) {
        return null;
    }

    return (
        <Sidebar
            collapsible="none"
            className="sticky top-0 hidden h-svh border-l lg:flex "
            {...props}
        >
            <SidebarHeader className="h-16 border-b border-sidebar-border ">
                <NavUser user={{id: user.id, login: user.login, avatar: user.avatarPreviewUrl}}/>
            </SidebarHeader>
            <SidebarContent className="bg-amber-700">
                <Tabs className="w-[24rem] min-w-[24rem] max-w-[24rem]" defaultValue="overview">
                    <TabsList variant="line">
                        <TabsTrigger value="channel">Channel</TabsTrigger>
                        <TabsTrigger value="post">Post</TabsTrigger>
                    </TabsList>
                    <TabsContent value="channel" className="p-2">
                        <ChannelSettings/>
                    </TabsContent>
                    <TabsContent value="post" className="p-2">
                        <PostEditor/>
                    </TabsContent>
                </Tabs>
                <SidebarSeparator className="mx-0"/>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem></SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
