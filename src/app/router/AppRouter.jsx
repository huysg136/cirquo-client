import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { appRoutes } from "./routes.config";
import { ROUTES } from "./routePaths";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen fullScreen />}>
        <Routes>
          <Route path={ROUTES.PUBLIC.HOME} element={<Navigate to={ROUTES.USER.LOGIN} replace />} />
          {appRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to={ROUTES.PUBLIC.HOME} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
