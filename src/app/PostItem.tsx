"use client";

import type { Post } from "@/types/post"
import { useRouter } from "next/navigation";

export function PostItem({ post }: { post: Post }) {
    const router = useRouter();

    const handleDelete = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${post.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            router.refresh();
        } else {
            console.error("Cant find post");
        }
    };

    return (
        <div className="rounded-lg border border-gray-700 p-4 text-white" >
            <p>{post.text}</p>
            <p className="text-sm text-gray-400">{post.scheduledAtUtc}</p>
            <button onClick={handleDelete}>
                Delete
            </button>
        </div >
    );
}