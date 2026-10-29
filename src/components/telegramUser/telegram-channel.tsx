"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useDashboardContext} from "@/hooks/use-dashboard-context";

type TelegramChannelProps = {
    id: number;
    title: string | null;
    avatarUrl: string;
}

export function TelegramChannel({channel}: {
    channel: TelegramChannelProps
}) {
    const {selectChannel} = useDashboardContext();

    return (
        <div
            className="flex select-none flex-row gap-2 bg-amber-700 rounded-4xl border border-dashed p-2 transition-colors hover:bg-accent"
            onClick={() => selectChannel(channel.id)}>
            <Avatar>
                <AvatarImage src={channel.avatarUrl} alt={channel.avatarUrl}/>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left  select-none  text-sm leading-tight">
                <span className="truncate font-medium">{channel.id}</span>
                <span className="truncate text-xs">{channel.title}</span>
            </div>
        </div>);
}