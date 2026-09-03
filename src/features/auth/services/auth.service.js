import { request } from "../../../shared/api/httpClient";

export function login(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: credentials,
  });
}
