"use client";

import { GripVertical } from "lucide-react";

import { useDashboard } from "@/hooks/use-dashboard";
import { getImageSize } from "@/lib/utils";
import { emptyDraft } from "@/types/post";

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
import { DatePickerTime } from "./date-picker-time";

export function PostEditor() {
  const { draft, setDraft, setPosts } = useDashboard();

  const isEditing = draft.id !== 0;

  async function handleFilesAdded(newFiles: File[]) {
    const attached = await Promise.all(
      newFiles.map(async (file) => {
        const previewUrl = URL.createObjectURL(file);

        if (file.type.startsWith("image/")) {
          await getImageSize(previewUrl);
        }

        return {
          id: crypto.randomUUID(),
          file,
          previewUrl,
          mimeType: file.type,
          name: file.name,
          size: file.size,
        };
      }),
    );

    setDraft((prev) => ({
      ...prev,
      files: [...prev.files, ...attached],
    }));
  }

  function cleanupFiles() {
    draft.files.forEach((file) => {
      if (file.file) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });
  }

  function handleRemove(id: string) {
    setDraft((prev) => {
      const file = prev.files.find((f) => f.id === id);

      if (file?.file) {
        URL.revokeObjectURL(file.previewUrl);
      }

      return {
        ...prev,
        files: prev.files.filter((f) => f.id !== id),
      };
    });
  }

  function handleSave() {
    if (isEditing) {
      setPosts((prev) =>
        prev.map((post) => (post.id === draft.id ? draft : post)),
      );
    } else {
      setPosts((prev) => [
        ...prev,
        {
          ...draft,
          id: Date.now(),
        },
      ]);
    }

    setDraft(structuredClone(emptyDraft));
  }

  function handleDelete() {
    cleanupFiles();
    if (isEditing) {
      setPosts((prev) => prev.filter((post) => post.id !== draft.id));
    }
    setDraft(structuredClone(emptyDraft));
  }

  function handleCancel() {
    cleanupFiles();
    setDraft(structuredClone(emptyDraft));
  }

  return (
    <Card className="bg-zinc-900 border-zinc-700">
      <CardHeader className="relative">
        <div />
        <CardTitle>{isEditing ? "Edit post" : "New post"}</CardTitle>
        <GripVertical className="absolute right-5 top-1/2 -translate-y-1/2 size-5 cursor-grab" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6">
          <AttachmentPanel
            files={draft.files}
            onFilesAdded={handleFilesAdded}
            onRemove={handleRemove}
          />

          <Textarea
            value={draft.text}
            onChange={(e) =>
              setDraft((prev) => ({
                ...prev,
                text: e.target.value,
              }))
            }
          />
          <DatePickerTime
            value={draft.scheduledAtUtc}
            onChange={(value) =>
              setDraft((prev) => ({
                ...prev,
                scheduledAtUtc: value,
              }))
            }
          />
        </div>
      </CardContent>

      <CardFooter className="justify-between">
        <div>
          {isEditing && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing && (
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}

          <Button onClick={handleSave}>{isEditing ? "Save" : "Create"}</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
