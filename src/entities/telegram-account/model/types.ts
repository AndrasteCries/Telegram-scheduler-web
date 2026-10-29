import {Channel} from "@/entities/channel/model/types";

export type TelegramUser = {
    id: number;
    username: string | null;
    phoneNumber: string;
    channels: Channel[];
    avatarUrl?: string;
};