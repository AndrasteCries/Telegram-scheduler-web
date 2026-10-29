"use client";

import {useCallback, useMemo, useState} from "react";
import {Channel} from "@/entities/channel/model/types";
import {ConfirmCode, GetTelegramUserChannels, GetTelegramUsers, RequestCode} from "@/lib/api/telegram";
import {TelegramUser} from "@/entities/telegram-account/model/types";

export function useTelegram() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [telegramUsers, setTelegramTelegramUsers] = useState<TelegramUser[]>([]);
    const [activeTelegramUserId, setActiveTelegramUserId] = useState<number | null>(null);

    const activeTelegramUser = useMemo(
        () => telegramUsers.find(user => user.id === activeTelegramUserId) ?? telegramUsers[0],
        [telegramUsers, activeTelegramUserId]
    );

    const sendCode = useCallback(async (phoneNumber: string) => {
        return await RequestCode(phoneNumber);
    }, []);

    const confirmCode = useCallback(async (receivedCode: string) => {
        return await ConfirmCode(receivedCode);
    }, []);

    const getTelegramUsers = useCallback(async (): Promise<TelegramUser[]> => {
        const result = await GetTelegramUsers();
        setTelegramTelegramUsers(result);
        return result;
    }, []);

    const getChannels = useCallback(async (telegramUserId: number): Promise<Channel[]> => {
        const result = await GetTelegramUserChannels(telegramUserId);
        setChannels(result);
        return result;
    }, []);

    return {
        telegramUsers,
        getTelegramUsers,
        channels,
        getChannels,
        sendCode,
        confirmCode,
        activeTelegramUser,
        activeTelegramUserId,
        setActiveTelegramUserId,
    };
}