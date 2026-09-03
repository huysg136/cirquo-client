import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { HomePage } from "../../features/home/pages/HomePage";
import { ROUTES } from "./routePaths";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
  { path: ROUTES.USER.LOGIN, element: <LoginPage /> },
  { path: "*", element: <Navigate to={ROUTES.PUBLIC.HOME} replace /> },
];
