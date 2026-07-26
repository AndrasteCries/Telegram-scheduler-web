"use client";

import { Post } from "@/types/post";
import { Card, CardContent, CardDescription } from "./ui/card";
import { PostMiniImage } from "./post-mini-image";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="rounded border   text-white max-h-32 p-2">
      <CardContent className="[--card-spacing:0px]">
        {post.files?.length !== 0 ? (
          <div className="flex flex-row gap-0.5 overflow-x-auto flex-nowrap scrollbar-hide">
            {post.files?.map((file) => (
              <PostMiniImage key={file.id} image={file.previewUrl} />
            ))}
          </div>
        ) : null}
        <p className="truncate">{post.text}</p>
      </CardContent>
    </Card>
  );
}
