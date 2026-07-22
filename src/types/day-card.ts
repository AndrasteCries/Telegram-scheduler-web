import { Post } from "./post";

export type DayCard = {
  slots: Record<string, Post | null>;
  unassigned: Post[];
};