import type {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "@/entities/auth";
import {mockLogin, mockRegister} from "@/lib/mock-auth";
import {User, UserResponse} from "@/entities/user/model/types";
import {apiFetch} from "@/lib/api/fetcher";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function login(request: LoginRequest): Promise<LoginResponse> {
    if (USE_MOCKS) return mockLogin(request);

    const response = await apiFetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(request),
    });

    return response.json();
}

export async function register(request: RegisterRequest): Promise<RegisterResponse> {
    if (USE_MOCKS) return mockRegister(request);

    const response = await apiFetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(request),
    });

    return response.json();
}

export async function getUser(): Promise<User> {
    const response = await apiFetch(`/api/auth/user`, { method: "GET" });
    const data: UserResponse = await response.json();

    return {
        id: data.id,
        login: data.login,
        // TODO: remove mock data
        name: "John",
        surname: "Doe",
        avatarPreviewUrl: "/images/icon_logo.jpg",
        telegramAccounts: [],
    };
}

export async function logout(): Promise<void> {
    await apiFetch("/api/auth/logout", { method: "POST" });
}