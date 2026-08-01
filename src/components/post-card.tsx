"use client";

import { Post } from "@/types/post";
import { Card, CardContent } from "./ui/card";
import { PostMiniImage } from "./post-mini-image";
import { useDashboard } from "@/hooks/use-dashboard";
import { PostFileMiniImage } from "./post-file-mini-image";

export function PostCard({ post }: { post: Post }) {
  const { setDraft } = useDashboard();

  return (
    <Card
      className="rounded border   text-white max-h-32 p-2"
      onClick={() => {
        setDraft(structuredClone(post));
      }}
    >
      <CardContent className="[--card-spacing:0px] flex flex-col gap-2 ">
        {post.files?.length !== 0 ? (
          <div className="flex flex-row gap-2 overflow-x-auto flex-nowrap scrollbar-hide">
            {post.files?.map((file) => (
              <div key={file.id}>
                {file.mimeType.startsWith("image/") ? (
                  <PostMiniImage image={file.previewUrl} />
                ) : (
                  <PostFileMiniImage mimeType={file.mimeType} />
                )}
              </div>
            ))}
          </div>
        ) : null}
        <p className="truncate">{post.text}</p>
      </CardContent>
    </Card>
  );
}
