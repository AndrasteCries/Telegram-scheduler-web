"use client";

import { useAuth } from "@/hooks/use-auth";
import { AuthContext } from "@/components/dashboard-context";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}