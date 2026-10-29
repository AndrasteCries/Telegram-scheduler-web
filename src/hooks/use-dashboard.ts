import {useCallback, useMemo, useState} from "react";
import {emptyDraft, Post} from "@/entities/post";
import { SlotTemplate } from "@/entities/slot-template";
import { useTelegramContext } from "@/hooks/use-telegram-context";
import {
    getPosts as GetPosts,
    createPost as CreatePost,
    updatePost as UpdatePost,
    deletePost as DeletePost,
    getTemplates as GetSlotTemplates,
    updateTemplates as UpdateTemplates,
} from "@/lib/api/posts";
import {getDaysRange} from "@/lib/calendar-utils";

export function useDashboard() {

    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + 13);

    const { from, to } = useMemo(() => {
        const today = new Date();
        const end = new Date(today);
        end.setDate(end.getDate() + 13);
        return getDaysRange(today, end);
    }, []);

    const { channels } = useTelegramContext();

    const [activeChannelId, setActiveChannelId] =
        useState<number | null>(null);

    const [draft, setDraft] = useState<Post>(emptyDraft);
    const [posts, setPosts] = useState<Post[]>([]);
    const [templates, setTemplates] = useState<SlotTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const activeChannel =
        channels.find(channel => channel.id === activeChannelId) ?? null;

    const selectChannel = useCallback(
        async (channelId: number | null) => {
            setActiveChannelId(channelId);

            if (channelId === null) {
                setPosts([]);
                setTemplates([]);
                setIsLoading(false);
                return;
            }

            setPosts([]);
            setTemplates([]);
            setIsLoading(true);

            try {
                const [posts, templates] = await Promise.all([
                    GetPosts(channelId, from, to),
                    GetSlotTemplates(channelId),
                ]);

                setPosts(posts);
                setTemplates(templates);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const requireActiveChannelId = useCallback(() => {
        if (activeChannelId === null) {
            throw new Error("No active channel selected");
        }

        return activeChannelId;
    }, [activeChannelId]);

    const createPost = useCallback(
        async (post: Post) => {
            const channelId = requireActiveChannelId();

            const created = await CreatePost(channelId, post);

            setPosts(prev => [...prev, created]);

            return created;
        },
        [requireActiveChannelId]
    );

    const updatePost = useCallback(
        async (post: Post) => {
            const channelId = requireActiveChannelId();

            const updated = await UpdatePost(channelId, post);

            setPosts(prev =>
                prev.map(existingPost =>
                    existingPost.id === updated.id
                        ? updated
                        : existingPost
                )
            );

            return updated;
        },
        [requireActiveChannelId]
    );

    const deletePost = useCallback(
        async (postId: number) => {
            const channelId = requireActiveChannelId();

            await DeletePost(channelId, postId);

            setPosts(prev =>
                prev.filter(post => post.id !== postId)
            );
        },
        [requireActiveChannelId]
    );

    const updateTemplates = useCallback(
        async (updatedTemplates: SlotTemplate[]) => {
            const channelId = requireActiveChannelId();

            await UpdateTemplates(channelId, updatedTemplates);

            setTemplates(updatedTemplates);
        },
        [requireActiveChannelId]
    );

    return {
        activeChannel,
        activeChannelId,
        selectChannel,

        draft,
        setDraft,

        posts,
        templates,
        updateTemplates,

        createPost,
        updatePost,
        deletePost,

        isLoading,
    };
}