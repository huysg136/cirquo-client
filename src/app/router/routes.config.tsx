import type { ReactElement } from "react";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { HomePage } from "../../features/home/pages/HomePage";
import { ROUTES } from "./routePaths";
import { NotFoundPage } from "../../features/not-found/pages/NotFoundPage";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
  { path: ROUTES.USER.LOGIN, element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
];
