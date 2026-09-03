import { request } from "../../../shared/api/httpClient";
import type { AuthSession, LoginCredentials } from "../types/auth.types";

export function loginRequest(credentials: LoginCredentials): Promise<AuthSession> {
  return request<AuthSession>("/auth/login", {
    method: "POST",
    body: credentials,
  });
}
