"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PostForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [chatId, setChatId] = useState(429976711);
    const [text, setText] = useState("");
    const [scheduledAt, setScheduledAt] = useState("");
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatId,
                    text,
                    scheduledAtUtc: new Date(scheduledAt).toISOString(),
                }),
            });

            if (!response.ok) {
                const message = await response.text();
                setError(message || "Cant create post");
                return;
            }

            setText("");
            setScheduledAt("");
            router.refresh();
        }

        catch {
            setError("Network error");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={chatId}
                onChange={(e) => setChatId(Number(e.target.value))}
            />

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
            />

            <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Creating..." : "Create"}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

    );
}