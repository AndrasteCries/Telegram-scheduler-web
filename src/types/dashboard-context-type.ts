import { Post } from "./post";

export type DashboardContextType = {
  selectedSlot: Post | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<Post | null>>;
};

