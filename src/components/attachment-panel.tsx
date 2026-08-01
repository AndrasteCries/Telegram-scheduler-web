"use client";

import { Button } from "./ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "./ui/empty";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "./ui/attachment";
import { FileIcon, XIcon } from "lucide-react";
import { AttachedFile } from "@/types/attached-file";
import { ImageGrid } from "./post-gallery";

export function AttachmentPanel({
  files,
  onFilesAdded,
  onRemove,
}: {
  files: AttachedFile[];
  onFilesAdded: (files: File[]) => Promise<void>;
  onRemove: (id: string) => void;
}) {
  const images = files.filter((f) => f.mimeType.startsWith("image/"));

  const otherFiles = files.filter((f) => !f.mimeType.startsWith("image/"));

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    await onFilesAdded(Array.from(e.dataTransfer.files));
  };

  return (
    <div>
      <Empty
        className="border border-dashed p-2"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          id="upload-files"
          type="file"
          multiple
          className="hidden"
          onChange={async (e) => {
            await onFilesAdded(Array.from(e.target.files ?? []));
          }}
        />
        {images.length > 0 ? (
          <ImageGrid images={images} onRemove={onRemove} />
        ) : (
          <>
            <EmptyHeader>
              <EmptyTitle>No Photo Yet</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any projects yet. Get started by
                creating your first project.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                Upload Files
              </Button>
            </EmptyContent>
          </>
        )}
      </Empty>
      {otherFiles.length > 0 && (
        <div className="mx-auto flex w-full max-w-sm flex-col gap-2 py-2">
          {otherFiles.map(({ id, name, size }) => {
            return (
              <Attachment className="w-full" key={id}>
                <AttachmentMedia variant="icon">
                  <FileIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{name}</AttachmentTitle>
                  <AttachmentDescription>
                    {(size / 1024).toFixed(0)} KB
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    aria-label={`Delete ${name}`}
                    onClick={() => onRemove(id)}
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            );
          })}
        </div>
      )}
    </div>
  );
}
