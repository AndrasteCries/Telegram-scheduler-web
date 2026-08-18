"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "@/lib/auth-storage";

export function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = getAuth();

    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
}