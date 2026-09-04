import type { AuthSession } from "../types/auth.types";

interface AuthRuntime {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

let authRuntime: AuthRuntime | null = null;

export function configureAuthRuntime(runtime: AuthRuntime): void {
  authRuntime = runtime;
}

export function getAuthRuntime(): AuthRuntime {
  if (!authRuntime) {
    throw new Error("Auth runtime has not been configured.");
  }

  return authRuntime;
}
