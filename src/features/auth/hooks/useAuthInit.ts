import { useEffect } from "react";

import { useAuthStore } from "../store/auth.store";

export function useAuthInit(): void {
  const hydrateSession = useAuthStore((state) => state.hydrateSession);

  useEffect(() => {
    hydrateSession();
  }, [hydrateSession]);
}
