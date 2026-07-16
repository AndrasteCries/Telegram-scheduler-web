export type Post = {
  id: number;
  chatId: number;
  text: string;
  scheduledAtUtc: string;
  hangfireJobId: string | null;
  isSent: boolean;
};