"use client";

import { useCallback, useEffect, useState } from "react";
import { login as Login, register as Register, getUser as GetUser, logout as LogoutApi } from "@/lib/api/auth";
import type { LoginResponse, RegisterResponse } from "@/entities/auth";
import { User } from "@/entities/user/model/types";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        GetUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    const login = useCallback(async (loginName: string, password: string): Promise<LoginResponse> => {
        const response = await Login({ login: loginName, password });
        const freshUser = await GetUser();
        setUser(freshUser);
        return response;
    }, []);

    const register = useCallback(async (username: string, password: string): Promise<RegisterResponse> => {
        return await Register({ login: username, password });
    }, []);

    const logout = useCallback(async () => {
        await LogoutApi();
        setUser(null);
    }, []);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };
}