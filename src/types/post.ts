import { AttachedFile } from "./attached-file";

export type Post = {
  id: number;
  chatId: number;
  text: string;
  scheduledAtUtc: string;
  hangfireJobId: string | null;
  isSent: boolean;
  files: AttachedFile[];
};

export const emptyDraft: Post = {
  id: 0,
  chatId: 429976711,
  text: "",
  scheduledAtUtc: new Date().toISOString(),
  hangfireJobId: null,
  isSent: false,
  files: [],
};