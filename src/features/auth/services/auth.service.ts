import { request } from "../../../shared/api/httpClient";
import type {
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
  RegisteredUser,
} from "../types/auth.types";

export function loginRequest(credentials: LoginCredentials): Promise<AuthSession> {
  return request<AuthSession>("/auth/login", {
    method: "POST",
    body: credentials,
    skipAuthRefresh: true,
  });
}

export function registerRequest(credentials: RegisterCredentials): Promise<RegisteredUser> {
  return request<RegisteredUser>("/auth/register", {
    method: "POST",
    body: credentials,
    skipAuthRefresh: true,
  });
}
