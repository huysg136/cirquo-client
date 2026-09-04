import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "antd/dist/reset.css";
import "../shared/styles/style.scss";

import { applyTheme } from "../shared/config/theme";
import App from "./App";

applyTheme();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
