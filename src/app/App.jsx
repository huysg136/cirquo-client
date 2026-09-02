import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useAuthInit } from "../features/auth/hooks/useAuthInit";
import { AppRouter } from "./router/AppRouter";

function App() {
  useAuthInit();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4338ca",
          borderRadius: 12,
          controlHeightLG: 48,
          fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif",
        },
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} toastClassName="small-toast" />
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;
