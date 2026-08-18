"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function UserLogin() {
  const { login, isLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(username, password);

      router.push("/dashboard");
    } catch {}
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-login">Login</FieldLabel>

          <Input
            id="form-login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="form-password">Password</FieldLabel>

          <Input
            id="form-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </Field>

        <Field orientation="horizontal">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
