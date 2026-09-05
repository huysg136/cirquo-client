export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface LoginFormValues extends LoginCredentials {
  rememberMe: boolean;
}

export type RegisterFormValues = RegisterCredentials;

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
  phone?: string | null;
  roleName?: string;
  permissions?: string[];
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  user: AuthUser;
}

export interface RegisteredUser extends AuthUser {
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt: string;
  updatedAt: string;
}

export type AuthStatus = "idle" | "loading" | "authenticated";

export interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: AuthStatus;
  hasHydrated: boolean;
  hydrateSession: () => void;
  login: (credentials: LoginCredentials, rememberMe: boolean) => Promise<AuthSession>;
  setSession: (session: AuthSession) => void;
  updateUser: (user: AuthUser) => void;
  logout: () => void;
}
