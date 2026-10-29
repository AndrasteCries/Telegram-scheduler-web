"use client";

import {TelegramContext} from "@/components/dashboard-context";
import {useTelegram} from "@/hooks/use-telegram";
import {useEffect} from "react";

type TelegramProps = {
    children: React.ReactNode;
};

export function TelegramProvider({children}: TelegramProps) {
    const telegram = useTelegram();

    // // todo: временно userId = 6
    // useEffect(() => {
    //     telegram.getTelegramUsers();
    // }, [telegram.getTelegramUsers]);

    return (
        <TelegramContext.Provider value={telegram}>
            {children}
        </TelegramContext.Provider>
    );
}