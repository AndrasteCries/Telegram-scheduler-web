"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/hooks/use-auth-context";

export function GuestGuard({children}: { children: React.ReactNode }) {
    const router = useRouter();
    const {isAuthenticated, isLoading} = useAuthContext();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) return <div/>;
    if (isAuthenticated) return null;

    return <>{children}</>;
}