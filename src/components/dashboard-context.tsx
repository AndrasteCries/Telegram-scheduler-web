"use client";

import {
    AuthContextType,
    DashboardContextType, TelegramContextType,
} from "@/entities/dashboard-context-type";
import {createContext} from "react";

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const AuthContext = createContext<AuthContextType | null>(null);

export const TelegramContext = createContext<TelegramContextType | null>(null);