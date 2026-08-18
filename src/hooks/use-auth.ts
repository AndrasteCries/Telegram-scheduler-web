"use client";

import { useState } from "react";
import { login as mockLogin } from "@/lib/api/auth";
import { saveAuth, clearAuth, getAuth } from "@/lib/auth-storage";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  async function login(username: string, password: string) {
    setIsLoading(true);

    try {
      const result = await mockLogin({
        login: username,
        password,
      });

      saveAuth(result);

      return result;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    clearAuth();
  }

  function getCurrentUser() {
    return getAuth();
  }

  return {
    login,
    logout,
    getCurrentUser,
    isLoading,
  };
}