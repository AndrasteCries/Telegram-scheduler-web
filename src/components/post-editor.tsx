"use client";

import { useState } from "react";
import { AttachmentPanel } from "./attachment-panel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { GripVertical } from "lucide-react";
import { useDashboard } from "@/hooks/use-dashboard";
import { AttachedFile } from "@/types/attached-file";
import { getImageSize } from "@/lib/utils";

export function PostEditor() {
  const { selectedSlot, setSelectedSlot } = useDashboard();
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  async function handleFilesAdded(newFiles: File[]) {
    const attached = await Promise.all(
      newFiles.map(async (file) => {
        console.log("processing", file.name);
        const previewUrl = URL.createObjectURL(file);

        let width = 0;
        let height = 0;

        if (file.type.startsWith("image/")) {
          const size = await getImageSize(previewUrl);
          width = size.width;
          height = size.height;
        }

        return {
          id: crypto.randomUUID(),
          file,
          previewUrl,
          width,
          height,
        };
      }),
    );
    console.log("result:", newFiles);
    setAttachedFiles((prev) => [...prev, ...attached]);
  }

  function handleRemove(id: string) {
    setAttachedFiles((prev) => {
      const file = prev.find((f) => f.id === id);

      if (file) {
        URL.revokeObjectURL(file.previewUrl);
      }

      return prev.filter((f) => f.id !== id);
    });
  }

  return (
    <Card className="bg-zinc-900 border-zinc-700">
      <CardHeader className="relative">
        <div />
        <CardTitle className=" text-center w-full">New post</CardTitle>
        <GripVertical className="absolute right-5 top-1/2 size-5 -translate-y-1/2 cursor-grab text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <AttachmentPanel
            files={attachedFiles}
            onFilesAdded={handleFilesAdded}
            onRemove={handleRemove}
          />
          <Textarea placeholder="Type your message here." />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button disabled={selectedSlot === null} className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
