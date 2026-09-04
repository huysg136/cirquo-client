import { create } from "zustand";

import { configureAuthRuntime } from "../lib/authRuntime";
import { loginRequest } from "../services/auth.service";
import type { AuthSession, AuthStore } from "../types/auth.types";

const SESSION_STORAGE_KEY = "cirquo_auth";

function parseSession(serializedSession: string | null): AuthSession | null {
  return serializedSession ? (JSON.parse(serializedSession) as AuthSession) : null;
}

function getCurrentStorage(): Storage | null {
  if (localStorage.getItem(SESSION_STORAGE_KEY)) {
    return localStorage;
  }

  if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
    return sessionStorage;
  }

  return null;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  hasHydrated: false,
  hydrateSession: () => {
    const serializedSession =
      localStorage.getItem(SESSION_STORAGE_KEY) ?? sessionStorage.getItem(SESSION_STORAGE_KEY);

    try {
      const session = parseSession(serializedSession);
      set({
        user: session?.user ?? null,
        accessToken: session?.accessToken ?? null,
        refreshToken: session?.refreshToken ?? null,
        status: session?.accessToken ? "authenticated" : "idle",
        hasHydrated: true,
      });
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      set({ hasHydrated: true });
    }
  },
  login: async (credentials, rememberMe) => {
    set({ status: "loading" });

    try {
      const session = await loginRequest(credentials);
      // store the new session in one place only; remove a previous session from the other storage.
      const storage = rememberMe ? localStorage : sessionStorage;
      const otherStorage = rememberMe ? sessionStorage : localStorage;

      otherStorage.removeItem(SESSION_STORAGE_KEY);
      storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
      set({
        user: session.user,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        status: "authenticated",
      });

      return session;
    } catch (error) {
      set({ status: "idle" });
      throw error;
    }
  },
  setSession: (session) => {
    const storage = getCurrentStorage() ?? sessionStorage;

    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    set({
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      status: "authenticated",
    });
  },
  updateUser: (user) => {
    [localStorage, sessionStorage].forEach((storage) => {
      const session = parseSession(storage.getItem(SESSION_STORAGE_KEY));

      if (session) {
        storage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ ...session, user }));
      }
    });

    set({ user });
  },
  logout: () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      status: "idle",
    });
  },
}));

configureAuthRuntime({
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  setSession: (session) => useAuthStore.getState().setSession(session),
  logout: () => useAuthStore.getState().logout(),
});
