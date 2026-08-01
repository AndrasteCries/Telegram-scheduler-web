"use client";

import Image from "next/image";

export function PostMiniImage({image}: {image: string}) {
  return (
    <div key={image} className="relative h-12 w-12 overflow-hidden rounded-sm shrink-0">
      <Image src={image} alt="" fill sizes="12px" className="object-cover" />
    </div>
  );
}
