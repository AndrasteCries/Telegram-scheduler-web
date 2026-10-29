"use client"

import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {ChevronDownIcon} from "lucide-react"
import {TelegramUser} from "@/entities/telegram-account/model/types";
import {useTelegramContext} from "@/hooks/use-telegram-context";

export function UserSwitcher() {

    const {
        telegramUsers,
        activeTelegramUser,
        setActiveTelegramUserId,
    } = useTelegramContext();

    const currentUser = activeTelegramUser ?? telegramUsers[0];

    if (!currentUser) {
        return null;
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                className="w-fit px-1.5 aria-expanded:bg-muted aria-expanded:text-foreground"
                            />
                        }
                    >
                        <div
                            className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                            {activeTelegramUser?.avatarUrl}
                        </div>

                        <span className="truncate font-medium">
                            {activeTelegramUser?.username}
                        </span>

                        <ChevronDownIcon className="opacity-50"/>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-64 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Telegram accounts
                            </DropdownMenuLabel>

                            {telegramUsers.map((user, index) => (
                                <DropdownMenuItem
                                    key={user.id}
                                    onClick={() => setActiveTelegramUserId(user.id)}
                                    className="gap-2 p-2"
                                >
                                    <div className="flex size-6 items-center justify-center rounded-xs border">
                                        {user.avatarUrl}
                                    </div>

                                    {user.username}

                                    <DropdownMenuShortcut>
                                        ⌘{index + 1}
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}