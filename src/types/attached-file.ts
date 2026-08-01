export type AttachedFile = {
  id: string;
  file: File | null;
  previewUrl: string;
  mimeType: string;
  name: string;
  size: number;
};