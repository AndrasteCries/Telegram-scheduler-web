export type AttachmentDto = {
  id: string;
  url: string;
  mimeType: string;
  name: string;
  size: number;
};

export type AttachmentDraft = {
  file: File;
  previewUrl: string;
  mimeType: string;
  name: string;
  size: number;
};


export type AttachmentResponseDto = {
  id: number;
  fileName: string;
  mimeType: string;
  size: number;
  order: number;
  url: string;
};