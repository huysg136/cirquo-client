import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StoreLayout } from "../layouts/StoreLayout";
import { standaloneRoutes, storeRoutes } from "./routes.config";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          {storeRoutes.map(({ path, element }) => (
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
