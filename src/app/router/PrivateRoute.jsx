import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../features/auth/store/auth.store";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { ROUTES } from "./routePaths";

export function PrivateRoute({
  children,
  allowedRoles = [],
  requiredPermission = null,
  redirectTo = ROUTES.USER.LOGIN,
}) {
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const status = useAuthStore((state) => state.status);

  if (!hasHydrated || status === "loading") return <LoadingScreen fullScreen />;
  if (!user) return <Navigate to={ROUTES.USER.LOGIN} replace />;

  const hasRequiredRole = allowedRoles.length === 0 || allowedRoles.includes(user.roleName);
  const hasRequiredPermission =
    !requiredPermission || user.permissions?.includes(requiredPermission);

  if (!hasRequiredRole || !hasRequiredPermission) return <Navigate to={redirectTo} replace />;
  return children;
}
