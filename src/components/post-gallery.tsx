"use client";

import { useImageDimensions } from "@/hooks/use-image-dimensions";
import { getOrientation } from "@/lib/utils";
import { AttachedFile } from "@/types/attached-file";
import { XIcon } from "lucide-react";
import { buildDynamicTemplate } from "@/lib/photo-grid";


type ImageGridProps = {
  images: AttachedFile[];
  onRemove: (id: string) => void;
  height?: number;
  gap?: number;
};

export function ImageGrid({
  images,
  onRemove,
  height = 260,
  gap = 3,
}: ImageGridProps) {
  const dimensions = useImageDimensions(images.map((img) => img.previewUrl));
  const shown = images.slice(0, 10).filter((img) => dimensions[img.previewUrl]);

  if (shown.length === 0) return null;

  const orientations = shown.map((img) => {
    const { width, height: h } = dimensions[img.previewUrl];
    return getOrientation(width / h);
  });

  const template = buildDynamicTemplate(orientations);

  return (
    <div
      className="grid overflow-hidden rounded-lg"
      style={{
        gridTemplateColumns: template.columns,
        gridTemplateAreas: template.rows.map((row) => `"${row}"`).join(" "),
        gap: `${gap}px`,
        height,
      }}
    >
      {shown.map((image, i) => (
        <div
          key={image.id}
          className="group relative overflow-hidden"
          style={{ gridArea: "abcdefghij"[i] }}
        >
          <img src={image.previewUrl} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onRemove(image.id)}
            aria-label="Delete image"
            className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            <XIcon size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}