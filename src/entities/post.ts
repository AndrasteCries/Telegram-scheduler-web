import {AttachedFile} from "./attached-file";

export type Post = {
    id: number;
    text: string;
    scheduledAtUtc: string;
    attachments: AttachedFile[];
};

export const emptyDraft: Post = {
    id: 0,
    text: "",
    scheduledAtUtc: "",
    attachments: [],
};