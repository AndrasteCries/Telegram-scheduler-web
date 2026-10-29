"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader, SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {UserSwitcher} from "./user-switcher";
import {AddTelegramUser} from "../telegramUser/add-telegram-user";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card";
import {useTelegramContext} from "@/hooks/use-telegram-context";
import {Button} from "@/components/ui/button";
import {TelegramChannel} from "../telegramUser/telegram-channel";
import {useEffect} from "react";

export function SidebarLeft({...props}: React.ComponentProps<typeof Sidebar>) {
    const {channels, activeTelegramUser, getTelegramUsers, getChannels} = useTelegramContext();

    async function handleReloadInfo() {
        await getTelegramUsers();

        if (!activeTelegramUser) {
            return;
        }

        await getChannels(activeTelegramUser.id);
        console.log(channels);
    }

    useEffect(() => {
        if (!activeTelegramUser) {
            return;
        }

        getChannels(activeTelegramUser.id);
    }, [activeTelegramUser, getChannels]);

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <UserSwitcher/>
            </SidebarHeader>
            <SidebarContent className="p-2 gap-10">
                <SidebarMenuItem>
                    <Card>
                        <CardContent className="flex flex-col pt-4 pb-4 pl-1 pr-1 gap-2">
                            {channels.length === 0 ? <p>0 channels</p> :
                                channels.map((channel) => (
                                    <TelegramChannel
                                        key={channel.id}
                                        channel={{
                                            id: channel.id,
                                            title: channel.title,
                                            avatarUrl: channel.avatarUrl ?? "/images/avatar-channel-placeholder.jpg",
                                        }}
                                    />
                                ))
                            }
                        </CardContent>
                    </Card>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Card>
                        <CardTitle className="justify-center">Add more accounts</CardTitle>
                        <CardContent>
                            <AddTelegramUser></AddTelegramUser>
                        </CardContent>
                    </Card>
                </SidebarMenuItem>
                <SidebarMenuItem className="mt-10">
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" onClick={handleReloadInfo}>
                            Update
                        </Button>
                    </CardFooter>
                </SidebarMenuItem>
            </SidebarContent>
            <SidebarRail/>
        </Sidebar>
    );
}
