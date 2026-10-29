"use client";

export function PostMiniImage({image}: { image: string }) {
    return (
        <div key={image} className="relative h-12 w-12 overflow-hidden rounded-sm shrink-0">
            <img src={image} alt="" sizes="12px" className="object-cover"/>
        </div>
    );
}
