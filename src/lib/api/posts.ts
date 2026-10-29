import {Post} from "@/entities/post";
import {apiFetch} from "@/lib/api/fetcher";
import {SlotTemplate} from "@/entities/slot-template";
import {PostResponseDto} from "@/entities/post/model/types";
import {AttachedFile} from "@/entities/attached-file";

export async function getPosts(channelId: number, from: Date, to: Date): Promise<Post[]> {
    const params = new URLSearchParams({
        from: from.toISOString(),
        to: to.toISOString(),
    });

    const response = await apiFetch(`/api/channels/${channelId}/posts?${params}`, { method: "GET" });
    const data: PostResponseDto[] = await response.json();

    return data.map((post): Post => ({
        id: post.id,
        text: post.text,
        scheduledAtUtc: post.scheduledAtUtc,
        attachments: post.attachments
            .filter((a) => a.url)
            .map((a): AttachedFile => ({
                id: a.id,
                previewUrl: a.url,
                mimeType: a.mimeType,
                name: a.fileName,
                size: a.size,
            })),
    }));
}

export async function createPost(channelId: number, post: Post): Promise<Post> {
    const formData = new FormData();
    formData.append("text", post.text);
    formData.append("scheduledAtUtc", post.scheduledAtUtc);
    post.attachments.forEach((attachment) => {
        if (attachment.file) {
            formData.append("files", attachment.file);
        }
    });
    console.log(formData)
    console.log(post.scheduledAtUtc)


    const response = await apiFetch(`/api/channels/${channelId}/posts`, {
        method: "POST",
        body: formData,
    });

    return response.json();
}

export async function updatePost(channelId: number, post: Post): Promise<Post> {
    const formData = new FormData();
    formData.append("text", post.text);
    formData.append("scheduledAtUtc", post.scheduledAtUtc);

    post.attachments
        .filter((a) => a.id !== 0)
        .forEach((a) => formData.append("keepAttachmentIds", String(a.id)));

    post.attachments
        .filter((a) => a.file)
        .forEach((a) => formData.append("newFiles", a.file!));

    const response = await apiFetch(`/api/channels/${channelId}/posts/${post.id}`, {
        method: "PUT",
        body: formData,
    });

    return response.json();
}

export async function deletePost(channelId: number, id: number): Promise<void> {
    await apiFetch(`/api/channels/${channelId}/posts/${id}`, { method: "DELETE" });
}

export async function getTemplates(channelId: number): Promise<SlotTemplate[]> {
    const response = await apiFetch(
        `/api/channels/${channelId}/slot-templates`,
        { method: "GET" }
    );

    return response.json();
}

export async function updateTemplates(channelId: number, templates: SlotTemplate[]): Promise<SlotTemplate[]> {
    const response = await apiFetch(`/api/channels/${channelId}/slot-templates`, {
        method: "POST",
        body: JSON.stringify(templates),
    });

    return response.json();
}
