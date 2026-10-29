"use client"

import {useContext} from "react";
import {TelegramContext} from "@/components/dashboard-context";

export function useTelegramContext() {
    const context = useContext(TelegramContext);

    if (!context) {
        throw new Error(
            "useTelegramContext must be used inside TelegramProvider"
        );
    }

    return context;
}
