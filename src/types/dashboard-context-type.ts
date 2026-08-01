import { Post } from "./post";

export type DashboardContextType = {
  draft: Post;
  setDraft: React.Dispatch<React.SetStateAction<Post>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

