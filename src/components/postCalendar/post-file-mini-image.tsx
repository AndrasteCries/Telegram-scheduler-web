import {
  File,
  FileArchive,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
} from "lucide-react";

export function PostFileMiniImage({ mimeType }: { mimeType: string }) {
  let icon;

  if (mimeType.startsWith("image/")) {
    icon = <FileImage className="size-5" />;
  } else if (mimeType.startsWith("video/")) {
    icon = <FileVideo className="size-5" />;
  } else if (mimeType.startsWith("audio/")) {
    icon = <FileAudio className="size-5" />;
  } else if (
    mimeType === "application/zip" ||
    mimeType === "application/x-zip-compressed"
  ) {
    icon = <FileArchive className="size-5" />;
  } else if (
    mimeType === "application/pdf" ||
    mimeType.startsWith("text/")
  ) {
    icon = <FileText className="size-5" />;
  } else {
    icon = <File className="size-5" />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-3 bg-black rounded-sm shrink-0">
      {icon}
    </div>
  );
}