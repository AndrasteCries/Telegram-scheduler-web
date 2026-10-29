import {AttachmentDraft, AttachmentDto, AttachmentResponseDto} from "@/entities/attachment/model/types";

export type PostDTO = {
    id: number;
    telegramChannelId: number;
    text: string;
    status: string;
    files: AttachmentDto[];
};

export type PostDraft = {
  text: string;
  attachments: AttachmentDraft[];
}

export type PostResponseDto = {
    id: number;
    channelId: number;
    text: string;
    scheduledAtUtc: string;
    status: number;
    attachments: AttachmentResponseDto[];
};