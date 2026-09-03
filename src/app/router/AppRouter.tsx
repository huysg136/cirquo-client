import { BrowserRouter, Route, Routes } from "react-router-dom";

import { appRoutes } from "./routes.config";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
