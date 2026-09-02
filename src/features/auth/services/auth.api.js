import { env } from "../../../shared/config/env";

export async function loginRequest(credentials) {
  const response = await fetch(`${env.apiBaseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(payload?.message ?? "Unable to sign in. Please try again.");
  }

  return payload?.result;
}
