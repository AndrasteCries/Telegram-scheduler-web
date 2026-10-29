import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/entities/auth";

export async function mockLogin(request: LoginRequest): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (request.login !== "admin" || request.password !== "admin") {
    throw new Error("Invalid login or password");
  }

  return {
    id: 1,
    login: "admin",
  };
}

export async function mockRegister(
  request: RegisterRequest,
): Promise<RegisterResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return {
    id: 1,
    login: "admin",
  };
}
