import {LoginResponse, RegisterResponse} from "./auth";
import {Post} from "./post";
import {SlotTemplate} from "./slot-template";
import {TelegramUser} from "@/entities/telegram-account/model/types";
import {Channel} from "@/entities/channel/model/types";
import {TelegramLoginCodeResponse, TelegramLoginResponse, TelegramUsersResponse} from "@/entities/telegram-things";
import {User} from "@/entities/user/model/types";

export type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<LoginResponse>;
    register: (username: string, password: string) => Promise<RegisterResponse>;
    logout: () => Promise<void>;
};

export type DashboardContextType = {
    activeChannel: Channel | null;
    activeChannelId: number | null;
    selectChannel: (channelId: number | null) => Promise<void>;
    draft: Post;
    setDraft: React.Dispatch<React.SetStateAction<Post>>;
    posts: Post[];
    createPost: (post: Post) => Promise<Post>;
    updatePost: (post: Post) => Promise<Post>;
    deletePost: (id: number) => Promise<void>;
    templates: SlotTemplate[];
    updateTemplates: (template: SlotTemplate[]) => Promise<void>;
    isLoading: boolean;
};

export type TelegramContextType = {
    telegramUsers: TelegramUser[];
    getTelegramUsers: () => Promise<TelegramUser[]>;
    channels: Channel[];
    getChannels: (telegramId: number) => Promise<Channel[]>;
    sendCode: (phoneNumber: string) => Promise<TelegramLoginResponse>;
    confirmCode: (code: string) => Promise<TelegramLoginCodeResponse>;
    activeTelegramUser: TelegramUser | undefined;
    activeTelegramUserId: number | null;
    setActiveTelegramUserId: React.Dispatch<React.SetStateAction<number | null>>;
}
