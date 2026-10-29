import {TelegramUser} from "@/entities/telegram-account/model/types";

export type TelegramLoginResponse = {
    status: string;
};

export type TelegramLoginCodeResponse = {
    status: string;
};

export type TelegramUsersResponse = {
    telegramUsers: TelegramUser[]
}