import { create } from "zustand";
import { login } from "../services/auth.service";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  status: "idle",
  hasHydrated: false,
  hydrateSession: () => {
    const serializedSession =
      localStorage.getItem("cirquo_auth") ?? sessionStorage.getItem("cirquo_auth");

    try {
      const session = serializedSession ? JSON.parse(serializedSession) : null;
      set({
        user: session?.user ?? null,
        accessToken: session?.accessToken ?? null,
        status: session?.accessToken ? "authenticated" : "idle",
        hasHydrated: true,
      });
    } catch {
      localStorage.removeItem("cirquo_auth");
      sessionStorage.removeItem("cirquo_auth");
      set({ hasHydrated: true });
    }
  },
  login: async (credentials, rememberMe) => {
    set({ status: "loading" });
    try {
      const session = await login(credentials);
      // store the new session in one place only; remove a previous session from the other storage.
      const storage = rememberMe ? localStorage : sessionStorage;
      const otherStorage = rememberMe ? sessionStorage : localStorage;
      otherStorage.removeItem("cirquo_auth");
      storage.setItem("cirquo_auth", JSON.stringify(session));
      set({ user: session.user, accessToken: session.accessToken, status: "authenticated" });
      return session;
    } catch (error) {
      set({ status: "idle" });
      throw error;
    }
  },
}));
