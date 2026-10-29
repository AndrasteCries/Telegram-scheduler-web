export async function apiFetch(path: string, options: RequestInit = {}) {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(text || `Request failed: ${response.status}`);
    }

    return response;
}