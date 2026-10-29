import {
    TelegramLoginCodeResponse,
    TelegramLoginResponse,
} from "@/entities/telegram-things";
import {TelegramUser} from "@/entities/telegram-account/model/types";
import {Channel} from "@/entities/channel/model/types";
import {apiFetch} from "@/lib/api/fetcher";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

//todo no need to send id cuz its must auto work
export async function RequestCode(phoneNumber: string): Promise<TelegramLoginResponse> {
    if (USE_MOCKS) {
        //todo
    }

    const response = await apiFetch(
        `/api/telegram/session/phone`,
        {
            method: "POST",
            body: JSON.stringify(phoneNumber),
        },
    );

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || `Request failed: ${response.status}`);
    }

    const text = await response.text();
    return JSON.parse(text);
}

export async function ConfirmCode(code: string): Promise<TelegramLoginCodeResponse> {
    if (USE_MOCKS) {
        //todo
    }
    const response = await apiFetch(
        `/api/telegram/session/code`,
        {
            method: "POST",
            body: JSON.stringify(code),
        },
    );

    if (!response.ok) throw new Error("Something wrong");

    return response.json();
}

export async function GetTelegramUsers(): Promise<TelegramUser[]> {
    const response = await apiFetch(
        `/api/telegram/session/get-users`, {
            method: "GET",
        });

    if (!response.ok) {
        throw new Error("Failed to get Telegram accounts");
    }
    return await response.json();
}

export async function GetTelegramUserChannels(
    telegramUserId: number
): Promise<Channel[]> {
    const response = await apiFetch(
        `/api/telegram/session/channels/sync?telegramAccountId=${telegramUserId}`,
        {
            method: "GET",
        }
    );

    console.log("response.bodyUsed BEFORE json:", response.bodyUsed);

    if (!response.ok) {
        throw new Error("Failed to get channels");
    }

    const result = await response.json();

    console.log("result:", result);
    console.log("response.bodyUsed AFTER json:", response.bodyUsed);

    return result;
}