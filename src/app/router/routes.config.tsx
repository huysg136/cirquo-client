import type { ReactElement } from "react";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { CartPage } from "../../features/cart/pages/CartPage";
import { HomePage } from "../../features/home/pages/HomePage";
import { ROUTES } from "./routePaths";
import { NotFoundPage } from "../../features/not-found/pages/NotFoundPage";
import { ProfilePage } from "../../features/profile/pages/ProfilePage";
import { AddressPage } from "../../features/address/pages/AddressPage";
import { PrivateRoute } from "./PrivateRoute";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const appRoutes: AppRoute[] = [
  { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
  { path: ROUTES.PUBLIC.CART, element: <CartPage /> },
  { path: ROUTES.USER.LOGIN, element: <LoginPage /> },
  { path: ROUTES.USER.REGISTER, element: <RegisterPage /> },
  {
    path: ROUTES.USER.PROFILE,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.USER.ADDRESSES,
    element: (
      <PrivateRoute>
        <AddressPage />
      </PrivateRoute>
    ),
  },
  { path: "*", element: <NotFoundPage /> },
];
