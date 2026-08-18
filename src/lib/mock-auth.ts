import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function mockLogin(
  request: LoginRequest,
): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    request.login !== "admin" ||
    request.password !== "admin"
  ) {
    throw new Error("Invalid login or password");
  }

  return {
    user: {
      id: 1,
      login: "admin",
    },
  };
}