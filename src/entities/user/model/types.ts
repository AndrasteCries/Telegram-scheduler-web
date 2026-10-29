import {TelegramUser} from "@/entities/telegram-account/model/types";

export type User = {
    id: number;
    name: string;
    surname: string;
    login: string;
    avatarPreviewUrl: string;
    telegramAccounts: TelegramUser[];
}

export type UserResponse = {
    id: number;
    login: string;
}