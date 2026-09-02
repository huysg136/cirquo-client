import { createElement, lazy } from "react";
import { ROUTES } from "./routePaths";

const loginPage = lazy(() =>
  import("../../features/auth/pages/LoginPage").then((module) => ({ default: module.LoginPage })),
);

export const appRoutes = [{ path: ROUTES.USER.LOGIN, element: createElement(loginPage) }];
