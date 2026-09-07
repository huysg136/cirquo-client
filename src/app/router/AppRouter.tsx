import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StoreLayout } from "../layouts/StoreLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { adminRoutes, standaloneRoutes, storeRoutes } from "./routes.config";
import { PrivateRoute } from "./PrivateRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          {storeRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={["ADMIN", "STAFF"]} redirectTo="/">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {standaloneRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
