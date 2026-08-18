// lib/api/auth.ts

import type { LoginRequest, LoginResponse } from "@/types/auth";
import { mockLogin } from "@/lib/mock-auth";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export async function login(
  request: LoginRequest,
): Promise<LoginResponse> {
  if (USE_MOCKS) {
    return mockLogin(request);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    throw new Error("Invalid login or password");
  }

  return response.json();
}