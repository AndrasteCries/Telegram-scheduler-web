import { Orientation } from "@/types/photo-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSize(
  url: string,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.src = url;
  });
}

export function getOrientation(aspectRatio: number): Orientation {
  if (aspectRatio > 1.15) return "landscape";
  if (aspectRatio < 0.87) return "portrait";
  return "square";
}
