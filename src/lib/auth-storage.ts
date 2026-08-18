import type { LoginResponse } from "@/types/auth";

const AUTH_KEY = "auth";

export function saveAuth(user: LoginResponse) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getAuth(): LoginResponse | null {
  const value = localStorage.getItem(AUTH_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}