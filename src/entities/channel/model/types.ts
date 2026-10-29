export type Channel = {
    id: number;
    telegramChatId: number;
    title: string;
    username: string | null;
    isEnabled: boolean;
    avatarUrl?: string;
};