import type { Post } from "@/types/post";
import { PostForm } from "@/app/PostForm";
import { PostItem } from "@/app/PostItem";

export default async function TestPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    cache: "no-store",
  });

  const posts: Post[] = await res.json();

  return (
    <div className="space-y-6">
      <PostForm />

      {posts.map((p) => (
        <PostItem key={p.id} post={p} />
      ))}
    </div>
  );
}