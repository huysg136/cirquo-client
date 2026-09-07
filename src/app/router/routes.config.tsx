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
import { AdminDashboardPage } from "../../features/admin/pages/AdminDashboardPage";
import { AdminUsersPage } from "../../features/admin/pages/AdminUsersPage";
import { AdminCategoriesPage } from "../../features/admin/pages/AdminCategoriesPage";
import { AdminProductsPage } from "../../features/admin/pages/AdminProductsPage";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const storeRoutes: AppRoute[] = [
  { path: ROUTES.PUBLIC.HOME, element: <HomePage /> },
  { path: ROUTES.PUBLIC.CART, element: <CartPage /> },
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
];

export const standaloneRoutes: AppRoute[] = [
  { path: ROUTES.USER.LOGIN, element: <LoginPage /> },
  { path: ROUTES.USER.REGISTER, element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export const adminRoutes: AppRoute[] = [
  { path: ROUTES.ADMIN.DASHBOARD, element: <AdminDashboardPage /> },
  { path: ROUTES.ADMIN.USERS, element: <AdminUsersPage /> },
  { path: ROUTES.ADMIN.CATEGORIES, element: <AdminCategoriesPage /> },
  { path: ROUTES.ADMIN.PRODUCTS, element: <AdminProductsPage /> },
];
