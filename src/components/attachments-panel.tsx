"use client";

import { XIcon, FileIcon } from "lucide-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";

type AttachedFile = {
  file: File;
  previewUrl: string;
};

export function AttachmentsPanel({
  files,
  onRemove,
}: {
  files: AttachedFile[];
  onRemove: (index: number) => void;
}) {
 

  return (
    <div className="space-y-4">
      
    </div>
  );
}