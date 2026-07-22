"use client"

import { Post } from "@/types/post"

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="border border-gray-700 p-3 text-white">
      <p>{post.text}</p>
    </div>
  );
}