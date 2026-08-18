"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthGuard } from "@/components/user/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
