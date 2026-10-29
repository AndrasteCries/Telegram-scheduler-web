// components/auth-guard.tsx
"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/hooks/use-auth-context";

export function AuthGuard({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useAuthContext();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) return <div/>;
    if (!isAuthenticated) return null;

    return <>{children}</>;
}