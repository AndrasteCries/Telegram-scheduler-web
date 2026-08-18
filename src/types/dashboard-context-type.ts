import { Post } from "./post";
import { SlotTemplate } from "./slot-template";

export type DashboardContextType = {
  draft: Post;
  setDraft: React.Dispatch<React.SetStateAction<Post>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

export type ChannelContextType = {
  templates: SlotTemplate[];
  setTemplates: React.Dispatch<React.SetStateAction<SlotTemplate[]>>;
}

