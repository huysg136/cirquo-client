export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormValues extends LoginCredentials {
  rememberMe: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  roleName?: string;
  permissions?: string[];
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  user: AuthUser;
}

export type AuthStatus = "idle" | "loading" | "authenticated";

export interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus;
  hasHydrated: boolean;
  hydrateSession: () => void;
  login: (credentials: LoginCredentials, rememberMe: boolean) => Promise<AuthSession>;
}
