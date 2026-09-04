import type { ReactElement } from "react";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { CartPage } from "../../features/cart/pages/CartPage";
import { HomePage } from "../../features/home/pages/HomePage";
import { ROUTES } from "./routePaths";
import { NotFoundPage } from "../../features/not-found/pages/NotFoundPage";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
  { path: ROUTES.PUBLIC.CART, element: <CartPage /> },
  { path: ROUTES.USER.LOGIN, element: <LoginPage /> },
  { path: "*", element: <NotFoundPage /> },
];
