import { Navigate } from "react-router-dom";

import { LoginPage } from "../../features/auth/pages/LoginPage";
import { ROUTES } from "./routePaths";

export const appRoutes = [
  {
    path: ROUTES.PUBLIC.HOME,
    element: <Navigate to={ROUTES.USER.LOGIN} replace />,
  },
  {
    path: ROUTES.USER.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.PUBLIC.HOME} replace />,
  },
];
